<template>
  <div class="materials">
    <i
      draggable
      data-shape="rect"
      class="iconfont icon-24gl-rectangle"
      @dragstart="dragstart"
    />
    <i
      draggable
      data-shape="circle"
      class="iconfont icon-xingzhuang-tuoyuanxing"
      @dragstart="dragstart"
    />
    <i
      draggable
      data-shape="ellipse"
      class="iconfont icon-tuoyuan"
      @dragstart="dragstart"
    />
    <i
      draggable
      data-shape="diamond"
      class="iconfont icon-lingxing"
      @dragstart="dragstart"
    />
    <i
      draggable
      data-shape="sanjiaoxing"
      class="iconfont icon-xingzhuang-sanjiaoxing"
      @dragstart="dragstart"
    />
    <i
      draggable
      data-shape="square"
      class="iconfont icon-24gl-square"
      @dragstart="dragstart"
    />
  </div>
</template>

<script>
export default {
  methods: {
    dragstart(event) {
      event.dataTransfer.setData(
        "dragSource",
        JSON.stringify({
          shape: event.target.getAttribute("data-shape"),
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.materials {
  width: 80px;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  top: 10px;
  left: -10px;
  bottom: 10px;
}
.iconfont {
  display: block;
  margin: 20px auto;
  width: 80px;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  text-align: center;
  cursor: move;
  &:hover {
    transform: scale(1.2);
  }
}
</style>
