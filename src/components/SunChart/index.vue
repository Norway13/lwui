<!--  -->
<template>
  <div :id="uuid" :style="style"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: {
    width: {
      type: String,
      default: "600px",
    },
    height: {
      type: String,
      default: "600px",
    },
    options: {
      type: Object,
      default: () => {
        return {
          title: {
            text: "示例",
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        };
      },
    },
  },
  watch: {
    width() {
      if (this.myChart) {
        this.myChart.resize({
          animation: {
            duration: 300,
          },
        });
      }
    },
    height() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
    options() {
      if (this.myChart) {
        this.myChart.setOption(this.options, {
          notMerge: true,
        });
      }
    },
  },
  data() {
    return {
      uuid: "",
      myChart: null,
    };
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
  created() {
    this.uuid = new Date().getTime();
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById(this.uuid));
    // 绘制图表
    this.myChart.setOption(this.options);
  },
};
</script>
<style scoped>
</style>