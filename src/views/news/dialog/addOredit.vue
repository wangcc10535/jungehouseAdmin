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
        <el-form-item label="新闻简介：" prop="answer">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入新闻简介"
            v-model="addorputForm.answer"
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
        <el-form-item label="封面：" prop="name">
          <image-upload :limit="1"  @input="fileList"></image-upload>
        </el-form-item>
        <el-form-item label="正文：" prop="name">
          <div class="editor-box">
              <quill-editor
                ref="content"
                class="editor"
                v-model="addorputForm.newsBody"
                :options="editorOption"
              ></quill-editor>
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
      rowId: null,
      rules: {
        question: [{ required: true, message: "请输入问题", trigger: "blur" }],
        answer: [{ required: true, message: "请输入回答", trigger: "blur" }],
      },
    };
  },
  methods: {
    //打开弹窗
    openDialogEven(obj) {
      this.addorputForm = {};
      this.addorputVisible = true;
      if (obj) {
        this.addorputForm = obj;
        this.rowId = obj.id;
      }
    },
    handleClose() {
      this.addorputVisible = false;
      this.$parent.getList();
    },
    fileList(item) {
      console.log(item);
    },
    dialogFormSubmit() {
      console.log(this.addorputForm);
      this.$refs["addorputForm"].validate((valid) => {
        if (valid) {
          if (this.rowId) {
            console.log("xiugai");
            editNews(this.addorputForm).then((res) => {
              if (res.code == 200) {
                this.$message.success("修改成功！");
                this.handleClose();
              }
            });
          } else {
            console.log("xinzneng");
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
