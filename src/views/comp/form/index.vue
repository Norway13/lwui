<!--  -->
<template>
  <div class="form">
    <LForm :model="model" :rules="rules" ref="lwform">
      <LFormItem>
        <LFormItem label="姓名" prop="username">
          <LInput
            type="text"
            v-model="model.username"
            placeholder="ninini"
          ></LInput>
        </LFormItem>

        <LFormItem label="年龄" prop="age">
          <LInput type="text" v-model="model.age"></LInput>
        </LFormItem>
        <LFormItem>
          <el-button @click="checkAll">校验</el-button>
        </LFormItem>
      </LFormItem>
    </LForm>
  </div>
</template>

<script>
import { LForm } from "@/components";
import { LFormItem } from "@/components";
import { LInput } from "@/components";
export default {
  components: {
    LForm,
    LFormItem,
    LInput,
  },
  data() {
    return {
      model: {
        username: "",
        age: "18",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        age: [{ required: true, message: "请输入年纪" }],
      },
    };
  },
  methods:{
    checkAll(){
      // 对所有的表单进行校验
      this.$refs.lwform.validate(valid=>{
        if(valid){
          alert('校验成功')
        }else{
          console.log('err,校验失败')
          return false
        }

      })
    }
  }
 
};
</script>
<style scoped lang="scss">
</style>