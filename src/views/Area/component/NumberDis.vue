<template>
  <div>
    <h2 class="title">01 全国罚单数量分布</h2>
    <div class="content">
      罚单数量在全国区域分布，主要集中在<span style="color: red">{{
        first
      }}</span
      >、<span style="color: red">{{ second }}</span
      >等，其中{{ first }}罚单数量最多，累计<span style="color: red">{{
        count
      }}</span
      >张罚单。
    </div>
    <div class="chart-container">
      <div
        id="chinaCount"
        style="height: 600px; width: 600px; margin: auto"
      ></div>
    </div>
  </div>
</template>
<script>
import chinaJson from "@/assets/china.json";
import { mapState } from "vuex";
export default {
  data() {
    return {
      first: "",
      second: "",
      count: "",
      myChartChina: null,
    };
  },
  computed: {
    ...mapState(["area", "reportType"]),
  },
  watch: {
    area: function () {
      const data = this.area.map((value) => {
        return { name: value.province, value: this.handleValue(value.count) };
      });
      data.sort((a, b) => {
        return b.value - a.value;
      });
      this.first = data[0] && data[0].name;
      this.second = data[1] && data[1].name;
      this.count = data[0] && data[0].value;
      if (!this.myChartChina) {
        console.log("init china");
        this.initChina();
      }
      console.log("nubmer dis data", data);
      this.setOption(data);
    },
  },
  methods: {
    handleValue(value) {
      return Number(value);
    },
    setOption(data) {
      var optionMap = {
        tooltip: {
          trigger: "item",
        }, //左侧小导航图标

        visualMap: {
          max: data[0] && data[0].value,
          min: data[data.length - 1] && data[data.length - 1].value,
          text: ["高", "低"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"],
          },
        }, //配置属性

        series: [
          {
            name: "中国地图",
            type: "map",
            roam: true,
            map: "china",
            emphasis: {
              label: {
                show: true,
              },
            },
            data: data,
          },
        ],
      };

      this.myChartChina.setOption(optionMap);
    },
    initChina() {
      var myChartContainer = document.getElementById("chinaCount"); //绑定div容器
      var myChartChina = this.$echarts.init(myChartContainer);
      this.$echarts.registerMap("china", chinaJson);
      this.myChartChina = myChartChina;
    },
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
.chart-container {
  display: flex;
  justify-content: center;
}
</style>
