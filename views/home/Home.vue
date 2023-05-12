<template>
    <div style="margin-top: 60px;">

        <div class="table-page" >
            <div style="text-align: right; height: 50px;">
                <el-button type="primary">添加</el-button>
            </div>
            
            <el-table :data="tableData" :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}"  border>
                <el-table-column type="index" width="50" />
                <el-table-column prop="date" sortable  label="日期"></el-table-column>
                <el-table-column prop="frontEndVersion" label="前端版本"></el-table-column>
                <el-table-column prop="frontEndAddress" label="前端地址"></el-table-column>
                <el-table-column prop="backEndersion" label="后端版本"></el-table-column>
                <el-table-column prop="backEndAddress" label="后台地址"></el-table-column>
                <el-table-column prop="environment" label="环境(test/prod)" width="150px"></el-table-column>
                <el-table-column prop="deployer" label="部署人"></el-table-column>
                <el-table-column prop="message" label="备注"></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" >编辑</el-button>
                        <el-button link type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';

import { message } from 'ant-design-vue';
export default {
    name: 'Home',

    components: {
        ElTable,
        ElTableColumn,
        ElPagination,
    },
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
        };
    },
    mounted() {
        // 获取表格数据
        this.getTableData();
    },
    methods: {
        getTableData() {
            // 发送请求获取表格数据，这里简化为直接赋值
            this.tableData = [
                { date: '2020-02-18', frontEndVersion: 18.1, backEndersion:'10.1' ,frontEndAddress: 'v7.0.1', backEndAddress: 'v5.0.1', environment:'test', deployer:'人员1', message:"22:00"  },
                { date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'v7.0.1', backEndAddress: 'v5.0.1', environment:'test', deployer:'人员1', message:"22:00"  },
                { date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'v7.0.1', backEndAddress: 'v5.0.1', environment:'test', deployer:'人员1', message:"22:00"  },
                { date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'v7.0.1', backEndAddress: 'v5.0.1', environment:'test', deployer:'人员1', message:"22:00"  },
                { date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'v7.0.1', backEndAddress: 'v5.0.1', environment:'test', deployer:'人员1', message:"22:00"  },
                { date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'v7.0.1', backEndAddress: 'v5.0.1', environment:'test', deployer:'人员1', message:"22:00"  },
                { date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'v7.0.1', backEndAddress: 'v5.0.1', environment:'test', deployer:'人员1', message:"22:00"  },
                { date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'v7.0.1', backEndAddress: 'v5.0.1', environment:'test', deployer:'人员1', message:"22:00"  },
                { date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'v7.0.1', backEndAddress: 'v5.0.1', environment:'test', deployer:'人员1', message:"22:00"  },
                { date: '2020-02-18', frontEndVersion: 22.1, backEndersion:'10.1' ,frontEndAddress: 'v7.0.1', backEndAddress: 'v5.0.1', environment:'test', deployer:'人员1', message:"22:00"  },
                // ...
            ];
            this.total = this.tableData.length;
        },
        handleSizeChange(val) {
            // pageSize 改变时触发的方法
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            // currentPage 改变时触发的方法
            this.currentPage = val;
        },
    },
}
</script>

<style lang="less" scoped>
.table-page {
  width: 80%;
  margin: 0 auto;
}

</style>