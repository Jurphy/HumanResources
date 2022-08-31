<template>
  <el-dialog
    :title="`${formData.id ? '修改' : '新增'}权限`"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form ref="perForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width:90%" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width:90%" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="formData.description" style="width:90%" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="开启" prop="enVisible">
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button v-loading="loading" size="small" type="primary" @click="addSure">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addPermission, updatePermission } from '@/api'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '权限名称必填' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '权限标识必填' }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.perForm.resetFields()
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
    },
    async addSure() {
      try {
        this.$refs.perForm.validate()
        this.loading = true
        this.formData.id ? await updatePermission(this.formData) : await addPermission(this.formData)
        this.handleClose()
        this.$parent.getPermissionList()
        this.$message.success(`${this.formData.id ? ' 修改 ' : '新增'} 成功`)
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
