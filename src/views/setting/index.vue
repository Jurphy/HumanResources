<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <!-- 角色管理 -->
      <el-tab-pane label="角色管理" name="first">
        <!-- 新增角色按钮 -->
        <el-row style="height:60px">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="addRole"
          >新增角色</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table
          v-loading="loading"
          border
          :data="list"
          stripe
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100"
          />
          <el-table-column
            prop="name"
            label="角色名称"
            width="200"
          />
          <el-table-column
            prop="description"
            label="描述"
          />
          <el-table-column
            label="操作"
            width="310"
          >
            <template slot-scope="scope">
              <el-button type="success" size="medium">分配权限</el-button>
              <el-button type="primary" size="medium" @click="edit(scope.row)">编辑</el-button>
              <el-button type="danger" size="medium" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- // background   添加背景
          // current-page 当前的页面
          // page-size    每一页展示的条数
          // page-sizes   每页显示个数选择器的选项设置
          // total        总共多少条数据
          // layout       布局
          // current-change 改变当前页码的触发（current-page 值改变的时候触发）
          // size-change 改变页面的数据条数的时候 触发（page-size 值改变的时候触发） -->
        <el-row type="flex" justify="end" align="middle" style="height:60px">
          <el-pagination
            v-if="total>0"
            background
            :current-page.sync="page.page"
            layout="total,prev, pager, next,sizes"
            :page-size.sync="page.pagesize"
            :page-sizes="[5,10,20,30,40]"
            :total="total"
            @size-change="changeSize"
            @current-change="changePage"
          />
        </el-row>
      </el-tab-pane>
      <!-- 公司信息 -->
      <el-tab-pane label="公司信息" name="second">
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
        />
        <el-form label-width="120px" style="margin-top:50px">
          <el-form-item label="公司名称">
            <el-input v-model="formData.name" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="formData.companyAddress" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.mailbox" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
          </el-form-item>
        </el-form>

      </el-tab-pane>
    </el-tabs>
    <!-- 添加角色的弹框 -->
    <roleDialog ref="roleDialog" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getRole, deleteRole, getCompanyInfo } from '@/api'
import roleDialog from './components/roleDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'Hrsaas1Index',
  components: {
    roleDialog
  },
  data() {
    return {
      activeName: 'second',
      // 放置页码及相关数据
      page: {
        page: 1,
        pagesize: 10
      },
      // 表格数组
      list: [],
      total: 0, // 总条数
      loading: false,
      dialogVisible: false,
      formData: {}

    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },

  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },

  methods: {
    // 获取角色列表
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRole(this.page)
        this.list = rows
        this.total = total
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    changeSize() {
      this.getRoleList()
    },
    changePage() {
      this.getRoleList()
    },
    // 添加角色
    addRole() {
      this.dialogVisible = true
    },
    // 编辑角色
    edit(row) {
      this.dialogVisible = true
      // 浅拷贝 就不会修改表单数据{ ...row }
      this.$refs.roleDialog.roleForm = { ...row }
    },
    // 删除信息
    async del(id) {
      try {
        await this.$confirm('是否确认删除该角色', '提示', { type: 'warning' })
        // 删除接口
        await deleteRole(id)
        this.$message.success('角色删除成功')
        // 删除成功后回到第一页
        this.page.page = 1
        this.getRoleList()
        // console.log(222)
      } catch (e) {
        console.log(e)
      }
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
