/*
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-30 21:20:42
 */
export { default as collectionStore } from './collection'
export { default as subjectStore } from './subject'
export { default as uiStore } from './ui'
export { default as userStore } from './user'

class Stores {
  add(key, store) {
    if (!this[key]) {
      this[key] = store
    }
  }
  get(key) {
    return this[key]
  }
}

export default new Stores()
