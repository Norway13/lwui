<template>
  <div id="blood" class="blood"></div>
</template>

<script>
import G6 from "@antv/g6";
G6.registerNode("customNode", {
  draw(cfg, group) {
    console.log(cfg.fiedStr);
    const nodeType = cfg.nodeType;
    let strArr = [];
    if (cfg.expand) {
      strArr = cfg.fiedStr.split(",");
    } else {
      strArr = cfg.fiedStr.split(",").filter((item, index) => {
        return index <= 1;
      });
    }
    const needExpand = cfg.fiedStr.split(",").length > 2;
    if (needExpand) {
      strArr = [...strArr, "..."];
    }

    group.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        width: 80,
        height: 20,
        stroke: "#f1f1f1",
        fill: nodeType === "main" ? "orange" : "skyblue",
      },
      draggable: true, // 允许自定义图形使用拖拽事件
    });
    strArr.forEach((item, index) => {
      group.addShape("rect", {
        attrs: {
          x: 0,
          y: 20 + 15 * index,
          width: 80,
          height: 15,
          stroke: "#f1f1f1",
          fill: "white",
          cursor:
            needExpand && index === strArr.length - 1 ? "pointer" : "unset",
        },
        className: needExpand && index === strArr.length - 1 ? "expand" : "cc",
        draggable: true, // 允许自定义图形使用拖拽事件
      });
    });

    group.addShape("text", {
      attrs: {
        x: 40,
        y: 12,
        fontSize: 6,
        fill: "#333",
        text: nodeType === "main" ? cfg.indcName : cfg.tablId,
        textAlign: "center",
      },
      draggable: true, // 允许自定义图形使用拖拽事件
    });
    strArr.forEach((item, index) => {
      group.addShape("text", {
        attrs: {
          x: 40,
          y: 15 * index + 30,
          fontSize: needExpand && index === strArr.length - 1 ? 16 : 6,
          textAlign: "center",
          fill: needExpand && index === strArr.length - 1 ? "skyblue" : "#333",
          text: this.formateText(item),
          cursor:
            needExpand && index === strArr.length - 1 ? "pointer" : "unset",
        },
        className: needExpand && index === strArr.length - 1 ? "expand" : "cc",
        draggable: true, // 允许自定义图形使用拖拽事件
      });
    });

    return group;
  },
  //
  formateText(str) {
    // str.match(/[\u4e00-\u9fa5]/g)
    if (str.length > 17) {
      const chinF = str.match(/[\u4e00-\u9fa5]/g);
      if (chinF) {
        if (chinF.length > 8) {
          return str.slice(0, 12) + "...";
        } else {
          return str.slice(0, 16) + "...";
        }
      } else {
        return str;
      }
    } else {
      return str;
    }
  },
  // update(cfg, node) {},
});
export default {
  name: "Blood",
  data: function () {
    return {
      nodeData: {},
    };
  },
  created() {
    const result = {
      retCode: "200",
      retMsg: "查询成功",
      retMap: {
        backOutList: [
          {
            backId: "",
            fiedStr: "TRAD_ORGAN,ipdata_16511531181000",
            indcName: "csy网点每月交易成功率",
            id: "20220428213712246231",
            indcNo: "",
            nodeType: "main",
          },
        ],
        mainList: [
          {
            inpaVal: "V1.总成功率,12",
            inpaSore: "1,3",
            backId: "20220428213712246231",
            func: "Divided(V1.总成功率,12)",
            ipRestMapp: "01=DIMN_1|ipdata_1651154184773",
            fiedStr:
              "DIMN_1,允许义图2323232用件222网点每年月均交易成功率",
            indcName: "网点每年月均交易成功率",
            indcNo: "20220428215459952271",
            nodeType: "main",
            funcId: "Divided",
            headId: "P2",
          },
        ],
        flowIntoList: [
          {
            tablId: "IP_DATA_TB",
            getTabl: "IP_DATA_TB T1",
            fiedStr: "INDC_DATA,DIMN_1,lwlwwllw,luoluo,weiwei",
            expand: false,
            id: "V1",
            nodeType: "data",
            getFild: "sum(T1.INDC_DATA) 总成功率,T1.DIMN_1",
            headId: null,
          },
          {
            tablId: "lwlwlwl",
            getTabl: "IP_DATA_TB T1",
            fiedStr: "luo,wei",
            expand: false,
            id: "V2",
            nodeType: "data",
            getFild: "sum(T1.INDC_DATA) 总成功率,T1.DIMN_1",
            headId: null,
          },
          {
            tablId: "lwlwlwl",
            getTabl: "IP_DATA_TB T1",
            fiedStr: "luo,wei",
            id: "P3",
            expand: false,
            nodeType: "data",
            getFild: "sum(T1.INDC_DATA) 总成功率,T1.DIMN_1",
            headId: "V2",
          },
          {
            inpaVal: "V1.总成功率,12",
            inpaSore: "1,3",
            func: "Divided(V1.总成功率,12)",
            id: "P2",
            expand: false,
            indcNo: "20220428215459952271",
            nodeType: "deal",
            funcId: "Divided",
            headId: "V1,P3",
          },
        ],
      },
    };
    const resultA = result.retMap;
    const arr1 = JSON.parse(JSON.stringify([...resultA.flowIntoList]));
    const idMapping = arr1.reduce((acc, el, i) => {
      el.children = [];
      acc[el.id] = i;
      return acc;
    }, {});
    let root = {};
    arr1.forEach((el) => {
      // 判断根节点
      if (el.id === "P2") {
        root = el;
      }
      // 用映射表找到父元素
      if (el.headId !== null) {
        el.headId.split(",").forEach((id) => {
          el.children.push(arr1[idMapping[id]]);
        });
      }
    });
    console.log(root);

    const arr2 = JSON.parse(
      JSON.stringify([...resultA.mainList, ...resultA.backOutList])
    );
    const arr2aaa = this.arrToTree(
      "backId",
      "id",
      "20220428213712246231",
      arr2
    );
    arr2aaa.children = [...arr2aaa.children, root];
    this.nodeData = arr2aaa;
  },
  mounted() {
    // return;
    const tooltip = new G6.Tooltip({
      offsetX: 10,
      offsetY: 20,
      getContent(e) {
        if (e.item.get("model").nodeType === "deal") {
          const outDiv = document.createElement("div");
          outDiv.style.width = "180px";
          outDiv.innerHTML = `
      <h4>计算表达式</h4>
      <ul>
        <li>${e.item.getModel().func}</li>
      </ul>`;
          return outDiv;
        } else {
          return "";
        }
      },
      shouldBegin(e) {
        if (e.item.get("model").nodeType === "deal") {
          return true;
        }
      },
      // itemTypes: ["node"],
    });
    const { offsetWidth, offsetHeight } = document.querySelector("#blood");
    var graph = new G6.TreeGraph({
      container: "blood",
      width: offsetWidth,
      height: offsetHeight,
      modes: {
        default: [
          // {
          //   type: "collapse-expand",
          //   onChange: function onChange(item, collapsed) {
          //     var data = item.get("model").data;
          //     data.collapsed = collapsed;
          //     return true;
          //   },
          // },
          "drag-canvas",
          "drag-node",
          "zoom-canvas",
        ],
      },
      defaultNode: {
        size: 16,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        shape: "cubic-horizontal",
        style: {
          startArrow: true,
          stroke: "#A3B1BF",
        },
      },
      plugins: [tooltip], // 配置 Tooltip 插件
      layout: {
        type: "mindmap",
        direction: "H",
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 20;
        },
        getVGap: function getVGap() {
          return 80;
        },
        getHGap: function getHGap() {
          return 50;
        },
      },
    });

    var centerX = 0;
    graph.node(function (node) {
      console.log("node", node);
      if (node.nodeType === "main") {
        centerX = node.x;
        return {
          size: [50, 25],
          type: "customNode",
          labelCfg: {
            position:
              node.children && node.children.length > 0
                ? "left"
                : node.x > centerX
                ? "right"
                : "left",
          },
        };
      } else if (node.nodeType === "deal") {
        return {
          size: 20,
          type: "circle",
          style: {
            fill: "yellow",
            stroke: "#f1f1f1",
          },
          // label: node.id,
          labelCfg: {
            position:
              node.children && node.children.length > 0
                ? "left"
                : node.x > centerX
                ? "right"
                : "left",
          },
        };
      } else if (node.nodeType === "data") {
        return {
          size: [50, 25],
          type: "customNode",
          // label: '12121212',
          labelCfg: {
            position:
              node.children && node.children.length > 0
                ? "left"
                : node.x > centerX
                ? "right"
                : "left",
          },
        };
      } else {
        return {
          size: 20,
          type: "circle",
          style: {
            fill: "#50a9ff",
            stroke: "#096dd9",
          },
          // label: node.id,
          labelCfg: {
            position:
              node.children && node.children.length > 0
                ? "left"
                : node.x > centerX
                ? "right"
                : "left",
          },
        };
      }
    });

    graph.data(this.nodeData);
    graph.render();
    graph.fitView(100);

    graph.on("node:click", (ev) => {
      const shape = ev.target;
      const model = ev.item.get("model");
      if (shape.cfg.className === "expand") {
        graph.updateItem(ev.item, {
          expand: !model.expand,
        });
      }
    });
  },
  methods: {
    arrToTree(id, pid, rootid, arr) {
      const idMapping = arr.reduce((acc, el, i) => {
        el.children = [];
        acc[el[id]] = i;
        return acc;
      }, {});
      let root = {};
      arr.forEach((el) => {
        // 判断根节点
        if (el[id] === rootid) {
          root = el;
          return;
        }
        // 用映射表找到父元素
        const parentEl = arr[idMapping[el[pid]]];
        // 把当前元素添加到父元素的`children`数组中
        parentEl.children = [...parentEl.children, el];
      });
      return root;
    },
  },
};
</script>

<style lang="scss" socped>
.blood {
  width: 100%;
  height: 100%;
}
</style>