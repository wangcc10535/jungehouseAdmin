<template>
    <div>
      <el-dialog
        :title="title"
        :visible.sync="addorputVisible"
        width="60%"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        :before-close="handleClose"
      >
        <el-form
          :model="addorputForm"
          ref="addorputForm"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="标题(제목)：">
            <el-input
              v-model="addorputForm.title"
              size="medium"
              placeholder="输入标题(제목을 입력)"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="封面(표지 사진)：">
            <image-upload
              ref="imgUpload"
              :limit="1"
              @input="fileList"
              :value="addorputForm.image"
            ></image-upload>
          </el-form-item>
          <el-form-item label="正文(세부)：">
            <div class="editor-box">
            <editor class="editor" v-model="addorputForm.info"></editor>
          </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消(취소)</el-button>
          <el-button type="primary" @click="dialogFormSubmit" v-preventReClick
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import {addApplaud,editApplaud} from "@/api/comments";
  
  export default {
    props: {
      title: null,
    },
    data() {
      return {
        addorputVisible: false,
        addorputForm: {},
        rules: {}
      };
    },
    methods: {
      handleClose() {
        this.addorputVisible = false;
      },
      dialogFormSubmit() {
        // console.log(this.addorputForm);
        if(this.addorputForm.id) {
          editApplaud({...this.addorputForm}).then((res) => {
          if (res.code == 200) {
            this.$message.success("修改成功！(성공적으로 수정되었습니다!)");
            this.handleClose();
            this.$parent.getList()
          }
        });
        }else{
          addApplaud({...this.addorputForm}).then((res) => {
          if (res.code == 200) {
            this.$message.success("新增成功(성공적으로 추가되었습니다)！");
            this.handleClose();
            this.$parent.getList()
          }
        });
        }
       

      },
      openVisible(obj) {
        this.addorputForm = {};
        this.addorputVisible = true;
        if(obj) {
          this.addorputForm = obj
        }
      },
      fileList(img) {
        this.addorputForm.image = img
        // console.log(img);
      },
    },
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
  