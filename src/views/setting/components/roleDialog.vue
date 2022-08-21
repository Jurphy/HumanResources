<template>
  <el-dialog
    title="新增角色"
    width="50%"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
    >
      <el-form-item
        prop="name"
        label="角色"
      >
        <el-input />
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
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

    }
  }

}
</script>

<style>

</style>
