<!--
 * @Description: 常见问题
 * @Author: wangcc
 * @Date: 2022-08-31 18:03:22
 * @LastEditors: wangcc
 * @LastEditTime: 2022-08-31 18:03:24
 * @FilePath: \jungehouseAdmin\src\views\question\question.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div class="app-container app-menu">
    <div class="topSearch base-background top-box">
      <div class="topSearch-base magin-base">
        <span>搜索问题：</span>
        <el-input
          class="topSearch-width"
          v-model="searchFrom.question"
          placeholder="请输入"
        ></el-input>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="searchQurey"
        >搜索</el-button
      >
      <el-button size="small" icon="el-icon-refresh-right" @click="reset"
        >重置</el-button
      >
    </div>
    <div class="content base-background">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-plus"
        @click="addQuestion"
        >添加问答(질문 및 답변 추가)</el-button
      >
      <div class="content-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%; margin-bottom: 20px"
          height="540"
        >
          <el-table-column
            type="index"
            label="序号(순번)"
            width="120"
            align="center"
            fixed="left"
          ></el-table-column>
          <el-table-column
            prop="question"
            label="问题(의문)"
            align="center"
            fixed="left"
          ></el-table-column>
          <el-table-column
            prop="answer"
            label="回复(회신하다)"
            align="center"
          ></el-table-column>
          <el-table-column label="操作(작동하다)" align="center">
            <template slot-scope="{ row }">
              <el-button
                @click="edit(row)"
                size="small"
                class="link-m"
                type="warning"
                >编辑(편집하다)</el-button
              >
              <el-popconfirm
              confirm-button-text="是的(예)"
                cancel-button-text="不用了(필요 없음)"
                @confirm="compDelete(row)"
                title="确定删除吗？(삭제 확인?)"
              >
                <el-button
                  type="danger"
                  size="small"
                  class="link-m"
                  slot="reference"
                  v-hasPermi="['personnel:delstaff:configure']"
                  >删除(삭제)</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--   分页   -->
      <div class="pagination-box" v-if="total > 0">
        <pagination
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <addDialog ref="addref" :title="title"></addDialog>
  </div>
</template>

<script>
import { delFaq, listFaq } from "@/api/question/index";
import addDialog from "./dialog/addOredit.vue";
export default {
  name: "question",
  components: {
    addDialog,
  },
  data() {
    return {
      title: null,
      total: 0,
      searchFrom: {},
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    searchQurey() {
      this.getList();
    },
    reset() {
      this.searchFrom = {};
      this.getList();
    },
    getList() {
      listFaq({ ...this.searchFrom, ...this.queryParams }).then((res) => {
        if (res.code == 200) {
          this.tableData = res.rows;
        }
      });
    },
    addQuestion() {
      this.title = "新增问答(질문 및 답변 추가)";
      this.$refs.addref.openDialogEven();
    },
    edit(row) {
      this.title = "修改问答(Q&A 수정)";
      this.$refs.addref.openDialogEven(row);
    },
    compDelete(row) {
      delFaq({ id: row.id }).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功！(성공적으로 삭제되었습니다!)");
          this.getList();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
