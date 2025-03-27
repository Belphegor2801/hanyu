<template>
  <div id="app">
    <div class="main">
      <div :class="['sidebar', { collapsed: isCollapsed }]">
        <div class="sidebar-header">
          <h2 class="sidebar-title">
            {{ isInPhone ? activeTab.name : "Hanyu" }}
          </h2>
          <div @click="toggleSidebar" class="toggle-button">
            <i class="fas fa-align-justify scale-1_1"></i>
            <!-- Biểu tượng Font Awesome -->
          </div>
        </div>
        <ul class="menu-items">
          <li
            v-for="item in menuItems"
            :key="item.id"
            class="menu-item"
            :class="{ active: activeTab.id === item.id }"
            @click="changeActiveTab(item)"
          >
            <i class="menu-icon fas" :class="item.icon"></i>
            <!-- Thay đổi biểu tượng cho mỗi item nếu cần -->
            <span class="menu-text" v-if="!isCollapsed">{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <main class="main-content">
        <header class="header" v-if="!isInPhone">
          <h2>{{ activeTab.name }}</h2>
        </header>
        <div class="content">
          <router-view></router-view>
        </div>
      </main>
    </div>

    <div id="h-loader" class="h-loader">
      <div class="overlay"></div>
      <div class="loader"></div>
    </div>
  </div>
</template>


<script>
import { ref, getCurrentInstance, onMounted, computed } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "@/router";

export default {
  name: "App",
  setup() {
    const { proxy } = getCurrentInstance();
    const isCollapsed = ref(true);
    const isInPhone = ref(window.innerWidth < 768);
    const menuItems = ref([
      {
        id: 1,
        name: "Phiên âm",
        icon: "fas fa-headphones",
        path: "/hanyu/pinyin",
      },
      {
        id: 2,
        name: "Bộ thủ",
        icon: "fas fa-folder",
        path: "/hanyu/radicals",
      },
      {
        id: 3,
        name: "Ôn tập",
        icon: "fas fa-cube",
        path: "/hanyu/revision",
      },
    ]);

    const activeTab = ref(menuItems.value[0]); // Khởi động với tab đầu tiên

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const changeActiveTab = (tab) => {
      activeTab.value = tab;
      router.push({ path: tab.path });
      if (isInPhone.value) {
        isCollapsed.value = true;
      }
    };

    const updateIsInPhone = () => {
      isInPhone.value = window.innerWidth < 768;
    };

    onMounted(() => {
      window.addEventListener("resize", updateIsInPhone);
    });

    return {
      isInPhone,
      isCollapsed,
      menuItems,
      activeTab,
      toggleSidebar,
      changeActiveTab,
    };
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main {
  display: flex;
  flex: 1;
}

.ml-04 {
  margin-left: 4px;
}

.sidebar {
  background-color: #050412;
  /* Dark color */
  width: 200px;
  height: 100%;
  transition: width 0.3s;
}

.toggle-button {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.sidebar.collapsed {
  width: 50px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 56px;
  color: #fff;
}

.sidebar.collapsed .sidebar-header {
  padding: 13px;
}

.sidebar.collapsed .sidebar-title {
  display: none;
}

.menu-items {
  list-style: none;
  padding: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  color: white;
  height: 40px;
  cursor: pointer;
  position: relative;
  padding: 10px;
}

.menu-icon {
  width: 24px;
}

.sidebar.collapsed .menu-item {
  padding: 13px;
}

.menu-text {
  margin-left: 6px;
  font-size: 17px;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.3);
  /* Background color for active item */
}

.menu-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: rgba(16, 173, 79, 1);
  /* Active item color */
}

.main-content {
  flex: 1;
  background-color: #fff;
  overflow: hidden;
  /* Prevent overflow */
  max-height: calc(100vh - 12px) !important;
}

.header {
  background-color: white;
  /* White background */
  color: black;
  border-bottom: 2px solid #ccc;
  /* Bottom border for header */
  padding: 10px 16px;
  text-align: left;
  height: 56px;
  font-size: 20px;
}

.content {
  position: relative;
  flex: 1;
  padding: 12px;
  background-color: #fff;
  overflow-y: auto;
}

/* Media Queries for smaller screens */
@media (max-width: 768px) {
  .main {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .sidebar.collapsed {
    width: 100%;
    height: 56px;
  }

  .sidebar.collapsed .sidebar-title {
    display: flex;
    position: relative;
  }

  .sidebar.collapsed .menu-items {
    display: none;
  }

  .sidebar {
    position: absolute;
    top: 0;
    width: 100vh;
    z-index: 99999;
  }

  .main-content {
    margin-top: 56px;
    max-height: calc(100vh - 56px) !important;
  }
}

.h-loader {
  display: none;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); /* Màu đen mờ */
    z-index: 11111111; /* Đặt lên trên các phần tử khác */
  }

  .loader {
    border: 8px solid rgba(255, 255, 255, 0.1);
    border-left-color: #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>