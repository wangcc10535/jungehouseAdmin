<!--
 * @Description: 房产列表
 * @Author: wangcc
 * @Date: 2022-08-31 17:23:30
 * @LastEditors: wangcc
 * @LastEditTime: 2022-09-01 11:58:40
 * @FilePath: \jungehouseAdmin\src\views\order\orderList.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div class="app-container app-menu">
    <div class="topSearch base-background top-box">
      <div class="topSearch-base magin-base">
        <span>搜索标题：</span>
        <el-input class="topSearch-width" v-model="searchFrom.planName" placeholder="请输入"></el-input>
      </div>
    </div>
    <div class="content base-background">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="addPlan">添加房产</el-button>
      <div class="content-table">
        <el-table :data="tableData" border style="width: 100%; margin-bottom: 20px" height="550">
          
        </el-table>
      </div>
      <!--   分页   -->
      <div class="pagination-box" >
        <pagination
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderList',
  data() {
    return {
      searchFrom: {},
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    getList() {}
  }
};
</script>

<style  lang='scss' scoped>
</style>
