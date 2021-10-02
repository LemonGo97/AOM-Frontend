<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button icon="el-icon-refresh" @click="refreshContent()">刷新</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="drawer = true;drawerMessage = '增加服务器组'">增加服务器组</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 10px">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        prop="uuid"
        label="服务器组ID"
        width="210">
      </el-table-column>
      <el-table-column
        prop="serverName"
        label="服务器组名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间">
      </el-table-column>
      <el-table-column
        prop="operator"
        label="操作人">
      </el-table-column>
      <el-table-column
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100, 200, 300, 400]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-drawer
      title="添加"
      :visible.sync="drawer"
      :direction="direction">
      <span>{{ drawerMessage }}</span>
    </el-drawer>
  </div>
</template>

<script>
import { getList } from '@/api/servers'

export default {
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      total: 0,
      drawer: false,
      direction: 'rtl',
      drawerMessage: '',
      currentPage: 1
    }
  },
  created() {
    this.refreshContent()
  },
  methods: {
    refreshContent() {
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.tableData = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.tableData.pop()
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleUserClick(row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

