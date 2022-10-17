<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2022-10-17 20:55:49
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2022-10-17 21:42:35
 * @FilePath: \jungehouseAdmin\src\views\about\video.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container app-menu">
        <div class="content base-background">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addRegion">添加视频</el-button>
            <div class="content-table">
                <el-table :data="tableData" border style="width: 100%; margin-bottom: 20px" height="540">
                    <el-table-column type="index" label="序号(순번)" width="50" align="center" fixed="left">
                    </el-table-column>
                    <el-table-column label="视频" align="center">
                        <template slot-scope="{ row }">
                            <div class="img-box" v-viewer>
                                <video :src="row.dictValue" ></video>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作(운영하다)" align="center">
                        <template slot-scope="{ row }">
                            <el-button @click="edit(row)" size="small" class="link-m" type="warning">编辑(편집하다)
                            </el-button>
                            <el-popconfirm confirm-button-text="是的(예)" cancel-button-text="不用了(필요 없음)"
                                @confirm="compDelete(row)" title="确定删除吗？(삭제 확인?)">
                                <el-button type="danger" size="small" class="link-m" slot="reference">删除(삭제)</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--   分页   -->
            <div class="pagination-box" v-if="total > 0">
                <pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                    @pagination="getList" />
            </div>
        </div>
        <addialog ref="addialog" :title="diaitle"></addialog>
    </div>
</template>
  
<script>
import {getVideo,delVideo} from '@/api/about'
import addialog from './dialog/addVideo'
export default {
    name: "region",
    components: { addialog },
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
            this.diaitle = "新增视频";
            this.$refs.addialog.openVisible();
        },
        // 修改
        edit(item) {
            this.diaitle = "修改视频";
            this.$refs.addialog.openVisible(item);
        },
        // 删除
        compDelete(item) {
            // console.log(item)
            delVideo(item.dictCode).then((res) => {
                if (res.code == 200) {
                    this.$message.success("删除成功！(성공적으로 삭제되었습니다!)");
                    this.getList();
                }
            });
        },
        // 列表查询
        getList() {
            getVideo().then((res) => {
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
.img-box {
    width: 28px;
    height: 37px;
    display: inline-block;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
    }
}
</style>