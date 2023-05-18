<template>
    <div style="margin-top: 60px;">

        <div class="table-page" >

        
            <div style="display: flex; align-items: center;">
                <div>租户&nbsp;&nbsp;</div>
                <el-select v-model="tenantOption" placeholder="选择租户" @change="changeTenant" style="margin-right: 1rem">
                    <el-option v-for="(item, index) in tenantList" :key="index" :label="item.name" :value="item"> </el-option>
                </el-select>
                <el-button type="primary" @click="addButton()">添加</el-button>
            </div>
            
            <el-table :data="tableData" :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}" >
                <!-- <el-table-column type="index" width="50" /> -->
                <el-table-column prop="tenant"  label="租户"></el-table-column>
                <el-table-column prop="date" sortable  label="日期"></el-table-column>
                <el-table-column prop="frontEndVersion" label="前端版本"></el-table-column>
                <el-table-column prop="frontEndAddress" label="前端地址" width="240"></el-table-column>
                <el-table-column prop="backEndVersion" label="后端版本" ></el-table-column>
                <el-table-column prop="backEndAddress" label="后台地址" width="240"></el-table-column>
                <el-table-column prop="environment" label="环境(test/prod)"></el-table-column>
                <el-table-column prop="deployedBy" label="部署人"></el-table-column>
                <el-table-column prop="remarks" label="备注"></el-table-column>
                <el-table-column align="right" width="150">
                    <template #header>
                        <el-input v-model="searchMsg"  placeholder="Type to search" />
                    </template>
                    
                    <template #default="scope">
                        <el-button link type="primary" size="small" >编辑</el-button>
                        <el-button link type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :total="total">
            </el-pagination>

            
             <!-- 添加 版本控制 页面 -->
            <el-dialog v-model="dialogVisible" :title="tenantOption" width="40%" :before-close="handleClose">

                <el-form ref="vrInfoRef" :model="vrInfo" :label-position="'left'" class="sys-form">
                   
                    <el-form-item label="前端版本" prop="frontEndVersion" :rules="[{ required: true, message: '必需填写' },]">
                        <el-input v-model="vrInfo.frontEndVersion" type="text" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="后端版本" prop="backEndVersion" :rules="[{ required: true, message: '必需填写' },]">
                    <el-input v-model="vrInfo.backEndVersion" type="text" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="前端地址" prop="frontEndAddress" :rules="[{ required: true, message: '必需填写' },]">
                    <el-input v-model="vrInfo.frontEndAddress" type="text" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="后台地址" prop="backEndAddress" :rules="[{ required: true, message: '必需填写' },]">
                    <el-input v-model="vrInfo.backEndAddress" type="text" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="部署人" prop="deployedBy" :rules="[{ required: true, message: '必需填写' },]">
                    <el-input v-model="vrInfo.deployedBy" type="text" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="环境" prop="environment" :rules="[{ required: true, message: '必需填写, 例如 test/prod/dev' },]">
                    <el-input v-model="vrInfo.environment" type="text" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="备注" prop="remarks" :rules="[{ required: false, message: '非必需填写' },]">
                    <el-input v-model="vrInfo.remarks" type="textarea" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div>&nbsp;&nbsp; 时间:&nbsp;&nbsp;</div>
                        <el-date-picker
                            v-model="vrInfo.date"
                            type="datetime" 
                            placeholder="选择时间"
                            format="YYYY-MM-DD HH:mm:ss"
                            value-format="YYYY-MM-DD HH:mm:ss"
                        />
                    </el-form-item>

                    <el-form-item>
                        <div style="margin: 0 auto;">
                            <el-button type="primary" @click="addVrButton()">添加</el-button>
                            <el-button @click="resetForm('vrInfoRef')">重置</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { ElTable, ElTableColumn, ElPagination , ElMessageBox, ElMessage} from 'element-plus';
import { getTenantList, addVersionRecord , delVersionRecord, changeVersionRecord, queryVersionRecord} from '../../api/data'

export default {


    name: 'Home',

    setup() {
        const tenantOption = ref("")
        const dialogVisible = ref(false)
        const handleClose = (done) => { ElMessageBox.confirm('确定关闭对话框?', '温馨提示', {type: 'info',center: true}).then(() => { done() })}
        return{
            tenantOption,
            dialogVisible,
            handleClose
        }

    },

    created() {
        getTenantList().then(res=> {
            if (res.data.code==200) {
                this.tenantList = res.data.data
            }
        })
    },

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
            searchMsg: "",

            tenantList: [],
            tenantChoice: {},


             // 添加二级管理员
             vrInfo: {
                date: "",
                frontEndVersion: "",
                backEndVersion: "",
                frontEndAddress: "",
                backEndAddress: "",
                environment: "",
                deployedBy: "",
                remarks: "",
                tenantId: "",
            },
        };
    },
    mounted() {

        queryVersionRecord({ "currentPage":1, "pageSize": 10}).then(res => {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
        })

    },
    methods: {

        clearVRInfo() { this.vrInfo = {
                date: "",
                frontEndVersion: "",
                backEndVersion: "",
                frontEndAddress: "",
                backEndAddress: "",
                environment: "",
                deployedBy: "",
                remarks: "",
                tenantId: "",
            } 
        },

        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields()
            this.clearVRInfo()
        },

        getTableData() {
            // 发送请求获取表格数据，这里简化为直接赋值
            this.tableData = [
                {tenant:"民生银行", date: '2020-02-18', frontEndVersion: 18.1, backEndersion:'10.1' ,frontEndAddress: 'https://stg2022.xencio.com/download/DOwnLoADLinK/cfa-frontend_20230301_18.zip', backEndAddress: 'https://xencio-build.oss-cn-shanghai.aliyuncs.com/cfa-local/cfa20022-20230301_1858.zip', environment:'test', deployer:'人员1', message:"22:00"  },
                {tenant:"民生银行", date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'https://stg2022.xencio.com/download/DOwnLoADLinK/cfa-frontend_20230301_18.zip', backEndAddress: 'https://xencio-build.oss-cn-shanghai.aliyuncs.com/cfa-local/cfa20022-20230301_1858.zip', environment:'test', deployer:'人员1', message:"22:00"  },
                {tenant:"民生银行", date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'https://stg2022.xencio.com/download/DOwnLoADLinK/cfa-frontend_20230301_18.zip', backEndAddress: 'https://xencio-build.oss-cn-shanghai.aliyuncs.com/cfa-local/cfa20022-20230301_1858.zip', environment:'test', deployer:'人员1', message:"22:00"  },
                {tenant:"民生银行", date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'https://stg2022.xencio.com/download/DOwnLoADLinK/cfa-frontend_20230301_18.zip', backEndAddress: 'https://xencio-build.oss-cn-shanghai.aliyuncs.com/cfa-local/cfa20022-20230301_1858.zip', environment:'test', deployer:'人员1', message:"22:00"  },
                {tenant:"民生银行", date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'https://stg2022.xencio.com/download/DOwnLoADLinK/cfa-frontend_20230301_18.zip', backEndAddress: 'https://xencio-build.oss-cn-shanghai.aliyuncs.com/cfa-local/cfa20022-20230301_1858.zip', environment:'test', deployer:'人员1', message:"22:00"  },
                {tenant:"民生银行", date: '2020-01-18', frontEndVersion: 20.1, backEndersion:'10.1' ,frontEndAddress: 'https://stg2022.xencio.com/download/DOwnLoADLinK/cfa-frontend_20230301_18.zip', backEndAddress: 'https://xencio-build.oss-cn-shanghai.aliyuncs.com/cfa-local/cfa20022-20230301_1858.zip', environment:'test', deployer:'人员1', message:"22:00"  },
                {tenant:"民生银行", date: '2020-02-18', frontEndVersion: 22.1, backEndersion:'10.1' ,frontEndAddress: 'https://stg2022.xencio.com/download/DOwnLoADLinK/cfa-frontend_20230301_18.zip', backEndAddress: 'https://xencio-build.oss-cn-shanghai.aliyuncs.com/cfa-local/cfa20022-20230301_1858.zip', environment:'test', deployer:'人员1', message:"22:00"  },
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

        changeTenant() {
            this.tenantChoice =  JSON.parse(JSON.stringify(this.tenantOption))
            this.tenantOption = this.tenantChoice.name
            // console.log(this.tenantChoice)
        },

        addButton() {
            if (this.tenantChoice && this.tenantOption) {
                this.dialogVisible = true
                this.vrInfo.tenantId = this.tenantChoice.id
            } else {
                ElMessage({type: 'error', message: '选择租户!'})
                return;
            }
        },  

        addVrButton() {

            if (this.vrInfo.date) {
                this.$refs['vrInfoRef'].validate((valid) => {
                    if (valid) {
                        addVersionRecord(this.vrInfo).then(res=> {
                            if (res.data.code==200) {
                                ElMessage({type: 'success', message: '添加成功!'})
                                this.dialogVisible = false
                                this.clearVRInfo()
                            } 
                        })
                    } else {
                        ElMessage.error("表单不合法！！")
                    }
                })
            } else {
                ElMessage({type: 'error', message: '指定时间!'})
            }
            // console.log(this.vrInfo)
        }

    },
}
</script>

<style lang="less" scoped>
.table-page {
  width: 80%;
  margin: 0 auto;
}

</style>