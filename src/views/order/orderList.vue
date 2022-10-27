<!--
 * @Description: 房产列表
 * @Author: wangcc
 * @Date: 2022-08-31 17:23:30
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2022-10-28 02:12:17
 * @FilePath: \jungehouseAdmin\src\views\order\orderList.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div class="app-container app-menu">
    <div class="topSearch base-background top-box">
      <div class="topSearch-base magin-base">
        <span>搜索：</span>
        <el-input
          class="topSearch-width"
          v-model="searchFrom.searchName"
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
        @click="addOrder"
        >添加房产(속성 추가)</el-button
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
            width="100"
            align="center"
            fixed="left"
          ></el-table-column>
          <el-table-column
            prop="homeNum"
            label="货号(문서 번호)"
            align="center"
            fixed="left"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="标题(제목)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="位置(위치)"
            align="center"
          ></el-table-column>
          <el-table-column label="价格(가격)" align="center" width="170">
            <template slot-scope="{ row }">
              <div style="display: flex; flex-direction: column">
                <span>总价(분양가)：{{ row.lastPrice }},</span>
                <span>首付(실입주금)：{{ row.roomPrice }},</span>
                <span>贷款(융자금)：{{ row.loans }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="area"
            label="供给面积(공급 지역)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="actualArea"
            label="实际面积(실제 면적)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="roomNum"
            label="房间(방)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="option"
            label="选项信息(옵션 정보)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="marketingLabel"
            label="促销标签(판촉 라벨)"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{
                selectDictLabel(dict.type.promotion_type, row.marketingLabel)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标题标签(제목 태그)" align="center">
            <template slot-scope="{ row }">
              <span v-if="row.titleLabel">{{
                selectDictLabels(dict.type.title_type, row.titleLabel)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="planName" label="图片(그림)" align="center">
            <template slot-scope="{ row }">
              <div class="rowImg" v-viewer>
                <img :src="row.image" alt="" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="planName"
            label="状态(상태)"
            align="center"
            fixed="right"
          >
            <template slot-scope="{ row }">
              <span>{{
                selectDictLabel(dict.type.house_status, row.status)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作(작동하다)"
            align="center"
            fixed="right"
            width="140"
          >
            <template slot-scope="{ row }">
              <el-button
                type="success"
                size="small"
                class="link-m"
                @click="rowSeeMap(row)"
                >详情(세부)</el-button
              >
              <el-button
                type="warning"
                size="small"
                class="link-m"
                @click="editRowPlan(row)"
                >编辑(편집하다)</el-button
              >
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
          @pagination="getList"
        />
      </div>
    </div>
    <addOrEdit ref="addFrom" :title="dialogTitle"></addOrEdit>
    <editRow ref="editFrom" :title="dialogTitle"></editRow>
    <detail ref="detailFrom" :title="dialogTitle"></detail>
  </div>
</template>

<script>
import addOrEdit from "./dialog/addOrEdit.vue";
import editRow from "./dialog/editlog.vue";
import detail from "./dialog/detaile.vue";
import { deleteRoom, searchRoom } from "@/api/order/index";
// house_status
export default {
  name: "orderList",
  components: {
    addOrEdit,
    editRow,
    detail,
  },
  dicts: ["house_status", "promotion_type", "title_type"],
  data() {
    return {
      searchFrom: {},
      total: 0,
      dialogTitle: null,
      dataFrom: {},
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
      searchRoom({ ...this.queryParams, ...this.searchFrom }).then((res) => {
        this.tableData = res.rows;
        this.total = res.total;
      });
    },
    rowSeeMap(row) {
      this.dialogTitle = "详情信息(세부)";
      this.$refs.detailFrom.openDialogEven(row);
    },
    addOrder() {
      this.dialogTitle = "添加房产信息( 부동산 등록)";
      this.$refs.addFrom.openDialogEven();
    },
    delRow(row) {
      deleteRoom({ id: row.id }).then((res) => {
        this.$message.success("删除成功！(성공적으로 삭제되었습니다)");
        this.getList();
      });
    },
    editRowPlan(row) {
      this.dialogTitle = "修改房产信息(속성 정보 수정)";
      this.$refs.editFrom.openDialogEven(row);
    },
  },
};
</script>

<style lang="scss" scoped>
.rowImg {
  width: 40px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
}
</style>
