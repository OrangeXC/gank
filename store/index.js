import { action, observable } from 'mobx'

class Store {
  @observable list = []

  constructor (list) {
    this.list = list
  }

  @action loadMoreList = moreList => {
    this.list = this.list.concat(moreList)
  }
}

export const initStore = list => new Store(list)
