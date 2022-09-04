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
    dialogFormSubmit() {},
    openVisible() {
      this.addorputVisible = true;
    },
    fileList(img) {
      console.log(img);
    },
  },
};
</script>

<style></style>
