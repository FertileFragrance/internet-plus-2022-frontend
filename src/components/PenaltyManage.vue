<style>
.word{
  font-family:"PingFang SC";
}
.btn{
  margin: 5px;
}
</style>
<template>
  <div class="main">
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>总体情况</BreadcrumbItem>
      <BreadcrumbItem>违规案例库</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <h2 class="word" style="justify-content: left ; font-size: 30px ;text-align: center">
        违规事件库
      </h2>
      <br>
      <div
          class="input-wrapper"
          style="display: flex;justify-content: center;align-items: center"
      >
        <el-form size="mini" :inline="true">
          <el-form-item label="行政处罚名称">
            <el-input type="string" v-model="searchModel.name"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚决定文号">
            <el-input type="string" v-model="searchModel.number"></el-input>
          </el-form-item>
          <el-form-item label="处罚类型">
            <el-select v-model="searchModel.type" placeholder="请选择处罚类型">
              <el-option label="个人" value="0"></el-option>
              <el-option label="单位" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="被罚当事人名称">
            <el-input type="string" v-model="searchModel.partyName"></el-input>
          </el-form-item>
          <el-form-item label="主要负责人姓名">
            <el-input
                type="string"
                v-model="searchModel.responsiblePersonName"
            ></el-input>
          </el-form-item>
          <el-form-item label="主要违法违规事实（案由）">
            <el-input type="string" v-model="searchModel.facts"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚依据">
            <el-input type="string" v-model="searchModel.basis"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚决定">
            <el-input type="string" v-model="searchModel.decision"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚的机关名称">
            <el-input type="string" v-model="searchModel.organName"></el-input>
          </el-form-item>
          <el-form-item label="作出处罚决定的日期">
            <el-date-picker
                v-model="searchModel.date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchModel.status" placeholder="请选择发布状态">
              <el-option label="未发布" value="0"></el-option>
              <el-option label="已发布" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <Button @click="searchByName" type="primary" icon="ios-search" style="margin: 5px">查询</Button>
        <!--      <el-button @click="searchByName" size="mini">查询</el-button>-->
        <Button @click="resetSearch" type="primary" >重置</Button>

        <!--      <el-button @click="resetSearch" size="mini">Reset</el-button>-->
      </div>
      <div
          class="operation-wrapper"
          style="display: flex;justify-content: center;align-items: center;"
      >
        <Button class="btn" size="large" @click="importDialogVisible = true">导入</Button>
        <Button class="btn" size="large" @click="addDialogVisible = true">新建</Button>
        <Button class="btn" size="large" @click="onClickEdit">修改</Button>
        <Button class="btn" size="large" @click="deletePunishment">删除</Button>
        <Button class="btn" size="large" @click="releasePunishment">发布</Button>
        <Button class="btn" size="large" @click="withdrawPunishment">撤回</Button>
      </div>

      <el-table
          ref="penaltyTable"
          :data="tableData"
          max-height="500px"
          width="100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="行政处罚名称"> </el-table-column>
        <el-table-column prop="number" label="行政处罚决定文号">
        </el-table-column>
        <el-table-column prop="type" label="处罚类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type === '0'">个人</span>
            <span v-if="scope.row.type === '1'">单位</span>
          </template>
        </el-table-column>
        <el-table-column prop="partyName" label="被罚当事人名称">
        </el-table-column>
        <el-table-column prop="responsiblePersonName" label="主要负责人姓名">
        </el-table-column>
        <el-table-column prop="facts" label="主要违法违规事实（案由）">
        </el-table-column>
        <el-table-column prop="basis" label="行政处罚依据"> </el-table-column>
        <el-table-column prop="decision" label="行政处罚决定"> </el-table-column>
        <el-table-column prop="organName" label="行政处罚的机关名称">
        </el-table-column>
        <el-table-column prop="date" label="作出处罚决定的日期">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
          <span v-if="scope.row.status === '0'">
            <el-tag type="info">未发布</el-tag>
          </span>
            <span v-if="scope.row.status === '1'">
            <el-tag type="success">已发布</el-tag>
          </span>
          </template>
        </el-table-column>
        <el-table-column>
          <Button class="btn" size="large" @click="onClickEdit">详情</Button>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>

      <el-dialog title="新增" :visible.sync="addDialogVisible">
        <el-form :model="addModel" label-width="auto">
          <el-form-item label="行政处罚名称">
            <el-input type="string" v-model="addModel.name"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚决定文号">
            <el-input type="string" v-model="addModel.number"></el-input>
          </el-form-item>
          <el-form-item label="处罚类型">
            <el-select v-model="addModel.type" placeholder="请选择处罚类型">
              <el-option label="个人" value="0"></el-option>
              <el-option label="单位" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="被罚当事人名称">
            <el-input type="string" v-model="addModel.partyName"></el-input>
          </el-form-item>
          <el-form-item label="主要负责人姓名">
            <el-input
                type="string"
                v-model="addModel.responsiblePersonName"
            ></el-input>
          </el-form-item>
          <el-form-item label="主要违法违规事实（案由）">
            <el-input type="string" v-model="addModel.facts"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚依据">
            <el-input type="string" v-model="addModel.basis"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚决定">
            <el-input type="string" v-model="addModel.decision"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚的机关名称">
            <el-input type="string" v-model="addModel.organName"></el-input>
          </el-form-item>
          <el-form-item label="作出处罚决定的日期">
            <el-date-picker
                v-model="addModel.date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog title="修改" :visible.sync="editDialogVisible">
        <el-form :model="editModel" label-width="auto">
          <el-form-item label="行政处罚名称">
            <el-input type="string" v-model="editModel.name"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚决定文号">
            <el-input type="string" v-model="editModel.number"></el-input>
          </el-form-item>
          <el-form-item label="处罚类型">
            <el-select v-model="editModel.type" placeholder="请选择处罚类型">
              <el-option label="个人" value="0"></el-option>
              <el-option label="单位" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="被罚当事人名称">
            <el-input type="string" v-model="editModel.partyName"></el-input>
          </el-form-item>
          <el-form-item label="主要负责人姓名">
            <el-input
                type="string"
                v-model="editModel.responsiblePersonName"
            ></el-input>
          </el-form-item>
          <el-form-item label="主要违法违规事实（案由）">
            <el-input type="string" v-model="editModel.facts"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚依据">
            <el-input type="string" v-model="editModel.basis"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚决定">
            <el-input type="string" v-model="editModel.decision"></el-input>
          </el-form-item>
          <el-form-item label="行政处罚的机关名称">
            <el-input type="string" v-model="editModel.organName"></el-input>
          </el-form-item>
          <el-form-item label="作出处罚决定的日期">
            <el-date-picker
                v-model="editModel.date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="editModel.status" placeholder="请选择发布状态">
              <el-option label="未发布" value="0"></el-option>
              <el-option label="已发布" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPunishment">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog title="导入" :visible.sync="importDialogVisible">
        <el-upload
            id="importExcel"
            drag
            action="/"
            multiple
            :on-change="handleChange"
            :file-list="fileList"
            :auto-upload="false"
            accept=".xls,.xlsx"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">（只能上传Excel文件）</div>
        </el-upload>
        <el-button
            id="upload-ack"
            @click="uploadAck"
            style="margin: auto;width:73.9px;height: 39.6px"
        >确 认
        </el-button>
      </el-dialog>
    </Content>

    <!--      <div id = "echarts-main" style="width: 800px;height: 600px;"></div>-->
  </div>
</template>

<script>



// import * as echarts from "echarts";
import {
  createPunishmentAPI,
  deletePunishmentAPI,
  editPunishmentAPI,
  getPunishmentListAPI,
  releasePunishmentAPI,
  uploadAPI,
} from "../api/api";

export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "string", //行政处罚名称
          number: "string", //行政处罚决定文号
          type: "personal", //处罚类型//只有"personal","organization"两种
          partyName: "string", //被罚当事人名称
          responsiblePersonName: "string", //主要负责人姓名
          facts: "string1111111111111111111111111111111", //主要违法违规事实（案由）
          basis: "string", //行政处罚依据
          decision: "string", //行政处罚决定
          organName: "string", //行政处罚的机关名称
          date: "2021-10-31", //作出处罚决定的日期
          status: "0", //状态//只有"0":未发布,"1":已发布两种
        },
        {
          id: "2",
          name: "string", //行政处罚名称
          number: "string", //行政处罚决定文号
          type: "organization", //处罚类型//只有"personal","organization"两种
          partyName: "string", //被罚当事人名称
          responsiblePersonName: "string", //主要负责人姓名
          facts: "string2222222222222222222", //主要违法违规事实（案由）
          basis: "string", //行政处罚依据
          decision: "string", //行政处罚决定
          organName: "string", //行政处罚的机关名称
          date: "2021-09-08", //作出处罚决定的日期
          status: "1", //状态//只有"0":未发布,"1":已发布两种
        },
      ],
      addDialogVisible: false,
      addModel: {
        status: "0",
      },
      editDialogVisible: false,
      editModel: {},
      importDialogVisible: false,

      analyzeDialogVisible: false,

      total: 0,
      pageSize: 20,
      currentPage: 1,
      searchInput: "",
      searchModel: {},
      searchParams: {},
      selectIdList: [],
      fileList: [],

      // 文件
      current: {
        name: "",
        content: {},
      },
      allFile: {},
    };
  },
  methods: {
    add() {
      console.log(this.addModel);
      const data = {
        dataList: [this.addModel],
      };
      console.log(data);
      createPunishmentAPI(data).then((res) => {
        if (res.code === "1") {
          this.$message.success("新建成功！");
          this.getPage();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    onClickEdit() {
      if (this.selectIdList.length < 1) {
        this.$message.error("请选择需要修改的条目！");
      } else if (this.selectIdList.length > 1) {
        this.$message.error("所选择条目数量大于1！");
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id === this.selectIdList[0]) {
            this.editModel = JSON.parse(JSON.stringify(this.tableData[i]));
            this.editDialogVisible = true;
            break;
          }
        }
      }
    },
    onClickCheck() {
      if (this.selectIdList.length < 1) {
        this.$message.error("请选择需要修改的条目！");
      } else if (this.selectIdList.length > 1) {
        this.$message.error("所选择条目数量大于1！");
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id === this.selectIdList[0]) {
            this.editModel = JSON.parse(JSON.stringify(this.tableData[i]));
            this.editDialogVisible = true;
            break;
          }
        }
      }
    },
    editPunishment() {
      const data = this.editModel;
      editPunishmentAPI(data).then((res) => {
        if (res.code === "1") {
          this.$message.success("修改成功！");
          this.getPage();
          this.$refs.penaltyTable.clearSelection();
          this.editDialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    releasePunishment() {
      if (this.selectIdList.length < 1) {
        this.$message.error("请选择需要发布的条目！");
        return;
      }
      const data = {
        listRelatedOperation: "1",
        dataList: this.selectIdList,
      };
      releasePunishmentAPI(data).then((res) => {
        if (res.code === "1") {
          this.$message.success("发布成功！");
          this.getPage();
        }
      });
    },
    withdrawPunishment() {
      if (this.selectIdList.length < 1) {
        this.$message.error("请选择需要撤回的条目！");
        return;
      }
      const data = {
        listRelatedOperation: "0",
        dataList: this.selectIdList,
      };
      releasePunishmentAPI(data).then((res) => {
        if (res.code === "1") {
          this.$message.success("撤回成功！");
          this.getPage();
        }
      });
    },
    deletePunishment() {
      if (this.selectIdList.length < 1) {
        this.$message.error("请选择需要删除的条目！");
        return;
      }
      const data = {
        dataList: this.selectIdList,
      };
      deletePunishmentAPI(data).then((res) => {
        if (res.code === "1") {
          this.$message.success("删除成功！");
          console.log(this.currentPage);
          let totalPage = Math.ceil((this.total - 1) / this.pageSize);
          let currentPage =
              this.currentPage > totalPage ? totalPage : this.currentPage;
          this.currentPage = currentPage < 1 ? 1 : currentPage;
          this.getPage();
          console.log(this.currentPage);
        }
      });
    },
    searchByName() {
      this.searchParams = JSON.parse(JSON.stringify(this.searchModel));
      console.log(this.searchParams);
      this.currentPage = 1;
      this.getPage();
    },
    resetSearch() {
      this.searchParams = {};
      this.searchModel = {};
      this.searchByName();
    },
    getPage() {
      console.log(this.searchParams);
      let params = this.searchParams;
      params.pageSize = this.pageSize;

      console.log(params);
      getPunishmentListAPI(params, this.currentPage).then((res) => {
        if (res.code === "1") {
          this.tableData = res.data.dataList;
          this.total = res.data.listRelatedData;
        }
      });
    },
    handleSelectionChange(val) {
      let len = val.length;
      let selectIdList = [];
      console.log(val);
      for (let i = 0; i < len; i++) {
        selectIdList.push(val[i].id);
      }
      console.log(selectIdList);
      this.selectIdList = selectIdList;
      console.log(this.selectIdList);
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
    handleChange(file) {
      this.fileList.push(file);
    },
    uploadAck() {
      console.log("uploadAck");
      if (this.fileList.length > 0) {
        let fd = new FormData();
        this.fileList.forEach((item) => {
          //文件信息中raw才是真的文件
          fd.append("uploadXls", item.raw);
          console.log(item.raw);
        });
        console.log(fd.get("uploadXls"));
        uploadAPI(fd).then((res) => {
          if (res) {
            this.$message.success("导入成功！");
            this.currentPage = 1;
            this.getPage();
            this.fileList = [];
            this.importDialogVisible = false;
          }
        });
      }
    },
    analyzePunishment() {
      this.analyzeDialogVisible = true;
    },
  },
  mounted() {
    this.getPage();

  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
}

.container {
  height: 100%;
}

.el-aside {
  background: #2c3e50;
}

.menu {
  background: white;
}

main {
  width: 100%;
  padding: 0 !important;
}
</style>
