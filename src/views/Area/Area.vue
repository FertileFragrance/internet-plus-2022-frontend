<template>
  <div>
    <h1 class="title">二、全国区域分析</h1>
    <number-dis />
    <amount-dis />
    <statistic />
    <detail />
  </div>
</template>
<script>
import AmountDis from "./component/AmountDis.vue";
import Detail from "./component/Detail.vue";
import NumberDis from "./component/NumberDis.vue";
import Statistic from "./component/Statistic.vue";
import { mapActions, mapState } from "vuex";
//TODO
// author: 魏

export default {
  components: {
    NumberDis,
    AmountDis,
    Detail,
    Statistic,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["date", "reportType"]),
  },
  watch: {
    date() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.getArea();
      this.getDetail();
    },
    reportType() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.getArea();
      this.getDetail();
    },
  },
  async mounted() {
    await this.getArea();
    await this.getDetail();
  },
  methods: {
    ...mapActions(["getArea", "getDetail"]),
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
</style>
