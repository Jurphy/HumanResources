<template>
  <div class="table-box">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
        highlight-current-row
      />

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    tableData: []
  }

}
</script>

<style>

</style>
