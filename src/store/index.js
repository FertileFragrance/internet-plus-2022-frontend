import Vue from "vue";
import Vuex from "vuex";
import {
  getAreaAPI,
  getBusinessAPI,
  getDetailAPI,
  getDecisionAnalysisAPI,
  getTrendAPI,
} from "@/api/api";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    date: new Date(new Date().setFullYear(2021, 11)),
    reportType: "month",
    area: [],
    personal: [],
    organization: [],
    business: [],
    trend: [],
    areaDetail: [],
    loading: false,
  },
  mutations: {
    setLoading(state, { loading }) {
      state.loading = loading;
    },
    setAreaDetail(state, { detail }) {
      state.areaDetail = detail;
    },
    setTrend(state, { trend }) {
      state.trend = trend;
    },
    setBusiness(state, { business }) {
      state.business = business;
    },
    setPersonal(state, { personal }) {
      state.personal = personal;
    },
    setOrganization(state, { organization }) {
      state.organization = organization;
    },
    setDate(state, { date }) {
      state.date = date;
    },
    setReportType(state, { reportType }) {
      state.reportType = reportType;
    },
    setArea(state, { area }) {
      state.area = area;
    },
  },
  actions: {
    async getArea({ commit, state }) {
      commit("setLoading", { loading: true });
      let month =
        state.reportType === "year" ? "00" : state.date.getMonth() + 1 + "";
      if (month.length < 2) month = "0" + month;
      const year = state.date.getFullYear() + "";
      const { data } = await getAreaAPI({ year, month });
      commit("setArea", { area: data.dataList });
      commit("setLoading", { loading: false });
    },
    async getDecision({ commit, state }) {
      commit("setLoading", { loading: true });
      let month =
        state.reportType === "year" ? "00" : state.date.getMonth() + 1 + "";
      if (month.length < 2) month = "0" + month;
      const year = state.date.getFullYear() + "";
      let res = await getDecisionAnalysisAPI({ type: "0", month, year });
      let personal = res.data.dataList;
      for (let item of personal) {
        item.amount = Number((item.amount / 10000).toFixed(2));
      }
      commit("setPersonal", { personal });
      res = await getDecisionAnalysisAPI({ type: "1", month, year });
      let organization = res.data.dataList;
      for (let item of organization) {
        item.amount = Number((item.amount / 10000).toFixed(2));
      }
      commit("setOrganization", { organization });
      commit("setLoading", { loading: false });
    },
    async getBusiness({ commit, state }) {
      commit("setLoading", { loading: true });
      let month =
        state.reportType === "year" ? "00" : state.date.getMonth() + 1 + "";
      if (month.length < 2) month = "0" + month;
      const year = state.date.getFullYear() + "";
      const { data } = await getBusinessAPI({ month, year });
      for (let item of data.dataList) {
        item.amount = Number((item.amount / 10000).toFixed(2));
      }
      commit("setBusiness", { business: data.dataList });
      commit("setLoading", { loading: false });
    },
    async getTrend({ commit }, params) {
      commit("setLoading", { loading: true });
      console.log("get trend params", params);
      const { data } = await getTrendAPI(params);
      commit("setTrend", { trend: data.dataList });
      commit("setLoading", { loading: false });
    },
    async getDetail({ commit, state }) {
      commit("setLoading", { loading: true });
      let month =
        state.reportType === "year" ? "00" : state.date.getMonth() + 1 + "";
      if (month.length < 2) month = "0" + month;
      const year = state.date.getFullYear() + "";
      try {
        const { code, data } = await getDetailAPI({ year, month });
        if (code == "1") {
          commit("setAreaDetail", { detail: data.dataList });
        }
        commit("setLoading", { loading: false });
      } catch (e) {
        commit("setLoading", { loading: false });
      }
    },
  },
});
