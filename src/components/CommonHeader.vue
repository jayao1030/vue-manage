<template>
  <header>
    <div class="left-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          class="breadLink"
        >{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
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
import { mapState } from 'vuex'
export default {
  name: 'CommonHeader',
  data () {
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
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

.breadLink /deep/ .el-breadcrumb__inner {
  color: #999;
}
.breadLink:last-child /deep/ .el-breadcrumb__inner {
  color: #fff;
}
</style>