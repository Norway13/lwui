<!-- input组件 -->
<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs"/>
  </div>
</template>

<script>

export default {
  inheritAttrs:false,
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  watch: {},
  data() {
    return {};
  },
  methods:{
    onInput(e){
      this.$emit('input', e.target.value)
      this.$parent.$emit('validate')
    }
  }
};
</script>
<style scoped>
</style>