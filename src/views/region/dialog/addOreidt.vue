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
        <el-form-item label="地区名称：">
          <el-input
            v-model="addorputForm.dictLabel"
            size="medium"
            placeholder="输入地区名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="广告：">
          <image-upload
            ref="imgUpload"
            :limit="1"
            @input="fileList"
            :value="addorputForm.dictValue"
          ></image-upload>
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
import { addRegion, editRegion } from "@/api/region";

export default {
  props: {
    title: null,
  },
  data() {
    return {
      addorputVisible: false,
      addorputForm: {},
      rules: {},
    };
  },
  methods: {
    handleClose() {
      this.addorputVisible = false;
    },
    dialogFormSubmit() {
      // console.log(this.addorputForm);
      var version = {
        dictType: "region",
        dictLabel: this.addorputForm.dictLabel,
        dictValue: this.addorputForm.dictValue,
      };
      // console.log(this.addorputForm.dictCode);
      if (this.addorputForm.dictCode) {
        editRegion({ ...version, dictCode: this.addorputForm.dictCode }).then(
          (res) => {
            this.$message.success("修改成功！(성공적으로 수정되었습니다!)");
            this.handleClose();
            this.$parent.getList();
          }
        );
      } else {
        addRegion(version).then((res) => {
          // console.log(res)
          if (res.code == 200) {
            this.$message.success("新增成功(성공적으로 추가되었습니다)！");
            this.handleClose();
            this.$parent.getList();
          }
        });
      }
    },
    openVisible(obj) {
      this.addorputForm = {};
      this.addorputVisible = true;
      if (obj) {
        // console.log(obj);
        this.addorputForm = obj;
      }
    },
    fileList(img) {
      this.addorputForm.dictValue = img;
      console.log(img);
    },
  },
};
</script>

<style></style>
