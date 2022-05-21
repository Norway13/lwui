<!-- 组件 -->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this,
    };
  },
  props: {
    rules: {
      type: Object,
      default: () => {},
    },
    model: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    validate(cb){
      // 获取所有的孩子LFormItem
      console.log('this', this.$children[0].$children)
      const tasks = this.$children[0].$children.filter(item=>{
        return item.prop // 过滤掉没有prop 属性的那些item
      }).map(item=>{
        return item.validate()
      })
      console.log('tasks', tasks)

      Promise.all(tasks).then(()=>{
        cb(true)
      }).catch(()=>{
        cb(false)
      })


    }
  },
};
</script>
<style scoped>
</style>