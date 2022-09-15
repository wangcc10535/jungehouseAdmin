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
        label-width="160px"
      >
        <el-form-item label="新闻标题(헤드라인)：" prop="newsTitle">
          <el-input
            v-model="addorputForm.newsTitle"
            size="medium"
            placeholder="输入标题(제목을 입력)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻简介(뉴스 브리프)：" prop="info">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入新闻简介(뉴스 브리핑을 입력하세요.)"
            v-model="addorputForm.info"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="作者(작가)：" prop="name">
          <el-input
            v-model="addorputForm.name"
            size="medium"
            placeholder="输入作者(작가 입력)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面(표지 사진)：">
          <image-upload ref="imgUpload" :limit="1" @input="fileList" :value="addorputForm.image"></image-upload>
        </el-form-item>
        <el-form-item label="正文(본문)：" prop="newsBody">
          <div class="editor-box">
            <editor class="editor" v-model="addorputForm.newsBody"></editor>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消(취소)</el-button>
        <el-button type="primary" @click="dialogFormSubmit" v-preventReClick
          >确 定(확신하는)</el-button
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
        newsTitle: [{ required: true, message: "请输入标题(제목을 입력하세요)", trigger: "blur" }],
        info: [{ required: true, message: "请输入简介(글의 소개를 입력해주세요)", trigger: "blur" }],
        name: [{ required: true, message: "请输入作者(작성자를 입력하세요.)", trigger: "blur" }],
        newsBody: [
          { required: true, message: "请输入正文内容(내용을 입력해주세요)", trigger: "blur" },
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
        // console.log(this.addorputForm);
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
      // console.log(this.addorputForm);
      this.$refs["addorputForm"].validate((valid) => {
        if (valid) {
          if (!this.addorputForm.image) {
            this.$message.error("必须添加封面图片(표지 이미지 필요)！");
            return false;
          }
          if (this.rowId) {
            editNews(this.addorputForm).then((res) => {
              if (res.code == 200) {
                this.$message.success("修改成功！(성공적으로 수정되었습니다!)");
                this.handleClose();
              }
            });
          } else {
            addNews(this.addorputForm).then((res) => {
              if (res.code == 200) {
                this.$message.success("新增成功(성공적으로 추가되었습니다)！");
                this.handleClose();
              }
            });
          }
        } else {
          // console.log("error submit!!");
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
