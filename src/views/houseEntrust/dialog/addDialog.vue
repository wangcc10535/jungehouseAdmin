<template>
    <div>
      <el-dialog
        :title="title"
        :visible.sync="addorputVisible"
        width="50%"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        :before-close="handleClose"
      >
        <el-form
          :model="addorputForm"
          ref="addorputForm"
          label-width="140px"
        >
          <el-form-item label="地址：" prop="newsTitle">
            <span>{{ addorputForm.province }}{{ addorputForm.city }}{{ addorputForm.district }}</span>
          </el-form-item>
          <el-form-item label="价格：" prop="info">
          <span>最低价格：{{ addorputForm.lowPrice }}</span>，
          <span>最高价格：{{ addorputForm.highPrice }}</span>，
          </el-form-item>
          <el-form-item label="类型：" prop="info">
          <span>{{ addorputForm.dealType }}</span>
          </el-form-item>
          <el-form-item label="房屋类型：" prop="info">
          <span>{{ addorputForm.homeType }}</span>
          </el-form-item>
          <el-form-item label="房屋面积：" prop="info">
          <span>{{ addorputForm.homeSize }}㎡</span>
          </el-form-item>
          <el-form-item label="委托类型：" prop="info">
          <span v-if="addorputForm.type == 0">매수</span>
          <span v-if="addorputForm.type == 1">팔다</span>
          </el-form-item>
          <el-form-item label="预计购买/卖时间：" prop="info">
          <span>{{ addorputForm.payTime }}</span>
          </el-form-item>
          <el-form-item label="访问日期/时间：" prop="info">
          <span>{{ addorputForm.comeTime }}</span>
          </el-form-item>
          <el-form-item label="委托人姓名：" prop="info">
          <span>{{ addorputForm.name }}</span>
          </el-form-item>
          <el-form-item label="委托人电话：" prop="info">
          <span>{{ addorputForm.phone }}</span>
          </el-form-item>
          <el-form-item label="委托人邮箱：" prop="info">
          <span>{{ addorputForm.emily }}</span>
          </el-form-item>
          <el-form-item label="具体委托详情：" prop="info">
          <span>{{ addorputForm.info }}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: "addOredit",
    props: {
      title: null,
    },
    data() {
      return {
        addorputVisible: false,
        addorputForm: {},
        editorOption: {},
        fileArr: [],
        rowId: null,
      };
    },
    methods: {
      //打开弹窗
      openDialogEven(obj) {
        this.addorputForm = {};
        this.addorputVisible = true;
        if (obj) {
          let images = []
          this.addorputForm = obj;
        }
      },
      handleClose() {
        this.addorputVisible = false;
        this.$parent.getList();
      },
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .editor-box {
    height: 600px;
    .editor {
      height: 100%;
    }
    ::v-deep .ql-container {
      height: 79%;
    }
  }
  </style>
  