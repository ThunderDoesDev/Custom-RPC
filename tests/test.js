const { spawnSync } = require('child_process');
const path = require('path');

const result = spawnSync(process.execPath, [path.join(__dirname, 'runSetActivities.js')], {stdio: 'inherit'});
if (result.status !== 0) {
  throw new Error('setActivities failed');
}
console.log('All tests passed');
