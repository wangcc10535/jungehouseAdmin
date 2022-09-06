<!--
 * @Description: 服务条款
 * @Author: wangcc
 * @Date: 2022-08-31 17:51:08
 * @LastEditors: wangcc
 * @LastEditTime: 2022-08-31 17:51:09
 * @FilePath: \jungehouseAdmin\src\views\about\terms.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div class="app-container app-menu">
    <div class="content base-background">
      <div class="content-table">
        <div class="editor-box">
          <editor class="editor" v-model="addorputForm"></editor>
        </div>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button @click="addeditor">新增</el-button> -->
          <el-button type="primary" @click="dialogFormSubmit" v-preventReClick
            >确 定</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addTerms,getTerms,editTerms} from '@/api/about'
export default {
  name: "aboutus",
  data() {
    return {
      addorputForm: '',
      aboutBody: {},
      editor: true,
      tableData: []
    };
  },
  created() {
    this.getlist()
  },
  methods: {
    handleClose() {},
    dialogFormSubmit() {
      var version = {
        dictType: "terms",
        dictLabel: '服务条款',
        dictValue: this.addorputForm.toString(),
        dictCode: this.aboutBody.dictCode
      };
      editTerms(version).then((res) => {
        if (res.code == 200) {
          this.$message.success("修改成功！");
          // this.getList();
        }
      });
    },
    addeditor() {
      var version = {
        dictType: "terms",
        dictLabel: '服务条款',
        dictValue: this.addorputForm,
      };
      addTerms(version).then((res) => {
        if (res.code == 200) {
          this.$message.success("新增成功！");
          this.getList();
        }
      });
    },
    getlist() {
      getTerms().then((res) => {
        if (res.code == 200) {
          this.aboutBody = res.data[0];
          this.addorputForm = this.aboutBody.dictValue
        }
      });
    }
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