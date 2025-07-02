module.exports = {
  Client: class {
    constructor() {}
    setActivity() { return Promise.reject(new Error('fail')); }
    login() { return Promise.resolve(); }
    destroy() { return Promise.resolve(); }
    on() {}
    get user() { return { username: 'stub' }; }
  }
};
