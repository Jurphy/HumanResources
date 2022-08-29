<template>
  <div class="app-container">
    <PageTools>
      <span slot="before">共{{ total }}条记录</span>
      <template slot="after">
        <el-button size="small" type="warning" @click="$router.push('/import?type=user')">导入</el-button>
        <el-button size="small" type="danger" @click="exportData">导出</el-button>
        <el-button size="small" type="primary" @click="handleAdd">新增员工</el-button>
      </template>
    </PageTools>
    <el-card>
      <el-table v-loading="loading" border :data="employeeList">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="头像" prop="username">
          <template slot-scope="{row}">
            <img
              v-imgerror="require('@/assets/common/bigUserHeader.png')"
              :src="row.staffPhoto"
              alt=""
              style="border-radius: 50%; width: 100px; height: 100px; padding: 10px;"
              @click="showCodeDialog(row.staffPhoto)"
            >
          </template>
        </el-table-column>
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="scope">
            {{ scope.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{row}">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="delemploy(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination v-if="total > 0" background="" layout="total,prev, pager, next,sizes" :current-page.sync="page.page" :page-size.sync="page.size" :page-sizes="[5,10,20,30,]" :total="total" @current-change="getEmployeeList" @size-change="getEmployeeList" />
      </el-row>
    </el-card>
    <addEmployee :visible-dialog.sync="visibleDialog" @refreshemployess="getEmployeeList" />
    <!-- .sync 会解析成  :visible-dialog="visibleDialog" 和 @update:visibleDialog="把子组件传递过来的值 赋值给visibleDialog"-->
    <el-dialog title="二维码" :visible.sync="erCodeDialog" custom-class="canvaseq">
      <canvas id="canvas" />
    </el-dialog>

  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api'
import addEmployee from './components/add-employee'
import { formatDate } from '@/filters'
// 引入员工的枚举常量
import Employees from '@/api/constant/employees'
import QrCode from 'qrcode'
export default {
  name: 'Hrsaas1Index',
  components: {
    addEmployee
  },

  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      employeeList: [],
      total: 0,
      loading: false,
      visibleDialog: false,
      erCodeDialog: false

    }
  },

  mounted() {
    this.getEmployeeList()
  },

  methods: {
    // 获取员工列表
    async getEmployeeList() {
      try {
        this.loading = true
        const res = await getEmployeeList(this.page)
        this.employeeList = res.rows
        this.total = res.total
        // 如果返回的数据total总数不等于0 ，就是有数据，把真正没有数据的情况去掉
        // 进行接口请求
        if (res.total !== 0 && res.rows.length === 0) {
          // 请求前一页
          this.page.page = this.page.page - 1
          this.getEmployeeList()
        }
        console.log(res)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    // 对聘用形式的文本进行处理
    formatterFn(row, column, cellValue, index) {
      const obj = Employees.hireType.find(ele => ele.id === cellValue * 1)
      // return obj ? obj.value : '未知'
      // 三元表达式的另一种写法
      return obj?.value ?? '未知'
    },
    // 打开弹框
    handleAdd() {
      this.visibleDialog = true
    },
    async delemploy(id) {
      try {
        await this.$confirm('确认删除吗？', '提示', { type: 'warning' })
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeeList()
      } catch (e) {
        console.log(e)
      }
    },
    async exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        // 1、获取需要导出的数据
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        // 2、调用自己封装的方法进行数据的转化
        const data = this.fromJson(headers, rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '']]
        const merges = ['A1:A2', 'B1:G1']

        // 将后端放回的数据 转换成 到出excel写入的数据
        // [{correctionTime: "2018-11-30", departmentName: "总裁办",formOfEmployment: "1",mobile: "13800000002",timeOfEntry: "2018-11-02",username: "管理员"}]
        // [['张三', '13800000002', '2018-11-02', '1', '2018-11-30', ....]]

        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头数组 -> ['姓名', '手机号', '入职日期', '聘用形式', ....]
          data, // [['13399999', '张三', '2020-2020-2020', '2020', '79119'],[],[],[],[],[],[]]
          filename: '员工信息表',
          autoWidth: true,
          bookType: 'xlsx',
          multiHeader, // 复杂表头
          merges // 合并选项
        })
      })
    },
    fromJson(headers, rows) {
      const result = rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // 格式化日期 -> 已经定义过过滤器直接使用即可
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            // 需要引入EmployeeEnum常量进行处理
            const obj = Employees.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
      return result
    },
    async showCodeDialog(staffPhoto) {
      if (!staffPhoto) return this.$$message.console.error('该用户还没有设置头像')
      this.erCodeDialog = true
      await this.$nextTick()
      const dom = document.querySelector('#canvas')
      QrCode.toCanvas(dom, staffPhoto)
    }

  }
}
</script>

<style lang="scss">
.canvaseq .el-dialog__body {
  text-align: center;
}
</style>
