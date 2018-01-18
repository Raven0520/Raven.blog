/**
 * Created by raven on 2018/1/15.
 */
export default {
  data () {
    var name = (rule, value, callback) => {
      if (!value) {
        this.message.topError(this, '用户名、邮箱不能为空')
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
    return {
      form: {
        name: '',
        password: ''
      },
      rule: {
        name: [
          {validator: name, trigger: 'blur'}
        ],
        password: [
          {validator: password, trigger: 'blur'}
        ]
      },
      loading: {
        status: false,
        text: 'Validation....',
        background: 'rgba(0, 0, 0, 0.3)'
      }
    }
  },
  methods: {
    createAccount () {
      this.$router.push('/register')
    },
    login () {
      this.common.login(this, this.form)
    }
  }
}
