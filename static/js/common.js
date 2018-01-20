/**
 * Created by raven on 2018/1/11.
 */
const url = 'http://api.blog.com'
// const url = 'http://localhost:8000'
const header = {
  Accept: 'application/json',
  Authorization: 'Bearer'
}

/**
 * 登录
 * @param self vue对应页面的this对象
 * @param info 参数
 */
export const login = (self, info) => {
  self.loading.status = true
  self.$http.post(url + '/Authenticate/login', info, {emulateJSON: true}).then(function (res) {
    self.loading.status = false
    res = res.body
    if (res.status === 'success') {
      const accessToken = res.data.token.access_token
      const refreshToken = res.data.token.refresh_token
      const expireTime = res.data.token['expires_in']
      const token = {access_token: accessToken, refresh_token: refreshToken}
      self.storage.set('token', token, expireTime)
      self.message.topSuccess(self, res.data.message)
      self.$router.push({path: '/index'})
    }
  }, function (error) {
    self.loading.status = false
    responseError(self, error)
  })
}

/**
 * api请求
 * @param self  vue对应页面的this对象
 * @param params  传给api的参数
 * @param curUrl  浏览器路径
 * @param dialog  判断是否需要开启弹窗
 * @param show    判断是否显示成功信息
 * @param load    判断是否关闭加载框
 * @returns {Promise}
 */
export const apiPost = (self, params, curUrl, load, dialog, show) => {
  apiBefore(self)
  self.$http.post(url + curUrl, params, {headers: header, emulateJSON: true}).then(function (res) {
    res = res.body
    autoDialog(self, dialog)
    autoLoading(load)
    if (show !== false) {
      self.message.topSuccess(self, res.data.message)
    }
    self.result = res.data
  }, function (error) {
    autoLoading(load)
    if (error.body.code === 401) {
      reLogin(self)
    }
    if (show !== false) {
      responseError(self, error)
    }
  })
}

/**
 * 判断是否需要关闭加载层
 * @param load
 */
export const autoLoading = (load) => {
  if (load) { load.close() }
}

export const autoDialog = (self, dialog) => {
  if (dialog) { self[dialog.id] = dialog.action }
}

/**
 * 返回错误信息的路由机制
 * @param self
 * @param error
 */
export const responseError = (self, error) => {
  console.log(error)
  let data = error.body
  if (error.status === 422) {
    responseValidate(self, data)
  } else {
    responseFailed(self, data)
  }
}

/**
 * 失败返回的信息
 * @param self
 * @param error
 */
export const responseFailed = (self, error) => {
  self.message.topError(self, error.message)
}

/**
 * 验证错误返回
 * @param self
 * @param error
 */
export const responseValidate = (self, error) => {
  let errorMsg = ''
  for (let item in error.errors) {
    errorMsg = errorMsg + '  ' + error.errors[item][0]
  }
  self.message.topError(self, errorMsg)
}
/**
 * api前的判断，并且将Token添加到Header
 * @param self
 */
export const apiBefore = (self) => {
  let userInfo = self.storage.get('token')
  if (!userInfo || userInfo === null) {
  } else {
    header.Authorization = 'Bearer' + ' ' + userInfo.access_token
  }
}

export const reLogin = (self) => {
  self.$alert('登录失效，请重新登录', '登录失效', {
    confirmButtonText: '确定',
    callback: action => {
      loginPage(self)
    }
  })
}

/**
 * 跳转到登录页面
 * @param self  vue应页面的this对象
 */
export const loginPage = (self) => {
  self.$router.push({path: '/login', component: resolve => require(['@/Login/index.vue'], resolve)})
}

/**
 * 成功
 * @param res   api获取的数据
 */
export const success = (res) => {
  return res
}

/**
 * 错误
 * @param self  vue的this对象
 * @param error  api获取的错误提示
 */
export const fail = (self, error) => {
  self.message.topError(self, error)
  loginPage(self)
}

export default {
  apiBefore,
  login,
  apiPost,
  responseError,
  url
}
