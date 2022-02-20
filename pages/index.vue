<template>
  <section class="section is-flex-direction-column">
    <p v-if="$fetchState.pending">Fetching mountains...</p>
    <div
      class="card my-1 post-card"
      v-for="(post, key) in posts.data"
      :key="key"
    >
      <header class="card-header" @click="goToPost(post)">
        <p class="card-header-title">{{ post.title }}</p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content" @click="goToPost(post)">
        <div class="content">
          {{ post.body.substring(0, 200) }}
          <br />
          <time :datetime="post.created_at">{{ post.created_at }}</time>
        </div>
      </div>
      <footer class="card-footer">
        <!-- <a href="#" class="card-footer-item">Save</a> -->
        <a href="#" class="card-footer-item"
        @click="editPost(post)"
        >Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </section>
</template>

<script>
import Card from "~/components/Card";
import axios from "axios";

export default {
  name: "HomePage",

  components: {
    Card,
  },

  data() {
    return {
      posts: [],
      page: 1,
    };
  },
  scrollToTop: true,
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  async fetch() {
    this.posts = await fetch(
      "http://blog-api.test/api/posts?page=" + this.page
    ).then((res) => res.json());
  },

  watch: {
    "$route.query.page": "$fetch",
  },

  mounted() {},

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    goToPost(post) {
      this.$router.push({
        name: "post-slug",
        params: {
          slug: post.slug,
        },
      });
    },
    handleScroll() {
      if (window.scrollY >= window.scrollMaxY) {
        this.page++;
        this.$fetch();
      }
    },
    editPost(post){
      this.$router.push({
        name: "post-edit-slug",
        params: {
          slug: post.slug,
        },
      });
    }
  },
};
</script>

<style scoped>
.post-card:hover {
  cursor: pointer;
}
</style>