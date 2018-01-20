/**
 * Created by raven on 2018/1/15.
 */

/**
 * 失败返回 (顶部提示)
 * @param self
 * @param message
 */
export const topError = (self, message) => {
  self.$message({
    showClose: true,
    message: message,
    type: 'error'
  })
}

/**
 * 成功返回 （顶部提示）
 * @param self
 * @param message
 */
export const topSuccess = (self, message) => {
  self.$message({
    showClose: true,
    message: message,
    type: 'success'
  })
}

/**
 * 表单警告 （顶部提示）
 * @param self
 * @param message
 */
export const topWarning = (self, message) => {
  self.$message({
    showClose: true,
    message: message,
    type: 'warning'
  })
}

/**
 * 弹窗提示
 * @param self
 * @param message
 * @param title
 */
export const errorAlert = (self, message, title) => {
  if (!title) title = '错误提示'
  self.$alert(message, title, {
    confirmButtonText: '确定'
  })
}

/**
 * 数据加载页面
 * @param self
 * @param message
 * @returns {ElLoadingComponent|*}
 */
export const load = (self, message) => {
  if (!message) {
    message = 'Loading...'
  }
  let loading = self.$loading({
    lock: true,
    body: true,
    text: message,
    background: 'rgba(255, 255, 255, 0.3)'
  })
  return loading
}

export default {
  topError,
  topSuccess,
  topWarning,
  errorAlert,
  load
}
