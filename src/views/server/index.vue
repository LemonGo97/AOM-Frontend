<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button icon="el-icon-refresh" @click="refreshContent()">刷新</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="openPopWindow()">增加服务器</el-button>
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
        prop="name"
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
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间">
      </el-table-column>
      <el-table-column
        prop="operator.username"
        label="操作人">
      </el-table-column>
      <el-table-column
        align="center"
        width="220"
        label="操作">
        <template slot-scope="scope">
          <el-button
            style="margin-right: 3px"
            size="mini"
            @click="openConnectDialogVisible(scope.row)">连接
          </el-button>

          <el-button
            style="margin-left: 3px;margin-right: 3px"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>

          <el-popconfirm
            style="margin-left: 3px"
            title="确定删除此服务器？"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
              size="mini"
              type="danger"
              slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100, 200, 300, 400]"
      :page-size="20"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog
      :title='"连接到服务器: " + currentRow.ipAddress'
      :visible.sync="connectDialogVisible"
      @close="closeConnectDialogVisible(uuid)"
      width="30%"
      center>
      <span>请选择连接方式：</span>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="currentRow.sshEnable" @click="handleConnectDialogVisible(currentRow, 'ssh')">SSH</el-button>
        <el-button :disabled="currentRow.telnetEnable" @click="handleConnectDialogVisible(currentRow, 'telnet')">Telnet</el-button>
        <el-button :disabled="currentRow.sshEnable" @click="handleConnectDialogVisible(currentRow, 'sftp')">Sftp</el-button>
      </span>
    </el-dialog>
    <server-form-dialog v-if="popWindowVisible" :uuid="uuid" :visible.sync="popWindowVisible" @closePopWindow="closePopWindow"></server-form-dialog>
  </div>
</template>

<script>
import { getList, remove } from '@/api/servers'
import ServerFormDialog from '@/views/server/dialog/serverFormDialog'
export default {
  components: { ServerFormDialog },
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      total: 0,
      popWindowVisible: false,
      connectDialogVisible: false,
      currentPage: 1,
      uuid: undefined,
      currentRow: {}
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
        this.tableData = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    openConnectDialogVisible(row) {
      console.log('open', row)
      if (!(row.sshEnable || row.telnetEnable)) {
        this.$notify.error({
          title: '错误',
          message: '未开启相关的连接方式！'
        })
        return
      }
      this.currentRow = row
      this.connectDialogVisible = true
    },
    handleConnectDialogVisible(row, type) {
      console.log('handle', type, row)
      this.closeConnectDialogVisible(row)
    },
    closeConnectDialogVisible(row) {
      this.currentRow = ''
      console.log('close', row)
      this.connectDialogVisible = false
    },
    handleEdit(index, row) {
      this.openPopWindow(row.uuid)
    },
    handleDelete(index, row) {
      remove(row.uuid).then(response => {
        this.refreshContent()
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    openPopWindow(uuid) {
      this.uuid = uuid
      this.popWindowVisible = true
    },
    closePopWindow() {
      this.uuid = ''
      this.popWindowVisible = false
      this.refreshContent()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

