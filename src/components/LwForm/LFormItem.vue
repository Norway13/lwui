<!-- input组件 -->
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <!-- 校验信息提示 -->
    <p v-if="error">{{ error }}</p>
    <!-- <p>{{ form.rules }}</p> -->
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
  },
  watch: {},
  data() {
    return {
      error: "", // erro为空说明是通过了校验
    };
  },
  mounted() {
    this.$on("validate", () => {
      console.log('validate', this.form.model.username)
      this.validate();
    });
  },
  methods: {
    validate() {
      // 规则
      const rules = this.form.rules[this.prop];
      // 当前值
      const value = this.form.model[this.prop];

      //校验描述对象
      const desc = { [this.prop]: rules };
      // 创建Schema实例
      const schema = new Schema(desc);
      return schema.validate(
        //返回的是一个promise对象
        {
          [this.prop]: value,
        },
        (errors) => {
          if (errors) {
            this.error = errors[0].message;
          } else {
            this.error = "";
          }
        }
      );
    },
  },
};
</script>
<style scoped>
</style>