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
      const token = {access_token: accessToken, refresh_token: refreshToken}
      const loginInfo = {token: token}
      const userInfo = JSON.stringify(loginInfo)
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', userInfo)
      self.message.topSuccess(self, res.data.message)
      self.$router.push({path: '/index'})
    }
  }, function (error) {
    self.loading.status = false
    responseError(self, error)
  })
}

/**
 * 存储 token 值
 */
export const userInfoToken = () => {
  let userInfo = localStorage.getItem('userInfo')
  if (userInfo !== null) {
    return JSON.parse(userInfo)
  } else {
    userInfo = {token: null}
    return userInfo
  }
}

/**
 * api请求前的验证
 * @param self
 * @param params
 * @param curUrl
 * @returns {Promise}
 */
export const apiHttp = (self, params, curUrl) => {
  return new Promise((resolve, reject) => {
    self.$http.post(url + curUrl, params, {emulateJSON: true}).then(resolve, reject)
  })
}

/**
 * api请求
 * @param self  vue对应页面的this对象
 * @param params  传给api的参数
 * @param curUrl  浏览器路径
 * @returns {Promise}
 */
export const apiPost = (self, params, curUrl, dialog) => {
  params = apiBefore(params, self)
  self.$http.post(url + curUrl, params, {headers: header, emulateJSON: true}).then(function (res) {
    if (dialog) {
      self[dialog] = true
    }
    autoLoading(self)
    console.log(res)
  }, function (error) {
    autoLoading(self)
    responseError(self, error)
  })
}

/**
 * 判断是否需要关闭加载层
 * @param self
 */
export const autoLoading = (self) => {
  if (self.loading.status) {
    self.loading.status = false
  }
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
 * TOKEN后的判断，api前的判断
 * @param params
 * @param self
 */
export const apiBefore = (params, self) => {
  tokenJudge(self)
  return tokenInsert()
}

/**
 * TOKEN判断
 * @returns {boolean}
 */
export const tokenJudge = (self) => {
  let accessToken = userInfoToken().token.access_token
  if (accessToken === undefined || accessToken === null || accessToken === '') {
    fail(self, '您尚未登入请先登入')
    return false
  } else {
    return true
  }
}

/**
 * header 写入 token 令牌
 */
export const tokenInsert = () => {
  header.Authorization = 'Bearer' + ' ' + userInfoToken().token.access_token
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
  login,
  apiPost,
  responseError,
  url
}
