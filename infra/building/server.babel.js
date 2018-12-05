import child_process from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import util from 'util';


const HOST = '127.0.0.1';
const PORT = 8000;

const fsReadFile = util.promisify(fs.readFile);


async function main () {
  let server = http.createServer(handler)
  server.listen(PORT, HOST);
  console.info(`Server running at http://${HOST}:${PORT}/`);

  while (true) {
    try {
      await fastBuild();
    } catch (e) {
      console.error(e);
    }
    await wait(5000);
  }
}


function fastBuild () {
  let p = child_process.spawn('npx', [
    'gulp',
    'userscript:full:es7',
  ], {
    stdio: 'inherit',
  });
  // avoid TLE
  let k = setTimeout(() => {
    p.kill('SIGTERM');
  }, 10 * 1000);

  return new Promise((resolve, reject) => {
    p.on('exit', (code, signal) => {
      clearTimeout(k);
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`build error: code ${code}, signal ${signal}`));
    });
  });
}


async function handler (req, res) {
  if (req.method !== 'GET') {
    res.writeHead(403);
    res.end();
    return;
  }

  console.info(`${req.method} ${req.url}`);

  let filePath = `.${req.url}`;
  let contentType = 'application/javascript';

  try {
    let content = await fsReadFile(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
    });
    res.end(content, 'utf-8');
    return;
  } catch (e) {
    if (e.code === 'ENOENT') {
      res.writeHead(404);
      res.end();
      return;
    }
    if (e.code === 'EISDIR') {
      res.writeHead(403);
      res.end();
      return;
    }
  }
  res.writeHead(500);
  res.end();
}


function wait (msDelay) {
  return new Promise((resolve) => {
    setTimeout(resolve, msDelay);
  });
}


main().catch((e) => {
  console.error(e);
});
