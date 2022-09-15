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
        <el-form-item label="经纪人姓名(중개인명)：" prop="name">
          <el-input
            v-model="addorputForm.name"
            size="medium"
            placeholder="输入经纪人姓名(브로커 이름 입력)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话(전화)：" prop="phone">
          <el-input
            v-model="addorputForm.phone"
            size="medium"
            placeholder="输入电话(브로커 전화번호를 입력하세요.)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="talk账号(talk계정)：" prop="talk">
          <el-input
            v-model="addorputForm.talk"
            size="medium"
            placeholder="输入talk账号(TALK 계좌번호 입력)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位(위치)：" prop="job">
          <el-input
            v-model="addorputForm.job"
            size="medium"
            placeholder="输入职位(직함을 입력하세요)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像(화신)：">
          <image-upload :limit="1"  @input="fileList" :value="addorputForm.headerImg"></image-upload>
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
        name: [{ required: true, message: "请输入经纪人姓名(브로커 이름 입력)", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话(브로커 전화번호를 입력하세요.)", trigger: "blur" }],
        talk: [{ required: true, message: "请输入talk账号(TALK 계좌번호 입력)", trigger: "blur" }],
        job: [{ required: true, message: "请输入职位(직함을 입력하세요)", trigger: "blur" }],
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
                this.$message.success("修改成功！(성공적으로 수정되었습니다!)");
                this.handleClose();
              }
            });
          } else {
            // console.log("xinzneng");
            addmiddleman({...this.addorputForm}).then((res) => {
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
