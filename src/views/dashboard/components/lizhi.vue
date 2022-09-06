<template>
  <!-- 弹出层 -->
  <el-dialog :visible="showDialog" title="离职申请" :before-close="handleClose">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      label-width="110px"
      :rules="rules"
    >
      <!--离职表单-->
      <el-form-item label="离职时间" prop="end_time">
        <el-date-picker
          v-model="ruleForm.end_time"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="离职原因" prop="reason" rule="[{required:true,message:'离职原因必填,trigger:'blur'}]">
        <el-input
          v-model="ruleForm.reason"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 8}"
          style="width: 70%;"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>

</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        exceptTime: '',
        reason: '',
        processKey: 'process_dimission', // 特定的审批
        processName: '离职'
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      this.$refs.ruleForm.resetFields()
      this.ruleForm = {
        exceptTime: '',
        reason: '',
        processKey: 'process_dimission', // 特定的审批
        processName: '离职'
      }
    },
    async btnOK() {
      await this.$refs.ruleForm.validate()
    }
  }
}
</script>

<style>

</style>
