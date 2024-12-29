<template>
    <div>
      <Header></Header>
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Tìm kiếm bài viết..."
          @keyup.enter="performSearch"
        />
        <button @click="performSearch">🔍</button>
      </div>
  
      <div class="articles-container">
        <div
          class="article-card"
          v-for="article in filteredArticles"
          :key="article.id"
          @click="navigateToDetail(article.id)"
        >
          <img
            :src="'https://via.placeholder.com/300x180?text=No+Image'"
            :alt="article.title"
            class="article-image"
          />
          <div class="article-content">
            <h3>{{ article.title }}</h3>
            <p>{{ article.category || "Không có mô tả" }}</p>
            <p class="article-author">By {{ userName }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "./Header.vue";
  import axios from "axios";
  
  export default {
    components: {
      Header,
    },
    data() {
      return {
        articles: [],
        searchQuery: "",
      };
    },
    computed: {
      filteredArticles() {
        if (!this.searchQuery.trim()) {
          return this.articles;
        }
        return this.articles.filter((article) =>
          article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    async created() {
      try {
        let userLogin = localStorage.getItem("userLogin");
        let userId = JSON.parse(userLogin)?.id;
        this.userName = JSON.parse(userLogin)?.name || "Guest";
        if (!userId) {
          throw new Error("User ID not found in local storage.");
        }
        let result = await axios.get(`http://localhost:3000/posts?user_id=${userId}`);
        if (result.status === 200) {
          this.articles = result.data;
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    },
    methods: {
      performSearch() {
        console.log(`Searching for: ${this.searchQuery}`);
      },
      navigateToDetail(postId) {
        this.$router.push({ name: "DetailPost", params: { id: postId } });
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 90%;
  max-width: 800px;
}

.search-container input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px 0 0 20px;
  outline: none;
}

.search-container button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
}

.search-container button:hover {
  background-color: #45a049;
}

.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.article-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.article-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.article-content {
  padding: 15px;
}

.article-content h3 {
  font-size: 18px;
  margin: 10px 0;
  font-family: "Poppins", sans-serif;
  color: #333;
}

.article-content p {
  font-size: 14px;
  color: #666;
}

.article-author {
  font-style: italic;
  color: #999;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .articles-container {
    grid-template-columns: 1fr;
  }
}
</style>  