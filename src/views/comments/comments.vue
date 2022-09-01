<!--
 * @Description: 客户评论
 * @Author: wangcc
 * @Date: 2022-09-01 10:25:20
 * @LastEditors: wangcc
 * @LastEditTime: 2022-09-01 11:15:32
 * @FilePath: \jungehouseAdmin\src\views\comments\comments.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div class="app-container app-menu">
    <div class="topSearch base-background top-box">
      <div class="topSearch-base magin-base">
        <span>搜索名称：</span>
        <el-input class="topSearch-width" v-model="searchFrom.planName" placeholder="请输入"></el-input>
      </div>
    </div>
    <div class="content base-background">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="addPlan">添加评论</el-button>
      <div class="content-table">客户评论</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comments',
  data() {
    return {
      searchFrom: {}
    };
  }
};
</script>

<style  lang='scss' scoped>
</style>
