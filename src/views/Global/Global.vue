<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>总体情况</BreadcrumbItem>
      <BreadcrumbItem>总体处罚情况</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}" >

      <h1 class="title" style="font-size:40px">总体处罚情况</h1>
      <br>
      <h2 >01、本周期处罚</h2>
      <br>
      <div class="content">
        <p style="font-size: 14px">
          本周期，人民银行罚单合计<span style="color: red">{{ total }}</span>张，
          罚没金额累计<span style="color: red">{{ amount }}</span>元，
          处罚机构<span style="color: red">{{ countOrganization }}</span>家，
          处罚人员<span style="color: red">{{ countPersonal }}</span>人。
        </p>
      </div>
      <div class="content">
        <p style="font-size: 14px">
          上个周期，人民银行罚单合计<span style="color: red">{{ lastTotal }}</span>张，
          罚没金额累计<span style="color: red">{{ lastAmount }}</span>元，
          处罚机构<span style="color: red">{{ lastCountOrganization }}</span>家，
          处罚人员<span style="color: red">{{ lastCountPersonal }}</span>人。
        </p>
      </div>
      <br>
      <h2 >02、监管机构处罚情况</h2>
      <br>
      <div class="content">
        <p style="font-size: 14px">
          本周期罚单中，分行罚单合计
          <span style="color: red">{{ branchTotal }}</span>
          张，占本周期罚单的
          <span style="color: red">{{ branchTotalRatio }}%</span>
          ，罚没金额
          <span style="color: red">{{ branchAmount }}</span>
          元，占本周期罚没总金额的
          <span style="color: red">{{ branchAmountRatio }}%</span>
          。
        </p>
      </div>
      <div class="content">
        <p style="font-size: 14px">
          中心支行罚单合计
          <span style="color: red">{{ centerBranchTotal }}</span>
          张，占本周期罚单的
          <span style="color: red">{{ centerBranchTotalRatio }}%</span>
          ，罚没金额
          <span style="color: red">{{ centerBranchAmount }}</span>
          元，占本周期罚没总金额的
          <span style="color: red">{{ centerBranchAmountRatio }}%</span>
          。
        </p>
      </div>
      <br>

      <h2 >03、受罚机构罚单数量排行</h2>
      <br>
      <div class="content" v-if = "orgCountList[0]&&orgCountList[1]">
        <p style="font-size: 14px">
          本周期，人民银行罚单中，
          <span style="font-weight: bold">{{orgCountList[0].name}}</span>
          罚单数量最多，累计罚单数量
          <span style="color: red">{{orgCountList[0].count}}</span>
          张，
          <span style="font-weight: bold">{{orgCountList[1].name}}</span>
          以
          <span style="color: red">{{orgCountList[1].count}}</span>
          张罚单位列第二。
        </p>
      </div>
      <br>

      <h3 class="title" style="font-size: 25px">机构罚单笔数排行</h3>
      <br>
      <el-table :data="orgCountList">
        <el-table-column type="index" prop="index" label="排序"></el-table-column>
        <el-table-column prop="name" label="机构名称"></el-table-column>
        <!--      <el-table-column prop="bar" label="" width="700">-->
        <!--        <template slot-scope="scope">-->
        <!--          <div style="height:20px;background:black">-->
        <!--            <div-->
        <!--                :style="{-->
        <!--                height: 100 + '%',-->
        <!--                width: scope.row.bar + '%',-->
        <!--                background: 'red',-->
        <!--              }"-->
        <!--            ></div>-->
        <!--            &lt;!&ndash; <div>{{ scope.row }}</div> &ndash;&gt;-->
        <!--          </div>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
        <el-table-column prop="ratio" label="" width="700">
          <template slot-scope="scope">
            <el-progress :percentage="Number(scope.row.bar)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="罚单笔数"></el-table-column>
        <el-table-column prop="amount" label="罚没金额"></el-table-column>
      </el-table>
      <br>

      <h2 >04、受罚机构罚没金额排行</h2>
      <br>
      <div class="content" v-if = "orgAmountList[0]&&orgAmountList[1]">
        <p style="font-size: 14px">
          本周期，人民银行累计罚没金额中，
          <span style="font-weight: bold">{{orgAmountList[0].name}}</span>
          罚没金额最高，累计罚没金额
          <span style="color: red">{{orgAmountList[0].amount}}</span>
          元，
          <span style="font-weight: bold">{{orgAmountList[1].name}}</span>
          累计罚没金额
          <span style="color: red">{{orgAmountList[1].amount}}</span>
          元。
        </p>
      </div>
      <br>
      <h3 class="title" style="font-size: 25px">机构罚没金额排行</h3>
      <el-table :data="orgAmountList">
        <el-table-column type="index" prop="index" label="排序"></el-table-column>
        <el-table-column prop="name" label="机构名称"></el-table-column>
        <!--      <el-table-column prop="bar" label="" width="700">-->
        <!--        <template slot-scope="scope">-->
        <!--          <div style="height:20px;background:black">-->
        <!--            <div-->
        <!--                :style="{-->
        <!--                height: 100 + '%',-->
        <!--                width: scope.row.bar + '%',-->
        <!--                background: 'yellow',-->
        <!--              }"-->
        <!--            ></div>-->
        <!--            &lt;!&ndash; <div>{{ scope.row }}</div> &ndash;&gt;-->
        <!--          </div>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
        <el-table-column prop="ratio" label="" width="700">
          <template slot-scope="scope">
            <el-progress :percentage="Number(scope.row.bar)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="罚单笔数"></el-table-column>
        <el-table-column prop="amount" label="罚没金额"></el-table-column>
      </el-table>
    </Content>
  </div>
</template>
<script>
//TODO
import {getGlobalAPI, getOrgAmountListAPI, getOrgCountListAPI} from "@/api/api";
import {mapMutations, mapState} from "vuex";

export default {
  watch: {
    date() {
      this.initGlobalData();
      this.initOrgCountTable();
      this.initOrgAmountTable();
    },
    reportType() {
      this.initGlobalData();
      this.initOrgCountTable();
      this.initOrgAmountTable();
    },

  },
  data() {
    return {
      total: '',
      amount: '',
      countOrganization: '',
      countPersonal: '',
      lastTotal: '',
      lastAmount: '',
      lastCountOrganization: '',
      lastCountPersonal: '',
      branchTotal: '',
      branchTotalRatio: '',
      branchAmount: '',
      branchAmountRatio: '',
      centerBranchTotal:'',
      centerBranchTotalRatio:'',
      centerBranchAmount:'',
      centerBranchAmountRatio:'',
      orgCountList:[],
      orgAmountList:[],
    }
  },
  computed: {
    ...mapState(["date", "reportType"]),
  },
  methods:{

    ...mapMutations(["setDate", "setReportType"]),
    handleOrgCountTable(data) {
      const max = data[0].count;
      data.forEach((item) => {
        item.bar = Number(((item.count / max) * 100).toFixed(0));
      });
      return data;
    },
    handleOrgAmountTable(data) {
      const max = data[0].amount;
      data.forEach((item) => {
        item.bar = Number(((item.amount / max) * 100).toFixed(0));
      });
      return data;
    },
    async initGlobalData(){
      let month = this.reportType === "year" ? 0 : this.date.getMonth()+1;
      if (month<10){
        month = "0"+month;
      }
      const year = this.date.getFullYear();
      const res = await getGlobalAPI({year,month});
      const data = res.data;
      this.total = data.total;
      this.amount= data.amount;
      this.countOrganization= data.countOrganization;
      this.countPersonal= data.countPersonal;
      this.lastTotal= data.lastTotal;
      this.lastAmount= data.lastAmount;
      this.lastCountOrganization= data.lastCountOrganization;
      this.lastCountPersonal= data.lastCountPersonal;
      this.branchTotal= data.branchTotal;
      this.branchTotalRatio= data.branchTotalRatio;
      this.branchAmount= data.branchAmount;
      this.branchAmountRatio= data.branchAmountRatio;
      this.centerBranchTotal=data.centerBranchTotal;
      this.centerBranchTotalRatio=data.centerBranchTotalRatio;
      this.centerBranchAmount=data.centerBranchAmount;
      this.centerBranchAmountRatio=data.centerBranchAmountRatio;


    },
    async initOrgCountTable(){
      let month = this.reportType === "year" ? 0 : this.date.getMonth()+1;
      if (month<10){
        month = "0"+month;
      }
      const year = this.date.getFullYear();
      const res = await getOrgCountListAPI({month, year});
      const data = res.data;
      this.orgCountList = data.dataList;
      this.handleOrgCountTable(this.orgCountList);
    },
    async initOrgAmountTable(){
      let month = this.reportType === "year" ? 0 : this.date.getMonth()+1;
      if (month<10){
        month = "0"+month;
      }
      const year = this.date.getFullYear();
      const res = await getOrgAmountListAPI({month, year});
      const data = res.data;
      this.orgAmountList= data.dataList;
      this.handleOrgAmountTable(this.orgAmountList);
    },

  },
  async mounted() {
    await this.initGlobalData();
    await this.initOrgCountTable();
    await this.initOrgAmountTable();
  }
};
</script>
<style scoped>
.title {
  text-align: center;
}
</style>