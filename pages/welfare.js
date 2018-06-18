import ListPage from '../components/Listpage'
import { initStore } from '../store'

export default class WelfarePage extends ListPage {
  constructor (props) {
    super(props)

    this.store = initStore(props.initList)
  }
}
