<template>
    <div style="margin-top: 60px;">

        <div class="table-page" >
            <el-table :data="tableData" stripe border>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
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
                { name: '张三', age: 18, address: '北京市' },
                { name: '李四', age: 20, address: '上海市' },
                { name: '王五', age: 22, address: '广州市' },
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