<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end" align="middle">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api'
export default {
  props: {
    treeNode: {
      type: Object,
      default: () => ({})
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCommand(type) {
      // console.log(type)
      // type来区分点击的下拉选项
      // 点击添加子部门 弹出弹框
      if (type === 'add') {
      // 传递当前节点
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // 编辑部门
        this.$emit('editDept', this.treeNode)
      } else {
        // 删除部门
        this.$confirm('确认删除该部门吗？', '提示', { type: 'warning' }).then(async res => {
          await delDepartments(this.treeNode.id)
          this.$emit('refreshDept')
          this.$message.success('删除成功')
        })
      }
    }
  }
}
</script>

<style>

</style>
