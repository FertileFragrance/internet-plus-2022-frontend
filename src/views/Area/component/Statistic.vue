<template>
  <div>
    <h2 class="title">03 直辖市/省罚单统计分布</h2>
    <div class="content">
      <span style="color: red">{{ countWinner.province }}</span
      >罚单数量最多，罚单<span style="color: red">{{ countWinner.count }}</span
      >张，占比<span style="color: red">{{ countWinner.countRatio }}</span
      >%。
    </div>
    <div class="content">
      <span style="color: red">{{ amountWinner.province }}</span
      >罚没金额最高，高达<span style="color: red">{{
        amountWinner.amount
      }}</span
      >万元，占比<span style="color: red">{{ amountWinner.amountRatio }}</span
      >%。
    </div>
    <el-table :data="countTableData">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="province" label="省/直辖市"></el-table-column>
      <el-table-column
        prop="count"
        label="罚单笔数(笔)"
        sortable
      ></el-table-column>
      <el-table-column
        prop="countRatio"
        label="罚单笔数占比(%)"
      ></el-table-column>
      <el-table-column
        prop="amount"
        label="罚没金额(万元)"
        sortable
      ></el-table-column>
      <el-table-column
        prop="amountRatio"
        label="罚没金额占比%"
      ></el-table-column>
      <el-table-column
        prop="amountOrganization"
        label="机构罚没金额(万元)"
        sortable
      ></el-table-column>
      <el-table-column
        prop="amountPersonal"
        label="个人罚没金额(万元)"
        sortable
      ></el-table-column>
      <el-table-column
        prop="countOrganization"
        label="处罚机构数"
      ></el-table-column>
      <el-table-column prop="countPersonal" label="处罚人数"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["area"]),
    countWinner: function () {
      if (this.area.length === 0) return {};
      // const winner = this.area.reduce((pre, cur) => {
      //   return pre.count > cur.count ? pre : cur;
      // });
      // return winner;
      return this.countTableData[0];
    },
    amountWinner: function () {
      if (this.area.length === 0) return {};
      const winner = this.area.reduce((pre, cur) => {
        return pre.amount > cur.amount ? pre : cur;
      });
      return winner;
    },
    countTableData: function () {
      const temp = JSON.parse(JSON.stringify(this.area));
      for (let item of temp) {
        item.count = Number(item.count);
        item.amount = Number((item.amount / 10000).toFixed(2));
        item.amountOrganization = Number(
          (item.amountOrganization / 10000).toFixed(2)
        );
        item.amountPersonal = Number((item.amountPersonal / 10000).toFixed(2));
      }
      return temp;
    },
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
</style>
