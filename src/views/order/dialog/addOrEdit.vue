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
            <el-input
              v-model="addorputForm.homeNum"
              size="medium"
              placeholder="输入房产货号"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="标题：" prop="title">
            <el-input
              v-model="addorputForm.title"
              size="medium"
              placeholder="输入标题"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="价格：">
            <div class="price-box">
              <div class="price-box-money">
                <span>最少：</span>
                <el-input
                  size="medium"
                  type="number"
                  class="money-input"
                  v-model="addorputForm.lastPrice"
                  placeholder="输入最少价格"
                  autocomplete="off"
                ></el-input>
              </div>
              <div class="price-box-money">
                <span>房间：</span>
                <el-input
                  size="medium"
                  type="number"
                  class="money-input"
                  v-model="addorputForm.room_price"
                  placeholder="输入房间价格"
                  autocomplete="off"
                ></el-input>
              </div>
              <div class="price-box-money">
                <span>贷款：</span>
                <el-input
                  size="medium"
                  type="number"
                  class="money-input"
                  v-model="addorputForm.loans"
                  placeholder="输入贷款价格"
                  autocomplete="off"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="楼层：" prop="floor">
            <el-input
              v-model="addorputForm.floor"
              placeholder="输入楼层"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="地点信息：" prop="address">
            <el-input
              size="medium"
              class="address-size"
              v-model="addorputForm.address"
              placeholder="选择地点信息"
              autocomplete="off"
            ></el-input>
            <el-button
              size="medium"
              style="margin-left: 20px"
              icon="el-icon-location"
              @click="getLngLat('address')"
              >选择地点</el-button
            >
          </el-form-item>
          <el-form-item label="供给面积：" prop="area">
            <el-input
              type="number"
              size="medium"
              v-model="addorputForm.area"
              placeholder="输入供给面积"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="实际面积：" prop="actual_area">
            <el-input
              type="number"
              size="medium"
              v-model="addorputForm.actual_area"
              placeholder="输入实际面积"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="防水：" prop="waterRepellent">
            <el-select
              v-model="addorputForm.waterRepellent"
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
          <el-form-item label="交易类型：" prop="trade_type">
            <el-select
              v-model="addorputForm.trade_type"
              size="medium"
              multiple
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
          <el-form-item label="销售类型：" prop="sale_type">
            <el-select
              v-model="addorputForm.sale_type"
              size="medium"
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
          <el-form-item label="住宅类型：" prop="home_type">
            <el-select
              v-model="addorputForm.home_type"
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
                <el-select
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
                </el-select>
                <el-input
                  class="address-size"
                  size="medium"
                  v-model="item.distance"
                  placeholder="输入站点距离（如：直竹站 1.5 公里）"
                  autocomplete="off"
                ></el-input>
                <el-link
                  type="danger"
                  class="link-m"
                  :underline="false"
                  @click="delLngLat(item, index)"
                  >删除</el-link
                >
              </div>
              <el-link type="primary" :underline="false" @click="addLngLat"
                >添加地铁线路</el-link
              >
            </div>
          </el-form-item>
          <el-form-item label="选项信息：" prop="checkboxGroup">
            <el-checkbox-group v-model="checkboxGroup" size="mini">
              <el-checkbox
                v-for="(item, index) in dict.type.house_information"
                :label="item.label"
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
                <span>{{ item.peripheryAddress }}</span>
                <el-input
                  type="hidden"
                  v-model="item.latLng"
                  style="width: 10px"
                ></el-input>
                <el-link
                  type="danger"
                  class="link-m"
                  :underline="false"
                  @click="setPeriphery('periphery')"
                  >选择地点</el-link
                >
                <el-link
                  type="danger"
                  class="link-m"
                  :underline="false"
                  @click="delPeriphery(item, index)"
                  >删除</el-link
                >
              </div>
              <el-link type="primary" :underline="false" @click="addPeriphery"
                >添加周边信息</el-link
              >
            </div>
          </el-form-item>
          <el-form-item label="房屋图片：">
            <image-upload :limit="20" @input="fileList"></image-upload>
          </el-form-item>
          <el-form-item label="绑定经纪人：" prop="rangerNo">
            <el-select
              v-model="addorputForm.value"
              size="medium"
              style="width: 200px; margin-right: 10px"
              placeholder="请选择经纪人"
            >
              <el-option
                v-for="(periphery, index) in dict.type.house_periphery"
                :key="index"
                :label="periphery.label"
                :value="periphery.value"
                >{{ periphery.label }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="经纪人电话：" prop="rangerNo">
            <el-input
              v-model="addorputForm.rangerNo"
              size="medium"
              placeholder="输入经纪人电话"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="房屋状态：" prop="rangerNo">
            <el-switch
              v-model="addorputForm.switch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="上架"
              inactive-text="下架"
            ></el-switch>
          </el-form-item>
          <el-form-item label="详情信息：" prop="rangerNo">
            <div class="editor-box">
              <editor class="editor" v-model="addorputForm.newsBody"></editor>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit" v-preventReClick
          >确 定</el-button
        >
      </div>
      <el-dialog
        title="位置搜索"
        :visible.sync="mapVisible"
        v-if="mapVisible"
        append-to-body
        width="60%"
        @close="clickClose"
      >
        <naver-map
          ref="naverMap"
          v-if="mapVisible"
          :setLngLat="setLngLat"
          :selType="selectType"
          @clickClose="clickClose"
        ></naver-map>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import naverMap from "./naverMap.vue";
import FileUpload from "../../../components/FileUpload/index.vue";
import ImageUpload from "../../../components/ImageUpload/index.vue";
import { listmiddleman } from "@/api/agent/index";
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
  ],
  components: {
    naverMap,
    FileUpload,
    ImageUpload,
  },
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
      addorputForm: {
        imageList: [],
      },
      editorOption: {},
      peripheryData: {},
    };
  },
  created() {
    this.getmiddleman();
  },
  methods: {
    //打开弹窗
    openDialogEven() {
      console.log(this.addorputForm);
      this.addorputVisible = true;
      if (!this.addorputForm) {
        this.lngLatList = [];
      }
    },
    // 关闭弹窗
    handleClose() {
      this.addorputVisible = false;
      this.$parent.getList();
    },
    // 添加房产信息
    dialogFormSubmit() {
      console.log(this.peripheryList);
    },
    // 打开地图选项天窗
    getLngLat(name) {
      // this.$refs.naverMap.openMapDialogEven()
      this.mapVisible = true;
      this.selectType = name;
    },
    // 关闭地图弹窗
    clickClose(data) {
      console.log(data);
      if (data && data.selType == "address") {
        this.addorputForm.lon = data.lng;
        this.addorputForm.lat = data.lat;
        this.addorputForm.address = data.address;
      } else if (data && data.selType == "periphery") {
        this.peripheryList.push({
          type: '',
          lon:data.lng,
          lat:data.lat,
          peripheryAddress:data.address
        })
        console.log(this.peripheryList);
      }
      this.mapVisible = false;
    },
    // 添加地铁线路
    addLngLat() {
      this.lngLatList.push({
        city: "",
        distance: "",
      });
    },
    // 删除地铁线路
    delLngLat(item, index) {
      if (this.lngLatList) {
        this.lngLatList.splice(index, 1);
      }
    },
    // 添加房产周边
    addPeriphery() {
      // this.peripheryList.push({
      //   type: "",
      //   lat: "",
      //   lon: "",
      //   peripheryAddress: "",
      // });
      this.setPeriphery('periphery')
    },
    // 选择周边位置
    setPeriphery(name) {
      this.setLngLat = [];
      this.mapVisible = true;
      this.selectType = name;
      this.setLngLat = [this.addorputForm.lat, this.addorputForm.lon];
    },
    // 删除选择周边
    delPeriphery(item, index) {
      if (this.peripheryList) {
        this.peripheryList.splice(index, 1);
      }
    },
    // 获取上传图片地址
    fileList(item) {
      console.log(item);
    },
    // 获取经纪人列表
    getmiddleman() {
      listmiddleman({}).then((res) => {
        console.log(res);
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
