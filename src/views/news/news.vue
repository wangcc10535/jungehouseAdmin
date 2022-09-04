<!--
 * @Description: 新闻
 * @Author: wangcc
 * @Date: 2022-08-31 18:03:22
 * @LastEditors: wangcc
 * @LastEditTime: 2022-08-31 18:03:24
 * @FilePath: \jungehouseAdmin\src\views\news\news.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
    <div class="app-container app-menu">
      <div class="topSearch base-background top-box">
        <div class="topSearch-base magin-base">
          <span>搜索标题：</span>
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
          >添加新闻</el-button
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
              label="序号"
              width="50"
              align="center"
              fixed="left"
            ></el-table-column>
            <el-table-column
              prop="newsTitle"
              label="标题"
              align="center"
              fixed="left"
            ></el-table-column>
            <el-table-column
              prop="info"
              label="简介"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="作者"
              align="center"
            ></el-table-column>
            <el-table-column
              label="封面"
              align="center"
            >
            <template slot-scope="{ row }">
              <div class="img-box">
                <img :src="row.image" alt="">
              </div>
            </template>
          </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="{ row }">
                <el-button
                  @click="edit(row)"
                  size="small"
                  class="link-m"
                  type="warning"
                  >编辑</el-button
                >
                <el-popconfirm
                  confirm-button-text="是的"
                  cancel-button-text="不用了"
                  @confirm="compDelete(row)"
                  title="确定删除吗？"
                >
                  <el-button
                    type="danger"
                    size="small"
                    class="link-m"
                    slot="reference"
                    v-hasPermi="['personnel:delstaff:configure']"
                    >删除</el-button
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
  import { delNews, listNews } from "@/api/news/index";
  import addDialog from "./dialog/addOredit.vue";
  export default {
    name: "news",
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
        listNews({ ...this.searchFrom, ...this.queryParams }).then((res) => {
          if (res.code == 200) {
            this.tableData = res.rows;
          }
        });
      },
      addQuestion() {
        this.title = "新增新闻";
        this.$refs.addref.openDialogEven();
      },
      edit(row) {
        this.title = "修改新闻";
        this.$refs.addref.openDialogEven(row);
      },
      compDelete(row) {
        delNews({ id: row.id }).then((res) => {
          if (res.code == 200) {
            this.$message.success("删除成功！");
            this.getList();
          }
        });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
    .img-box{
      width: 40px;
      height: 50px;
      display: inline-block;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  </style>
  