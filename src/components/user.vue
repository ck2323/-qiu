<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 栅格布局搜索栏 -->
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            @keyup.native.enter="search"
            v-model="sendData.query"
            class="input-with-select"
          >
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <!-- 添加按钮 -->
          <el-button type="success" plain @click="dialogFormVisible=true">添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="current">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(current.$index, current.row,current.column,current.store)"
            plain
            size="mini"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        :model="addFrom"
        label-position="right"
        label-width="80px"
        class="my-from"
        :rules="rules"
        ref="addFrom"
      > 
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFrom.username"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="password">
          <el-input v-model="addFrom.password" autocomplete="off" type='password'></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFrom.email"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addFrom.mobile"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addFrom')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 邮箱验证
    var checkEmail = (rule, value, callback) => {
       if (value != "") {
      setTimeout(() => {
        // 邮箱验证正则表达式
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (reg.test(value)) {
          // 匹配就通过
          callback();
        } else {
          // 不匹配就给提示
          callback(new Error("请输入正确的邮箱"));
        }
      }, 1000)
      }else {
        callback();
      }
    };
    var checkMobile = (rule, value, callback) => {
      if (value != "") {
        setTimeout(() => {
          // 手机验证正则表达式
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
          if (reg.test(value)) {
            // 匹配就通过
            callback();
          } else {
            // 不匹配就给提示
            callback(new Error("请输入正确的手机号"));
          }
        }, 1000);
      } else {
        callback();
      }
    };

    return {
      // 提交的数据
      sendData: {
        query: "",
        pagenum: "1",
        pagesize: "10"
      },
      // table数据
      tableData: [],
      dialogFormVisible: false,
      addFrom: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      }
    };
  },
  // 方法
  methods: {
    handleEdit(index, row, column, store) {
      console.log(index);
      console.log(row);
      console.log(column);
      console.log(store);
    },
    // 查询数据
    async search() {
      let res = await this.$http.get("users", {
        headers: {
          Authorization: window.sessionStorage.getItem("token")
        },
        params: this.sendData
      });
      // 数据赋值
      this.tableData = res.data.data.users;
    },
    // 表单验证
  submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 数据正确
          // 提交数据即可
          let res = await this.$http.post("users", this.addFrom, {
               headers: {
          Authorization: window.sessionStorage.getItem("token")
        },
          });
          console.log(res);
          // 重新获取数据(局部刷新)
          if (res.data.meta.status == 201) {
            // 弹框收起来
            
            // 收起框框
            this.dialogFormVisible = false;
            this.search();
          }
        } else {
          // 数据错误
          this.$message.warning("请正确输入数据");
          return false;
        }
      });
    },
  },
  // 数据获取
  created() {
    // let res = await this.$http.get('users',this.sendData);
    this.search();
  }
};
</script>

<style>
.el-breadcrumb.my-breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}

.my-from {
  padding: 0;
  height: auto;
}
</style>
