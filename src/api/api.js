import { axios } from "../utils/request";
const api = {
  pre: "penalty",
};
export function createPunishmentAPI(data) {
  return axios({
    url: `${api.pre}/createPunishment`,
    method: "POST",
    data,
  });
}

export function deletePunishmentAPI(data) {
  return axios({
    url: `${api.pre}/deletePunishment`,
    method: "POST",
    data,
  });
}

export function editPunishmentAPI(data) {
  return axios({
    url: `${api.pre}/editPunishment`,
    method: "POST",
    data,
  });
}

export function releasePunishmentAPI(data) {
  return axios({
    url: `${api.pre}/releasePunishment`,
    method: "POST",
    data,
  });
}

export function getPunishmentListAPI(params, pageNumber) {
  return axios({
    url: `${api.pre}/getPunishmentList/${pageNumber}`,
    method: "GET",
    params: params,
  });
}

export function uploadAPI(data) {
  return axios({
    url: `${api.pre}/importXls`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
    data: data,
  });
}
/**
 * 获取机构处罚决定分析
 */
export function getDecisionAnalysisAPI(params) {
  return axios({
    url: `${api.pre}/getAnalysis`,
    method: "get",
    params,
  });
}
/**
 * 获取违规点分析
 */
export function getBusinessAPI(params) {
  // return new Promise((resolve) => {
  //   resolve({
  //     business: [
  //       {
  //         name: "反洗钱",
  //         frequency: 65,
  //         amount: 1773,
  //       },
  //       {
  //         name: "结算账户管理",
  //         frequency: 24,
  //         amount: 1584,
  //       },
  //     ],
  //   });
  // });

  return axios({
    url: `${api.pre}/getBasisStatistics`,
    method: "get",
    params,
  });
}

/**
 * 获取罚单地域分布
 */
export function getAreaAPI(params) {
  console.log("get Area api", params);
  // return new Promise((resolve) => {
  //   resolve({
  //     area: [
  //       {
  //         province: "陕西省",
  //         count: 23,
  //         countRatio: 26.14,
  //         amount: 373.1,
  //         amountRatio: 18.47,
  //         amountOrganization: 353.3,
  //         amountPersonal: 19.8,
  //         countOrganization: 12,
  //         countPersonal: 11,
  //       },
  //       {
  //         province: "新疆维吾尔自治区",
  //         count: 13,
  //         countRatio: 14.77,
  //         amount: 479.5,
  //         amountRatio: 23.73,
  //         amountOrganization: 305.5,
  //         amountPersonal: 174,
  //         countOrganization: 8,
  //         countPersonal: 5,
  //       },
  //     ],
  //   });
  // });

  return axios({
    url: `${api.pre}/getPenaltyDistribution`,
    method: "get",
    params,
  });
}

/**
 * 获取大额罚单详情
 */
export function getDetailAPI(params) {
  // return new Promise((resolve) => {
  //   resolve({
  //     detail: [
  //       {
  //         name: "厦门国际银行",
  //         id: "福银罚字【2021】50号",
  //         amount: 292,
  //         type: "城市商业银行",
  //         from: "福州中心支行",
  //         problem:
  //           "未按规定履行客户身份识别、未按规定报送大额或可疑交易报告、未履行不良信息告知义务、账户超期备案、贷款数据统计不准确",
  //       },
  //       {
  //         name: "雅安农村商业银行",
  //         id: "雅银罚字【2021】第1号",
  //         amount: 193,
  //         type: "农村商业银行",
  //         from: "雅安市中心支行",
  //         problem:
  //           "虚报或瞒报金融统计信息、账户超期备案、未经授权查询征信信息、与身份不明客户交易、未按规定开展客户风险等级划分、违规开展支付业务",
  //       },
  //     ],
  //   });
  // });

  return axios({
    url: `${api.pre}/getPenaltyOrderByFine`,
    method: "get",
    params,
  });
}

export function getGlobalAPI(params) {
  return axios({
    url: `${api.pre}/getSummary`,
    method: "get",
    params,
  });
}

export function getOrgCountListAPI(params) {
    return axios({
        url: `${api.pre}/getOrganListOrderByCount`,
        method: "get",
        params,
    });
}

export function getOrgAmountListAPI(params) {
    return axios({
        url: `${api.pre}/getOrganListOrderByFine`,
        method: "get",
        params,
    });
}

export function getOrgTypeCountListAPI() {
  return new Promise((resolve) => {
    resolve({
      orgTypeCountList: [
        {
          type: "农村商业银行",
          count: 32,
          amount: 710,
        },
        {
          type: "农村信用社",
          count: 31,
          amount: 248,
        },
      ],
    });
  });
}

export function getOrgTypeAmountListAPI() {
  return new Promise((resolve) => {
    resolve({
      orgTypeAmountList: [
        {
          type: "农村商业银行",
          count: 32,
          amount: 710,
        },
        {
          type: "农村信用社",
          count: 31,
          amount: 248,
        },
      ],
    });
  });
}

/**
 * 趋势分析
 */
export function getTrendAPI(params) {
  return axios({
    url: `${api.pre}/getAnalysisForTrend`,
    method: "get",
    params,
  });
}
