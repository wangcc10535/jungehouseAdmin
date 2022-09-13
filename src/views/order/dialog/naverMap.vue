<!--
 * @Description: 地图搜索弹出层
 * @Author: wangcc
 * @Date: 2022-09-01 11:54:49
 * @LastEditors: wangcc
 * @LastEditTime: 2022-09-01 18:08:20
 * @FilePath: \jungehouseAdmin\src\views\order\dialog\naverMap.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div>
    <div class="map-Box">
      <div id="map">
        <div class="search-map">
          <el-input v-model="mapSearch" placeholder="请输入内容"></el-input>
          <el-button size="mini" style="margin-left: 10px" @click="searchSub"
            >주소 검색</el-button
          >
        </div>
      </div>
    </div>
    <div class="dialog-footer flex-row flex-center">
      <el-button
        class="btn submit"
        :disabled="lng == '' || lat == '' ? true : false"
        @click="clickSureMap()"
        >确定</el-button
      >
      <el-button class="btn reset" @click="clickCancleMap()">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "naverMap",
  props: {
    selType: {
      type: String,
      default: "",
    },
    setLngLat: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      marker: null,
      map: null,
      mapVisible: false,
      infoWindow: null,
      mapSearch: "",
      lng: "",
      lat: "",
      address: "",
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let _this = this;
      let latlngS = null;
      if (_this.setLngLat[0] && _this.setLngLat[1]) {
        console.log(_this.setLngLat);
        latlngS = new naver.maps.LatLng(_this.setLngLat[0], _this.setLngLat[1]);
      } else {
        latlngS = new naver.maps.LatLng(37.3595704, 127.105399);
      }
      var mapOptions = {
        center: latlngS,
        zoom: 15,
        mapTypeControl: true,
      };
      _this.map = new naver.maps.Map("map", mapOptions);
      _this.marker = new naver.maps.Marker({
        position: latlngS,
        draggable: false,
        map: _this.map,
      });
      _this.infoWindow = new naver.maps.InfoWindow({
        anchorSkew: true,
      });
      _this.map.setCursor("pointer");
      _this.map.addListener("click", function (e) {
        if (_this.marker) {
          _this.marker.setMap(null);
        }
        _this.lng = e.coord._lng;
        _this.lat = e.coord._lat;
        let latlng = new naver.maps.LatLng(e.coord._lat, e.coord._lng);
        _this.marker = new naver.maps.Marker({
          position: latlng,
          draggable: false,
          map: _this.map,
        });
        _this.searchCoordinateToAddress(e.coord);
      });
    },
    searchCoordinateToAddress(lngLat) {
      let _this = this;
      _this.infoWindow.close();
      naver.maps.Service.reverseGeocode(
        {
          coords: lngLat,
          orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(","),
        },
        function (status, response) {
          // console.log(status);
          // console.log(response);
          if (status === naver.maps.Service.Status.ERROR) {
            if (!lngLat) {
              return alert("ReverseGeocode Error, Please check latlng");
            }
          }
          let address = response.v2.address;
          _this.setAddress(address);
        }
      );
    },
    setAddress(address) {
      // console.log(address);
      this.mapSearch = address.jibunAddress;
      this.address = address.jibunAddress;
    },
    searchSub() {
      let _this = this;
      if (_this.marker) {
        _this.marker.setMap(null);
      }
      naver.maps.Service.geocode(
        {
          query: _this.mapSearch,
        },
        function (status, response) {
          // console.log(status);
          // console.log(response);
          let addressData = response.v2.addresses[0];
          _this.lng = addressData.x;
          _this.lat = addressData.y;
          let latlng = new naver.maps.LatLng(addressData.y, addressData.x);
          let center = new naver.maps.Point(addressData.x, addressData.y);
          _this.map.setCenter(center);
          _this.address = addressData.roadAddress;
          _this.marker = new naver.maps.Marker({
            position: latlng,
            draggable: false,
            map: _this.map,
          });
        }
      );
    },
    clickSureMap() {
      this.$emit("clickClose", {
        lng: this.lng,
        lat: this.lat,
        address: this.address,
        selType: this.selType,
      });
    },
    clickCancleMap() {
      this.$emit("clickClose");
    },
  },
};
</script>

<style lang="scss" scoped>
.map-Box {
  height: 600px;
  #map {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .search-map {
    display: flex;
    position: absolute;
    left: 10px;
    top: 10px;
    width: 600px;
    z-index: 999;
  }
}
.dialog-footer {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.amap-box {
  border: 1px solid #ccc;
  padding: 5px;
}
.tip-box {
  width: 100%;
  max-height: 260px;
  position: absolute;
  border: 1px solid #dcdfe6;
  overflow-y: auto;
  background-color: #fff;
  z-index: 1111;
}
::v-deep .el-vue-search-box-container {
  position: relative;
  width: 100%;
  height: 40px;
  background: #fff;
  box-shadow: 0 2px 2px rgb(0 0 0 / 15%);
  border-radius: 2px 3px 3px 2px;
  z-index: 10;
  border: 1px #ccc solid;
  margin-bottom: 10px;
}
.btn {
  border-radius: 4px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  padding: 0 22px;
  margin-left: 24px;
  &.submit {
    background: #3c77fe;
    border-radius: 4px;
    color: #ffffff;
    border: 1px solid #3c77fe;

    &:hover {
      background: #3365d8;
      border: 1px solid #3365d8;
    }

    &.is-disabled {
      background: #9ebbff;
      border: 1px solid #9ebbff;
    }
  }
  &.reset {
    background: #ffffff;
    border: 1px solid #dadce0;
    margin-left: 30px;
    &:hover {
      border: 1px solid #3c77fe;
      color: #3c77fe;
    }
  }
}
</style>
