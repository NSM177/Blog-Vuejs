<script setup>
import router from './router';


</script>

<template>
  <router-view>

  </router-view>
</template>

<style scoped>
/* Đặt font chữ mặc định và margin/padding */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

/* Định nghĩa kiểu chung cho các thẻ tiêu đề */
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: bold;
  color: #444;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.75rem;
}

h3 {
  font-size: 1.5rem;
}

/* Kiểu chung cho các đoạn văn */
p {
  margin: 0 0 1rem;
  line-height: 1.8;
}

/* Đặt kiểu chung cho các liên kết */
a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Định nghĩa kiểu cho nút */
button {
  display: inline-block;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

/* Kiểu chung cho form */
form {
  margin: 20px 0;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

input:focus, textarea:focus, select:focus {
  border-color: #007bff;
  outline: none;
}

/* Layout container */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Định nghĩa flex layout */
.flex {
  display: flex;
  gap: 15px;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-column {
  flex-direction: column;
}

/* Kiểu cho tiêu đề trang */
.page-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #555;
}

/* Footer */
footer {
  text-align: center;
  padding: 10px;
  background-color: #333;
  color: white;
  margin-top: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  .container {
    width: 100%;
  }

  .flex {
    flex-direction: column;
  }
}

</style>
