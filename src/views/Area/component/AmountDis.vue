<template>
  <div>
    <h1 class="title">02 全国罚单金额分布</h1>
    <div class="content">
      罚没金额在全国区域分布，主要集中在
      <span style="color: red">{{ first }}、 {{ second }}</span
      >， 其中<span style="color: red">{{ first }}</span
      >罚没金额最高，高达<span style="color: red">{{ amount }}</span
      >万元。
    </div>
    <div>
      <div id="china" style="height: 600px; width: 600px; margin: auto"></div>
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
      amount: 0,
      myChartChina: null,
    };
  },
  computed: {
    ...mapState(["area"]),
  },
  watch: {
    area: function (val) {
      if (val.length === 0) return null;
      const data = val.map((value) => {
        return {
          name: value.province,
          value: this.handleAmount(value.amount),
        };
      });
      data.sort((a, b) => {
        return b.value - a.value;
      });
      this.first = data[0] && data[0].name;
      this.second = data[1] && data[1].name;
      this.amount = data[0] && data[0].value;
      if (!this.myChartChina) this.initChina();
      this.setChart(data);
    },
  },
  methods: {
    handleAmount(amount) {
      return Number((amount / 10000).toFixed(2));
    },
    getMin(list) {
      if (list.length === 0) return 0;
      let min = list[0].value;
      for (const item of list) {
        if (min > item.value) {
          min = item.value;
        }
      }
      return min;
    },
    getMax(list) {
      if (list.length === 0) return 0;
      let max = list[0].value;
      for (const item of list) {
        if (max < item.value) {
          max = item.value;
        }
      }
      return max;
    },
    initChina() {
      var myChartContainer = document.getElementById("china"); //绑定div容器

      var myChartChina = this.$echarts.init(myChartContainer);
      this.myChartChina = myChartChina;
      this.$echarts.registerMap("china", chinaJson);
    },
    setChart(data) {
      console.log("amount data", data);
      var optionMap = {
        tooltip: {
          trigger: "item",
        },

        visualMap: {
          min: this.getMin(data),
          max: this.getMax(data),
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
            itemStyle: {
              emphasis: {
                label: {
                  show: true,
                  formatter: "{b}\n{c}",
                },
              },
            },
            data: data, //数据
          },
        ],
      };
      this.myChartChina.setOption(optionMap);
    },
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
</style>
