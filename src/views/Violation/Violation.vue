<template>
  <div>
    <h1 class="title">业务领域/违规点分析</h1>
    <h2 class="title">01 相关业务频次统计</h2>
    <div class="content">
      <p>本月，主要违规要点为：{{ point }}</p>
      <p>其中，<span v-html="pointDetail"></span></p>
    </div>
    <div
      id="business-pie"
      style="height: 800px; width: 600px; margin: auto"
    ></div>
    <el-table :data="business">
      <el-table-column type="index" prop="index" label="排序"></el-table-column>
      <el-table-column prop="type" label="业务名称"></el-table-column>
      <el-table-column prop="ratio" label="" width="700">
        <template slot-scope="scope">
          <el-progress :percentage="Number(scope.row.ratio)"></el-progress>
        </template>
      </el-table-column>
      <el-table-column prop="frequency" label="频次(%)"></el-table-column>
      <el-table-column prop="amount" label="罚没金额(万元）"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
//TODO
// author: 魏
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["business", "reportType", "date"]),
    point() {
      let res = "";
      for (let i = 0; i < this.business.length && i < 5; ++i) {
        res += this.business[i].type + "、";
      }
      res = res.slice(0, res.length - 1) + "等。";
      return res;
    },
    pointDetail() {
      let res = "";
      for (let i = 0; i < this.business.length && i < 3; ++i) {
        const item = this.business[i];
        res += `${item.type}涉及罚单累计<span style="color:red">${item.frequency}</span>张，受罚频次占比<span style="color:red">${item.ratio}%</span>，涉及罚没金额<span style="color:red">${item.amount}</span>万元;`;
      }
      res = res.slice(0, res.length - 1) + "等。";
      return res;
    },
  },
  watch: {
    date() {
      this.getBusiness();
    },
    reportType() {
      this.getBusiness();
    },
    business(newVal) {
      this.setBusinessPie(newVal);
    },
  },
  mounted() {
    this.getBusiness();
  },
  methods: {
    ...mapActions(["getBusiness"]),
    setBusinessPie(data) {
      const temp = data.map((value) => ({
        name: value.type,
        value: value.frequency,
      }));
      const pie = this.$echarts.init(document.getElementById("business-pie"));
      const option = {
        title: {
          text: "业务领域/违规点分析",
          left: "center",
          top: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          left: "left",
        },
        series: [
          {
            type: "pie",
            data: temp,
            radius: ["40%", "70%"],
          },
        ],
      };
      pie.setOption(option);
    },
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
</style>
