<!--
 * @Description: 新增或修改房产信息
 * @Author: wangcc
 * @Date: 2022-09-01 11:54:02
 * @LastEditors: wangcc
 * @LastEditTime: 2022-09-01 18:09:59
 * @FilePath: \jungehouseAdmin\src\views\order\dialog\addOrEdit.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="addorputVisible"
      width="60%"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="dialog-box">
        <el-form
          :model="addorputForm"
          ref="addorputForm"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="房产货号：" prop="homeNum">
            <span>{{ addorputForm.homeNum }}</span>
          </el-form-item>
          <el-form-item label="标题：" prop="title">
            <span>{{ addorputForm.title }}</span>
          </el-form-item>
          <el-form-item label="价格：">
            <div class="price-box">
              <div class="price-box-money">
                <span>总价：</span>
                <span class="money-input">{{ addorputForm.lastPrice }}</span>
              </div>
              <div class="price-box-money">
                <span>首付：</span>
                <span class="money-input">{{ addorputForm.roomPrice }}</span>
              </div>
              <div class="price-box-money">
                <span>贷款：</span>
                <span class="money-input">{{ addorputForm.loans }}</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="楼层：" prop="floor">
            <span>{{ addorputForm.floor }}</span>
          </el-form-item>
          <el-form-item label="房间数：" prop="roomNum">
            <span>{{ addorputForm.roomNum }}</span>
          </el-form-item>
          <el-form-item label="户数：" prop="familyNum">
            <span>{{ addorputForm.familyNum }}</span>
          </el-form-item>
          <el-form-item label="所在城市：" prop="city">
            <span>{{ addorputForm.city }}</span>
          </el-form-item>
          <el-form-item label="地点信息：" prop="address">
            <span>{{ addorputForm.address }}</span>
          </el-form-item>
          <el-form-item label="供给面积：" prop="area">
            <span>{{ addorputForm.area }}㎡</span>
          </el-form-item>
          <el-form-item label="实际面积：" prop="actual_area">
            <span>{{ addorputForm.actualArea }}㎡</span>
          </el-form-item>
          <el-form-item label="促销：" prop="marketingLabel">
            <el-select
              v-model="addorputForm.marketingLabel"
              disabled
              size="medium"
              style="width: 100%; margin-right: 10px"
              placeholder="请选择促销"
            >
              <el-option
                v-for="(item, index) in dict.type.promotion_type"
                :key="index"
                :label="item.label"
                :value="item.value"
                >{{ item.label }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="标题标签：" prop="titleLabel">
            <el-select
              v-model="addorputForm.titleLabel"
              size="medium"
              disabled
              style="width: 100%; margin-right: 10px"
              multiple
              placeholder="请选择标题标签"
            >
              <el-option
                v-for="(item, index) in dict.type.title_type"
                :key="index"
                :label="item.label"
                :value="item.value"
                >{{ item.label }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="防水：" prop="waterRepellent">
            <el-select
              v-model="addorputForm.waterRepellent"
              disabled
              size="medium"
              style="width: 100%; margin-right: 10px"
              placeholder="请选择防水"
            >
              <el-option
                v-for="(item, index) in dict.type.house_waterproof"
                :key="index"
                :label="item.label"
                :value="item.value"
                >{{ item.label }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="浴室：" prop="showerRoom">
            <el-select
              v-model="addorputForm.showerRoom"
              size="medium"
              disabled
              style="width: 100%; margin-right: 10px"
              placeholder="请选择浴室"
            >
              <el-option
                v-for="(item, index) in dict.type.house_shower"
                :key="index"
                :label="item.label"
                :value="item.value"
                >{{ item.label }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="暖气：" prop="heat">
            <el-select
              v-model="addorputForm.heat"
              disabled
              size="medium"
              style="width: 100%; margin-right: 10px"
              placeholder="请选择暖气"
            >
              <el-option
                v-for="(item, index) in dict.type.house_heating"
                :key="index"
                :label="item.label"
                :value="item.value"
                >{{ item.label }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="交易类型：" prop="tradeType">
            <el-select
              v-model="addorputForm.tradeType"
              size="medium"
              multiple
              disabled
              style="width: 100%; margin-right: 10px"
              placeholder="请选择交易类型"
            >
              <el-option
                v-for="(item, index) in dict.type.transaction_type"
                :key="index"
                :label="item.label"
                :value="item.value"
                >{{ item.label }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="销售类型：" prop="saleType">
            <el-select
              v-model="addorputForm.saleType"
              size="medium"
              disabled
              style="width: 100%; margin-right: 10px"
              placeholder="请选择销售类型"
            >
              <el-option
                v-for="(item, index) in dict.type.sale_type"
                :key="index"
                :label="item.label"
                :value="item.value"
                >{{ item.label }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="住宅类型：" prop="homeType">
            <el-select
              v-model="addorputForm.homeType"
              disabled
              size="medium"
              style="width: 100%; margin-right: 10px"
              placeholder="请选择住宅类型"
            >
              <el-option
                v-for="(item, index) in dict.type.residence_type"
                :key="index"
                :label="item.label"
                :value="item.value"
                >{{ item.label }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="地铁线路距离：">
            <div class="task-lngLat">
              <div
                class="lngLat-list"
                v-for="(item, index) in lngLatList"
                :key="index"
              >
                <!-- <el-select
                    v-model="item.city"
                    size="medium"
                    style="width: 200px; margin-right: 10px"
                    placeholder="请选择地铁线路"
                  >
                    <el-option
                      v-for="item in cityOptions"
                      :key="item.id"
                      :label="item.rangerName"
                      :value="{ value: item.id, label: item.rangerName }"
                    ></el-option>
                  </el-select> -->
                <el-input
                  class="address-size"
                  size="medium"
                  v-model="item.name"
                  disabled
                  placeholder="输入地铁"
                  autocomplete="off"
                ></el-input>
                <el-input
                  class="address-size"
                  size="medium"
                  v-model="item.info"
                  disabled
                  placeholder="输入站点距离（如：直竹站 1.5 公里）"
                  autocomplete="off"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="选项信息：" prop="checkboxGroup">
            <el-checkbox-group v-model="checkboxGroup" size="mini">
              <el-checkbox
                v-for="(item, index) in dict.type.house_information"
                :label="item.label"
                disabled
                :key="index"
                :value="item.value"
                border
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="房产周边：">
            <div class="task-lngLat">
              <div
                class="lngLat-list"
                v-for="(item, index) in peripheryList"
                :key="index"
              >
                <el-select
                  v-model="item.type"
                  size="medium"
                  disabled
                  style="width: 200px; margin-right: 10px"
                  placeholder="请选择周边类型"
                >
                  <el-option
                    v-for="(periphery, index) in dict.type.house_periphery"
                    :key="index"
                    :label="periphery.label"
                    :value="periphery.value"
                    >{{ periphery.label }}</el-option
                  >
                </el-select>
                <span>纬度：{{ item.lat }}，经度{{ item.lon }}</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="封面图片：">
            <el-image :src="addorputForm.image" style="width:148px;height:148px;object-fit: cover;">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </el-form-item>
          <el-form-item label="房屋图片：">
            <el-image :src="item.image" v-for="(item,index) in addorputForm.roomImages" :key="index" style="width:148px;height:148px;object-fit: cover;margin-right:10px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </el-form-item>
          <el-form-item label="绑定经纪人：" prop="middlemanId">
            <el-select
              v-model="addorputForm.middlemanId"
              size="medium"
              disabled
              value-key="funcKey"
              style="width: 200px; margin-right: 10px"
              placeholder="请选择经纪人"
            >
              <el-option
                v-for="(periphery, index) in agentOption"
                :key="index"
                :label="periphery.name"
                :value="periphery.id"
                >{{ periphery.name }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="经纪人电话：" prop="phone">
            <el-input
              v-model="addorputForm.phone"
              size="medium"
              disabled
              placeholder="输入经纪人电话"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="房屋状态：" prop="status">
            <el-switch
            disabled
              v-model="addorputForm.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="上架"
              inactive-text="下架"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>
          <el-form-item label="详情信息：" prop="item">
                <div v-html="addorputForm.item" style="width:80%"></div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listmiddleman } from "@/api/agent/index";
import { selectRoom } from "@/api/order/index";
export default {
  name: "addOrEdit",
  props: {
    title: null,
  },
  dicts: [
    "house_periphery",
    "house_information",
    "house_waterproof",
    "house_shower",
    "house_heating",
    "residence_type",
    "sale_type",
    "transaction_type",
    "title_type",
    "promotion_type",
  ],
  components: {},
  data() {
    return {
      selectType: "",
      uploadUrl: process.env.VUE_APP_BASE_API + "/common/upload", // 上传的图片服务器地址
      addorputVisible: false,
      mapVisible: false,
      rules: {},
      cityOptions: [],
      setLngLat: [],
      peripheryAddress: "",
      fileType: ["png", "jpg", "jpeg"],
      lngLatList: [],
      peripheryList: [],
      cities: [],
      checkboxGroup: [],
      imgDialogVisible: false,
      dialogImageUrl: null,
      bucket: "",
      addorputForm: {},
      editorOption: {},
      peripheryData: {},
      agentOption: [],
      pid: "0",
      countyOptions: [],
      streetOptions: [],
      cityOptions: [],
      searchFrom: {},
    };
  },
  created() {
    this.getmiddleman();
    //   this.getCity()
  },
  methods: {
    //打开弹窗
    openDialogEven(row) {
      // console.log(this.addorputForm);
      this.addorputVisible = true;
      this.gitDetail(row.id);
    },
    // 关闭弹窗
    handleClose() {
      this.addorputVisible = false;
      this.$parent.getList();
    },
    gitDetail(rowId) {
      selectRoom({ id: rowId }).then((res) => {
        if (res.code == 200) {
          this.addorputForm = res.data;
          if (this.addorputForm.titleLabel) {
            this.addorputForm.titleLabel =
              this.addorputForm.titleLabel.split(",");
          }
          if (this.addorputForm.tradeType) {
            this.addorputForm.tradeType =
              this.addorputForm.tradeType.split(",");
          }
          if (this.addorputForm.option) {
            this.checkboxGroup = this.addorputForm.option.split(",");
          }
          this.addorputForm.middlemanId = parseInt(this.addorputForm.middlemanId)
          this.lngLatList = this.addorputForm.roomSubways;
          this.peripheryList = this.addorputForm.roomNeighbors;

          console.log(this.addorputForm);
        }
      });
    },
    // 获取经纪人列表
    getmiddleman() {
      listmiddleman({}).then((res) => {
        this.agentOption = res.rows;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.price-box {
  // display: flex;
  &-money {
    margin-right: 10px;
    display: inline-flex;
    .money-input {
      width: 140px;
    }
  }
}
.address-size {
  width: 50%;
}
.dialog-box {
  height: 660px;
  overflow: auto;
}
.editor-box {
  height: 600px;
  .editor {
    height: 100%;
  }
  ::v-deep .ql-container {
    height: 79%;
  }
}
</style>
