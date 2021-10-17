<template>
  <el-dialog :title='(uuid?"修改":"增加") + "服务器配置"' :visible.sync="visible" :close-on-click-modal="false" :before-close="close">
    <el-form :model="server">
      <el-form-item label="服务器名称" :label-width="formLabelWidth">
        <el-input v-model="server.name" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="IP 地址" :label-width="formLabelWidth">
        <el-input v-model="server.ipAddress" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="系统类型" :label-width="formLabelWidth">
        <el-select v-model="server.systemType" @change="systemTypeChange(server.systemType)" placeholder="请选择系统类型" style="width: 100%">
          <el-option
            v-for="item in systemType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台" :label-width="formLabelWidth">
        <el-select v-model="server.platform" placeholder="请选择平台" style="width: 100%">
          <el-option
            v-for="item in platform"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字符集" :label-width="formLabelWidth">
        <el-select v-model="server.charset" placeholder="请选择该系统字符集" style="width: 100%">
          <el-option label="UTF-8" value="UTF-8"></el-option>
          <el-option label="GBK" value="GBK"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="server.username" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="server.password" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <hr/>
      <el-form-item label="SSH" :label-width="formLabelWidth">
        <el-switch
          v-model="server.sshEnable"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item v-show="server.sshEnable" label="SSH 端口" :label-width="formLabelWidth">
        <el-input v-model="server.sshPort" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="Telnet" :label-width="formLabelWidth">
        <el-switch
          v-model="server.telnetEnable"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item v-show="server.telnetEnable" label="Telnet 端口" :label-width="formLabelWidth">
        <el-input v-model="server.telnetPort" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitPopWindow">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getOne, save, modify, getSystemType } from '@/api/servers'

export default {
  name: 'ServerFormDialog',
  props: {
    visible: {
      type: Boolean
    },
    uuid: {
      type: String,
      default: undefined
    }
  },
  created() {
    getSystemType().then(response => {
      this.systemType = response.data
    })
    if (this.uuid) {
      getOne(this.uuid).then(response => {
        this.server = response.data
      })
    }
  },
  data() {
    return {
      formLabelWidth: '100px',
      popWindowTitle: '',
      server: {
        sshEnable: false,
        telnetEnable: false
      },
      systemType: [],
      platform: []
    }
  },
  methods: {
    close() {
      this.$emit('closePopWindow')
    },
    systemTypeChange(systemType) {
      this.platform = this.systemType.filter(type => {
        return type.value === systemType
      })[0].platform
    },
    submitPopWindow() {
      if (this.uuid) {
        modify(this.server).then(response => {
          this.close()
        })
      } else {
        save(this.server).then(response => {
          this.close()
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
