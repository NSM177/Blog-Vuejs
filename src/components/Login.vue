<template>
  <div class="signup-container">
    <h1>Login</h1>
    <form @submit.prevent="Login">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Enter your email"
          required
        />
        <p class="msg-error" v-if="errors.email">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          placeholder="Enter your password"
          required
        />
        <p class="msg-error" v-if="errors.password">{{ errors.password }}</p>
      </div>
      <p class="msg-error">{{ msgError }}</p>
      <button type="submit">Login</button>
    </form>
    <div class="signup-link">
      <p>Chưa có tài khoản? <a @click="goToSignup">Đăng ký ngay</a></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      msgError: "",
      errors: {},
    };
  },
  methods: {
    async Login() {
      if (this.validateUser()) {
        try {
          const result = await axios.get("http://localhost:3000/user");
          if (result.status === 200 && result.data.length > 0) {
            const user = result.data.find(
              (item) =>
                item.email === this.form.email &&
                item.password === this.form.password
            );
            if (user) {
              localStorage.setItem("userLogin", JSON.stringify(user));
              this.$router.push({ name: "Home" }); 
            } else {
              this.msgError = "Email hoặc mật khẩu không đúng!";
            }
          }
        } catch (error) {
          console.error("Lỗi khi kết nối API:", error);
          this.msgError = "Không thể kết nối đến server!";
        }
      }
    },
    validateUser() {
      const errors = {};

      if (!this.form.email) {
        errors.email = "Email không được để trống!";
      } else if (!this.validateEmail(this.form.email)) {
        errors.email = "Email không hợp lệ!";
      }

      if (!this.form.password) {
        errors.password = "Mật khẩu không được để trống!";
      }

      this.errors = errors;

      return Object.keys(errors).length === 0;
    },
    validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    },
    goToSignup() {
      this.$router.push({ name: "SignUp" });
    
    },
  },
};
</script>

<style scoped>
.signup-container {
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.signup-link {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
}

.signup-link a:hover {
  text-decoration: underline;
}

.msg-error {
  color: red;
  font-size: 13px;
  margin-top: 5px;
}
</style>
