<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" icon="el-icon-edit" @click="drawer = true;drawerMessage = '增加服务器'">增加服务器</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="drawer = true;drawerMessage = '增加服务器组'">增加服务器组</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="drawer = true;drawerMessage = '增加用户组'">增加用户组</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="drawer = true;drawerMessage = '增加用户认证'">增加用户认证</el-button>
    </div>
    <el-table
      :data="tableData"
      height="100%"
      border
      style="width: 100%;margin-top: 10px">
      <el-table-column
        prop="serverName"
        label="服务器名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ipAddress"
        label="IP 地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="group"
        label="所属服务器组">
      </el-table-column>
      <el-table-column
        prop="sshPort"
        label="SSH Port">
      </el-table-column>
      <el-table-column
        prop="systemType"
        label="系统类型">
      </el-table-column>
      <el-table-column
        prop="platform"
        label="平台">
      </el-table-column>
      <el-table-column
        prop="users"
        label="用户">
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[20, 50, 100, 200, 300, 400]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
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
export default {
  data() {
    return {
      tableData: [{
        serverName: '开发MySQL服务器组-01',
        ipAddress: '192.168.1.123',
        group: '北京开发组',
        sshPort: 22,
        systemType: 'CentOS 7.9',
        platform: 'x86',
        users: 'root,elastic,mysql'
      },
      {
        serverName: '开发MySQL服务器组-02',
        ipAddress: '192.168.1.124',
        group: '北京开发组',
        sshPort: 22,
        systemType: 'CentOS 7.9',
        platform: 'x86',
        users: 'root,elastic,mysql'
      }],
      drawer: false,
      direction: 'rtl',
      drawerMessage: ''
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

