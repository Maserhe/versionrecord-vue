<template>
   <div style="width: 120px; height: 31px; margin-left: 30px; float: left; font-size: 28px; font-weight: 700; line-height: 60px;"><a href="/">见知数据</a></div>
   <!-- <div style="line-height: 58px; position: absolute; right: 80px; cursor: pointer;">Login</div> -->
   <div style="line-height: 58px; position: absolute; right: 30px; cursor: pointer;" @click="loginMsg=='Login'?dialogVisible=true:dialogVisible=false">{{ loginMsg }}</div>


   <el-dialog
    v-model="dialogVisible"
    title="登陆"
    width="30%"
  >
  <el-form ref="loginForm" :model="loginForm" :rules="rules" label-position="left" label-width="80px" style="max-width: 400px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetLoginForm">重置</el-button>
        <el-button type="primary" @click="submitLoginForm">登陆</el-button>
      </div>
  </el-dialog>

   
</template>

<script>
import { ref } from 'vue';
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessageBox, ElMessage } from 'element-plus';
import { loginApi } from '../../api/data'

export default {
    name: 'Header',
    components:{
        ElButton,
        ElDialog,
        ElForm,
        ElFormItem,
        ElInput,
        ElMessageBox
    },

    data() {
        return {
            loginForm: {
                username: '',
                password: '',
            },
        }
    },

    setup() {
        const current = ref(['home']);
        const dialogVisible = ref(false)
        const loginMsg = ref("Login")
        const rules = {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
        };
        
        return {
            current,
            dialogVisible,
            rules,
            loginMsg
        };
    },

    mounted() {
        if (this.$store.getters.getUsername) {
            this.loginMsg = this.$store.getters.getUsername
        }
    },

    methods: {
        clickMenu( { key } ) {
            this.$router.push({
                path: key
            })
        },

        resetLoginForm  () {
            this.loginForm.username = '';
            this.loginForm.password = '';
            this.dialogVisible = true;
        },
        
        submitLoginForm() {
            try {
                // this.$refs.loginForm.validate();
                // TODO：提交表单数据到后端进行验证
                loginApi(this.loginForm).then(res=>{
                    // console.log(res.headers.token)
                    if (res.data.code == 200) {
                        // console.log(this.$store.state.count)
                        // document.cookie = "token=" + res.headers.token;
                        ElMessage({type: 'success', message: '登陆成功!'})
                        this.loginMsg = "admin"
                        this.$store.commit("setToken", res.headers.token);
                        this.$store.commit("setUserInfo", "admin");
                    } else {
                        ElMessage({type: 'error', message: res.data.message})
                    }
                    console.log(res.data)
                })
                this.dialogVisible = false;
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style lang="less" scoped>

.ant-menu {
    line-height: 58px; 
    position: absolute; 
    right: 140px;
}

</style>
