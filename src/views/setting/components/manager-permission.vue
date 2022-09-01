<template>
  <el-dialog
    title="分配权限"
    :visible="dialogVisible"
    :before-close="handleClose"
  >
    <!-- show-checkbox        节点是否可被选择 checkbox 出现
    default-expand-all   默认展开
    props                配置选项
    default-checked-keys 默认选中的节点
    check-strictly       父子不联动 -->
    <el-tree
      ref="permTree"
      :data="permData"
      :props="defaultProps"
      show-checkbox
      :default-expand-all="true"
      :default-checked-keys="selectCheck"
      node-key="id"
      :check-strictly="true"
    />
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="Sure">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPermissionList, getRoleDetail, assignPerm } from '@/api'
import { tranListToTreeData } from '@/utils/index'
export default {
  name: 'HrsaasManagerPermission',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permData: [],
      defaultProps: {
        label: 'name'
      },
      selectCheck: [],
      loading: false,
      userId: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.selectCheck = []
    },
    async getPermissionList(id) {
      try {
        this.userId = id
        this.permData = await getPermissionList()
        this.permData = tranListToTreeData(this.permData, '0')
        const { permIds } = await getRoleDetail(id)
        this.selectCheck = permIds

        // console.log(res)
        // console.log(this.permData)
      } catch (e) {
        console.log(e)
      }
    },
    async Sure() {
      try {
        this.loading = true
        const res = await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.userId })
        this.$message.success('角色权限成功')
        this.handleClose()
        console.log(res)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }

  }
}
</script>
