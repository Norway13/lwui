<!--  -->
<template>
  <div class="home">
    <div class="com_button">
      <el-button @click="toCom('form')">表单</el-button>
      <el-button @click="toCom('echart')">图表</el-button>
      <el-button @click="toCom('flow')">流程图</el-button>
    </div>
    <div class="content_box">
      <router-view />
    </div>
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
  methods: {
    toCom(str) {
      this.$router.push(`/home/${str}`);
    },
  },
};
</script>
<style scoped lang='scss'>
.home {
  width: 100%;
  height: 100%;
  padding: 50px 10px 10px;
  .com_button {
    width: 100%;
    height: 50px;
    position: absolute;
    display: flex;
    align-items: center;
    padding: 10px;
    top: 0;
    left: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .content_box{
    width: 100%;
    height: 100%;
  }
}
</style>