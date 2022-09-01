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
        <el-form :model="addorputForm" ref="addorputForm" :rules="rules" label-width="120px">
          <el-form-item label="房产货号：" prop="rangerNo">
            <el-input
              v-model="addorputForm.rangerNo"
              size="medium"
              placeholder="输入房产货号"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="标题：" prop="rangerNo">
            <el-input
              v-model="addorputForm.rangerNo"
              size="medium"
              placeholder="输入标题"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="价格：" prop="rangerNo">
            <div class="price-box">
              <div class="price-box-money">
                <span>最少：</span>
                <el-input
                  size="medium"
                  type="number"
                  class="money-input"
                  v-model="addorputForm.rangerNo"
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
                  v-model="addorputForm.rangerNo"
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
                  v-model="addorputForm.rangerNo"
                  placeholder="输入贷款价格"
                  autocomplete="off"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="楼层：" prop="rangerNo">
            <el-input v-model="addorputForm.rangerNo" placeholder="输入楼层" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地点信息：" prop="mapAddress">
            <el-input
              size="medium"
              class="address-size"
              v-model="addorputForm.mapAddress"
              placeholder="选择地点信息"
              autocomplete="off"
            ></el-input>
            <el-button size="medium" style="margin-left:20px" icon="el-icon-location" @click="getLngLat">选择地点</el-button>
          </el-form-item>
          <el-form-item label="供给面积：" prop="rangerNo">
            <el-input
              type="number"
              size="medium"
              v-model="addorputForm.rangerNo"
              placeholder="输入供给面积"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="实际面积：" prop="rangerNo">
            <el-input
              type="number"
              size="medium"
              v-model="addorputForm.rangerNo"
              placeholder="输入实际面积"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="地铁线路距离：" prop="rangerNo">
            <div class="task-lngLat">
              <div class="lngLat-list" v-for="(item,index) in lngLatList" :key="index">
                <el-select
                  v-model="item.city"
                  size="medium"
                  style="width:200px;margin-right:10px;"
                  placeholder="请选择地铁线路"
                >
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.id"
                    :label="item.rangerName"
                    :value="{ value: item.id, label: item.rangerName}"
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
                  @click="delLngLat(item,index)"
                >删除</el-link>
              </div>
              <el-link type="primary" :underline="false" @click="addLngLat">添加</el-link>
            </div>
          </el-form-item>
          <el-form-item label="选项信息：" prop="rangerNo">
            <el-checkbox-group v-model="checkboxGroup" size="mini">
              <el-checkbox v-for="(city,index) in cities" :label="city.name" :key="index" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="房产周边：" prop="rangerNo">
            <el-input v-model="addorputForm.rangerNo" placeholder="输入护林员工号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房屋图片：" prop="rangerNo">
            <el-input v-model="addorputForm.rangerNo" placeholder="输入护林员工号" autocomplete="off"></el-input>
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
              <quill-editor
                ref="content"
                class="editor"
                v-model="addorputForm.content"
                :options="editorOption"
              ></quill-editor>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit" v-preventReClick>确 定</el-button>
      </div>
      <el-dialog
      title="位置搜索"
      :visible.sync="mapVisible"
      v-if="mapVisible"
      append-to-body
      width="60%"
      :before-close="clickClose"
    >
    <naver-map></naver-map>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import naverMap from './naverMap.vue'
export default {
  name: 'addOrEdit',
  props: {
    title: null,
    addorputForm: {},
    editorOption: {}
  },
  components: {
    naverMap
  },
  data() {
    return {
      addorputVisible: false,
      mapVisible: false,
      rules: {},
      cityOptions: [],
      lngLatList: [],
      cities: [
        {
          name: '停车场'
        },
        {
          name: '浴室'
        }
      ],
      checkboxGroup: []
    };
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
    handleClose() {
      this.addorputVisible = false;
      this.$parent.getList();
    },
   
    dialogFormSubmit() {},
    getLngLat() {
      // this.$refs.naverMap.openMapDialogEven()
      this.mapVisible = true;
    },
     clickClose() {
      this.mapVisible = false;
    },
    addLngLat() {
      this.lngLatList.push({
        city: '',
        distance: ''
      });
    },
    delLngLat(item, index) {
      if (this.lngLatList) {
        this.lngLatList.splice(index, 1);
      }
    }
  }
};
</script>

<style  lang='scss' scoped>
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
