<!--
 * @Description: 合作企业
 * @Author: wangcc
 * @Date: 2022-08-31 17:36:04
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2022-10-28 01:24:06
 * @FilePath: \jungehouseAdmin\src\views\cooperation\cooperativeEnterprise.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div class="app-container app-menu">
    <div class="content base-background">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="addRegion"
        >添加合作企业</el-button
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
            width="50"
            align="center"
            fixed="left"
          ></el-table-column>
          <el-table-column label="企业链接" prop="dictLabel" align="center">
          </el-table-column>
          <el-table-column label="图片" align="center">
            <template slot-scope="{ row }">
              <div class="img-box" v-viewer>
                <img :src="row.dictValue" alt="" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作(운영하다)" align="center">
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
    <addialog ref="addialog" :title="diaitle"></addialog>
  </div>
</template>

<script>
import {delCooperation, getCooperation} from "@/api/cooperation";
import addialog from './dialog/addOreidt.vue'
export default {
  name: "region",
  components: {addialog},
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
    addRegion() {
      this.diaitle = "新增企业";
      this.$refs.addialog.openVisible();
    },
    // 修改
    edit(item) {
      this.diaitle = "修改企业";
      this.$refs.addialog.openVisible(item);
    },
    // 删除
    compDelete(item) {
      // console.log(item)
      delCooperation(item.dictCode).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功！(성공적으로 삭제되었습니다!)");
          this.getList();
        }
      });
    },
    // 列表查询
    getList() {
      getCooperation().then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .img-box{
    width:90px;
    height: 20px;
    display: inline-block;
    img{
      width:100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }
</style>
