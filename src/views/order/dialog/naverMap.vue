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
          <el-input v-model="mapSearch.address" placeholder="请输入内容"></el-input>
          <el-button size="mini" style="margin-left:10px" @click="searchSub">주소 검색</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'naverMap',
  data() {
    return {
      map: null,
      mapVisible: false,
      infoWindow: null,
      mapSearch: {}
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let _this = this;
      var mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
        mapTypeControl: true
      };
      _this.map = new naver.maps.Map('map', mapOptions);
      _this.infoWindow = new naver.maps.InfoWindow({
        anchorSkew: true
      });
      _this.map.setCursor('pointer');
      _this.map.addListener('click', function (e) {
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
            naver.maps.Service.OrderType.ROAD_ADDR
          ].join(',')
        },
        function (status, response) {
          console.log(status);
          console.log(response);
          if (status === naver.maps.Service.Status.ERROR) {
            if (!lngLat) {
              return alert('ReverseGeocode Error, Please check latlng');
            }
          }
          var address = response.v2.address
        }
      );
    },
    searchSub() {
      naver.maps.Service.geocode({
         query: this.mapSearch.address
      }, function(status, response){
        console.log(status);
        console.log(response);
      })
    },
    // openMapDialogEven() {
    //   this.mapVisible = true;

    // },
    handleClose() {
      this.mapVisible = false;
    }
  }
};
</script>

<style  lang='scss' scoped>
.map-Box {
  height: 600px;
  #map {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .search-map{
    display: flex;
    position: absolute;
    left: 10px;
    top: 10px;
    width: 600px;
    z-index: 999;
  }
}
</style>
