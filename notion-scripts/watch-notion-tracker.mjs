import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { loadNotionEnv } from './notion-env.mjs';

await loadNotionEnv();

const logPath = path.resolve(process.env.LOG_PATH || path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'aws-learning-log.md'));
const syncScript = fileURLToPath(new URL('./sync-notion-tracker.mjs', import.meta.url));

let timer = null;
let running = false;
let pending = false;

async function syncOnce() {
  const { spawn } = await import('node:child_process');
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [syncScript], {
      stdio: 'inherit',
      env: process.env,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Sync exited with code ${code}`));
      }
    });
  });
}

async function queuedSync() {
  if (running) {
    pending = true;
    return;
  }

  running = true;
  try {
    await syncOnce();
  } finally {
    running = false;
  }

  if (pending) {
    pending = false;
    await queuedSync();
  }
}

async function main() {
  await queuedSync();
  console.log(`Watching ${logPath} for changes...`);

  fs.watch(logPath, { persistent: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      queuedSync().catch((error) => {
        console.error(error.message);
      });
    }, 400);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
