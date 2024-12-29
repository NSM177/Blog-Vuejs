<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="logo">
          <span>BrandName</span>
        </div>
        <nav>
          <ul class="nav-list">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/add-post">Thêm bài viết mới</router-link></li>
            <li class="welcome">Welcome: {{ userName }}</li>
            <li><a @click="Logout" class="logout-btn">Logout</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      userName: "",
    };
  },
  created() {
    let userLogin = localStorage.getItem("userLogin");
    this.userName = JSON.parse(userLogin)?.name || "Guest";
  },
  methods: {
    Logout() {
      localStorage.removeItem("userLogin");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.logo:hover {
  transform: scale(1.1);
  color: #ff4081;
}

.nav-list {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-list li {
  margin: 0 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  position: relative;
}

.nav-list a {
  text-decoration: none;
  color: #555;
  transition: color 0.3s ease-in-out;
}

.nav-list a:hover {
  color: #ff4081;
}

.nav-list a::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: #ff4081;
  left: 0;
  bottom: -5px;
  transition: width 0.3s ease-in-out;
}

.nav-list a:hover::after {
  width: 100%;
}

.welcome {
  font-size: 14px;
  color: #333;
  font-style: italic;
  margin-left: 15px;
}

.logout-btn {
  color: #ff4081;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
}

.logout-btn:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .nav-list {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .nav-list li {
    margin: 5px 0;
  }
}
</style>
