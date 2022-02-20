<template>
  <section class="section">
    <div class="container">
      <div class="is-flex is-flex-direction-column">
        <div class="content is-large">
          <h1>{{ post.title }}</h1>
          <div v-html="post.body"></div>
          <div class="">
            {{ post.created_at }}
          </div>
        </div>
        <hr />
        <div class="content is-large" v-if="post.comments.length === 0">
          <h1 class="icon-text has-text-danger">
            Comment not found
          </h1>
        </div>
        <div class="content is-large" v-if="post.comments.length > 0">
          <h1>Comments</h1>
          <div
            class="comments"
            v-for="comment in post.comments"
            :key="comment.id"
          >
            <div class="columns p-4">
              <div class="column is-one-fifth">{{ comment.name }}</div>
            </div>
            <div class="columns">
              <div class="content p-4 is-sm">
                <p class="m-3">
                  {{ comment.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const post = (
      await $axios.get(`http://blog-api.test/api/posts/${params.slug}`)
    ).data.data;
    return { post };
  },

  mounted() {
    console.log("");
  },
};
</script>

<style scoped>
.comments {
  margin-top: 2rem;
  background-color: #f5f5f5;
}
</style>