<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools :show-page="false">
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPer('0', 1)">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table v-loading="loading" border :data="permissionList" row-key="id" default-expand-all>
        <el-table-column label="序号" type="index" width="100px" />
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button v-if="row.type*1 ===1" type="text" icon="el-icon-circle-plus-outline" @click="addPer(row.id, 2)">添加</el-button>
            <el-button type="text" icon="el-icon-edit" @click="edit(row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" style="color:#f56c6c" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <AddPermission ref="addPermission" :dialog-visible.sync="dialogVisible" />
  </div>
</template>
<script>
import { getPermissionList, delPermission } from '@/api'
import { tranListToTreeData } from '@/utils/index'
import AddPermission from './components/add-permission.vue'
export default {
  name: 'Hrsaas1Index',
  components: {
    AddPermission
  },

  data() {
    return {
      permissionList: [],
      loading: false,
      dialogVisible: false
    }
  },

  mounted() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      try {
        this.loading = false
        this.permissionList = await getPermissionList()
        this.permissionList = tranListToTreeData(this.permissionList, '0')
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    async del(id) {
      try {
        await this.$confirm('确认删除吗？', '提示', { type: 'warning' })
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (e) {
        console.log(e)
      }
    },
    addPer(pid, type) {
      this.dialogVisible = true
      this.$refs.addPermission.formData.pid = pid
      this.$refs.addPermission.formData.type = type
    },
    edit(row) {
      this.$refs.addPermission.formData = { ...row }
      this.dialogVisible = true
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
