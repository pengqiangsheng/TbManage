class Singleton {
  constructor() {
    this.queue = {}
  }
  static getInstance() {
    if(!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }
  lock(key, fn) {
    this.queue[key] = fn
  }
  unlock(key) {
    delete this.queue[key]
  }
}

module.exports = Singleton
