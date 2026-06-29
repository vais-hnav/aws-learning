import { loadNotionEnv } from './notion-env.mjs';

await loadNotionEnv();

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

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

async function main() {
  const database = await notionFetch(`databases/${databaseId}`);
  const titlePropertyName = getTitlePropertyName(database);

  const result = await notionFetch(`databases/${databaseId}/query`, {
    method: 'POST',
    body: JSON.stringify({ page_size: 100 }),
  });

  let updated = 0;

  for (const page of result.results || []) {
    const props = page.properties || {};
    const title = getTextContent(props[titlePropertyName]?.title || []);
    const legacyTopic = getTextContent(props['Video Topic']?.rich_text || []);
    const normalizedTitle = normalizeTitle(legacyTopic || title);

    if (!normalizedTitle || title === normalizedTitle) {
      continue;
    }

    await notionFetch(`pages/${page.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        properties: {
          [titlePropertyName]: {
            title: [
              {
                text: {
                  content: normalizedTitle,
                },
              },
            ],
          },
        },
      }),
    });
    updated += 1;
  }

  console.log(`Normalized ${updated} page title(s).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
