<template>
  <div>
    <h1 >04、全国单张大额罚单详情</h1>
    <br>
    <div class="content" style="font-size: 14px">
      <span style="color: red">{{ first.name }}</span
      >单笔处罚金额最高，罚款金额高达{{ first.fine }}万元，罚单由<span
        style="color: red"
    >{{ first.organName }}</span
    >开出。
    </div>
    <div class="content" style="font-size: 14px">
      <span style="color: red">{{ second.name }}</span
      >单笔处罚金额最高，罚款金额高达{{ second.fine }}万元，罚单由<span
        style="color: red"
    >{{ second.organName }}</span
    >开出。
    </div>
    <div class="content" style="font-size: 14px">
      <span style="color: red">{{ third.name }}</span
      >单笔处罚金额最高，罚款金额高达{{ third.fine }}万元，罚单由<span
        style="color: red"
    >{{ third.organName }}</span
    >开出。
    </div>
    <br>
    <div>
      <div id="myChart" style="width:100%;height:500px;margin: 5px" >
      </div>
    </div>

    <h3 class="title">其他的大额罚单</h3>

    <el-table :data="tableDetail">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="fine" label="罚没金额(万元)"></el-table-column>
      <el-table-column prop="number" label="决定文书号"></el-table-column>
      <el-table-column prop="name" label="被处罚机构"></el-table-column>
      <el-table-column prop="type" label="机构类型"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import * as echarts from "echarts";
export default {
  data() {
    return {
      yData:[],
      xData:[],
      option: {
        title: {
          text: "单笔处罚金额"
        },
        tooltip: {
          trigger: "axis",
          axisPointer:{
            type: "shadow"
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            color: "rgba(255,255,255,.7)",
            fontSize: "12"
          },

        },
        yAxis: {
          type: 'value',
          splitLine: {
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12"
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            },
            LineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          }
        },
        series: [
          {
            name: '金额',
            type: 'bar',
            data: []
          }
        ]
      },
      chart: {}
    };
  },

  computed: {
    ...mapState(["areaDetail"]),
    tableDetail() {
      //console.log(this.areaDetail);
      if (!this.areaDetail) return [];
      let temp = JSON.parse(JSON.stringify(this.areaDetail));
      for (let item of temp) {
        item.type = item.type === "1" ? "机构" : "个人";
        item.fine = Number((item.fine / 10000).toFixed(2));
      }
      return temp;
    },
    first() {
      return this.tableDetail && this.tableDetail[0];
    },
    second() {
      return this.tableDetail && this.tableDetail[1];
    },
    third() {
      return this.tableDetail && this.tableDetail[2];
    },
  },
  watch:{
    areaDetail(data){
      //
      // let name = data.map((value) => ({
      //   name: value.name,
      // }));
      // let value = data.map((value) => ({
      //   value: value.fine,
      // }));
      // this.xData =name
      // console.log(this.xData)
      // this.yData = value
      // console.log(this.yData)
      //
      // for(let i= 0 ; i<name.length ; i++){
      //   name[i] = name[i]['name'];
      // }
      // console.log(name)
      //
      // this.chart = echarts.init(document.getElementById("myChart"))
      // this.option.xAxis.data = name
      // this.option.series[0].data = this.yData
      // this.chart.setOption(this.option)
      let newPromise = new Promise((resolve) => {
        resolve()
      })
      //然后异步执行echarts的初始化函数
      newPromise.then(() => {
        //	此dom为echarts图标展示dom
        this.setNumChart(data);
      })

    }
  },

  methods: {
    ...mapActions(["getDetail"]),

    setNumChart(data){

      let name = data.map((value) => ({
        name: value.name,
      }));
      let value = data.map((value) => ({
        value: value.fine,
      }));
      this.xData =name
      console.log(this.xData)
      this.yData = value
      console.log(this.yData)

      for(let i= 0 ; i<name.length ; i++){
        name[i] = name[i]['name'];
      }
      console.log(name)

      this.chart = echarts.init(document.getElementById("myChart"))
      this.option.xAxis.data = name
      this.option.series[0].data = this.yData
      this.chart.setOption(this.option)
    }
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
</style>
