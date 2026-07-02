import fs from 'node:fs/promises';
import { loadNotionEnv } from './notion-env.mjs';

await loadNotionEnv();

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;
const logPath = process.env.LOG_PATH || new URL('../aws-learning-log.md', import.meta.url);

if (!token || !databaseId) {
  console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID.');
  process.exit(1);
}

const notionVersion = '2022-06-28';
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Notion-Version': notionVersion,
};
const viewHeaders = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2026-03-11',
};

const titlePropertyName = 'Video Topic';
const requiredDatabaseProperties = {
  Phase: { select: {} },
  'Plan Order': { number: { format: 'number' } },
  'Watched Status': { select: {} },
  'Playlist Video': { number: { format: 'number' } },
  'AWS Service': { multi_select: {} },
  'Lab Status': { select: {} },
  Date: { date: {} },
  Notes: { rich_text: {} },
};

const removableProperties = [
  'Name',
  'Video #',
  'Watch Status',
  'Cleanup Status',
  'Cleanup Done?',
  'Hands-on Lab Done?',
  'Lab Path',
  'Commit',
];

function parseTable(markdown) {
  const lines = markdown.split(/\r?\n/);
  const rows = [];
  let headersInTable = null;

  for (const line of lines) {
    if (!line.startsWith('|')) {
      continue;
    }

    const parts = line
      .split('|')
      .slice(1, -1)
      .map((part) => part.trim());

    if (!headersInTable) {
      headersInTable = parts;
      continue;
    }

    const isSeparator = parts.every((part) => /^:?-{3,}:?$/.test(part));
    if (isSeparator || parts.length !== headersInTable.length) {
      continue;
    }

    const row = Object.fromEntries(headersInTable.map((header, index) => [header, parts[index] || '']));
    if (!row.Phase || !row['Video Topic']) {
      continue;
    }

    rows.push({
      planOrder: rows.length + 1,
      phase: row.Phase,
      videoTopic: row['Video Topic'],
      watchedStatus: row['Watched Status'],
      playlistVideo: Number(row['Playlist Video']) || null,
      awsService: row['AWS Service'],
      labStatus: row['Lab Status'],
      date: row.Date,
      notes: row.Notes,
    });
  }

  return rows;
}

async function notionFetch(path, options = {}) {
  const response = await fetch(`https://api.notion.com/v1/${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Notion API error ${response.status}: ${body}`);
  }

  return response.json();
}

async function notionViewFetch(path, options = {}) {
  const response = await fetch(`https://api.notion.com/v1/${path}`, {
    ...options,
    headers: {
      ...viewHeaders,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Notion view API error ${response.status}: ${body}`);
  }

  return response.json();
}

function toMultiSelectNames(value) {
  return value
    .split('/')
    .flatMap((part) => part.split(','))
    .map((part) => part.trim())
    .filter(Boolean)
    .map((name) => ({ name }));
}

function toSelect(value) {
  return value ? { name: value } : null;
}

function toRichText(value) {
  return value ? [{ text: { content: value } }] : [];
}

function getTextContent(richText = []) {
  return richText.map((item) => item.plain_text || '').join('').trim();
}

function normalizeTitle(title) {
  return title.replace(/^Video\s+\d+\s*-\s*/i, '').trim();
}

function getTitlePropertyName(database) {
  for (const [name, definition] of Object.entries(database.properties || {})) {
    if (definition.type === 'title') {
      return name;
    }
  }

  throw new Error('Could not find the Notion title property.');
}

async function patchDatabaseProperties(properties) {
  if (!Object.keys(properties).length) {
    return;
  }

  await notionFetch(`databases/${databaseId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties }),
  });
}

async function ensureDatabaseProperties() {
  let database = await notionFetch(`databases/${databaseId}`);
  let existingProperties = database.properties || {};
  let currentTitleProperty = getTitlePropertyName(database);

  if (currentTitleProperty !== titlePropertyName) {
    if (existingProperties[titlePropertyName] && existingProperties[titlePropertyName].type !== 'title') {
      await patchDatabaseProperties({ [titlePropertyName]: null });
      database = await notionFetch(`databases/${databaseId}`);
      existingProperties = database.properties || {};
    }

    await patchDatabaseProperties({
      [currentTitleProperty]: {
        name: titlePropertyName,
      },
    });

    database = await notionFetch(`databases/${databaseId}`);
    existingProperties = database.properties || {};
    currentTitleProperty = getTitlePropertyName(database);
  }

  const propertyUpdates = {};

  for (const propertyName of removableProperties) {
    if (propertyName === currentTitleProperty) {
      continue;
    }

    if (existingProperties[propertyName]) {
      propertyUpdates[propertyName] = null;
    }
  }

  for (const [name, definition] of Object.entries(requiredDatabaseProperties)) {
    if (!existingProperties[name]) {
      propertyUpdates[name] = definition;
    }
  }

  await patchDatabaseProperties(propertyUpdates);
}

async function queryAllDatabasePages() {
  const pages = [];
  let cursor;

  do {
    const result = await notionFetch(`databases/${databaseId}/query`, {
      method: 'POST',
      body: JSON.stringify({
        page_size: 100,
        ...(cursor ? { start_cursor: cursor } : {}),
      }),
    });

    pages.push(...(result.results || []));
    cursor = result.has_more ? result.next_cursor : null;
  } while (cursor);

  return pages;
}

function pageTopic(page) {
  const props = page.properties || {};
  const title = getTextContent(props[titlePropertyName]?.title || props.Name?.title || []);
  const legacyTopic = getTextContent(props['Video Topic']?.rich_text || []);
  return normalizeTitle(legacyTopic || title);
}

function rowToProperties(row) {
  return {
    [titlePropertyName]: {
      title: [
        {
          text: {
            content: row.videoTopic,
          },
        },
      ],
    },
    Phase: {
      select: toSelect(row.phase),
    },
    'Plan Order': {
      number: row.planOrder,
    },
    'Watched Status': {
      select: toSelect(row.watchedStatus),
    },
    'Playlist Video': {
      number: row.playlistVideo,
    },
    'AWS Service': {
      multi_select: row.awsService ? toMultiSelectNames(row.awsService) : [],
    },
    'Lab Status': {
      select: toSelect(row.labStatus),
    },
    Date: {
      date: row.date ? { start: row.date } : null,
    },
    Notes: {
      rich_text: toRichText(row.notes),
    },
  };
}

async function configureDashboardView() {
  const database = await notionViewFetch(`databases/${databaseId}`);
  const dataSourceId = database.data_sources?.[0]?.id;
  if (!dataSourceId) {
    return;
  }

  const dataSource = await notionViewFetch(`data_sources/${dataSourceId}`);
  const properties = dataSource.properties || {};
  const phase = properties.Phase;
  const planOrder = properties['Plan Order'];
  const topic = properties[titlePropertyName];
  const watchedStatus = properties['Watched Status'];
  const playlistVideo = properties['Playlist Video'];
  const awsService = properties['AWS Service'];
  const labStatus = properties['Lab Status'];
  const date = properties.Date;
  const notes = properties.Notes;

  if (!phase || !planOrder || !topic || !watchedStatus || !playlistVideo || !awsService || !labStatus || !date || !notes) {
    return;
  }

  const views = await notionViewFetch(`views?database_id=${databaseId}`);
  let tableView = null;
  for (const viewRef of views.results || []) {
    const view = await notionViewFetch(`views/${viewRef.id}`);
    if (view.type === 'table') {
      tableView = view;
      break;
    }
  }

  if (!tableView) {
    return;
  }

  await notionViewFetch(`views/${tableView.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: 'AWS Learning Tracker',
      sorts: [
        {
          property: 'Plan Order',
          direction: 'ascending',
        },
      ],
      configuration: {
        type: 'table',
        group_by: {
          type: 'select',
          property_id: phase.id,
          sort: { type: 'manual' },
          hide_empty_groups: true,
        },
        properties: [
          { property_id: phase.id, visible: true, width: 260 },
          { property_id: topic.id, visible: true, width: 360 },
          { property_id: watchedStatus.id, visible: true, width: 150 },
          { property_id: playlistVideo.id, visible: true, width: 120 },
          { property_id: awsService.id, visible: true, width: 220 },
          { property_id: labStatus.id, visible: true, width: 140 },
          { property_id: date.id, visible: true, width: 130 },
          { property_id: notes.id, visible: true, width: 520, wrap: true },
          { property_id: planOrder.id, visible: false },
        ],
        frozen_column_index: 1,
        show_vertical_lines: true,
        wrap_cells: true,
      },
    }),
  });
}

async function sync() {
  await ensureDatabaseProperties();

  const markdown = await fs.readFile(logPath, 'utf8');
  const rows = parseTable(markdown);

  if (!rows.length) {
    console.log('No rows found in the learning log.');
    return;
  }

  const pages = await queryAllDatabasePages();
  const pagesByTopic = new Map();

  for (const page of pages) {
    const topic = pageTopic(page);
    if (topic && !pagesByTopic.has(topic)) {
      pagesByTopic.set(topic, page);
    }
  }

  let created = 0;
  let updated = 0;

  for (const row of rows) {
    const existing = pagesByTopic.get(row.videoTopic);
    const properties = rowToProperties(row);

    if (existing) {
      await notionFetch(`pages/${existing.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      });
      updated += 1;
    } else {
      await notionFetch('pages', {
        method: 'POST',
        body: JSON.stringify({
          parent: { database_id: databaseId },
          properties,
        }),
      });
      created += 1;
    }
  }

  const expectedTopics = new Set(rows.map((row) => row.videoTopic));
  let archived = 0;

  for (const page of pages) {
    const topic = pageTopic(page);
    if (!expectedTopics.has(topic)) {
      await notionFetch(`pages/${page.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ archived: true }),
      });
      archived += 1;
    }
  }

  await configureDashboardView();

  console.log(`Synced ${rows.length} row(s). Created: ${created}. Updated: ${updated}. Archived stale rows: ${archived}.`);
}

sync().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
