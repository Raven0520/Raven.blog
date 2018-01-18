/**
 * Created by raven on 2018/1/15.
 */
export default {
  data () {
    var name = (rule, value, callback) => {
      if (!value) {
        this.message.topError(this, '昵称不能为空')
        callback(new Error(' '))
      }
      callback()
    }
    var email = (rule, value, callback) => {
      if (!value) {
        this.message.topError(this, '邮箱不能为空')
        callback(new Error(' '))
      }
      callback()
    }
    var password = (rule, value, callback) => {
      if (!value) {
        this.message.topError(this, '密码不能为空')
        callback(new Error(' '))
      }
      callback()
    }
    var confirm = (rule, value, callback) => {
      if (!value) {
        this.message.topError(this, '请确认密码')
        callback(new Error(' '))
      }
      callback()
    }
    var token = (rule, value, callback) => {
      if (!value) {
        this.message.topError(this, 'Token 不能为空')
        callback(new Error(' '))
      }
      callback()
    }
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
      },
      rule: {
        name: [
          {validator: name, trigger: 'blur'}
        ],
        email: [
          {validator: email, trigger: 'blur'}
        ],
        password: [
          {validator: password, trigger: 'blur'}
        ],
        password_confirmation: [
          {validator: confirm, trigger: 'blur'}
        ],
        token: [
          {validator: token, trigger: 'blur'}
        ]
      },
      res: '',
      loading: {
        status: false,
        text: 'Register....',
        background: 'rgba(0, 0, 0, 0.3)'
      }
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    register () {
      this.loading.status = true
      this.$http.post(this.common.url + '/Authenticate/register', this.form, {emulateJSON: true}).then(function (data) {
        data = data.body
        this.loading.status = false
        if (data.status === 'success') {
          this.message.topSuccess(this, data.data.message)
          this.login()
        }
      }, function (error) {
        this.loading.status = false
        this.common.responseError(this, error)
      })
    }
  }
}
