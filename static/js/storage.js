/**
 * Created by raven on 2018/1/19.
 */

/**
 * 定时储存前端数据
 * @param k 数据id
 * @param v 数据值
 * @param t 储存时间
 */
export const set = (k, v, t) => {
  try {
    if (!localStorage) return false
    if (!t || isNaN(t)) t = 60
    let cacheExpireDate = (new Date() - 1) + t * 1000
    let cacheData = {val: v, exp: cacheExpireDate}
    localStorage.setItem(k, JSON.stringify(cacheData))
  } catch (e) {
  }
}

/**
 * 获取储存在前端的数据
 * @param k 数据id
 */
export const get = (k) => {
  try {
    if (!localStorage) return false
    let cacheData = JSON.parse(localStorage.getItem(k))
    if (!cacheData) return null
    let now = new Date() - 1
    if (now > cacheData.exp) {
      remove(k)
      return ''
    }
    return cacheData.val
  } catch (e) {
    remove(k)
    return null
  }
}

/**
 * 获取数据到期时间
 * @param k
 * @returns {*}
 */
export const getExp = (k) => {
  try {
    if (!localStorage) return false
    let cacheData = JSON.parse(localStorage.getItem(k))
    if (!cacheData) return null
    let now = new Date() - 1
    if (now > cacheData.exp) {
      remove(k)
      return ''
    }
    return cacheData.exp
  } catch (e) {
    remove(k)
    return null
  }
}

/**
 * 移除前端储存的数据
 * @param k 数据id
 * @returns {boolean}
 */
export const remove = (k) => {
  if (!localStorage) return false
  localStorage.removeItem(k)
}

/**
 * 清楚所有前端储存的数据
 * @returns {boolean}
 */
export const clear = () => {
  if (!localStorage) return false
  localStorage.clear()
}

export default {
  set,
  get,
  getExp,
  clear
}
