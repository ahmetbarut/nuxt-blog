<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-5-desktop is-5-widescreen">
            <form action="" class="box">
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    class="input"
                    required
                    v-model="email"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="*******"
                    class="input"
                    required
                    v-model="password"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <div class="field">
                <button type="button" @click="submit" class="button is-success">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    submit() {
      this.isLoading = true;
      this.$http
        .post("http://blog-api.test/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$store.commit("setToken", response.user);
          this.$store.commit("setAuth", true);
          this.$router.push("/");
        })
        //admin@admin.co
        .catch((error) => {
          this.isLoading = false;
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
