<template>
  <el-dialog
    :title="`${roleForm.id ? '修改':'新增'}角色`"
    width="50%"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="roleForm"
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{required:true,message: '角色必填', trigger: 'blur'}]"
      >
        <el-input v-model="roleForm.name" placeholder="请输入角色" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="roleForm.description" type="textarea" row="3" placeholder="请输入描述" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="submitRole">确 定</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { addRole, updateRole } from '@/api'
export default {
  name: 'HrsaasRoleDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      loading: false

    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      // resetFields 重置这个表单
      this.$refs.roleDialogForm.resetFields()
      this.roleForm = {
        name: '',
        description: ''
      }
    },
    async submitRole() {
      try {
        // 验证表单
        await this.$refs.roleDialogForm.validate()
        // 新增角色接口
        this.loading = true
        this.roleForm.id ? await updateRole(this.roleForm) : await addRole(this.roleForm)
        // 调用父组件里的获取角色列表的方法
        this.$parent.getRoleList()
        // 提示新增成功
        this.$message.success(`${this.roleForm.id ? '修改' : '新增'}角色成功`)
        // 关闭弹窗
        this.handleClose()
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }

  }

}
</script>

<style>

</style>
