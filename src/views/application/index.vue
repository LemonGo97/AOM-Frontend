<template>
  <div class="app-container">
    <div class="jumbotron">
      <h1><svg-icon :icon-class="info[currentDB].icon" />&nbsp;&nbsp;{{ info[currentDB].title }}</h1>
      <p>{{ info[currentDB].description }}</p>
      <p v-if="info[currentDB].downloadUrl">下载地址：<a :href="info[currentDB].downloadUrl" target="_blank">{{ info[currentDB].downloadUrl }}</a></p>
    </div>
    <div class="filter-container" style="margin-top: 10px">
      <el-button icon="el-icon-refresh" @click="refreshContent()">刷新</el-button>
      <el-button icon="el-icon-upload" @click="refreshContent()">上传安装包</el-button>
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
import { getList } from '@/api/application'
import ServerFormDialog from '@/views/application/dialog/serverFormDialog'
export default {
  components: { ServerFormDialog },
  inject: ['reload'],
  data() {
    return {
      info: {
        MySQL: {
          icon: 'mysql',
          title: 'MySQL',
          description: 'MySQL数据库服务是一个完全托管的数据库服务，可使用世界上最受欢迎的开源数据库来部署云原生应用程序。 它是百分百由MySQL原厂开发，管理和提供支持。'
        },
        MongoDB: {
          icon: 'mongodb',
          title: 'MongoDB',
          description: 'MongoDB 是通用、基于文档的分布式数据库，帮助现代应用程序开发人员迎接云时代的到来。就数据库而言，效率是一个永不过时的话题。'
        },
        PostgreSQL: {
          icon: 'postgresql',
          title: 'PostgreSQL',
          description: 'PostgreSQL 是一个强大的开源对象关系数据库系统，经过 30 多年的积极开发，在可靠性、功能稳健性和性能方面赢得了良好的声誉。'
        },
        ClickHouse: {
          icon: 'clickhouse',
          title: 'ClickHouse',
          description: 'ClickHouse 是一个开源、高性能的列式 OLAP 数据库管理系统，用于使用 SQL 进行实时分析。'
        },
        Redis: {
          icon: 'redis',
          title: 'Redis',
          downloadUrl: 'https://download.redis.io/releases/',
          description: 'Redis 是一个开源（BSD许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件。'
        },
        Elasticsearch: {
          icon: 'elasticsearch',
          title: 'Elasticsearch',
          description: 'Elasticsearch 是一个分布式、RESTful 风格的搜索和数据分析引擎，能够解决不断涌现出的各种用例。 作为 Elastic Stack 的核心，它集中存储您的数据，帮助您发现意料之中以及意料之外的情况。'
        },
        Zookeeper: {
          icon: 'zookeeper',
          title: 'Zookeeper',
          description: 'ZooKeeper 是一个集中式服务，用于维护配置信息、命名、提供分布式同步和提供组服务。分布式应用程序以某种形式使用所有这些类型的服务。每次实现它们时，都需要进行大量工作来修复不可避免的错误和竞争条件。由于实现这些服务的难度，应用程序最初通常会吝啬它们，这使得它们在发生变化时变得脆弱且难以管理。即使正确完成，这些服务的不同实现也会导致部署应用程序时的管理复杂性。'
        },
        Kafka: {
          icon: 'kafka',
          title: 'Kafka',
          description: 'Apache Kafka 是一个开源分布式事件流平台，被数千家公司用于高性能数据管道、流分析、数据集成和关键任务应用程序。'
        },
        RocketMQ: {
          icon: 'rocketmq',
          title: 'RocketMQ',
          description: 'Apache RocketMQ 是一个统一消息引擎、轻量级数据处理平台。'
        },
        RabbitMQ: {
          icon: 'rabbitmq',
          title: 'RabbitMQ',
          description: 'RabbitMQ 是轻量级的，易于在本地和云中部署的开源消息代理。它支持多种消息传递协议。RabbitMQ 可以部署在分布式和联合配置中，以满足大规模、高可用性的需求。'
        },
        Nginx: {
          icon: 'nginx',
          title: 'Nginx',
          description: 'nginx 是一个 HTTP 和反向代理服务器、一个邮件代理服务器和一个通用的 TCP/UDP 代理服务器。'
        }
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
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList({ type: this.info[this.currentDB].title, size: this.pageSize, current: this.currentPage }).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    showLog(row) {
      this.$alert(row.changeLog, '更新日志', {
        confirmButtonText: '关闭',
        confirmButtonClass: 'el-button--danger'
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

