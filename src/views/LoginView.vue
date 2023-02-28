<template>
<div class="container mt-5">
    <form id="form" class="form-signin">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="username" v-model="user.username"
                  placeholder="name@example.com" required autofocus>
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="password" v-model="user.password"
                  placeholder="Password" required>
                <label for="password">Password</label>
              </div>
              <button class="btn btn-lg btn-primary w-100 mt-3" type="button" @click="login()">
                登入
              </button>
            </form>
</div>
</template>

<script>
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const apiUrl = `${VITE_APP_URL}/admin/signin`

      this.$http.post(apiUrl, this.user)
        .then(res => {
          const { token, expired } = res.data
          document.cookie = `hexschoolToken=${token}; expires=${new Date(expired)}; path=/`
          this.$router.push('/admin/products')
        })
        .catch(error => {
          console.log(error)
        })
    }

  }
}
</script>
