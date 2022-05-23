<!-- 
树图片pdf查看组件
  pdf查看插件 vue-pdf      https://github.com/FranckFreiburger/vue-pdf#readme
  图片查看插件 viewerjs 
-->
<template>
  <div class="container-img">
    <div class="left-tree">
      <div class="tree-main">
        <el-tree
          ref="tree"
          :data="arr"
          :highlight-current="true"
          :props="defaultProps"
          node-key="id"
          :expand-on-click-node="false"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        >
          <span slot-scope="{ node, data }">
            <span v-if="data.children"
              ><i class="el-icon-folder-opened" />{{ node.label }}</span
            >
            <span v-if="data.type === 'img'"
              ><i class="el-icon-picture-outline" />{{ node.label }}</span
            >
            <span v-if="data.type === 'pdf'"
              ><i class="el-icon-document" />{{ node.label }}</span
            >
            <span v-if="data.type === 'video'"
              ><i class="el-icon-video-camera" />{{ node.label }}</span
            >
          </span>
        </el-tree>
      </div>
      <div class="tree-footer">
        <slot name="treefooter" />
      </div>
    </div>
    <div class="right-img">
      <div class="img-single">
        <img
          v-if="type === 'img'"
          ref="image"
          :src="imageSrc"
          style="display: none"
        />
        <div v-if="type === 'pdf'" class="pdf" style="width: 100%; height: 100%">
          <!-- <iframe
            :src="'http://localhost:9527/pdf/web/viewer.html?file=' + imageSrc"
            class="pdfFile"
            name="pdfFile"
            frameborder="0"
            width="100%"
            height="100%"
          /> -->
          <div class="show">
            <pdf
              :src="imageSrc"
              ref="pdf"
              :page="pdf.pageNum"
              :rotate="pdf.pageRotate"
              @progress="pdf.loadedRatio = $event"
              @page-loaded="pageLoaded($event)"
              @num-pages="pdf.pageTotalNum = $event"
              @error="pdfError($event)"
              @link-clicked="pdf.page = $event"
            ></pdf>
          </div>
          <div class="pdf_footer">
            <div class="info">
              <div>当前页数/总页数：{{ pdf.pageNum }}/{{ pdf.pageTotalNum }}</div>
              <div>进度：{{ pdf.loadedRatio }}</div>
              <div>页面加载成功: {{ pdf.curPageNum }}</div>
            </div>
            <div class="operate">
              <div class="btn" @click.stop="clock">顺时针</div>
              <div class="btn" @click.stop="counterClock">逆时针</div>
              <div class="btn" @click.stop="prePage">上一页</div>
              <div class="btn" @click.stop="nextPage">下一页</div>
              <div class="btn" @click="scaleD">放大</div>
              <div class="btn" @click="scaleX">缩小</div>
              <div class="btn" @click="fileDownload(pdfUrl, 'pdf文件')">
                下载
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="type === 'video'"
          style="width: 100%; height: 100%; background: #000"
        >
          <video :src="imageSrc" controls autoplay width="100%" height="100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
import pdf from "vue-pdf";
// import User from '@/assets/img/main/nopic.png' // 默认头像

export default {
  name: "TreeImage",
  props: {
    arr: {
      // 左侧的树的构造数据
      type: Array,
      default: function () {
        return [];
      },
    },
    activeitem: {
      type: String,
      default: "", // 当前选中项
    },
  },
  components: {
    pdf,
  },
  data() {
    return {
      imageSrc: "", // 资源路径
      type: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      viewer: null,
      pdf: {
        // 总页数
        pageTotalNum: 1,
        // 当前页数
        pageNum: 1,
        // 加载进度
        loadedRatio: 0,
        // 页面加载完成
        curPageNum: 0,
        // 放大系数 默认百分百
        scale: 60,
        // 旋转角度 ‘90’的倍数才有效
        pageRotate: 0,
        // 单击内部链接时触发 (目前我没有遇到使用场景)
        page: 0,
      },
    };
  },
  watch: {},
  mounted() {
    if (this.activeitem !== "") {
      this.$refs.tree.setCurrentKey(this.activeitem);
      const node = this.$refs.tree.getNode(this.activeitem);
      this.handleNodeClick(node.data, node);
    }
  },
  methods: {
    handleNodeClick(e, node) {
      this.$emit("handleNodeClick", { e, node });
      const that = this;
      if (e.type === "img") {
        this.type = e.type;
        this.imageSrc = e.src;
        if (!this.viewer) {
          this.$nextTick(function () {
            this.viewer = new Viewer(this.$refs.image, {
              inline: true,
              navbar: false, // 图像下方缩略图隐藏
            });
            this.$refs.image.onload = function () {
              that.viewer.update();
            };
          });
        } else {
          this.$refs.image.onload = function () {
            that.viewer.update();
          };
        }
      } else if (e.type === "pdf") {
        this.type = e.type;
        if (this.viewer) {
          this.viewer.destroy();
          this.viewer = null;
        }
        this.imageSrc = e.src;
      } else if (e.type === "video") {
        this.type = e.type;
        if (this.viewer) {
          this.viewer.destroy();
          this.viewer = null;
        }
        this.imageSrc = e.src;
      }
    },
    makeSrcBlank() {
      const that = this;
      this.imageSrc = User;
      // this.imageSrc = ''
      this.$refs.image.onload = function () {
        that.viewer.update();
      };
    },
    destroyImage() {
      const that = this;
      if (this.viewer) {
        this.$refs.image.onload = function () {
          that.viewer.update();
        };
      }

      // if (this.viewer) {
      //   this.viewer.destroy()
      // }
    },
    //下载PDF
    fileDownload(data, fileName) {
      let blob = new Blob([data], {
        //type类型后端返回来的数据中会有，根据自己实际进行修改
        type: "application/pdf;charset-UTF-8",
      });
      let filename = fileName || "pdf.pdf";
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        var blobURL = window.URL.createObjectURL(blob);
        // 创建隐藏<a>标签进行下载
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
          tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
      }
    },

    //放大
    scaleD() {
      this.pdf.scale += 5;
      this.$refs.pdf.$el.style.width = parseInt(this.pdf.scale) + "%";
    },

    //缩小
    scaleX() {
      // scale 是百分百展示 不建议缩放
      if (this.pdf.scale == 100) {
        return;
      }
      this.pdf.scale += -5;
      console.log(parseInt(this.pdf.scale) + "%");
      this.$refs.pdf.$el.style.width = parseInt(this.pdf.scale) + "%";
    },
    // 切换上一页
    prePage() {
      var p = this.pdf.pageNum;
      p = p > 1 ? p - 1 : this.pdf.pageTotalNum;
      this.pdf.pageNum = p;
    },
    // 切换下一页
    nextPage() {
      var p = this.pdf.pageNum;
      p = p < this.pdf.pageTotalNum ? p + 1 : 1;
      this.pdf.pageNum = p;
    },
    // 顺时针选中角度
    clock() {
      this.pdf.pageRotate += 90;
    },
    // 逆时针旋转角度
    counterClock() {
      this.pdf.pageRotate -= 90;
    },

    // 页面加载成功  当前页数
    pageLoaded(e) {
      this.$emit("current", e);
      this.pdf.curPageNum = e;
    },
    // 异常监听
    pdfError(error) {
      console.error(error);
    },
    // 打印所有
    pdfPrintAll() {
      this.$refs.pdf.print();
    },
    // 打印 第一页和第二页
    pdfPrint() {
      // 第一个参数 文档打印的分辨率
      // 第二个参数 文档打印的页数
      this.$refs.pdf.print(100, [1, 2]);
    },
    // 获取当前页面pdf的文字信息内容
    logContent() {
      this.$refs.pdf.pdf.forEachPage(function (page) {
        return page.getTextContent().then(function (content) {
          let text = content.items.map((item) => item.str);
          let allStr = content.items.reduce(
            (initVal, item) => (initVal += item.str),
            ""
          );
          console.log(allStr); // 内容字符串
          console.log(text); // 内容数组
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container-img {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  background: #dfdfdf;
  .left-tree {
    width: 260px;
    padding: 20px 10px 10px;
    background: #ffffff;
    position: absolute;
    top: 5px;
    right: auto;
    bottom: 5px;
    left: 5px;
    border: 1px solid #cdcdcd;
    .tree-main {
      width: 100%;
      height: calc(100% - 50px);
      overflow: auto;
    }
    .tree-footer {
      width: 100%;
      height: 36px;
    }
    // ::v-deep {
    //   .el-tree-node__expand-icon.expanded {
    //     transform: rotate(0deg);
    //   }
    // }
  }
  .right-img {
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 270px;
    border: 1px solid #cdcdcd;
    background: #ffffff;
    overflow: auto;
    padding: 10px 5px;
    .img-single {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}
.pdf {
  padding: 20px;
  .show {
    overflow: auto;
    margin: auto;
    max-width: 75%;
    height: 80vh;
    // max-height: 530px;
  }
  .pdf_footer {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 0;
    background-color: rgba(255, 255, 255, 0.5);
    .info {
      display: flex;
      flex-wrap: wrap;
      div {
        width: 30%;
      }
    }
    .operate {
      margin: 10px 0 0;
      display: flex;
      flex-wrap: wrap;
      div {
        // width: 80px;
        text-align: center;
        font-size: 15px;
      }
      .btn {
        cursor: pointer;
        margin: 5px 10px;
        width: 12%;
        border-radius: 10px;
        padding: 5px;
        color: #fff;
        background-color: #3dcbbc;
      }
    }
  }
}
</style>
