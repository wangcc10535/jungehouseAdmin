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
        <el-input class="topSearch-width" v-model="searchFrom.title" placeholder="请输入"></el-input>
      </div>
    </div>
    <div class="content base-background">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="addComments">添加评论</el-button>
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
          <el-table-column label="标题" prop="title" align="center">
          </el-table-column>
          <el-table-column label="图片" align="center">
            <template slot-scope="{ row }">
              <div class="img-box" v-viewer>
                <img :src="row.image" alt="" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="上传时间" prop="createTime" align="center">
            <template slot-scope="{ row }">
              <span>{{parseTime(row.createTime)}}</span>
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
    <addialog ref="addialog" :title="diaitle"></addialog>
  </div>
</template>

<script>
  import addialog from './dialog/addialog.vue'
  import {delApplaud,listApplaud} from "@/api/comments";
export default {
  name: 'comments',
  components:{addialog},
  data() {
    return {
      searchFrom: {},
      diaitle: null,
      total: 0,
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
    //  新增
    addComments() {
      this.diaitle = "新增评论";
      this.$refs.addialog.openVisible();
    },
    // 修改
    edit(item) {
      this.diaitle = "修改评论";
      this.$refs.addialog.openVisible(item);
    },
    // 删除
    compDelete(item) {
      // console.log(item)
      delApplaud({id:item.id}).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getList();
        }
      });
    },
    // 列表查询
    getList() {
      listApplaud({...this.searchFrom,...this.queryParams}).then((res) => {
        if (res.code == 200) {
          this.tableData = res.rows;
          this.total = res.total;
        }
      });
    },
  },
};
</script>

<style  lang='scss' scoped>
   .img-box{
    width:76px;
    height: 76px;
    display: inline-block;
    img{
      width:100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }
</style>
