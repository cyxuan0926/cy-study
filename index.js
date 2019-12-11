/* 
垃圾回收机制
node --expose-gc: --expose-gc参数表示允许手动执行垃圾回收机制
global.gc():手动执行一次垃圾回收
process.memoryUsage():查看内存占用的状态
*/
// export const auth = () => {
//   console.log(111)
// }
var ld = require('lodash'),
superAdmin = [{
  path: '/',
  meta: { hidden: true },
  children: [{
    path: '/prison',
    name: 'prison-manage-first',
    meta: { breadcrumbName: '监狱管理' },
    component: resolve => require(['@/views/sadmin-prison/prison-tab'], resolve),
    children: [{
      path: '/prison/list',
      name: 'prison-list',
      meta: { permission: 'visit.prison.search', breadcrumbName: '监狱列表' },
      component: resolve => require(['@/views/sadmin-prison/prison-list'], resolve)
    }, {
      path: '/tenant/list',
      name: 'tenant-list',
      meta: { permission: 'visit.prison.tenant.search', breadcrumbName: '租户列表' },
      component: resolve => require(['@/views/sadmin-prison/tenant-list'], resolve)
    }]
  }]
}, {
  path: '/prison',
  name: 'prison-manage',
  meta: { hidden: true, breadcrumbName: '监狱管理' },
  children: [{
    path: '/prison/add',
    name: 'prison-add',
    meta: { role: '0', permission: 'visit.prison.add', deep: true, breadcrumbName: '新增监狱' },
    component: resolve => require(['@/views/sadmin-prison/prison-add'], resolve)
  }, {
    path: '/prison/visit/:id',
    name: 'prison-visit',
    props: { role: 0 },
    meta: { role: '0', deep: true, permission: 'visit.prison.filed-visit-config.search', breadcrumbName: '监狱实地会见配置' },
    component: resolve => require(['@/views/meeting/visit-config'], resolve)
  // }, {
  //   path: '/prison/meeting-remote/:id',
  //   name: '监狱远程会见配置',
  //   meta: { role: '0' },
  //   component: resolve => require(['@/views/meeting/meeting-remote-edit'], resolve)
  }, {
    path: '/remote/edit/:id',
    name: 'remote-edit-super-admin',
    // permssion: 'edit'
    meta: { role: '0', permission: 'visit.prison.visit-config.search', deep: true, breadcrumbName: '监狱远程会见配置' },
    component: resolve => require(['@/views/meeting/remote-edit'], resolve)
  }, {
    path: '/prison/edit/:id',
    name: 'prison-edit',
    meta: {
      // premission: 'edit'
      permission: 'visit.prison.update',
      role: '0',
      deep: true,
      breadcrumbName: '编辑监狱'
    },
    component: resolve => require(['@/views/sadmin-prison/prison-edit'], resolve)
  }]
}, {
  path: '/prison-area',
  name: 'prison-area-manage',
  meta: { hidden: true, breadcrumbName: '监区管理' },
  children: [{
    path: '/prison-area/list',
    name: 'prison-area-list',
    meta: { permission: 'visit.prison-area.all-prison.search', breadcrumbName: '监区列表' },
    component: resolve => require(['@/views/sadmin-prison-area/prison-area-list'], resolve)
  // }, {
  //   path: '/prison-area/add',
  //   name: '新增监狱',
  //   component: resolve => require(['@/views/sadmin-prison-area/prison-area-add'], resolve)
  // }, {
  //   path: '/prison-area/edit/:id',
  //   name: '编辑监狱',
  //   component: resolve => require(['@/views/sadmin-prison-area/prison-area-edit'], resolve)
  }]
}, {
  path: '/prison-user',
  name: 'prison-user-manage',
  meta: { hidden: true, breadcrumbName: '监狱用户管理' },
  children: [{
    path: '/prison-user/list',
    name: 'prison-user-list',
    props: { role: '0' },
    meta: { permission: 'visit.account.all-prison.search', breadcrumbName: '监狱用户列表' },
    component: resolve => require(['@/views/sadmin-prison-user/prison-user-list'], resolve)
  }, {
    path: '/prison-user/edit/:id',
    name: 'prison-user-edit',
    meta: { role: '0', deep: true, breadcrumbName: '编辑监狱用户' },
    component: resolve => require(['@/views/sadmin-prison-user/prison-user-edit'], resolve)
  }, {
    path: '/prison-user/add',
    name: 'prison-user-add',
    meta: { role: '0', deep: true, breadcrumbName: '新增监狱用户' },
    component: resolve => require(['@/views/sadmin-prison-user/prison-user-add'], resolve)
  }]
}, {
  path: '/feedback',
  name: 'feedback',
  meta: { hidden: true, breadcrumbName: '意见反馈' },
  children: [{
    path: '/feedback/list',
    name: 'feedback-list',
    meta: { permission: 'visit.feedback.search', breadcrumbName: '意见列表' },
    component: resolve => require(['@/views/sadmin-feedback/feedback-list'], resolve)
  }]
}, {
  path: '/family-remittance',
  name: 'family-remittance',
  meta: { hidden: true, breadcrumbName: '家属汇款记录' },
  children: [{
    path: '/family-remittance/list',
    name: 'family-remittance-list',
    meta: { permission: 'visit.family-remittance.search', breadcrumbName: '家属汇款' },
    component: resolve => require(['@/views/sadmin-remittance-record/family-remittance-list'], resolve)
  }]
}, {
  path: '/',
  meta: { hidden: true, cy: 'adad' },
  children: [{
    path: '/trade',
    name: 'trade',
    meta: { breadcrumbName: '交易流水记录' },
    component: resolve => require(['@/views/trade/list-router'], resolve),
    children: [
      {
        path: '/trade/list',
        redirect: '/trade/account'
      },
      {
        path: '/trade/account',
        name: 'trade-account',
        meta: { deep: true, permission: 'visit.transaction-record.search', breadcrumbName: '账户明细' },
        component: resolve => require(['@/views/trade/account'], resolve)
      },
      {
        path: '/trade/recharge',
        name: 'trade-rechange',
        meta: { deep: true, permission: 'visit.transaction-record.recharge.view', breadcrumbName: '充值明细' },
        component: resolve => require(['@/views/trade/recharge'], resolve)
      },
      {
        path: '/trade/consumption',
        name: 'trade-consumption',
        meta: { deep: true, permission: 'visit.transaction-record.consumption.view', breadcrumbName: '消费明细' },
        component: resolve => require(['@/views/trade/consumption'], resolve)
      },
      {
        path: '/trade/refund',
        name: 'trade-refund',
        meta: { deep: true, permission: 'visit.transaction-record.refund.view', breadcrumbName: '退款明细' },
        component: resolve => require(['@/views/trade/refund'], resolve)
      }
    ]
  }]
},
{
  path: '/advertisement',
  name: 'advertisement-manage',
  meta: { hidden: true, breadcrumbName: '广告管理' },
  children: [{
    path: '/advertisement/list',
    name: 'advertisement-list',
    meta: { permission: 'visit.advertisement.search', breadcrumbName: '广告列表' },
    component: resolve => require(['@/views/sadmin-advertisement/advertisement-list'], resolve)
  }, {
    path: '/advertisement/add',
    name: 'advertisement-add',
    meta: { deep: true, permission: 'visit.advertisement.add', breadcrumbName: '新增广告' },
    component: resolve => require(['@/views/sadmin-advertisement/advertisement-add'], resolve)
  }, {
    path: '/advertisement/edit/:id',
    name: 'advertisement-edit',
    meta: { deep: true, permission: 'visit.advertisement.update', breadcrumbName: '编辑广告' },
    component: resolve => require(['@/views/sadmin-advertisement/advertisement-edit'], resolve)
  }]
}, {
  path: '/whitemember',
  name: 'whitemember',
  meta: { hidden: true, breadcrumbName: '白名单管理' },
  children: [{
    path: '/whitemember/list',
    name: 'whitemember-list',
    meta: { permission: 'visit.white-list.search', breadcrumbName: '白名单列表' },
    component: resolve => require(['@/views/sadmin-whitemember/whitemember-list'], resolve)
  }, {
    path: '/whitemember/lists',
    name: 'whitemember-lists',
    meta: { permission: 'visit.white-list.searchs', breadcrumbName: '白名单列表' },
    component: resolve => require(['@/views/sadmin-whitemember/whitemember-list'], resolve)
  }]
}, {
  path: '/terminal',
  name: 'terminal',
  meta: { hidden: true, breadcrumbName: '终端管理' },
  children: [{
    path: '/terminal/list',
    name: 'terminal-list',
    meta: { permission: 'visit.terminal.search', breadcrumbName: '终端列表' },
    component: resolve => require(['@/views/sadmin-terminal/terminal-list'], resolve)
  }, {
    path: '/terminal/add',
    name: 'terminal-add',
    meta: { deep: true, permission: 'visit.terminal.add', breadcrumbName: '新增终端' },
    component: resolve => require(['@/views/sadmin-terminal/terminal-add'], resolve)
  }, {
    path: '/terminal/edit/:id',
    name: 'terminal-edit',
    meta: { deep: true, permission: 'visit.terminal.update', breadcrumbName: '编辑终端' },
    component: resolve => require(['@/views/sadmin-terminal/terminal-edit'], resolve)
  }]
}, {
  path: '/version',
  name: 'version',
  meta: { hidden: true, breadcrumbName: '版本管理' },
  children: [{
    path: '/version/list',
    name: 'version-list',
    meta: { permission: 'visit.version.search', breadcrumbName: '版本列表' },
    component: resolve => require(['@/views/sadmin-version/version-list'], resolve)
  }]
}, {
  path: '/log',
  name: 'log',
  meta: { hidden: true, breadcrumbName: '日志' },
  children: [{
    path: '/log/app-error',
    name: 'log-app-error',
    meta: { permission: 'visit.app-crash-log.search', breadcrumbName: 'APP崩溃日志' },
    component: resolve => require(['@/views/sadmin-log/app-error-list'], resolve)
  }]
}], c = ld.cloneDeep(superAdmin)