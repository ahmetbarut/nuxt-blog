<template>
  <section class="section">
    <div class="container">
      <div class="is-flex is-flex-direction-column">
        <form>
          <div class="field">
            <div class="control">
              <label for="title">Title</label>
              <input
                class="input"
                type="text"
                placeholder="Text input"
                v-model="post.title"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label for="body">Body</label>
              <textarea
                rows="8"
                class="textarea"
                v-model="post.body"
              ></textarea>
            </div>
          </div>
          <div class="field">
            <div class="select">
              <select v-model="post.category.id">
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  :selected="category.id === post.category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button type="button" @click="submit" class="button is-link">
                Submit
              </button>
            </div>
            <div class="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>
          <b-loading
            :is-full-page="false"
            v-model="isLoading"
            :can-cancel="true"
          ></b-loading>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    middleware: ["auth"],
  data() {
    return {
      selectedCategory: "",
      isLoading: false,
    };
  },

  watch: {
    "post.category.id": function (val) {
      this.selectedCategory = val;
    },
  },
  loading: {
    color: "blue",
    height: "5px",
  },
  async asyncData({ params, $axios }) {
    const request = (
      await $axios.get(`http://blog-api.test/api/posts/edit/${params.slug}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
      })
    ).data;
    const post = request.post;
    const categories = request.categories;
    return { post, categories };
  },

  methods: {
    submit() {
      this.isLoading = true;
      this.$axios
        .post(`http://127.0.0.1:8001/api/posts/update/${this.post.slug}`, {
          title: this.post.title,
          body: this.post.body,
          category_id: this.selectedCategory,
        })
        .then((res) => {
          this.isLoading = false;
          this.post = res.data.post;
          this.$router.push(`/post/edit/${this.post.slug}`);
        });
    },
  },
};
</script>

<style scoped>
.comments {
  margin-top: 2rem;
  background-color: #f5f5f5;
}
</style>