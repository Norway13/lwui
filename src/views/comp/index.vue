<!--  -->
<template>
  <div class="main_box">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped lang="scss">
.main_box {
  width: 100%;
  height: 100%;
}
</style>