<template>
  <div v-clickoutside class="lw-datepicker-outbox">
    <input type="text" :value="formatDate" class="lw-datepicker-input"/>
    <div v-if="isContentshow" class="lw-datepicker-pannel">
      <div class="lw-datepicker-pannel-title">
        <span @click="prevY">&lt;</span>
        <span @click="prevM">&lt;&lt;</span>
        <span>{{time.y}}年</span>
        <span>{{time.m+1}}月</span>
        <span @click="nextM">&lt;&lt;</span>
        <span @click="nextY">&lt;</span>
      </div>
      <div class="lw-datepicker-pannel-content">
          <span v-for="item in weekname" :key="item" class="weekname">
              {{item}}
          </span>
          <div class="days">
              <div v-for="i in 6" :key="i">
                    <span v-for="j in 7" :key="j" :class="[{notCurrentM:!isCurrentM(visibeDays[(i-1)*7+(j-1)])},
                    {today:isclickselect&&istoday(visibeDays[(i-1)*7+(j-1)])},
                    {select:isselect(visibeDays[(i-1)*7+(j-1)])}
                    ]" @click="chooseDate(visibeDays[(i-1)*7+(j-1)])">
                        {{visibeDays[(i-1)*7+(j-1)].getDate()}}
                    </span>
              </div>
          </div>
      </div>
      <div class="pannel_footer"></div>
    </div>
  </div>
</template>

<script>
import * as utils from "./util.js";
export default {
  name: "DatePicker",
//指令关于时间表的显示问题
  directives: {
    clickoutside: {
      //指令的生命周期
      bind(el, bindings, vnode) {
        let handler = (e) => {
          if (el.contains(e.target)) {
            if (!vnode.context.isContentshow) {
              vnode.context.focus();
            }
          } else {
            if (vnode.context.isContentshow) {
              vnode.context.blur();
            }
          }
        };
        el.handler = handler;
        document.addEventListener("click", handler);
      },
      unbind(el) {
        document.removeEventListener("click", el.handler);
      },
    },
  },
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
      let {y,m}=utils.getYMD(this.value)
      console.log({y,m})
    return {
      weekname:['日','一','二','三','四','五','六'],
      isContentshow: false,
      isclickselect:true,
      time:{y,m}
    };
  },
  methods: {
    focus() {
      this.isContentshow = true;
    },
    blur() {
      this.isContentshow = false;
    },
    //是否是当前月
    isCurrentM(data){
        let {y,m}=utils.getYMD(utils.getDate(this.time.y,this.time.m,1))
        let {y:y1,m:m1}=utils.getYMD(data)
        return y===y1&&m===m1;
    },
    //是否是今天
    istoday(data){
         let {y,m,d}=utils.getYMD(new Date())
         let {y:y1,m:m1,d:d1}=utils.getYMD(data)
         return y===y1&&m===m1&&d===d1
    },
    //是否点击选中状态
    isselect(data){
        this.isclickselect=false;
          let {y,m,d}=utils.getYMD(this.value)
          let {y:y1,m:m1,d:d1}=utils.getYMD(data)
        return y===y1&&m===m1&&d===d1

    },
    //点击选择日期
    chooseDate(data){
        this.time=utils.getYMD(data)
        this.$emit('input',data)
        this.blur()
    },
    prevY(){
         this.time.y--;
    },
    //点击上一个月
    prevM(){
        let d=utils.getDate(this.time.y,this.time.m,1);
        d.setMonth(d.getMonth()-1)
        console.log(d)
        this.time=utils.getYMD(d)
    },
    nextY(){
        this.time.y++;
    },
      //点击下一个月
    nextM(){
        let d=utils.getDate(this.time.y,this.time.m,1);
        d.setMonth(d.getMonth()+1)
        console.log(d)
        this.time=utils.getYMD(d)
    },
  },
  computed: {
    //根据当前时间，返回时间数组
    visibeDays() {
      //获取当前月份的第一天
      let currentFirstDay = utils.getDate(this.time.y, this.time.m, 1);
      //获取当前月份的第一天是周几
      let week = currentFirstDay.getDay();

      //当前列表的开始天数
      let startDay = currentFirstDay - week * 24 * 60 * 60 * 1000;
      //循环42天
      let arr = [];
      for (let i = 0; i <= 42; i++) {
        arr.push(new Date(startDay + i * 24 * 60 * 60 * 1000));
      }
      return arr;
    },
    //格式化时间显示
    formatDate() {
      let { y, m, d } = utils.getYMD(this.value);
      return `${y}-${m + 1}-${d}`;
    },
  },
  mounted() {},
};
</script>
 