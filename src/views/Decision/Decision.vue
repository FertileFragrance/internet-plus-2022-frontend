<template>
  <div>
    <h1 class="title">处罚决定分析</h1>
    <h2 class="title">01 机构处罚决定分析</h2>
    <div class="content">在对机构的处罚决定中，{{ organizationText }}</div>
    <h3 class="title">机构处罚方式统计</h3>
    <el-table :data="organization">
      <el-table-column prop="type" label="处罚类型"></el-table-column>
      <el-table-column prop="type" label="处罚方式"></el-table-column>
      <el-table-column prop="frequency" label="频次"></el-table-column>
      <el-table-column prop="ratio" label="频次占比(%)"></el-table-column>
      <el-table-column prop="amount" label="罚没金额(万元)"></el-table-column>
    </el-table>
    <h2 class="title">02 个人处罚决定分析</h2>
    <div class="content">在对个人的处罚决定中，{{ personalText }}</div>
    <h3 class="title">个人处罚方式统计</h3>
    <el-table :data="personal">
      <el-table-column prop="type" label="处罚类型"></el-table-column>
      <el-table-column prop="type" label="处罚方式"></el-table-column>
      <el-table-column prop="frequency" label="频次"></el-table-column>
      <el-table-column prop="ratio" label="频次占比(%)"></el-table-column>
      <el-table-column prop="amount" label="罚没金额(万元)"></el-table-column>
    </el-table>
  </div>
</template>
<script>
//TODO
//author: 魏
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["personal", "organization", "date", "reportType"]),
    personalText() {
      return this.getText(this.personal);
    },
    organizationText() {
      return this.getText(this.organization);
    },
  },
  watch: {
    date() {
      this.getDecision();
    },
    reportType() {
      this.getDecision();
    },
  },
  async mounted() {
    await this.getDecision();
  },
  methods: {
    ...mapActions(["getDecision"]),
    getText(list) {
      let res = "";
      for (let item of list) {
        const temp = item.type.split("(")[0];
        res += temp + item.frequency + "次，";
        if (item.amount !== 0) {
          res += "罚没金额" + item.amount + "万元，";
        }
      }
      return res.slice(0, res.length - 1) + "。";
    },
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
</style>
