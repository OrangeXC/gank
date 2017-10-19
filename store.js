import { action, observable } from 'mobx'

let store = null

class Store {
  @observable list = []

  constructor (isServer, list) {
    this.list = list
  }

  @action loadMoreList = (more) => {
    this.list = this.list.concat(more)
  }
}

export function initStore (isServer, list = []) {
  if (isServer) {
    return new Store(isServer, list)
  } else {
    if (store === null) {
      store = new Store(isServer, list)
    }

    return store
  }
}
