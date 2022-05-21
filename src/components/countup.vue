<template>
  <span ref="countup"></span>
</template>

<script>
import { CountUp } from "countup.js";
export default {
  name: "CountUp",
  data() {
    return {
      numAnim: null,
    };
  },
  props: {
    end: {
      type: Number,
      default: 2018,
    },
    options: {
      type: Object,
    },
  },
  mounted() {
    this.initCountUp();
  },
  methods: {
    initCountUp() {
 //https://github.com/inorganik/countUp.js
      this.numAnim = new CountUp(this.$refs.countup, this.end);
      

      this.numAnim.start();
    },
  },
};
</script>
