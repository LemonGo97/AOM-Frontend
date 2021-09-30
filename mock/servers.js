module.exports = [
  {
    url: '/servers',
    type: 'get',
    response: config => {
      const data = {
        list: [{
          uuid: 'aasdf-14345-pvujr-5jalp-7jnzj',
          serverName: '开发MySQL服务器组-01',
          ipAddress: '192.168.1.123',
          group: '北京开发组',
          sshPort: 22,
          systemType: 'CentOS 7.9',
          platform: 'x86',
          users: ['root', 'elastic', 'mysql']
        },
        {
          uuid: 'aasdf-14345-pvujr-5jalp-7jnzj',
          serverName: '开发MySQL服务器组-02',
          ipAddress: '192.168.1.124',
          group: '北京开发组',
          sshPort: 22,
          systemType: 'CentOS 7.9',
          platform: 'x86',
          users: ['root', 'elastic', 'mysql']
        }],
        total: 2
      }
      return {
        code: 200,
        data: {
          total: data.list.length,
          list: data.list
        }
      }
    }
  }
]
