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
        <el-form-item label="序号：">
          <el-input
            v-model="addorputForm.newsTitle"
            size="medium"
            placeholder="输入序号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="广告：">
          <image-upload
            ref="imgUpload"
            :limit="1"
            @input="fileList"
          ></image-upload>
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
import {addFaq} from "@/api/question";
import {addBanner} from "@/api/rotation";

export default {
  props: {
    title: null,
  },
  data() {
    return {
      addorputVisible: false,
      addorputForm: {
      },
      rules: {}
    };
  },
  methods: {
    handleClose() {
      this.addorputVisible = false;
    },
    dialogFormSubmit() {
      console.log(this.addorputForm);

      var  version ={
        "dictType":"banner",
        "dictLabel": this.addorputForm.newsTitle,
        "dictValue":this.addorputForm.image
      }

      addBanner(version).then((res) => {
        console.log(res)

        if (res.code == 200) {
          this.$message.success("新增成功！");
          this.handleClose();
          this.$parent.getList()
        }
      });
    },
    openVisible() {
      this.addorputForm = {};
      this.addorputVisible = true;
    },
    fileList(img) {
      this.addorputForm.image = img
      console.log(img);
    },
  },
};
</script>

<style></style>
