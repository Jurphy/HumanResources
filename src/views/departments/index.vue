<template>
  <div class="departments-container">
    <el-card>
      <treeTools :tree-node="company" :is-root="isRoot=false" @addDept="addDept" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <treeTools slot-scope="{data}" :tree-node="data" @addDept="addDept" />
    </el-tree>
    <addDept :dialog-visible.sync="dialogVisible" :tree-node="currentNode" @refreshDept="getDepartments" />
  </div>
</template>

<script>
import { getDepartments } from '@/api'
import treeTools from './components/tree-tools'
import addDept from './components/add-dept.vue'
import { tranListToTreeData } from '@/utils/index'
export default {
  name: 'Hrsaas1Index',
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      defaultProps: {
        label: 'name'// 表示 从这个属性显示内容
      },
      departs: [],
      company: { },
      dialogVisible: false,
      currentNode: {}

    }
  },

  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const { depts, companyManage, companyName } = await getDepartments()
      // console.log(res)
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage || '负责人', id: '' }
    },
    addDept(node) {
      this.currentNode = node
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" >
  .departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree-node__content {
    padding-right: 20px;
  }
}
</style>
