/*
 * 时间表
 * @Author: czy0729
 * @Date: 2019-04-20 11:41:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-22 13:21:42
 */
import { observable, computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { API_CALENDAR } from '@constants/api'
import store from '@utils/store'

class Calendar extends store {
  state = observable({
    calendar: LIST_EMPTY
  })

  async init() {
    const res = Promise.all([this.getStorage('calendar')])
    const state = await res
    this.setState({
      calendar: state[3] || LIST_EMPTY
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 取每日放送
   */
  @computed get calendar() {
    return this.state.calendar
  }

  // -------------------- fetch --------------------
  /**
   * 每日放送
   */
  fetchCalendar() {
    return this.fetch(
      {
        url: API_CALENDAR(),
        info: '每日放送'
      },
      'calendar',
      {
        list: true,
        storage: true
      }
    )
  }
}

export default new Calendar()