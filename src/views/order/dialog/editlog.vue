<!--
 * @Description: 新增或修改房产信息
 * @Author: wangcc
 * @Date: 2022-09-01 11:54:02
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2022-10-27 02:09:55
 * @FilePath: \jungehouseAdmin\src\views\order\dialog\addOrEdit.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div>
    <el-dialog :title="title" :visible.sync="addorputVisible" v-if="addorputVisible" width="60%"
      :destroy-on-close="true" :close-on-click-modal="false" :before-close="handleClose">
      <div class="dialog-box">
        <el-form :model="addorputForm" ref="addorputForm" :rules="rules" label-width="120px">
          <el-form-item label="房产货号(부동산 번호)：" prop="homeNum">
            <el-input v-model="addorputForm.homeNum" size="medium" placeholder="输入房产货号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="标题(제목)：" prop="title">
            <el-input v-model="addorputForm.title" size="medium" placeholder="输入标题(제목을 입력)" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="价格(가격)：">
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
          <el-form-item label="楼层(바닥)：" prop="floor">
            <el-input v-model="addorputForm.floor" placeholder="输入楼层" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间数(객실 수)：" prop="roomNum">
            <el-input v-model="addorputForm.roomNum" placeholder="输入房间数" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="户数(세대수)：" prop="familyNum">
            <el-input v-model="addorputForm.familyNum" placeholder="输入户数" autocomplete="off"></el-input>
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
              选择地点</el-button>
          </el-form-item>
          <el-form-item label="供给面积(공급 지역)：" prop="area">
            <el-input type="number" size="medium" v-model="addorputForm.area" placeholder="输入供给面积" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="实际面积(실제 면적)：" prop="actual_area">
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
          <el-form-item label="防水(방수)：" prop="waterRepellent">
            <el-select v-model="addorputForm.waterRepellent" size="medium" style="width: 100%; margin-right: 10px"
              placeholder="请选择防水">
              <el-option v-for="(item, index) in dict.type.house_waterproof" :key="index" :label="item.label"
                :value="item.value">{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item label="封面图片(표지 이미지)：">
            <image-upload :limit="1" @input="titleImg" :value="addorputForm.image"></image-upload>
          </el-form-item>
          <el-form-item label="视频(비디오)：">
            <el-upload class="avatar-uploader el-upload--text" :headers="videoUpload.headers" :action="videoUpload.url"
              :show-file-list="false" accept=".mp4" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo"
              :on-progress="uploadVideoProcess">

              <!--视频区域，:src里面存放视频上传成功后的存储地址-->
              <!-- <video style="width: 50%;" v-if="showVideoPath != '' && !videoFlag"
                :src="videoUpload.url2 + showVideoPath" class="avatar video-avatar">
                您的浏览器不支持视频播放
              </video> -->
              <video-player style="width: 50%;" v-if="showVideoPath != '' && !videoFlag" class="video-player vjs-custom-skin"
                ref="videoPlayer" :playsinline="true" :options="playerOptions">
              </video-player>
              <!-- 变量showVideoPath如果不存在，就不显示，存在就显示视频 -->
              <i v-else-if="showVideoPath == '' && !videoFlag" class="el-icon-plus avatar-uploader-icon">
              </i>
              <!--上传进度条区域-->
              <el-progress :stroke-width="10" class="progressType" v-if="videoFlag == true" type="circle"
                :percentage="videoUploadPercent" style="margin-top:30px;">
              </el-progress>

              <!--此为视频点击上传按钮 isShowUploadVideo代表按钮显示与否-->
              <el-button class="video-btn" slot="trigger" size="small" v-if="isShowUploadVideo" type="primary">点击重新上传视频
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item style="position: relative ;">
            <el-input type="hidden" v-model="form.courseUrl" readonly class="noAlert" placeholder="" />
          </el-form-item>
          <el-form-item label="房屋图片(집 사진)：">
            <!-- <image-upload
              :limit="20"
              @input="fileList"
              :value="imageFromList"
            ></image-upload> -->
            <upload-multi-image ref="multiImg" @imgChange="imgFileList" :limit="20" :fileSize="20"></upload-multi-image>
          </el-form-item>
          <el-form-item label="绑定经纪人(바인딩 브로커)：" prop="middlemanId">
            <el-select v-model="addorputForm.middlemanId" size="medium" style="width: 200px; margin-right: 10px"
              placeholder="请选择经纪人(브로커를 선택하세요)">
              <el-option v-for="(periphery, index) in agentOption" :key="index" :label="periphery.name"
                :value="periphery.id">{{ periphery.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经纪人电话(브로커 전화)：" prop="phone">
            <el-input v-model="addorputForm.phone" size="medium" placeholder="输入经纪人电话" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房屋状态(집 상태)：" prop="status">
            <el-switch v-model="addorputForm.status" active-color="#13ce66" inactive-color="#ff4949"
              active-text="上架(선반 위에)" inactive-text="下架(내리다)" :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="详情信息(세부)：" prop="item">
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
import { listmiddleman } from "@/api/agent/index";
import uploadMultiImage from '@/components/ImageUploadMouse/index.vue'
import { getToken } from "@/utils/auth";
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
    uploadMultiImage
  },
  data() {
    return {
      selectType: "",
      //拿到当前环境的请求前缀
      videoUpload: {
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: "http://49.247.22.30:8080/common/upload",
        url2: "http://49.247.22.30:8080",
      },
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false,  // 如果为true,浏览器准备好时开始回放
        muted: false,     // 默认情况下将会消除任何音频。
        loop: false,      // 是否视频一结束就重新开始。
        preload: 'auto',  // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9',  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true,  // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",  // 类型
          src: ''             // url地址
        }],
        poster: '',  // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,           // 当前时间和持续时间的分隔符
          durationDisplay: true,       // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true       // 是否显示全屏按钮
        }
      },
      form: {},
      showVideoPath: "",
      uploadUrl: "",//你要上传视频到你后台的地址
      videoFlag: false, //是否显示进度条
      videoUploadPercent: "", //进度条的进度，
      isShowUploadVideo: false,//显示上传按钮
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
          let videoArr = []
          if (this.addorputForm.roomImages) {
            this.form = {};
            this.uploadUrl = "";//你要上传视频到你后台的地址
            this.videoFlag = false;//是否显示进度条
            this.videoUploadPercent = ""; //进度条的进度，
            this.isShowUploadVideo = false //显示上传按钮
            this.$refs.multiImg.setImg(this.imageFromList)

            this.addorputForm.roomImages.forEach((item) => {
              if (this.matchType(item.image) == 'image') {
                this.imageFromList.push(item.image);
              }
              if (this.matchType(item.image) == 'video') {
                videoArr.push(item.image)
                this.isShowUploadVideo = true
              }

            });
            this.playerOptions.sources[0].src = videoArr.toString()
            console.log(this.playerOptions.sources[0].src);
            this.showVideoPath = videoArr.toString()
          }

          this.lngLatList = this.addorputForm.roomSubways;
          this.peripheryList = this.addorputForm.roomNeighbors;
        }
      });
    },
    imgFileList(img) {
      this.addorputForm.roomImages = [];
      let Images = img;
      Images.forEach((item) => {
        let imgData = {};
        imgData.image = item;
        this.addorputForm.roomImages.push(imgData);
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
      this.$modal.loading("正在上传视频，请稍候...");
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
        console.log(this.playerOptions.sources[0].src);
        // this.addorputForm.dictValue = res.url;
        this.form.courseUrl = res.url;
      } else {
        this.$message.error('视频上传失败，请重新上传！');
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
      let roogImgArr = 0
      this.addorputForm.roomImages = this.addorputForm.roomImages.map(item => {
        if (this.matchType(item.image) == 'video') {
          if (!this.form.courseUrl) {
            this.$message.error('请上传视频！')
          }
          item.image = this.form.courseUrl
        } else {
          roogImgArr = 1
        }
        return item
      })
      if (roogImgArr == 1) {
        this.addorputForm.roomImages.push({
          image: this.form.courseUrl
        })
      }
      console.log(this.addorputForm);
      updateRoom({ ...this.addorputForm }).then((res) => {
        if (res.code == 200) {
          this.$message.success("新增成功(성공적으로 추가되었습니다)！");
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
    // 根据文件名后缀区分 文件类型
    /*
     * @param: fileName - 文件名称
     * @param: 数据返回 1) 无后缀匹配 - false
     * @param: 数据返回 2) 匹配图片 - image
     * @param: 数据返回 3) 匹配 txt - txt
     * @param: 数据返回 4) 匹配 excel - excel
     * @param: 数据返回 5) 匹配 word - word
     * @param: 数据返回 6) 匹配 pdf - pdf
     * @param: 数据返回 7) 匹配 ppt - ppt
     * @param: 数据返回 8) 匹配 视频 - video
     * @param: 数据返回 9) 匹配 音频 - radio
     * @param: 数据返回 10) 其他匹配项 - other
     */
    matchType(fileName) {
      // 后缀获取
      var suffix = '';
      // 获取类型结果
      var result = '';
      try {
        var flieArr = fileName.split('.');
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = '';
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false;
        return result;
      }
      // 图片格式
      var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
      // 进行图片匹配
      result = imglist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'image';
        return result;
      };
      // 匹配txt
      var txtlist = ['txt'];
      result = txtlist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'txt';
        return result;
      };
      // 匹配 excel
      var excelist = ['xls', 'xlsx'];
      result = excelist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'excel';
        return result;
      };
      // 匹配 word
      var wordlist = ['doc', 'docx'];
      result = wordlist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'word';
        return result;
      };
      // 匹配 pdf
      var pdflist = ['pdf'];
      result = pdflist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'pdf';
        return result;
      };
      // 匹配 ppt
      var pptlist = ['ppt'];
      result = pptlist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'ppt';
        return result;
      };
      // 匹配 视频
      var videolist = ['mp4', 'm2v', 'mkv'];
      result = videolist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'video';
        return result;
      };
      // 匹配 音频
      var radiolist = ['mp3', 'wav', 'wmv'];
      result = radiolist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'radio';
        return result;
      }
      // 其他 文件类型
      result = 'other';
      return result;
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
