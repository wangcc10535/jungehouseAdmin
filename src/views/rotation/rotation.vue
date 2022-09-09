<!--
 * @Description: 轮播图
 * @Author: wangcc
 * @Date: 2022-08-31 17:16:55
 * @LastEditors: wangcc
 * @LastEditTime: 2022-09-01 11:50:42
 * @FilePath: \jungehouseAdmin\src\views\rotation\rotation.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved.
-->
<template>
  <div class="app-container app-menu">
    <div class="content base-background">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-plus"
        @click="addbanner"
        >添加广告</el-button
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
          <el-table-column label="图片" align="center">
            <template slot-scope="{ row }">
              <div class="img-box" v-viewer>
                <img :src="row.dictValue" alt="" />
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
    <banner ref="bannerRef" :title="diaitle"></banner>
  </div>
</template>

<script>
import banner from "./dialog/addRedit.vue";
import {addBanner, delBanner, getBanners} from "@/api/rotation";
export default {
  name: "rotation",
  components: { banner },
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
    addbanner() {
      this.diaitle = "新增广告";
      this.$refs.bannerRef.openVisible();
    },
    // 修改
    edit(item) {
      this.diaitle = "修改广告";
      this.$refs.bannerRef.openVisible(item);
    },
    // 删除
    compDelete(item) {
      // console.log(item)
      delBanner(item.dictCode).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getList();
        }
      });
    },
    // 列表查询
    getList() {
      getBanners().then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.total = res.total;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .img-box{
    width:192px;
    height: 45px;
    display: inline-block;
    img{
      width:100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }
</style>
