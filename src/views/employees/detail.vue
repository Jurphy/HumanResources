<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录账户设置">
          <!-- 放置表单 -->
          <el-form ref="userIn" label-width="120px" style="margin-left: 120px; margin-top:30px" :model="userInfo" :rules="rules">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="userInfo.username" style="width:300px" />
            </el-form-item>
            <el-form-item label="密码:" prop="password2">
              <el-input v-model="userInfo.password2" style="width:300px" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情">
          <userInfo ref="userInfoRef" />
        </el-tab-pane>
        <el-tab-pane label="岗位信息">
          <jobInfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api'
import jobInfo from './components/job-info.vue'
import userInfo from './components/user-info.vue'
export default {
  components: {
    userInfo,
    jobInfo
  },
  data() {
    return {
      userInfo: {
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.getUserDetailById()
  },
  methods: {
    // 个人详情
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
      this.$refs.userInfoRef.userInfo = { ...this.userInfo }
    },
    // 岗位信息
    async updateUserInfo() {
      try {
        await this.$refs.userIn.validate()
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('更新成功')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
