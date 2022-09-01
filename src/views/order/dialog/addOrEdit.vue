<!--
 * @Description: 新增或修改房产信息
 * @Author: wangcc
 * @Date: 2022-09-01 11:54:02
 * @LastEditors: wangcc
 * @LastEditTime: 2022-09-01 15:57:40
 * @FilePath: \jungehouseAdmin\src\views\order\dialog\addOrEdit.vue
 * @Copyright: Copyright (c) 2016~2022 by wangcc, All Rights Reserved. 
-->
<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="addorputVisible"
      width="40%"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form :model="addorputForm" ref="addorputForm" style="height:600px;overflow:auto" :rules="rules" label-width="120px">
        <el-form-item label="房产货号：" prop="rangerNo">
          <el-input v-model="addorputForm.rangerNo" size="medium" placeholder="输入房产货号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题：" prop="rangerNo">
          <el-input v-model="addorputForm.rangerNo" size="medium" placeholder="输入标题" autocomplete="off"></el-input>
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
        <el-form-item label="地点信息：" prop="mapAddress">
          <el-input
           size="medium"
            class="address-size"
            v-model="addorputForm.mapAddress"
            placeholder="选择地点信息"
            autocomplete="off"
          ></el-input>
          <el-button size="medium" style="margin-left:20px" icon="el-icon-location">选择地点</el-button>
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
        <el-form-item label="护林员工号：" prop="rangerNo">
          <el-input v-model="addorputForm.rangerNo" placeholder="输入护林员工号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="护林员工号：" prop="rangerNo">
          <el-input v-model="addorputForm.rangerNo" placeholder="输入护林员工号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="护林员工号：" prop="rangerNo">
          <el-input v-model="addorputForm.rangerNo" placeholder="输入护林员工号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="护林员工号：" prop="rangerNo">
          <el-input v-model="addorputForm.rangerNo" placeholder="输入护林员工号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="护林员工号：" prop="rangerNo">
          <el-input v-model="addorputForm.rangerNo" placeholder="输入护林员工号" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit" v-preventReClick>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addOrEdit',
  props: {
    title: null,
    addorputForm: {}
  },
  data() {
    return {
      addorputVisible: false,
      rules: {},
      cityOptions: [],
      lngLatList: [],
    };
  },
  methods: {
    //打开弹窗
    openDialogEven() {
      console.log(this.addorputForm);
      this.addorputVisible = true;
      if (!this.addorputForm) {
        this.lngLatList = []
      }
      
    },
    handleClose() {
      this.addorputVisible = false;
      this.$parent.getList();
    },
    dialogFormSubmit() {},
    addLngLat() {
      this.lngLatList.push({
        city:'',
        distance:''
      });
    },
    delLngLat(item,index) {
      if (this.lngLatList) {
        this.lngLatList.splice(index, 1);
      }
    },
  }
};
</script>

<style  lang='scss' scoped>
.price-box {
  display: flex;
  &-money {
    margin-right: 10px;
    display: flex;
    .money-input {
      width: 140px;
    }
  }
}
.address-size {
  width: 50%;
}
</style>
