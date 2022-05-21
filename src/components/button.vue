<template>
  <button
    class="lw-button"
    :class="[
      type ? 'lw-button--' + type : '',
      {
        'is-plain': plain,
        'is-round': round,
      },
    ]"
    @click="handleClick"
  >
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: "LwButton",
  props: {
    type: {
      type: String,
      default: "default",
    },
    plain: Boolean,
    round: Boolean,
   
  },
  data() {
    return {};
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
  },
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
