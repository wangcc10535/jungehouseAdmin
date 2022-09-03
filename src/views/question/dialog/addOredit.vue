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
        <el-form-item label="问题：" prop="question">
          <el-input
            v-model="addorputForm.question"
            size="medium"
            placeholder="输入问题"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="回答：" prop="answer">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addorputForm.answer"
          >
          </el-input>
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
import { addFaq, editFaq } from "@/api/question/index";
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
    dialogFormSubmit() {
      console.log(this.addorputForm);
      this.$refs["addorputForm"].validate((valid) => {
        if (valid) {
          if (this.rowId) {
            console.log("xiugai");
            editFaq(this.addorputForm).then((res) => {
              if (res.code == 200) {
                this.$message.success("修改成功！");
                this.handleClose();
              }
            });
          } else {
            console.log("xinzneng");
            addFaq(this.addorputForm).then((res) => {
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

<style></style>
