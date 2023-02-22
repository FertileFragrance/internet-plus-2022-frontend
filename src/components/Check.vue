<template>
    <div class="detail-container">
        <div class="detail-container-left">
            <el-descriptions class="margin-top" :column="2" border direction="vertical">
                <el-descriptions-item span="2">
                    <template slot="label">
                        <i class="el-icon-star-on"></i>
                        行政处罚名称
                    </template>
<!--                    <div v-if="state === 'view'">-->
<!--                        {{ detail.docTitle }}-->
<!--                        <el-tag v-if="detail.status === 'PUBLIC'" effect='plain'>已发布</el-tag>-->
<!--                        <el-tag v-if="detail.status === 'DRAFT'" effect='plain' type="success">草稿</el-tag>-->
<!--                        <el-tag v-if="detail.status === 'ABOLISH'" effect='plain' type="danger">已废止</el-tag>-->
<!--                    </div>-->
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        行政处罚决定文号
                    </template>
                    <div>
                        12
<!--                        {{ detail.docIdentifier || '无' }}-->
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        处罚类型
                    </template>
                    <div>
                        12
                        <!--                        {{ detail.docIdentifier || '无' }}-->
                    </div>
                </el-descriptions-item>
                <el-descriptions-item  span="2">
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        被罚当事人名称
                    </template>
                    <div>
                        12
                        <!--                        {{ detail.docIdentifier || '无' }}-->
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        主要负责人姓名
                    </template>
                    <div>
                        12
                        <!--                        {{ detail.docIdentifier || '无' }}-->
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        处罚时间
                    </template>
                    <div>
                        12
                        <!--                        {{ detail.docIdentifier || '无' }}-->
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        行政处罚决定
                    </template>
                    <div>
                        12
                        <!--                        {{ detail.docIdentifier || '无' }}-->
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        行政处罚的机关名称
                    </template>
                    <div>
                        12
                        <!--                        {{ detail.docIdentifier || '无' }}-->
                    </div>
                </el-descriptions-item>
                <el-descriptions-item  span="2">
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        主要违法违规事实（案由）
                    </template>
                    <div>
                        12
                        <!--                        {{ detail.docIdentifier || '无' }}-->
                    </div>
                </el-descriptions-item>
                <el-descriptions-item  span="2">
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        行政处罚依据
                    </template>
                    <div>
                        12
                        <!--                        {{ detail.docIdentifier || '无' }}-->
                    </div>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="detail-container-right" ></div>
    </div>
</template>

<script>
    export default {
        name: "Check"
    }
</script>

<style>
    .detail-container {
        position: relative;
        background-color: #E9EEF3;
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
        width: 65%;
        margin: 20px;
        box-sizing: border-box;
    }
    .detail-container-right {
        position: absolute;
        top: 40px;
        right: 40px;
        height: 90%;
        width: 30%;
        box-sizing: border-box;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }


</style>
