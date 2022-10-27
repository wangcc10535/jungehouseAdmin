<!--
 * @Description: 新增或修改房产信息
 * @Author: wangcc
 * @Date: 2022-09-01 11:54:02
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2022-10-28 02:16:59
 * @FilePath: \jungehouseAdmin\src\views\order\dialog\addOrEdit.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved.
-->
<template>
  <div>
    <el-dialog :title="title" :visible.sync="addorputVisible" v-if="addorputVisible" width="80%"
      :destroy-on-close="true" :close-on-click-modal="false" :before-close="handleClose">
      <div class="dialog-box">
        <el-form :model="addorputForm" ref="addorputForm" :rules="rules" label-width="180px">
          <el-form-item label="房产货号(부동산 번호)：" prop="homeNum">
            <el-input v-model="addorputForm.homeNum" size="medium" placeholder="输入房产货号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="标题(제목)：" prop="title">
            <el-input v-model="addorputForm.title" size="medium" placeholder="输入标题(제목을 입력)" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="价格(가격)：" prop="lastPrice">
            <div class="price-box">
              <div class="price-box-money">
                <span>总价(분양가)：</span>
                <el-input size="medium" type="number" class="money-input" v-model="addorputForm.lastPrice"
                  placeholder="输入总价价格" autocomplete="off"></el-input>
              </div>
              <div class="price-box-money">
                <span>首付(실입주금)：</span>
                <el-input size="medium" type="number" class="money-input" v-model="addorputForm.roomPrice"
                  placeholder="输入首付金额" autocomplete="off"></el-input>
              </div>
              <div class="price-box-money">
                <span>贷款(융자금)：</span>
                <el-input size="medium" type="number" class="money-input" v-model="addorputForm.loans"
                  placeholder="输入贷款价格" autocomplete="off"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="楼层(층수)：" prop="floor">
            <el-input v-model="addorputForm.floor" placeholder="输入楼层" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间数(객실 수)：" prop="roomNum">
            <el-input v-model="addorputForm.roomNum" type="number" placeholder="输入房间数" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="户数(세대수)：" prop="familyNum">
            <el-input v-model="addorputForm.familyNum" type="number" placeholder="输入户数" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所在城市(도시)：" prop="city">
            <el-select v-model="searchFrom.city" @change="cityChange('1', $event)" class="search-select"
              placeholder="选择城市">
              <el-option v-for="item in cityOptions" :key="item.code" :label="item.name"
                :value="{ label: item.name, value: item.code }">
              </el-option>
            </el-select>
            <el-select v-model="searchFrom.county" @change="cityChange('2', $event)" class="search-select"
              placeholder="-">
              <el-option v-for="item in countyOptions" :key="item.code" :label="item.name"
                :value="{ label: item.name, value: item.code }">
              </el-option>
            </el-select>
            <el-select v-model="searchFrom.street" class="search-select" placeholder="-">
              <el-option v-for="item in streetOptions" :key="item.code" :label="item.name"
                :value="{ label: item.name, value: item.code }">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地点信息(위치 정보)：" prop="address">
            <el-input size="medium" class="address-size" v-model="addorputForm.address" placeholder="选择地点信息"
              autocomplete="off"></el-input>
            <el-button size="medium" style="margin-left: 20px" icon="el-icon-location" @click="getLngLat('address')">
              选择地点(위치 선택)</el-button>
          </el-form-item>
          <el-form-item label="供给面积(공급면적)：" prop="area">
            <el-input type="number" size="medium" v-model="addorputForm.area" placeholder="输入供给面积" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="实际面积(실제 면적)：" prop="actualArea">
            <el-input type="number" size="medium" v-model="addorputForm.actualArea" placeholder="输入实际面积"
              autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="促销(프로모션)：" prop="marketingLabel">
            <el-select v-model="addorputForm.marketingLabel" size="medium" style="width: 100%; margin-right: 10px"
              placeholder="请选择促销">
              <el-option v-for="(item, index) in dict.type.promotion_type" :key="index" :label="item.label"
                :value="item.value">{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题标签(제목 태그)：" prop="titleLabel">
            <el-select v-model="addorputForm.titleLabel" size="medium" style="width: 100%; margin-right: 10px" multiple
              placeholder="请选择标题标签">
              <el-option v-for="(item, index) in dict.type.title_type" :key="index" :label="item.label"
                :value="item.value">{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="防水(방수)：" prop="waterRepellent">
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
          </el-form-item> -->
          <el-form-item label="浴室(화장실)：" prop="showerRoom">
            <el-select v-model="addorputForm.showerRoom" size="medium" style="width: 100%; margin-right: 10px"
              placeholder="请选择浴室">
              <el-option v-for="(item, index) in dict.type.house_shower" :key="index" :label="item.label"
                :value="item.value">{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="暖气(난방)：" prop="heat">
            <el-select v-model="addorputForm.heat" size="medium" style="width: 100%; margin-right: 10px"
              placeholder="请选择暖气">
              <el-option v-for="(item, index) in dict.type.house_heating" :key="index" :label="item.label"
                :value="item.value">{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易类型(거래 유형)：" prop="tradeType">
            <el-select v-model="addorputForm.tradeType" size="medium" multiple style="width: 100%; margin-right: 10px"
              placeholder="请选择交易类型">
              <el-option v-for="(item, index) in dict.type.transaction_type" :key="index" :label="item.label"
                :value="item.value">{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售类型(판매 유형)：" prop="saleType">
            <el-select v-model="addorputForm.saleType" size="medium" style="width: 100%; margin-right: 10px"
              placeholder="请选择销售类型">
              <el-option v-for="(item, index) in dict.type.sale_type" :key="index" :label="item.label"
                :value="item.value">{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="住宅类型(거주 유형)：" prop="homeType">
            <el-select v-model="addorputForm.homeType" size="medium" style="width: 100%; margin-right: 10px"
              placeholder="请选择住宅类型">
              <el-option v-for="(item, index) in dict.type.residence_type" :key="index" :label="item.label"
                :value="item.value">{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地铁线路距离(지하철 노선 거리)：">
            <div class="task-lngLat">
              <div class="lngLat-list" v-for="(item, index) in lngLatList" :key="index">
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
                <el-input class="address-size" size="medium" v-model="item.name" placeholder="输入地铁(지하철을 타다)"
                  autocomplete="off"></el-input>
                <el-input class="address-size" size="medium" v-model="item.info"
                  placeholder="输入站点距离（如：直竹站 1.5 公里）(사이트 거리 입력)" autocomplete="off"></el-input>
                <el-link type="danger" class="link-m" :underline="false" @click="delLngLat(item, index)">删除(삭제)
                </el-link>
              </div>
              <el-link type="primary" :underline="false" @click="addLngLat">添加地铁线路(지하철 노선 추가)</el-link>
            </div>
          </el-form-item>
          <el-form-item label="选项信息(옵션 정보)：" prop="checkboxGroup">
            <el-checkbox-group v-model="checkboxGroup" size="mini">
              <el-checkbox v-for="(item, index) in dict.type.house_information" :label="item.label" :key="index"
                :value="item.value" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- <el-form-item label="房产周边(주변시설)：">
            <div class="task-lngLat">
              <div class="lngLat-list" v-for="(item, index) in peripheryList" :key="index">
                <el-select v-model="item.type" size="medium" style="width: 200px; margin-right: 10px"
                  placeholder="请选择周边类型(주변 유형을 선택하세요.)">
                  <el-option v-for="(periphery, index) in dict.type.house_periphery" :key="index"
                    :label="periphery.label" :value="periphery.value">{{ periphery.label }}</el-option>
                </el-select>
                <span>{{ item.peripheryAddress }}</span>
                <el-input type="hidden" v-model="item.latLng" style="width: 10px"></el-input>
                <el-link type="danger" class="link-m" :underline="false" @click="delPeriphery(item, index)">删除(삭제)
                </el-link>
              </div>
              <el-link type="primary" :underline="false" @click="addPeriphery">添加周边信息(주변 정보 추가)</el-link>
            </div>
          </el-form-item> -->
          <el-form-item label="封面图片(메인 이미지)：">
            <image-upload :limit="1" @input="titleImg" :fileSize="1"></image-upload>
          </el-form-item>
          <el-form-item label="视频(비디오)：">
            <el-upload class="avatar-uploader el-upload--text" :headers="videoUpload.headers" :action="videoUpload.url"
              :show-file-list="false" accept=".mp4" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo"
              :on-progress="uploadVideoProcess">
              <!-- <video style="width: 50%;" v-if="showVideoPath != '' && !videoFlag"
                :src="videoUpload.url2 + showVideoPath" class="avatar video-avatar" controls="controls">
                您的浏览器不支持视频播放
              </video> -->
              <video-player style="width: 50%;" v-if="showVideoPath != '' && !videoFlag"
                class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions">
              </video-player>
              <i v-else-if="showVideoPath == '' && !videoFlag" class="el-icon-plus avatar-uploader-icon">
              </i>
              <el-progress :stroke-width="10" class="progressType" v-if="videoFlag == true" type="circle"
                :percentage="videoUploadPercent" style="margin-top:30px;">
              </el-progress>
              <el-button class="video-btn" slot="trigger" size="small" v-if="isShowUploadVideo" type="primary">点击重新上传视频
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item style="position: relative ;">
            <el-input type="hidden" v-model="form.courseUrl" readonly class="noAlert" placeholder="" />
          </el-form-item>
          <el-form-item label="房屋图片(부동산 이미지)：">
            <!-- <image-upload :limit="20" @input="fileList" :fileSize="20"></image-upload> -->
            <upload-multi-image @imgChange="imgFileList" :limit="20" :fileSize="20"></upload-multi-image>
          </el-form-item>
          <el-form-item label="绑定经纪人(매니저 바인딩)：" prop="middlemanId">
            <el-select v-model="addorputForm.middlemanId" size="medium" style="width: 200px; margin-right: 10px"
              placeholder="请选择经纪人(브로커를 선택하세요)">
              <el-option v-for="(periphery, index) in agentOption" :key="index" :label="periphery.name"
                :value="periphery.id">{{ periphery.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经纪人电话(매니저전화)：" prop="phone">
            <el-input v-model="addorputForm.phone" size="medium" placeholder="输入经纪人电话" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房屋状态(부동산 등록 상태)：" prop="status">
            <el-switch v-model="addorputForm.status" active-color="#13ce66" inactive-color="#ff4949"
              active-text="上架(상품 등록)" inactive-text="下架(내리다)" :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="详情信息(세부정보)：" prop="item">
            <div class="editor-box">
              <editor class="editor" v-model="addorputForm.item"></editor>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消(취소)</el-button>
        <el-button type="primary" @click="dialogFormSubmit" v-preventReClick>确定(확인)</el-button>
      </div>
      <el-dialog title="位置搜索(위치 검색)" :visible.sync="mapVisible" v-if="mapVisible" append-to-body width="60%"
        @close="clickClose">
        <naver-map ref="naverMap" v-if="mapVisible" :setLngLat="setLngLat" :selType="selectType"
          @clickClose="clickClose"></naver-map>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import naverMap from "./naverMap.vue";
import FileUpload from "../../../components/FileUpload/index.vue";
import ImageUpload from "../../../components/ImageUpload/index.vue";
import uploadMultiImage from '@/components/ImageUploadMouse/index.vue'
import { listmiddleman } from "@/api/agent/index";
import { addRoom, updateRoom, addressList } from "@/api/order/index";
import { getToken } from "@/utils/auth";
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
    uploadMultiImage
  },
  data() {
    return {
      selectType: "",
      addorputVisible: false,
      mapVisible: false,
      rules: {
        homeNum: [{ required: true, message: '请输入房产货号(부동산 번호)', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题(제목)', trigger: 'blur' }],
        lastPrice: [{
          required: true,
          validator: (rules, value, cb) => {
            let { roomPrice, loans } = this.addorputForm;
            if (!value || !roomPrice || !loans) {
              return cb(new Error("价格不能为空!"));
            }

            return cb();
          }
          , trigger: 'blur'
        }],
        floor: [{ required: true, message: '请输入楼层(층수)', trigger: 'blur' }],
        roomNum: [{ required: true, message: '请输入房间数(객실 수)', trigger: 'blur' }],
        familyNum: [{ required: true, message: '请输入户数(세대수)', trigger: 'blur' }],
        area: [{ required: true, message: '请输入供给面积(공급면적)', trigger: 'blur' }],
        actualArea: [{ required: true, message: '请输入实际面积(실제 면적)', trigger: 'blur' }],
        showerRoom: [{ required: true, message: '请选择浴室(화장실)', trigger: 'change' }],
        heat: [{ required: true, message: '请选择暖气(난방)', trigger: 'change' }],
        tradeType: [{ required: true, message: '交易类型(거래 유형)', trigger: 'change' }],
        saleType: [{ required: true, message: '销售类型(판매 유형)', trigger: 'change' }],
        homeType: [{ required: true, message: '住宅类型(거주 유형)', trigger: 'change' }],
        middlemanId: [{ required: true, message: '请绑定经纪人(바인딩 브로커)', trigger: 'change' }],
        phone: [{ required: true, message: '请输入经纪人电话(브로커 전화)', trigger: 'blur' }],
      },
      //拿到当前环境的请求前缀
      videoUpload: {
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/common/fileupload",
        url2: process.env.VUE_APP_BASE_API,
      },
      form: {},
      showVideoPath: "",
      uploadUrl: "",//你要上传视频到你后台的地址
      videoFlag: false, //是否显示进度条
      videoUploadPercent: "", //进度条的进度，
      isShowUploadVideo: false,//显示上传按钮
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
    this.getCity();
  },
  methods: {
    //打开弹窗
    openDialogEven() {
      // console.log(this.addorputForm);
      this.addorputVisible = true;
      this.addorputForm = {};
      if (!this.addorputForm) {
        this.lngLatList = [];
      }
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
      this.$refs['addorputForm'].validate((valid) => {
        if (valid) {
          if (this.checkboxGroup) {
            this.addorputForm.option = this.checkboxGroup.toString();
          }
          this.addorputForm.roomNeighbors = this.peripheryList;
          this.addorputForm.roomSubways = this.lngLatList;
          if (this.addorputForm.marketingLabel) {
            this.addorputForm.marketingLabel =
              this.addorputForm.marketingLabel.toString();
          }
          if (this.addorputForm.titleLabel) {
            this.addorputForm.titleLabel = this.addorputForm.titleLabel.toString();
          }
          if (this.addorputForm.tradeType) {
            this.addorputForm.tradeType = this.addorputForm.tradeType.toString();
          }

          this.addorputForm.city =
            this.searchFrom.city.label +
            "," +
            this.searchFrom.county.label +
            "," +
            this.searchFrom.street.label;
            if (this.form.courseUrl) {
              this.addorputForm.video= this.form.courseUrl
            }
          console.log(this.addorputForm);
          addRoom({ ...this.addorputForm }).then((res) => {
            if (res.code == 200) {
              this.$message.success("新增成功(성공적으로 추가되었습니다)！");
              this.handleClose();
              this.$parent.getList()
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //上传前回调
    beforeUploadVideo(file) {
      const isLt1024M = (file.size / 1024 / 1024) < 1024;
      this.form.videoSize = file.size / 1024 / 1024;
      //判断是不是MP4格式视频
      if (['video/mp4'].indexOf(file.type) != 0) {
        this.$message.error('请上传正确的视频格式');
        return false;
      }
      //单个视频大小限制在1024M以内
      if (!isLt1024M) {
        this.$message.error('上传视频大小不能超过1024MB哦!');
        return false;
      }
      this.isShowUploadVideo = false;
    },

    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
      this.$modal.loading("正在视频，请稍候...");
    },

    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      this.$modal.closeLoading();
      if (res != "") {
        this.showVideoPath = res.url;
        this.playerOptions.sources[0].src = res.url;
        // this.addorputForm.dictValue = res.url;
        this.form.courseUrl = res.url;
      } else {
        this.$message.error('视频上传失败，请重新上传！');
      }
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
      this.addorputForm.image = imig;
    },
    imgFileList(img) {
      console.log(img);
      this.addorputForm.roomImages = [];
      let Images = img;
      Images.forEach((item) => {
        let imgData = {};
        imgData.image = item;
        this.addorputForm.roomImages.push(imgData);
      });
    },
    // 获取经纪人列表
    getmiddleman() {
      listmiddleman({}).then((res) => {
        console.log(res.rows);
        this.agentOption = res.rows;
      });
    },
    // 经纪人电话
    agentChange(e) {
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

.avatar-uploader-icon {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
  font-size: 28px;
  color: #8c939d;
}

.avatar-uploader {
  position: relative;

  .video-btn {
    position: absolute;
    top: 0;
    z-index: 9999;
  }
}
</style>
