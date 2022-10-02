<template>
  <div>
    <h1>受罚机构类型分析</h1>
    <h2>01 受罚机构类型罚单张数排行</h2>
    <div class="content">
      本月，从被处罚机构类型分析，罚单主要集中在
      <span style="font-weight: bold" v-if="orgTypeCountList[0]">{{orgTypeCountList[0].type}}</span>
      <span style="font-weight: bold" v-if="orgTypeCountList[1]">、{{orgTypeCountList[1].type}}</span>
      <span style="font-weight: bold" v-if="orgTypeCountList[2]">、{{orgTypeCountList[2].type}}</span>
      等， 其中
      <span style="font-weight: bold" v-if="orgTypeCountList[0]">{{orgTypeCountList[0].type}}</span>
      以
      <span style="font-weight: bold;color: red" v-if="orgTypeCountList[0]">{{orgTypeCountList[0].count}}</span>
      张罚单位居首位。
    </div>
    <h3>机构类型罚单笔数排行</h3>
    <el-table :data="orgTypeCountList">
      <el-table-column type="index" prop="index" label="排序"></el-table-column>
      <el-table-column prop="type" label="机构类型"></el-table-column>
      <el-table-column prop="bar" label="" width="700">
        <template slot-scope="scope">
          <div style="height:20px;background:black">
            <div
                :style="{
                height: 100 + '%',
                width: scope.row.bar + '%',
                background: 'red',
              }"
            ></div>
            <!-- <div>{{ scope.row }}</div> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="罚单笔数"></el-table-column>
      <el-table-column prop="amount" label="罚没金额"></el-table-column>
    </el-table>
    <h2>02 受罚机构类型罚没金额排行</h2>
    <div class="content">
      本月，从被处罚机构类型分析，罚没金额主要集中在
      <span style="font-weight: bold" v-if="orgTypeAmountList[0]">{{orgTypeAmountList[0].type}}</span>
      <span style="font-weight: bold" v-if="orgTypeAmountList[1]">、{{orgTypeAmountList[1].type}}</span>
      <span style="font-weight: bold" v-if="orgTypeAmountList[2]">、{{orgTypeAmountList[2].type}}</span>
      等， 其中
      <span style="font-weight: bold" v-if="orgTypeAmountList[0]">{{orgTypeAmountList[0].type}}</span>
      以
      <span style="font-weight: bold;color: red" v-if="orgTypeAmountList[0]">{{orgTypeAmountList[0].amount}}</span>
      元位居罚没金额排行榜首位。
    </div>
    <h3>机构类型罚没金额排行</h3>
    <el-table :data="orgTypeAmountList">
      <el-table-column type="index" prop="index" label="排序"></el-table-column>
      <el-table-column prop="type" label="机构类型"></el-table-column>
      <el-table-column prop="bar" label="" width="700">
        <template slot-scope="scope">
          <div style="height:20px;background:black">
            <div
                :style="{
                height: 100 + '%',
                width: scope.row.bar + '%',
                background: 'yellow',
              }"
            ></div>
            <!-- <div>{{ scope.row }}</div> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="罚单笔数"></el-table-column>
      <el-table-column prop="amount" label="罚没金额"></el-table-column>
    </el-table>


  </div>
</template>
<script>
//TODO
//author: 梁
import {getOrgTypeAmountListAPI, getOrgTypeCountListAPI} from "@/api/api";

export default {
  data(){
    return{
      orgTypeCountList:[],
      orgTypeAmountList:[],
    }
  },
  methods:{
    async initOrgTypeCountTable(){
      const data = await getOrgTypeCountListAPI();
      this.orgTypeCountList = this.handleOrgTypeCountTable(data.orgTypeCountList);
    },
    handleOrgTypeCountTable(data){
      const max = data[0].count;
      data.forEach((item) => {
        item.bar = Number(((item.count / max) * 100).toFixed(0));
      });
      return data;
    },
    async initOrgTypeAmountTable(){
      const data = await getOrgTypeAmountListAPI();
      this.orgTypeAmountList = this.handleOrgTypeAmountTable(data.orgTypeAmountList);
    },
    handleOrgTypeAmountTable(data){
      const max = data[0].amount;
      data.forEach((item) => {
        item.bar = Number(((item.amount / max) * 100).toFixed(0));
      });
      return data;
    }
  },
  async mounted() {
    await this.initOrgTypeCountTable();
    await this.initOrgTypeAmountTable();
  }
};
</script>
