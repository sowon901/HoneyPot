<template>
  <div>
    <TopHeader />
    <Menubar />
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li>Login</li>
        </ul>
      </div>
    </div>

    <div class="login-area ptb-60">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <div class="login-content">
              <div class="section-title">
                <h2><span class="dot"></span> Login</h2>
              </div>

              <form
                class="login-form"
                v-if="!$store.state.authUser"
                @submit.prevent="login"
              >
                <p v-if="formError" class="error">
                  {{ formError }}
                </p>
                <div class="form-group">
                  <label>Username</label>
                  <input
                    v-model="formUsername"
                    type="text"
                    class="form-control"
                    placeholder="demo"
                    name="username"
                  />
                </div>

                <div class="form-group">
                  <label>Password</label>
                  <input
                    v-model="formPassword"
                    type="password"
                    class="form-control"
                    placeholder="demo"
                    name="password"
                  />
                </div>

                <button type="submit" class="btn btn-primary">Login</button>

                <nuxt-link to="/" class="forgot-password"
                  >Lost your password?</nuxt-link
                >
              </form>
            </div>
          </div>

          <div class="col-lg-6 col-md-12">
            <div class="new-customer-content">
              <div class="section-title">
                <h2><span class="dot"></span> New Customer</h2>
              </div>

              <span>Create a Account</span>
              <p>
                Sign up for a free account at our store. Registration is quick
                and easy. It allows you to be able to order from our shop. To
                start shopping click register.
              </p>
              <nuxt-link to="/signup" class="btn btn-light"
                >Create A Account</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'

export default {
  components: {
    TopHeader,
    Menubar,
  },
  data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: '',
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword,
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
        this.$router.push('/')
      } catch (error) {
        this.formError = error.message
      }
    },
  },
}
</script>