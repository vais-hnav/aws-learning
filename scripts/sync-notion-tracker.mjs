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

function parseTable(markdown) {
  const lines = markdown.split(/\r?\n/);
  const rows = [];
  let inTable = false;

  for (const line of lines) {
    if (!line.startsWith('|')) {
      continue;
    }

    const parts = line
      .split('|')
      .slice(1, -1)
      .map((part) => part.trim());

    if (!inTable) {
      inTable = true;
      continue;
    }

    if (parts.length < 6) {
      continue;
    }

    const [date, videoTopic, awsService, handsOnLabDone, cleanupDone, notes] = parts;
    if (date === 'Date' || date === '---') {
      continue;
    }

    rows.push({
      date,
      videoTopic,
      awsService,
      handsOnLabDone,
      cleanupDone,
      notes,
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

function toCheckbox(value) {
  return /^yes$/i.test(value);
}

function toMultiSelectNames(value) {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((name) => ({ name }));
}

async function findPageByName(name) {
  const result = await notionFetch(`databases/${databaseId}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: {
        property: 'Name',
        title: {
          equals: name,
        },
      },
    }),
  });

  return result.results?.[0] || null;
}

function rowToProperties(row, title) {
  return {
    Name: {
      title: [
        {
          text: {
            content: title,
          },
        },
      ],
    },
    Date: {
      date: row.date ? { start: row.date } : null,
    },
    'Video Topic': {
      rich_text: row.videoTopic ? [{ text: { content: row.videoTopic } }] : [],
    },
    'AWS Service': {
      multi_select: row.awsService ? toMultiSelectNames(row.awsService) : [],
    },
    'Hands-on Lab Done?': {
      checkbox: toCheckbox(row.handsOnLabDone),
    },
    'Cleanup Done?': {
      checkbox: toCheckbox(row.cleanupDone),
    },
    Notes: {
      rich_text: row.notes ? [{ text: { content: row.notes } }] : [],
    },
  };
}

async function sync() {
  const markdown = await fs.readFile(logPath, 'utf8');
  const rows = parseTable(markdown);

  if (!rows.length) {
    console.log('No rows found in the learning log.');
    return;
  }

  let created = 0;
  let updated = 0;

  for (const row of rows) {
    const title = row.videoTopic;
    const existing = await findPageByName(title);
    const properties = rowToProperties(row, title);

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

  console.log(`Synced ${rows.length} row(s). Created: ${created}. Updated: ${updated}.`);
}

sync().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
