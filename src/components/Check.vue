<template>
    <div class="main">
        <h2 style="margin-top: 10px" @click="goBack">返回上一界面</h2>
        <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>总体情况</BreadcrumbItem>
            <BreadcrumbItem>违规案例库</BreadcrumbItem>
            <BreadcrumbItem>查看详情</BreadcrumbItem>
        </Breadcrumb>
    <div class="detail-container">
        <div class="detail-container-left">

            <div class="detail-container-left-box">
            <el-descriptions class="margin-top" :column="2" border direction="vertical">
                <el-descriptions-item span="2">
                    <template slot="label">
                        <i class="el-icon-star-on"></i>
                        行政处罚名称
                    </template>{{detailInfo.name}}

                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        行政处罚决定文号
                    </template>

                  {{detailInfo.number || '无' }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        处罚类型
                    </template>

                    <div class="content">
                        <span v-if="detailInfo.type === '0'">个人</span>
                        <span v-if="detailInfo.type === '1'">单位</span>
                    </div>

                </el-descriptions-item>
                <el-descriptions-item  span="2">
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        被罚当事人名称
                    </template>

                  {{detailInfo.partyName || '无' }}

                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        主要负责人姓名
                    </template>
                  {{detailInfo.responsiblePersonName || '无' }}

                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        处罚时间
                    </template>

                  {{detailInfo.date || '无' }}

                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        行政处罚决定
                    </template>

                  {{detailInfo.decision || '无'}}

                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        行政处罚的机关名称
                    </template>

                  {{detailInfo.organName || '无'}}

                </el-descriptions-item>
                <el-descriptions-item  span="2">
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        主要违法违规事实（案由）
                    </template>

                  {{detailInfo.facts || '无'}}

                </el-descriptions-item>
                <el-descriptions-item  span="2">
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        行政处罚依据
                    </template>

                  {{detailInfo.basis || '无'}}

                </el-descriptions-item>
            </el-descriptions>
            </div>
        </div>
        <div class="detail-container-right" >
            <h2 style="margin: 15px" v-if="list===true">相似法规条例</h2>
            <h2 style="margin: 15px" v-if="list===false" @click="showBack">返回上一界面</h2>
            <template v-if="list===true">
                <el-table
                        :data="queryDetailList"
                        height="250"
                        max-height="600px"
                        border
                        row-class-name="rowClassName"
                        style="width: 100%">
                    <el-table-column
                            prop="ranking"
                            label="序号"
                            width="80"
                            align='center'>
                    </el-table-column>
                    <el-table-column
                            prop="cosine"
                            label="匹配度"
                            width="100"
                            align='center'>
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="法规内容"
                            class-name="content1 content"
                            >
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                查看详情
                                <div slot="reference" class="content1" @click="showDetail(scope.row)">
                                    {{ scope.row.content }}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        style="margin-left: 5%"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-sizes="[10, 20, 30, 40, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                >
                </el-pagination>
            </template>
            <template v-else>
                <el-descriptions class="margin-top" :column="2" border direction="vertical">
                    <el-descriptions-item span="2">
                        <template slot="label">
                            <i class="el-icon-star-on"></i>
                            文件名称
                        </template>{{policyDetail.file}}

                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-s-promotion"></i>
                            章节
                        </template>

                        {{policyDetail.chapter || '无' }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-s-promotion"></i>
                            条目
                        </template>

                        {{policyDetail.article || '无' }}

                    </el-descriptions-item>
                    <el-descriptions-item >
                        <template slot="label">
                            <i class="el-icon-s-promotion"></i>
                            发布部门
                        </template>

                        {{policyDetail.department || '无' }}

                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-s-promotion"></i>
                            匹配度
                        </template>
                        {{policyDetail.cosine || '无' }}

                    </el-descriptions-item>
                    <el-descriptions-item   span="2">
                        <template slot="label">
                            <i class="el-icon-s-promotion"></i>
                            内容详情
                        </template>

                        {{policyDetail.content || '无' }}

                    </el-descriptions-item>
                </el-descriptions>
            </template>
        </div>
    </div>
    </div>
</template>

<script>
    // import axios from "axios";
    import {queryByPenaltyIdAPI,queryByPolicyIdAPI} from "../api/api";

    export default {
        data() {
            return {
                list: true,
                tableData: [{
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }],
                totalData: [{
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }, {
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.8,
                }],
                total: 10,
                pageSize: 1,
                currentPage: 1,
              detailInfo:{
                id: '',
                name: '', //行政处罚名称
                number: ',',//行政处罚决定文号
                type: '',//罚类型//只有"personal","organization"两种
                partyName: '',//当事人名称
                responsiblePersonName: '',//要负责人姓名
                facts:'',//要违法违规事实（案由）
                basis: '',//处罚依据
                decision: '',
                organName:'',
                date:'',
                status:''
              },
                queryList:[],
                queryDetailList:[],
                policyDetail:{
                    id: 1,
                    file: '《代收代付业务管理办法》',
                    department:  '三农业务部',
                    article:  '第一条',
                    content:   '为加强代收代付业务管理，防范业务风险，维护我行、委托人及其他当事人的合法权益，依据《商业银行法》、《商业银行服务价格管理暂行办法》等的有关规定，结合我行实际情况，特制定本办法。',
                    chapter:   "第一章  总则",
                    ranking:   1,
                    cosine:   0.4,
                }
            }
        },
        methods: {
            // eslint-disable-next-line no-unused-vars
            showDetail(data){
                this.list = false;
                this.policyDetail = data;
            },
            showBack(){
                this.list = true;
                this.policyDetail = {};
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                this.getPage();
            },
            handleCurrentChange(val) {
                console.log("handleCurrentChange");
                this.currentPage = val;
                this.getPage();
            },
            getPage() {
                this.tableData = [];
                for (let i = 0; i < this.pageSize; i++) {
                    this.tableData.push(this.totalData[(this.currentPage-1)*this.pageSize+i])
                }
            },
            goBack () {
            this.$router.back(-1)
            },
            getQueryList(){
                const data = this.detailInfo.id;
                console.log(data);
                queryByPenaltyIdAPI(data).then((res) => {
                    if (res.code === "0") {
                      this.queryList = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            getPolicyDetail(id){
                console.log(id);
                let re = {};
                queryByPolicyIdAPI(id).then((res) => {
                    if (res.code === "0") {
                        this.re = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
                return re;
            },
            getQueryDetailList(){
                this.queryDetailList = [];
                this.getQueryList();
                for (let i = 0; i < this.queryList.size(); i++) {
                    let res = this.getPolicyDetail(this.queryList[i].innerPolicyId);

                    let policy = {};
                    policy.id = res.id;
                    policy.file = res.file;
                    policy.department = res.file;
                    policy.article = res.file;
                    policy.content = res.file;
                    policy.chapter = res.file;
                    policy.ranking = this.queryList[i].ranking;
                    policy.cosine = this.queryList[i].cosine;

                    this.queryDetailList.push(policy);
                }
            }
        },

      name: "Check",
        mounted() {
            this.getQueryDetailList();
        },
        created () {
        const res = this.$route.query.pid;
         // console.log(res.name)
        this.detailInfo = res;
        console.log(this.detailInfo);
      },

    }


</script>

<style>
    .detail-container {
        position: relative;
        height: 100%;
        flex: 1 0 900px;
        box-sizing: border-box;
    }
    .detail-container-left {
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding: 20px;
    }
    .detail-container-left-box {
        width: 50%;
        margin: 20px;
        box-sizing: border-box;
    }
    .detail-container-right {
        position: absolute;
        top: 40px;
        right: 40px;
        height: 90%;
        width: 45%;
        box-sizing: border-box;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .content{
        margin-left: 10px;
    }
    .content1{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

    }


</style>
