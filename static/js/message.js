/**
 * Created by raven on 2018/1/15.
 */
export const topError = (self, message) => {
  self.$message({
    showClose: true,
    message: message,
    type: 'error'
  })
}

export const topSuccess = (self, message) => {
  self.$message({
    showClose: true,
    message: message,
    type: 'success'
  })
}

export const load = (self, message) => {
  const loading = self.$loading({
    lock: true,
    text: message,
    background: 'rgba(0, 0, 0, 0.3)'
  })
  return loading
}

export default {
  topError,
  topSuccess,
  load
}
