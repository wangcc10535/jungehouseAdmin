<!--
 * @Description: 房产列表
 * @Author: wangcc
 * @Date: 2022-08-31 17:23:30
 * @LastEditors: wangcc
 * @LastEditTime: 2022-09-01 17:27:29
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
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="addOrder">添加房产</el-button>
      <div class="content-table">
        <el-table :data="tableData" border style="width: 100%; margin-bottom: 20px" height="540">
          <el-table-column type="index" label="序号" width="50" align="center" fixed="left"></el-table-column>
          <el-table-column prop="planName" label="货号" align="center" fixed="left"></el-table-column>
          <el-table-column prop="planName" label="标题" align="center"></el-table-column>
          <el-table-column prop="planName" label="位置" align="center"></el-table-column>
          <el-table-column prop="planName" label="价格" align="center"></el-table-column>
          <el-table-column prop="planName" label="供给面积" align="center"></el-table-column>
          <el-table-column prop="planName" label="实际面积" align="center"></el-table-column>
          <el-table-column prop="planName" label="房间" align="center"></el-table-column>
          <el-table-column prop="planName" label="选项信息" align="center"></el-table-column>
          <el-table-column prop="planName" label="促销标签" align="center"></el-table-column>
          <el-table-column prop="planName" label="标题促销" align="center"></el-table-column>
          <el-table-column prop="planName" label="图片" align="center"></el-table-column>
          <el-table-column prop="planName" label="状态" align="center" fixed="right"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="{row}">
              <el-button
                type="success"
                size="small"
                class="link-m"
                v-if="row.planStatus == 1"
                @click="rowSeeMap(row)"
              >详情</el-button>
              <el-button
                type="warning"
                size="small"
                class="link-m"
                @click="editRowPlan(row)"
              >编辑</el-button>
              <el-popconfirm
                confirm-button-text="是的"
                cancel-button-text="不用了"
                @confirm="delRow(row)"
                title="确定删除吗？"
              >
                <el-button type="danger" size="small" class="link-m" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--   分页   -->
      <div class="pagination-box">
        <pagination
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <addOrEdit ref="addFrom" :title="dialogTitle" :addorputForm="dataFrom"></addOrEdit>
  </div>
</template>

<script>
import addOrEdit from './dialog/addOrEdit.vue'

export default {
  name: 'orderList',
  components: {
    addOrEdit,
  },
  data() {
    return {
      searchFrom: {},
      total: 0,
      dialogTitle:null,
      dataFrom: {},
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    getList() {},
    addOrder() {
      this.dialogTitle = '添加房产信息'
      this.$refs.addFrom.openDialogEven();
      this.dataFrom = {
        name: '123'
      }
      // console.log();
    },
    delRow() {
      this.dialogTitle = '修改房产信息'
    },
    editRowPlan() {}
  }
};
</script>

<style  lang='scss' scoped>
</style>
