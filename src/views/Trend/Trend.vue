<template>
  <div>
    <h1 style="text-align: center">全国范围趋势分析</h1>
    <div class="chart-container">
      <div
        id="chart-line"
        style="width: 900px; height: 600px; margin: auto"
      ></div>
    </div>
    <div style="display: flex; justify-content: center">
      <el-date-picker
        v-model="range"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
      >
      </el-date-picker>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      chartLine: null,
      range: [new Date(new Date().setFullYear(2021, 0)), new Date(Date.now())],
    };
  },
  computed: {
    ...mapState(["trend", "reportType"]),
    start() {
      return this.formatTime(this.range[0]);
    },
    end() {
      return this.formatTime(this.range[1]);
    },
  },
  watch: {
    range(newVal) {
      this.getTrend({
        start: this.formatTime(newVal[0]),
        end: this.formatTime(newVal[1]),
      });
    },
    trend(newVal) {
      this.setChartLine(newVal);
    },
  },
  mounted() {
    this.getTrend({
      start: this.start,
      end: this.end,
    });
    this.initChartLine();
    this.setChartLine(this.trend);
  },
  methods: {
    ...mapActions(["getTrend"]),
    formatTime(temp) {
      let month = temp.getMonth() + 1 + "";
      if (month.length < 2) month = "0" + month;
      const year = temp.getFullYear() + "";
      return year + "-" + month;
    },

    handleTrend(data) {
      const times = [];
      const counts = [];
      const amounts = [];
      for (const i of data) {
        times.push(i.time);
        counts.push(i.count);
        amounts.push(Number((i.amount / 10000).toFixed(2)));
      }
      return { times, counts, amounts };
    },
    setChartLine(data) {
      const trends = this.handleTrend(data);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {},
        grid: {
          containLabel: true,
        },
        toolbox: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: trends.times,
        },
        yAxis: [
          {
            type: "value",
            name: "罚没金额",
          },
          {
            type: "value",
            name: "罚单笔数",
            position: "right",
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "罚单笔数",
            type: "line",
            stack: "Total",
            yAxisIndex: 1,
            label: {
              show: true,
              position: "top",
            },
            emphasis: {
              focus: "series",
            },
            data: trends.counts,
          },
          {
            name: "罚没金额",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            emphasis: {
              focus: "series",
            },
            data: trends.amounts,
          },
        ],
      };

      this.chartLine && this.chartLine.setOption(option);
    },
    initChartLine() {
      this.chartLine = this.$echarts.init(
        document.getElementById("chart-line")
      );
    },
  },
};
</script>
<style scoped></style>
