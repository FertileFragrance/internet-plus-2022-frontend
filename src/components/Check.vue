<template>
    <div class="main">
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
            <h2 style="margin: 15px">相似法规条例</h2>
            <template v-if="list===true">
                <el-table
                        :data="tableData"
                        height="250"
                        max-height="600px"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址">
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
                <el-pager
                        max-height="600px"
                        border>

                </el-pager>
            </template>
        </div>
    </div>
    </div>
</template>

<script>
    // import axios from "axios";
    export default {
        data() {
            return {
                list: true,
                detail:{
                    id: "1",
                    name: "string", //行政处罚名称
                    number: "string", //行政处罚决定文号
                    type: "1", //处罚类型//只有"personal","organization"两种
                    partyName: "string", //被罚当事人名称
                    responsiblePersonName: "string", //主要负责人姓名
                    facts: "string1111111111111111111111111111111", //主要违法违规事实（案由）
                    basis: "string", //行政处罚依据
                    decision: "string", //行政处罚决定
                    organName: "string", //行政处罚的机关名称
                    date: "2021-10-31", //作出处罚决定的日期
                    status: "0", //状态//只有"0":未发布,"1":已发布两种
                },
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                totalData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
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
            }
        },
        methods: {
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
          }
        },

      name: "Check",

      created () {
        const res = this.$route.query.pid;
         // console.log(res.name)
        this.detailInfo = res
        console.log(this.detailInfo)
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


</style>
