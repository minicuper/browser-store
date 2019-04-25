const nextTick = require('next-tick')
var store = require('store')

const promisify = (syncFn) => {
  return new Promise((resolve, reject) => {
    nextTick(() => {
      try {
        resolve(syncFn())
      } catch (error) {
        reject(error)
      }
    })
  })
}

function BrowserStore() {
}

BrowserStore.prototype.getItem = function (key) {
  return promisify(() => {
    return store.get()
  })
}

BrowserStore.prototype.setItem = function (key, value) {
  return promisify(() => {
    store.set(key, value)
  })
}

BrowserStore.prototype.removeItem = function (key) {
  return promisify(() => {
    store.remove(key)
  })
}

BrowserStore.prototype.getItemIds = function () {
  return promisify(() => {
    var ids = []
    store.each((val, key) => {
      ids.push(key)
    })
    return ids
  })
}

BrowserStore.prototype.clean = function () {
  return promisify(() => {
    store.clearAll()
  })
}

module.exports = BrowserStore
