<template>
    <div class="data-detail">
      <Header></Header>
      <div class="content-container" v-if="data">
        <h1>{{ data.title }}</h1>
        <p class="author">By {{ userName }}</p>
        <img :src="'https://via.placeholder.com/800x400?text=No+Image'" />
        <p class="content">{{ data.content  }}</p>
        <div class="body">{{ data.category  }}</div>
  
        <div class="actions">
          <button class="update-btn" @click="navigateToUpdate">Update</button>
          <button class="delete-btn" @click="deleteData">Delete</button>
        </div>
      </div>
      <div v-else>
        <p>Loading data...</p>
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
        data: null, 
      };
    },
    async created() {
      let userLogin = localStorage.getItem("userLogin");
      this.userName = JSON.parse(userLogin)['name'];
      const dataId = this.$route.params.id; 
      try {
        let response = await axios.get(`http://localhost:3000/posts/${dataId}`);
        if (response.status === 200) {
          this.data = response.data;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    methods: {
      async deleteData() {
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa bài viết này?");
        if (confirmDelete) {
          try {
            await axios.delete(`http://localhost:3000/posts/${this.data.id}`);
            alert("Bài viết đã được xóa thành công.");
            this.$router.push("/"); 
          } catch (error) {
            console.error("Error deleting data:", error);
            alert("Xóa bài viết không thành công. Vui lòng thử lại.");
          }
        }
      },
      navigateToUpdate() {
        this.$router.push({ name: "UpdateData", params: { id: this.data.id } });
      },
    },
  };
  </script>
  
  <style scoped>
  .data-detail {
    padding: 20px;
    font-family: "Poppins", sans-serif;
  }
  
  .content-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .content-container h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  .author {
    font-size: 14px;
    color: #999;
    margin-bottom: 20px;
  }
  
  .content-container img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .description {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .body {
    font-size: 14px;
    line-height: 1.6;
  }
  
  /* Buttons */
  .actions {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
  }
  
  .update-btn,
  .delete-btn {
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .update-btn {
    background-color: #4caf50;
    color: white;
  }
  
  .update-btn:hover {
    background-color: #45a049;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  
  .delete-btn:hover {
    background-color: #d32f2f;
  }
  </style>
  