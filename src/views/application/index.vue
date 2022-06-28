<template>
  <div class="app-container">
    <div class="jumbotron">
      <h1><svg-icon :icon-class="currentDB.toLowerCase()" />&nbsp;&nbsp;{{ currentDB }}</h1>
      <p>{{ info.description }}</p>
      <p v-if="info.downloadUrl">下载地址：<a :href="info.downloadUrl" target="_blank">{{ info.downloadUrl }}</a></p>
    </div>
    <div class="filter-container" style="margin-top: 10px">
      <el-button icon="el-icon-refresh" @click="refreshContent()">刷新</el-button>
      <el-button icon="el-icon-upload" @click="refreshContent()">上传安装包</el-button>
      <el-button icon="el-icon-upload" @click="showLog()">查看更新日志</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 10px">
      <el-table-column
        align="center"
        prop="packageName"
        label="安装包名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="version"
        label="版本号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="systemType"
        label="系统类型">
      </el-table-column>
      <el-table-column
        align="center"
        prop="platform"
        label="平台">
      </el-table-column>
      <el-table-column
        align="center"
        prop="updateTime"
        label="软件更新时间"
        width="160"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
<!--          <el-button-->
<!--            style="margin-right: 3px"-->
<!--            size="mini"-->
<!--            :disabled="!scope.row.changeLog"-->
<!--            @click="showLog(scope.row)">更新日志-->
<!--          </el-button>-->
          <el-button
            style="margin-right: 3px"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">下载
          </el-button>
          <el-button
            style="margin-right: 3px"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">安装
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100, 200, 300, 400]"
      :page-size="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
    <server-form-dialog v-if="popWindowVisible" :uuid="uuid" :visible.sync="popWindowVisible" @closePopWindow="closePopWindow"></server-form-dialog>
  </div>
</template>

<script>
import { getList, getInfo, getChangeLog } from '@/api/application'
import ServerFormDialog from '@/views/application/dialog/serverFormDialog'
export default {
  components: { ServerFormDialog },
  inject: ['reload'],
  data() {
    return {
      info: {
        icon: ''
      },
      tableData: [],
      total: 0,
      popWindowVisible: false,
      currentPage: 1,
      pageSize: 20,
      uuid: undefined,
      currentDB: undefined
    }
  },
  created() {
    this.currentDB = this.$route.name
    this.refreshContent()
  },
  methods: {
    refreshContent() {
      getInfo(this.currentDB.toUpperCase()).then(response => {
        this.info = response.data
      })
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList(this.currentDB.toUpperCase(), { size: this.pageSize, current: this.currentPage }).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    showLog() {
      getChangeLog(this.currentDB.toUpperCase()).then(response => {
        this.$alert(response.data, '更新日志', {
          confirmButtonText: '关闭',
          confirmButtonClass: 'el-button--danger'
        })
      })
    },
    download(uuid) {
      alert('调用了下载方法：' + uuid)
    },
    handleEdit(index, row) {
      this.openPopWindow(row.uuid)
    },
    handleDelete(index, row) {

    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${this.pageSize} 条`)
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${this.currentPage}`)
      this.fetchData()
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

.jumbotron {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  box-sizing: border-box;
  color: #FFFFFF;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 6px;
  padding-right: 60px;
  padding-left: 60px;
  margin-bottom: 0;
  background-color: #455A64;
}

.jumbotron > h1 {
  font-size: 4em;
}
</style>

<style>
  .el-message-box {
    white-space: pre-line;
    width: 800px;
  }
</style>

