<!--
 * @Description: 咨询
 * @Author: wangcc
 * @Date: 2022-09-01 11:52:55
 * @LastEditors: wangcc
 * @LastEditTime: 2022-09-01 11:52:56
 * @FilePath: \jungehouseAdmin\src\views\order\consulting.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div class="app-container app-menu">
    <div class="content base-background">
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
            prop="homeNum"
            label="房产货号(부동산 번호)"
            align="center"
            fixed="left"
          ></el-table-column>
          <el-table-column
            prop="mname"
            label="经纪人(브로커)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="用户电话(사용자 전화)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="require"
            label="咨询内容(상담내용)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="updateTime"
            label="提交时间(제출 시간)"
            align="center"
          ></el-table-column>
          <el-table-column label="操作(작동하다)" align="center" fixed="right">
            <template slot-scope="{ row }">
              <el-popconfirm
              confirm-button-text="是的(예)"
                cancel-button-text="不用了(필요 없음)"
                @confirm="delRow(row)"
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
      <div class="pagination-box">
        <pagination
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getlist"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { requireList, requireDel } from "@/api/order/index";
export default {
  name: "consulting",
  data() {
    return {
      tableData: [],
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created(){
    this.getlist();
  },
  methods:{
    getlist() {
      requireList({...this.queryParams}).then( res =>{
        if (res.code == 200) {
          this.tableData = res.rows;
          this.total = res.total;
        }
      })
    },
    delRow(row) {
      requireDel({id:row.id}).then( res =>{
        if (res.code == 200) {
          this.$message.success('删除成功')
          this.getlist()
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped></style>
