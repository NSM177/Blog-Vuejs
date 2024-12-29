<template>
  <div class="update-data">
    <Header></Header>
    <h1>Cập nhật bài viết</h1>
    <form @submit.prevent="updateData">
      <div class="form-group">
        <label for="title">Tiêu đề:</label>
        <input type="text" id="title" v-model="formData.title" required />
      </div>
      <div class="form-group">
        <label for="category">Thể loại:</label>
        <input type="text" id="category" v-model="formData.category" required />
      </div>
      <div class="form-group">
        <label for="body">Nội dung:</label>
        <textarea id="body" v-model="formData.content" required></textarea>
      </div>
      <button type="submit" class="submit-btn">Cập nhật</button>
    </form>
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
      formData: {
        title: "",
        category: "",
        content: "",
      },
    };
  },
  async created() {
    const dataId = this.$route.params.id;
    try {
      let response = await axios.get(`http://localhost:3000/posts/${dataId}`);
      if (response.status === 200) {
        this.formData = response.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    }
  },
  methods: {
    async updateData() {
      try {
        await axios.put(`http://localhost:3000/posts/${this.$route.params.id}`, this.formData);
        alert("Cập nhật bài viết thành công.");
        this.$router.push("/"); // Chuyển hướng về trang chủ sau khi cập nhật thành công
      } catch (error) {
        console.error("Error updating data:", error);
        alert("Cập nhật không thành công. Vui lòng thử lại.");
      }
    },
  },
};
</script>

<style scoped>
.update-data {
  padding: 20px;
  font-family: "Poppins", sans-serif;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  resize: vertical;
  height: 100px;
}

.submit-btn {
  padding: 10px 15px;
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>
