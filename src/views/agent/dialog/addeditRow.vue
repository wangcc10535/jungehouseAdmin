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
        <el-form-item label="经纪人姓名：" prop="name">
          <el-input
            v-model="addorputForm.name"
            size="medium"
            placeholder="输入经纪人姓名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="phone">
          <el-input
            v-model="addorputForm.phone"
            size="medium"
            placeholder="输入电话"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="talk账号：" prop="talk">
          <el-input
            v-model="addorputForm.talk"
            size="medium"
            placeholder="输入talk账号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位：" prop="job">
          <el-input
            v-model="addorputForm.job"
            size="medium"
            placeholder="输入职位"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像：">
          <image-upload :limit="1"  @input="fileList" :value="addorputForm.headerImg"></image-upload>
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
import { addmiddleman, editmiddleman } from "@/api/agent/index";
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
      fileListArr:[],
      rules: {
        name: [{ required: true, message: "请输入经纪人姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        talk: [{ required: true, message: "请输入talk账号", trigger: "blur" }],
        job: [{ required: true, message: "请输入职位", trigger: "blur" }],
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
        this.fileListArr.push(this.addorputForm.headerImg)
        this.rowId = obj.id;
      }
    },
    handleClose() {
      this.addorputVisible = false;
      this.$parent.getList();
    },
    fileList(item) {
      // console.log(item);
      this.addorputForm.headerImg = item
    },
    dialogFormSubmit() {
      // console.log(this.addorputForm);
      this.$refs["addorputForm"].validate((valid) => {
        if (valid) {
          if (this.rowId) {
            // console.log("xiugai");
            editmiddleman({...this.addorputForm}).then((res) => {
              if (res.code == 200) {
                this.$message.success("修改成功！");
                this.handleClose();
              }
            });
          } else {
            // console.log("xinzneng");
            addmiddleman({...this.addorputForm}).then((res) => {
              if (res.code == 200) {
                this.$message.success("新增成功！");
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
