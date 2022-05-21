<template>
  <div class="lw-step" :class="[isv ? 'lw-step--xbox' : 'lw-step--ybox']">
    <div class="lw-step--x" v-if="isv">
      <div class="lw-content">
        <div
          class="lw-step--item"
          v-for="(item, index) in message"
          @click="handleClick(item.stepindex)"
          :class="[
            activeIndex == item.stepindex ? 'is-active' : '',
            item.stepindex < activeIndex ? 'is-pass' : '',
          ]"
        >
          <span>{{ item.stepindex }}</span>
          <p class="item-title">{{ item.title }}</p>
        </div>
      </div>
      <div class="lw-line">
        <div
          class="linebox"
          :style="`width:${100 / (message.length - 1)}%`"
          v-if="index != message.length - 1"
          v-for="(item, index) in message"
        >
          <div
            class="line"
            :class="[item.stepindex < activeIndex ? 'is-active' : '',
            dotted ? 'is-dotted' : ''
            ]"
          ></div>
        </div>
      </div>
    </div>
    <div v-else class="lw-step--y">
      <div class="lw-content">
        <div
          class="lw-step--item"
          v-for="(item, index) in message"
          @click="handleClick(item.stepindex)"
          :class="[
            activeIndex == item.stepindex ? 'is-active' : '',
            item.stepindex < activeIndex ? 'is-pass' : '',
          ]"
        >
          <span>{{ item.stepindex }}</span>
          <p class="item-title">{{ item.title }}</p>
        </div>
      </div>
      <div class="lw-line">
          <div
          class="linebox"
          :style="`height:${100 / (message.length - 1)}%`"
          v-if="index != message.length - 1"
          v-for="(item, index) in message"
        >
          <div
            class="line"
            :class="[item.stepindex < activeIndex ? 'is-active' : '',
            dotted ? 'is-dotted' : ''
            ]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LwStep",
  props: {
    isv: {
      type: Boolean,
      default: true,
    },
    activeIndex: {
      type: Number,
      default: 1,
    },
    message: {
      type: Array,
      default: [],
    },
    dotted: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
    };
  },
  methods: {
    handleClick(index) {
      this.$emit("click",index);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
