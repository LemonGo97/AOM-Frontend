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
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>

          <el-popconfirm
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
      currentPage: 1,
      uuid: undefined
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

