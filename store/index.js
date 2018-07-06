import { action, observable } from 'mobx'

class Store {
  @observable list = []

  constructor (list) {
    this.list = list
  }

  @action loadMoreList = (more) => {
    this.list = this.list.concat(more)
  }
}

export const initStore = (list) => new Store(list)
