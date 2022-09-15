<!--
 * @Description: 隐私声明
 * @Author: wangcc
 * @Date: 2022-08-31 17:51:57
 * @LastEditors: wangcc
 * @LastEditTime: 2022-08-31 17:51:59
 * @FilePath: \jungehouseAdmin\src\views\about\statement.vue
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
  import {addStatement,getStatement,editStatement} from '@/api/about'
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
        dictType: "statement",
        dictLabel: '隐私声明',
        dictValue: this.addorputForm.toString(),
        dictCode: this.aboutBody.dictCode
      };
      // console.log(version);
      editStatement(version).then((res) => {
        if (res.code == 200) {
          this.$message.success("修改成功！(성공적으로 수정되었습니다!)");
          // this.getList();
        }
      });
    },
    addeditor() {
      var version = {
        dictType: "statement",
        dictLabel: '隐私声明',
        dictValue: this.addorputForm,
      };
      addStatement(version).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.$message.success("新增成功(성공적으로 추가되었습니다)！");
          this.getList();
        }
      });
    },
    getlist() {
      getStatement().then((res) => {
        if (res.code == 200) {
          this.aboutBody = res.data[0];
          this.addorputForm = this.aboutBody.dictValue
          // console.log(this.aboutBody);
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
