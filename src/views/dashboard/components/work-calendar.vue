<template>
  <div>
    <el-row type="flex" justify="end" align="middle">
      <!-- @change="dateChange" -->
      <el-select v-model="currentYear" size="small" style="width: 120px" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;margin-left:10px" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <!-- data -->
      <template slot="dateCell" slot-scope="{ date }" class="content">
        <div class="date-content">
          <span class="text"> {{ date | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      return value.getDate()
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentMonth: 1, // 当前月份
      currentYear: 2022, // 当前年份
      currentDate: null,
      yearList: []
    }
  },
  mounted() {
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    // 数组长度为11
    this.yearList = Array.from(Array(11), (value, index) => {
      return this.currentYear - 5 + index
    })
    // console.log(this.currentYear)
    this.dateChange()
  },
  methods: {
    dateChange() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-${this.startDate.getDate()}`)
    },
    isWeek(data) {
      return data.getDay() === 0 || data.getDay() === 6
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>

