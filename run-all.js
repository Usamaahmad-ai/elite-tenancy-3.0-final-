const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'combined-logs.txt');
const out = fs.openSync(logFile, 'a');

function log(msg) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[${timestamp}] ${msg}\n`);
    console.log(msg);
}

log('Starting pnpm install...');
const install = spawn('cmd.exe', ['/c', 'pnpm install'], {
  stdio: ['ignore', out, out]
});

install.on('close', (code) => {
  log(`Install finished with code ${code}`);
  
  if (code !== 0) {
      log('Install failed, skipping server start.');
      return;
  }

  log('Starting frontend server...');
  const frontend = spawn('cmd.exe', ['/c', 'pnpm --filter @workspace/elite-tenancy run dev'], {
    stdio: ['ignore', out, out],
    env: { ...process.env, PORT: '5173', BASE_PATH: '/' }
  });
  
  log('Starting backend server...');
  const backend = spawn('cmd.exe', ['/c', 'pnpm --filter @workspace/api-server run dev'], {
    stdio: ['ignore', out, out],
    env: { ...process.env, PORT: '5000' }
  });

  log('Servers are running. Keeping process alive...');
});

// Keep the process alive
setInterval(() => {}, 1000);
