<template>
    <Header></Header>
    <div class="add-post-container">
      <h2>Thêm Bài Viết Mới</h2>
      <form @submit.prevent="addPost" class="add-post-form">
        <div class="form-group">
          <label for="title">Tiêu đề bài viết</label>
          <input type="text" id="title" v-model="form.title" required />
          <p class="msg-errors" v-if="errors.title">{{ errors.title }}</p>
        </div>
        <div class="form-group">
          <label for="content">Nội dung bài viết</label>
          <textarea id="content" v-model="form.content" rows="6" required></textarea>
          <p class="msg-errors" v-if="errors.content">{{ errors.content }}</p>
        </div>
        <div class="form-group">
          <label for="category">Chọn thể loại</label>
          <select id="category" v-model="form.category" required>
            <option value="">Chọn thể loại</option>
            <option value="Technology">Công nghệ</option>
            <option value="Health">Sức khỏe</option>
            <option value="Education">Giáo dục</option>
            <option value="Entertainment">Giải trí</option>
          </select>
          <p class="msg-errors" v-if="errors.category">{{ errors.category }}</p>
        </div>
        <button type="submit" class="submit-button">Đăng bài</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  import Header from "./Header.vue";
  export default {
    components: {
      Header,
    },
    name: "AddPost",
    data() {
      return {
        form: {
          title: "",
          content: "",
          category: "",
        },
        errors: {},
      };
    },
    methods: {
      async addPost() {
        if (!this.validatePost()) return;
        
        try {
            let userLogin = localStorage.getItem("userLogin");
            let item = {
                user_id: JSON.parse(userLogin)['id'],
                title: this.form.title,
                content : this.form.content,
                category : this.form.category
            }
          let result = await axios.post("http://localhost:3000/posts", item);
          if (result.status === 201) {
            Swal.fire({
              title: "Thành công!",
              text: "Bài viết đã được đăng thành công.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            setTimeout(() => {
              this.$router.push({ name: "Home" });
            }, 2000);
          }
        } catch (error) {
          Swal.fire({
            title: "Lỗi!",
            text: "Không thể đăng bài viết. Vui lòng thử lại.",
            icon: "error",
          });
          console.error(error);
        }
      },
      validatePost() {
        const errors = {};
        if (!this.form.title) {
          errors.title = "Tiêu đề là bắt buộc!";
        }
        if (!this.form.content) {
          errors.content = "Nội dung là bắt buộc!";
        }
        if (!this.form.category) {
          errors.category = "Thể loại là bắt buộc!";
        }
        this.errors = errors;
        return Object.keys(errors).length === 0;
      },
    },
  };
  </script>
  
  <style scoped>
  .add-post-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .add-post-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    font-weight: bold;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .msg-errors {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .submit-button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  </style>
  