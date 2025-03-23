<template>
  <div id="app">
    <div class="main">
      <aside :class="['sidebar', { collapsed: isCollapsed }]">
        <div class="sidebar-header">
          <h2 v-if="!isCollapsed">Hanyu</h2>
          <div @click="toggleSidebar" class="toggle-button">
            <i class="fas fa-align-justify scale-1_1"></i>
            <!-- Biểu tượng Font Awesome -->
          </div>
        </div>
        <ul class="menu-items">
          <li v-for="item in menuItems" :key="item.id" class="menu-item" :class="{ active: activeTab.id === item.id }"
            @click="changeActiveTab(item)">
            <i class="menu-icon fas" :class="item.icon"></i>
            <!-- Thay đổi biểu tượng cho mỗi item nếu cần -->
            <span class="menu-text" v-if="!isCollapsed">{{ item.name }}</span>
          </li>
        </ul>
      </aside>
      <main class="main-content">
        <header class="header">
          <h2>{{ activeTab.name }}</h2>
        </header>
        <div class="content">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>


<script>
import { ref, getCurrentInstance } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "@/router";

export default {
  name: "App",
  setup() {
    const { proxy } = getCurrentInstance();
    const isCollapsed = ref(false);
    const menuItems = ref([
      { id: 1, name: "Phiên âm", icon: "fas fa-folder", path: "/pinyin" },
      { id: 2, name: "Bộ thủ", icon: "fas fa-align-justify", path: "/radicals" },
    ]);

    const activeTab = ref(menuItems.value[0]); // Khởi động với tab đầu tiên

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const changeActiveTab = (tab) => {
      activeTab.value = tab;
      router.push({ path: tab.path });
    };

    return {
      isCollapsed,
      menuItems,
      activeTab,
      toggleSidebar,
      changeActiveTab,
    };
  },
};
</script>

<style scoped>
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
  flex: 1;
  padding: 12px;
  background-color: #fff;
  overflow-y: auto;
  /* Enable vertical scrolling if necessary */
}
</style>