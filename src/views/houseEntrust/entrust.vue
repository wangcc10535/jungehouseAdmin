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
            width="50"
            align="center"
            fixed="left"
          ></el-table-column>
          <el-table-column prop="name" label="区域" align="center" fixed="left">
            <template slot-scope="{ row }">
              <span>{{ row.province }}{{ row.city }}{{ row.district }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低价格" prop="lowPrice" align="center">
          </el-table-column>
          <el-table-column
            prop="highPrice"
            label="最高价格"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="委托人"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="emily"
            label="邮箱"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="info"
            label="委托需求"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="委托类型"
            align="center"
          >
          <template slot-scope="{ row }">
            <span>{{selectDictLabel(dict.type.entrust_type,row.type)}}</span>
          </template>
        </el-table-column>
          <el-table-column label="操作(운영하다)" align="center" width="220">
            <template slot-scope="{ row }">
              <el-button
                @click="detail(row)"
                size="small"
                class="link-m"
                type="warning"
                >详情</el-button
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
import { qnaList, delQna } from "@/api/entrust/index";
import addDialog from "./dialog/addDialog.vue";
export default {
  name: "news",
  components: {
    addDialog,
  },
  dicts: ['entrust_type'],
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
      qnaList({ ...this.queryParams, type: "-1", show: "-1" }).then((res) => {
        if (res.code == 200) {
          this.tableData = res.rows;
        }
      });
    },
    detail(row) {
      this.title = "查看委托详情";
      this.$refs.addref.openDialogEven(row);
    },
    compDelete(row) {
      delQna({ id: row.id }).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功！(성공적으로 삭제되었습니다!)");
          this.getList();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.headerImg-box {
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #ccc;
  padding: 2px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
