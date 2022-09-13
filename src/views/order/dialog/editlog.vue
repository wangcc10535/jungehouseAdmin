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
                <span>总价：</span>
                <el-input
                  size="medium"
                  type="number"
                  class="money-input"
                  v-model="addorputForm.lastPrice"
                  placeholder="输入总价价格"
                  autocomplete="off"
                ></el-input>
              </div>
              <div class="price-box-money">
                <span>首付：</span>
                <el-input
                  size="medium"
                  type="number"
                  class="money-input"
                  v-model="addorputForm.roomPrice"
                  placeholder="输入首付金额"
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
          <el-form-item label="房间数：" prop="roomNum">
            <el-input
              v-model="addorputForm.roomNum"
              placeholder="输入房间数"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="户数：" prop="familyNum">
            <el-input
              v-model="addorputForm.familyNum"
              placeholder="输入户数"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="所在城市：" prop="city">
            <el-select
              v-model="searchFrom.city"
              @change="cityChange('1', $event)"
              class="search-select"
              placeholder="选择城市"
            >
              <el-option
                v-for="item in cityOptions"
                :key="item.code"
                :label="item.name"
                :value="{ label: item.name, value: item.code }"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="searchFrom.county"
              @change="cityChange('2', $event)"
              class="search-select"
              placeholder="-"
            >
              <el-option
                v-for="item in countyOptions"
                :key="item.code"
                :label="item.name"
                :value="{ label: item.name, value: item.code }"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="searchFrom.street"
              class="search-select"
              placeholder="-"
            >
              <el-option
                v-for="item in streetOptions"
                :key="item.code"
                :label="item.name"
                :value="{ label: item.name, value: item.code }"
              >
              </el-option>
            </el-select>
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
              v-model="addorputForm.actualArea"
              placeholder="输入实际面积"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="促销：" prop="marketingLabel">
            <el-select
              v-model="addorputForm.marketingLabel"
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
          <el-form-item label="交易类型：" prop="tradeType">
            <el-select
              v-model="addorputForm.tradeType"
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
          <el-form-item label="销售类型：" prop="saleType">
            <el-select
              v-model="addorputForm.saleType"
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
          <el-form-item label="住宅类型：" prop="homeType">
            <el-select
              v-model="addorputForm.homeType"
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
                  placeholder="输入地铁"
                  autocomplete="off"
                ></el-input>
                <el-input
                  class="address-size"
                  size="medium"
                  v-model="item.info"
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
          <el-form-item label="封面图片：">
            <image-upload
              :limit="1"
              @input="titleImg"
              :value="addorputForm.image"
            ></image-upload>
          </el-form-item>
          <el-form-item label="房屋图片：">
            <image-upload
              :limit="20"
              @input="fileList"
              :value="imageFromList"
            ></image-upload>
          </el-form-item>
          <el-form-item label="绑定经纪人：" prop="middlemanId">
            <el-select
              v-model="addorputForm.middlemanId"
              size="medium"
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
              placeholder="输入经纪人电话"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="房屋状态：" prop="status">
            <el-switch
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
            <div class="editor-box">
              <editor class="editor" v-model="addorputForm.item"></editor>
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
import {
  addRoom,
  updateRoom,
  addressList,
  selectRoom,
} from "@/api/order/index";
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
      addorputForm: {},
      editorOption: {},
      peripheryData: {},
      agentOption: [],
      pid: "0",
      countyOptions: [],
      streetOptions: [],
      cityOptions: [],
      searchFrom: {},
      imageFromList: [],
    };
  },
  created() {
    this.getmiddleman();
    this.getCity();
  },
  methods: {
    //打开弹窗
    openDialogEven(row) {
      // console.log(this.addorputForm);
      this.addorputVisible = true;
      this.gitDetail(row.id);
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
          this.addorputForm.middlemanId = parseInt(
            this.addorputForm.middlemanId
          );
          this.imageFromList = [];
          if (this.addorputForm.roomImages) {
            this.addorputForm.roomImages.forEach((item) => {
              this.imageFromList.push(item.image);
            });
          }

          this.lngLatList = this.addorputForm.roomSubways;
          this.peripheryList = this.addorputForm.roomNeighbors;
        }
      });
    },
    // 关闭弹窗
    handleClose() {
      this.addorputVisible = false;
      this.$parent.getList();
    },
    // 获取城市
    getCity(index, e) {
      // console.log(e);
      if (index == 1) {
        this.pid = e.value;
      } else if (index == 2) {
        this.pid = e.value;
      } else {
        this.pid = "0";
      }
      addressList({ pid: this.pid }).then((res) => {
        // console.log(res);
        if (index == 1) {
          this.countyOptions = res.rows;
        } else if (index == 2) {
          this.streetOptions = res.rows;
        } else {
          this.cityOptions = res.rows;
        }
      });
    },
    // 选择城市
    cityChange(index, e) {
      // console.log(index);
      // console.log(e);
      this.getCity(index, e);
    },
    // 添加房产信息
    dialogFormSubmit() {
      this.addorputForm.option = this.checkboxGroup.toString();
      this.addorputForm.roomNeighbors = this.peripheryList;
      this.addorputForm.roomSubways = this.lngLatList;
      this.addorputForm.marketingLabel =
        this.addorputForm.marketingLabel.toString();
      this.addorputForm.titleLabel = this.addorputForm.titleLabel.toString();
      this.addorputForm.tradeType = this.addorputForm.tradeType.toString();
      if (
        !this.searchFrom.city ||
        !this.searchFrom.county ||
        !this.searchFrom.street
      ) {
        this.$message.error("请选择所在城市（도시를 선택하세요）");
        return false;
      }
      this.addorputForm.city =
        this.searchFrom.city.label +
        "," +
        this.searchFrom.county.label +
        "," +
        this.searchFrom.street.label;
      // console.log(this.addorputForm);
    
      updateRoom({ ...this.addorputForm }).then((res) => {
        if (res.code == 200) {
          this.$message.success("新增成功！");
          this.handleClose();
          this.$parent.getList();
        }
      });
    },
    // 打开地图选项天窗
    getLngLat(name) {
      // this.$refs.naverMap.openMapDialogEven()
      this.mapVisible = true;
      this.selectType = name;
    },
    // 关闭地图弹窗
    clickClose(data) {
      // console.log(data);
      if (data && data.selType == "address") {
        this.addorputForm.lon = data.lng;
        this.addorputForm.lat = data.lat;
        this.addorputForm.address = data.address;
      } else if (data && data.selType == "periphery") {
        this.peripheryList.push({
          type: "",
          lon: data.lng,
          lat: data.lat,
          peripheryAddress: data.address,
        });
        // console.log(this.peripheryList);
      }
      this.mapVisible = false;
    },
    // 添加地铁线路
    addLngLat() {
      this.lngLatList.push({
        name: "",
        info: "",
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
      this.setPeriphery("periphery");
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
      this.addorputForm.roomImages = [];
      let Images = item.split(",");
      Images.forEach((item) => {
        let imgData = {};
        imgData.image = item;
        this.addorputForm.roomImages.push(imgData);
      });
      // console.log(this.addorputForm.roomImages);
    },
    // 获取封面地址
    titleImg(imig) {
      this.addorputForm.image = "";
      this.addorputForm.image = imig;
    },
    // 获取经纪人列表
    getmiddleman() {
      listmiddleman({}).then((res) => {
        this.agentOption = res.rows;
      });
    },
    // 经纪人电话
    agentChange(e) {
      console.log(e);
      this.getPhone(e);
    },
    getPhone(e) {
      this.addorputForm.phone = "";
      this.agentOption.forEach((item) => {
        if ((item.id = e)) {
          this.addorputForm.phone = item.phone;
        }
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
