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
        <el-form-item label="新闻标题：" prop="newsTitle">
          <el-input
            v-model="addorputForm.newsTitle"
            size="medium"
            placeholder="输入标题"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻简介：" prop="info">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入新闻简介"
            v-model="addorputForm.info"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="name">
          <el-input
            v-model="addorputForm.name"
            size="medium"
            placeholder="输入作者"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面：">
          <image-upload ref="imgUpload" :limit="1" @input="fileList" :fileListArr="fileArr"></image-upload>
        </el-form-item>
        <el-form-item label="正文：" prop="newsBody">
          <div class="editor-box">
            <editor class="editor" v-model="addorputForm.newsBody"></editor>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit" v-preventReClick
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addNews, editNews } from "@/api/news/index";
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
      rules: {
        newsTitle: [{ required: true, message: "请输入标题", trigger: "blur" }],
        info: [{ required: true, message: "请输入简介", trigger: "blur" }],
        name: [{ required: true, message: "请输入作者", trigger: "blur" }],
        newsBody: [
          { required: true, message: "请输入正文内容", trigger: "blur" },
        ],
        // answer: [{ required: true, message: "请输入回答", trigger: "blur" }],
      },
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
        images.push({
          name:obj.image,
          url:obj.image
        })
        this.fileArr = images
        this.rowId = obj.id;
        console.log(this.addorputForm);
      }
    },
    handleClose() {
      this.addorputVisible = false;
      this.$parent.getList();
    },
    fileList(item) {
      this.addorputForm.image = item;
    },
    dialogFormSubmit() {
      console.log(this.addorputForm);
      this.$refs["addorputForm"].validate((valid) => {
        if (valid) {
          if (!this.addorputForm.image) {
            this.$message.error("必须添加封面图片！");
            return false;
          }
          if (this.rowId) {
            editNews(this.addorputForm).then((res) => {
              if (res.code == 200) {
                this.$message.success("修改成功！");
                this.handleClose();
              }
            });
          } else {
            addNews(this.addorputForm).then((res) => {
              if (res.code == 200) {
                this.$message.success("新增成功！");
                this.handleClose();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
