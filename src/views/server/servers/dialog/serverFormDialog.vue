<template>
  <el-dialog :title='(uuid?"修改":"增加") + "服务器配置"' :visible.sync="visible" :close-on-click-modal="false" :before-close="close">
    <el-form :model="server">
      <el-form-item label="服务器名称" :label-width="formLabelWidth">
        <el-input v-model="server.serverName" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="IP 地址" :label-width="formLabelWidth">
        <el-input v-model="server.ipAddress" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="系统类型" :label-width="formLabelWidth">
        <el-select v-model="server.systemType" placeholder="请选择系统类型" style="width: 100%">
          <el-option label="CentOS" value="CentOS"></el-option>
          <el-option label="Ubuntu" value="Ubuntu"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台" :label-width="formLabelWidth">
        <el-select v-model="server.platform" placeholder="请选择平台" style="width: 100%">
          <el-option label="ARM" value="ARM"></el-option>
          <el-option label="x86" value="x86"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字符集" :label-width="formLabelWidth">
        <el-select v-model="server.charset" placeholder="请选择该系统字符集" style="width: 100%">
          <el-option label="UTF-8" value="UTF-8"></el-option>
          <el-option label="GBK" value="GBK"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属服务器组" :label-width="formLabelWidth">
        <el-select v-model="server.group" placeholder="请选择归属的服务器组" style="width: 100%">
          <el-option label="group1" value="group1"></el-option>
          <el-option label="group2" value="group2"></el-option>
        </el-select>
      </el-form-item>
      <hr/>
      <el-form-item label="SSH" :label-width="formLabelWidth">
        <el-switch
          v-model="formSshActive"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item v-show="formSshActive" label="SSH 端口" :label-width="formLabelWidth">
        <el-input v-model="server.sshPort" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item v-show="formSshActive" label="SSH 用户名" :label-width="formLabelWidth">
        <el-input v-model="server.sshUserName" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item v-show="formSshActive" label="SSH 密码" :label-width="formLabelWidth">
        <el-input v-model="server.sshPassword" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="Telnet" :label-width="formLabelWidth">
        <el-switch
          v-model="formTelnetActive"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item v-show="formTelnetActive" label="Telnet 端口" :label-width="formLabelWidth">
        <el-input v-model="server.telnetPort" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item v-show="formTelnetActive" label="Telnet 用户名" :label-width="formLabelWidth">
        <el-input v-model="server.telnetUserName" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item v-show="formTelnetActive" label="Telnet 密码" :label-width="formLabelWidth">
        <el-input v-model="server.telnetPassword" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitPopWindow">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
  data() {
    return {
      formLabelWidth: '100px',
      popWindowTitle: '',
      server: {},
      formSshActive: false,
      formTelnetActive: false
    }
  },
  methods: {
    close() {
      this.server = {}
      this.formSshActive = false
      this.formTelnetActive = false
      this.$emit('closePopWindow')
    },
    submitPopWindow() {
      alert('提交成功')
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
