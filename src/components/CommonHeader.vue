<template>
  <header>
    <div class="left-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <h3 style="color: #ffffff">首頁</h3>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img :src="userImg" class="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>個人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CommonHeader',
  data () {
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  methods: {
    handleMenu () {
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.left-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }
}

.right-content {
  .userImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>