import childProcess from 'child_process';

import gulp from 'gulp';


export function createCheckTasks () {
  return gulp.series(checkGit);
}


// to ensure there is no experimental code
function checkGit () {
  return new Promise((resolve, reject) => {
    const git = childProcess.spawn('git', ['status', '--porcelain']);
    git.stdout.on('data', (data) => {
      let uncleanFiles = data.toString('utf8');
      uncleanFiles = uncleanFiles.trim();
      uncleanFiles = uncleanFiles.split('\n');
      if (uncleanFiles.length > 0) {
        reject(new Error('work tree is dirty'));
        return;
      }
    });
    git.on('error', (error) => {
      reject(error);
    });
    git.on('exit', (code, signal) => {
      if (code !== 0) {
        reject(new Error(`code: ${code}, signal: ${signal}`));
      }
      resolve();
    });
  });
}
checkGit.displayName = 'check:git';
