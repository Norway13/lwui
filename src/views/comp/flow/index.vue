<template>
  <div class="root">
    <div id="headPanel"></div>

    <div class="workspace">
      <Materials />
      <!-- canvas 挂载节点 -->
      <div id="graph" />
    </div>
  </div>
</template>

<script>
import { Grid, Graph, registerBehavior } from "@antv/g6";
import Materials from "./components/materials";
import DragAnchor from "./drag-anchor";

const data = {
  nodes: [
    {
      id: "0",
      x: 300,
      y: 200,
      label: "1",
    },
    {
      id: "1",
      x: 300,
      y: 400,
      label: "2",
    },
  ],
};
const anchorPointMap = [
  [0, 0.5],
  [0.5, 0],
  [1, 0.5],
  [0.5, 1],
];

let dragNodeShouldBegin = true;

export default {
  components: {
    Materials,
  },
  data() {
    return {
      graph: null,
    };
  },
  mounted() {
    // 创建画布
    this.$nextTick(() => {
      this.createGraphic();
    });
  },
  beforeDestroy() {
    this.graph.destroy();
  },
  methods: {
    createGraphic() {
      // 注册各种自定义内容
      DragAnchor(registerBehavior);
      const { offsetHeight, offsetWidth } =
        document.querySelector(".workspace");

      const grid = new Grid();
      const graph = new Graph({
        container: document.getElementById("graph"),
        width: offsetWidth,
        height: offsetHeight,
        defaultNode: {
          type: "rect",
          anchorPoints: anchorPointMap,
          style: {
            width: 170,
            height: 50,
            radius: 4,
            fill: "#5cbc5a",
            stroke: "#5cbc5a",
          },
          labelCfg: {
            style: {
              fontSize: 14,
              fill: "#fff",
            },
          },
        },
        defaultEdge: {
          type: "cubic",
          style: {
            stroke: "#ed6fb1",
          },
        },
        modes: {
          default: [
            "drag-anchor",
            "drag-canvas",
            {
              type: "drag-node",
              shouldBegin() {
                // 解决拖拽锚点时节点跟着被拖拽的问题
                return dragNodeShouldBegin;
              },
            },
          ],
        },
        plugins: [grid],
      });

      this.graph = graph;
      this.graph.read(data);
      // 绘制锚点
      this.drawAnchors();
      this.bindEvents();
    },
    // 绘制可视锚点
    drawAnchors() {
      this.graph.getNodes().forEach((item) => {
        this.drawAnchor(item);
      });
    },
    drawAnchor(item) {
      const {
        id,
        style: { width, height },
      } = item.get("model");
      const group = item.get("group");

      for (let i = 0; i < 4; i++) {
        const x = width * (anchorPointMap[i][0] - 0.5);
        const y = height * (anchorPointMap[i][1] - 0.5);

        // 锚点
        group.addShape("circle", {
          attrs: {
            r: 5,
            cursor: "move",
            stroke: "#333",
            fill: "#fff",
            x,
            y,
          },
          anchorIndex: i,
          draggable: true,
          name: "anchor",
          nodeId: id,
        });
      }
    },
    // 绑定画布事件
    bindEvents() {
      // 画布监听释放事件
      this.graph.on("drop", (e) => {
        if (e.originalEvent.dataTransfer) {
          const { shape } = JSON.parse(
            e.originalEvent.dataTransfer.getData("dragSource")
          );

          this.graph.addItem("node", {
            type: shape,
            label: Math.random() * 100,
            x: e.canvasX,
            y: e.canvasY,
          });
        }
      });

      this.graph.on("before-anchor-dragstart", (e) => {
        // 禁用节点拖拽行为
        dragNodeShouldBegin = false;
      });
      this.graph.on("after-anchor-dragend", (e) => {
        // 启用节点拖拽行为
        dragNodeShouldBegin = true;
      });

      // 在锚点上释放鼠标
      this.graph.on(
        "after-anchor-drop",
        ({ label, source, sourceAnchor, target, targetAnchor }) => {
          // 发生连线
          if (source) {
            // 添加连线
            this.graph.addItem("edge", {
              fill: "#333",
              label,
              source,
              sourceAnchor,
              target,
              targetAnchor,
            });
          }

          // 恢复节点拖拽行为
          dragNodeShouldBegin = true;
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  position: relative;
  .workspace {
    position: relative;
    width: 100%;
    height: 100%;
  }
}

#graph {
  margin-left: 0;
}
</style>
