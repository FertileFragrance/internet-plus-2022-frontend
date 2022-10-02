<template>
  <el-container class="container">
    <el-aside width="260px" style="min-height: 100%">
      <el-menu
        class="menu"
        default-active="1-2"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 100%"
        :router="true"
      >
        <el-menu-item>
          <el-select
            v-model="reportType"
            @change="changeReportType"
            placeholder="请选择"
          >
            <el-option label="月度报告" value="month"> </el-option>
            <el-option label="年度报告" value="year"> </el-option>
          </el-select>
        </el-menu-item>
        <el-menu-item>
          <el-date-picker
            v-model="date"
            type="month"
            placeholder="选择月份"
            @change="changeDate"
          >
          </el-date-picker>
        </el-menu-item>
        <el-menu-item index="/penalty"> 违规案例库 </el-menu-item>
        <el-menu-item index="/global">总体处罚情况</el-menu-item>
        <el-menu-item index="/area">全国区域分析</el-menu-item>
        <el-menu-item index="/decision">处罚决定分析</el-menu-item>
        <el-menu-item index="/violation">业务领域/违规点分析</el-menu-item>
        <el-menu-item index="/trend">趋势分析</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main v-loading="loading">
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "layout",
  components: {},
  data() {
    return {
      date: new Date().setFullYear(2021, 11),
      reportType: "month",
    };
  },
  computed: {
    ...mapState(["date", "reportType", "loading"]),
  },
  methods: {
    changeReportType(reportType) {
      this.setReportType({ reportType });
    },
    changeDate(date) {
      this.setDate({ date });
    },
    ...mapMutations(["setDate", "setReportType"]),
  },
};
</script>
<style>
.container {
  min-height: 100%;
}
.el-main {
  text-align: initial;
}
</style>
