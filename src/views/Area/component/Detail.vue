<template>
  <div>
    <h2 class="title">04 全国单张大额罚单详情</h2>
    <div class="content">
      <span style="color: red">{{ first.name }}</span
      >单笔处罚金额最高，罚款金额高达{{ first.fine }}万元，罚单由<span
        style="color: red"
        >{{ first.organName }}</span
      >开出。主要违规问题为：{{ first.basis }}
    </div>
    <div class="content">
      <span style="color: red">{{ second.name }}</span
      >单笔处罚金额最高，罚款金额高达{{ second.fine }}万元，罚单由<span
        style="color: red"
        >{{ second.organName }}</span
      >开出。主要违规问题为：{{ second.basis }}
    </div>
    <div class="content">
      <span style="color: red">{{ third.name }}</span
      >单笔处罚金额最高，罚款金额高达{{ third.fine }}万元，罚单由<span
        style="color: red"
        >{{ third.organName }}</span
      >开出。主要违规问题为：{{ third.basis }}
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
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["areaDetail"]),
    tableDetail() {
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
  methods: {
    ...mapActions(["getDetail"]),
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
</style>
