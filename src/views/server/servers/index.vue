<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button icon="el-icon-refresh" @click="refreshContent()">刷新</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="openPopWindow()">增加服务器</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="drawer = true;drawerMessage = '增加服务器组'">增加服务器组</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="drawer = true;drawerMessage = '增加用户组'">增加用户组</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="drawer = true;drawerMessage = '增加用户认证'">增加用户认证</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 10px">
      <el-table-column
        align="center"
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        align="center"
        prop="uuid"
        label="服务器ID"
        width="210">
      </el-table-column>
      <el-table-column
        align="center"
        prop="serverName"
        label="服务器名"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ipAddress"
        label="IP 地址">
      </el-table-column>
      <el-table-column
        align="center"
        prop="group"
        label="所属服务器组">
      </el-table-column>
      <el-table-column
        align="center"
        prop="sshPort"
        width="90"
        label="SSH Port">
      </el-table-column>
      <el-table-column
        align="center"
        prop="systemType"
        width="120"
        label="系统类型">
      </el-table-column>
      <el-table-column
        align="center"
        prop="platform"
        width="90"
        label="平台">
      </el-table-column>
      <el-table-column
        align="center"
        prop="users"
        label="用户">
        <template slot-scope="scope">
          <el-tag
            v-for="(user,index) in scope.row.users"
            :key="index"
            disable-transitions
            style="margin: 0 2px 0 2px"
            @click="handleUserClick(user)"
          >{{ user }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
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
    <el-dialog :title='popWindowTitle + "服务器"' :visible.sync="popWindowVisible" :close-on-click-modal="false">
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePopWindow">取 消</el-button>
        <el-button type="primary" @click="submitPopWindow">确 定</el-button>
      </div>
    </el-dialog>
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
      popWindowVisible: false,
      popWindowTitle: '',
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
      this.openPopWindow(row.uuid)
      console.log(row.uuid)
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
    },
    openPopWindow(id) {
      if (id) {
        this.popWindowTitle = '修改'
      } else {
        this.popWindowTitle = '增加'
      }
      this.popWindowVisible = true
    },
    closePopWindow() {
      this.popWindowVisible = false
    },
    submitPopWindow() {
      alert('提交成功')
      this.closePopWindow()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

