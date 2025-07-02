const path = require('path');
process.env.MOCK_RPC = path.join(__dirname, 'discord-rpc-stub.js');
process.env.NODE_PATH = path.join(__dirname, 'node_modules');
require('module').Module._initPaths();
const { setActivities } = require('../rpc');

class StubRPC {
  constructor() {
    this.user = { username: 'stub' };
  }
  setActivity() {
    return Promise.reject(new Error('fail'));
  }
  on() {}
  login() { return Promise.resolve(); }
  destroy() { return Promise.resolve(); }
}

setActivities(new StubRPC());
setTimeout(() => process.exit(0), 50);
