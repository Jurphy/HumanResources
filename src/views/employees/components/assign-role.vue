<template>
  <el-dialog
    title="分配角色"
    :visible="value"
    :before-close="handleClose"
  >
    <!-- {{ this.$attrs }} -->
    <!-- 复选框checkbox的用法 -->
    <!-- <Mytest v-bind="$attrs" v-on="$listeners" /> -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="updateRole">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRole, getUserDetailById, assignRoles } from '@/api'
// import Mytest from './test.vue'
export default {
  name: 'HrsaasAssignRole',
  components: {
    // Mytest
  },
  // 在使用$attrs不让子组件传递过来的值显示在结构上
  inheritAttrs: false,
  props: {
    // 用v-model绑定时传递过来的props只能是value
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleIds: [],
      roleList: [],
      loading: false
    }
  },
  watch: {
    // 监听value，当value为true时调用接口
    value(val) {
      if (val) {
        this.getUserDetailById()
        this.roleIds = []
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    // 获取角色列表
    async getRoleList() {
      const { rows } = await getRole()
      this.roleList = rows
    },
    // 获取用户信息
    async getUserDetailById() {
      const { roleIds } = await getUserDetailById(this.$attrs['current-user-id'])
      this.roleIds = roleIds
    //   console.log(res)
    },
    // 修改更新角色
    async updateRole() {
      this.loading = true
      try {
        await assignRoles({ id: this.$attrs['current-user-id'], roleIds: this.roleIds })
        this.handleClose()
        this.$message.success('更新成功')
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style></style>
