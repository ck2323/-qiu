<template>
  <el-container class="index-container">
    <!-- 头部区域 -->
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="16" class="index-center">
          <div class="grid-content bg-purple">电商后台管理系统</div>
        </el-col>
        <el-col :span="4" class="index-right">
          <div class="grid-content bg-purple">
            <el-button type="danger" @click="tuichu">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 内容区域 -->
    <el-container class="index-contaner">
      <el-aside width="200px" class="idnex-aside">
        <el-menu
        router
      default-active="2"
      class="el-menu-vertical-demo"
   >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户列表</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="user" class="el-icon-menu">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
      </el-aside>
      <el-main class="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  // beforeCreate() {
  //   if (sessionStorage.getItem("token")) {
  //   } else {
  //     // 阻止访问
  //     this.$message.warning("兄弟,你还是先登陆吧");
  //     //    页面强制返回到登陆页,利用编程式导航,并且页面停留1秒
  //     setTimeout(() => {
  //       this.$router.push("login");
  //     }, 1000);
  //   }
  // },

  // 因为添加了导航守卫  所以可以直接去掉以上代码
  methods: {
    tuichu() {
      this.$confirm("你确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  如果确定退出,那么就删除token
          window.sessionStorage.removeItem("token");
          // 返回登录页
          this.$router.push("/login");
        })
        .catch(() => {

        });
    }
  }
};
</script>
<style>
.index-container {
  height: 100%;
}
.index-header {
  height: 60px;
  background-color: #b3c0b1;
  line-height: 60px;
}

.index-center {
  text-align: center;
  font-weight: 700;
  color: aliceblue;
  font-size: 25px;
}

.index-right {
  text-align: right;
}

.index-aside {
  background-color: #fff;
}

.index-main {
  background-color:#eeeeff;
}
</style>
