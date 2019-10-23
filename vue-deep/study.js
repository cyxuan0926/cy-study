/** 
 * Vue.extend(options): 使用基础Vue构造器 创建一个'子类' 参数是一个包含组件选项的对象 data选项是特例 在Vue.extend()中它必须是函数
 * 参数: {Object} options
*/
let Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
new Profile().$mount('xxx')