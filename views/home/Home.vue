<template>
    <div style="margin-top: 60px;">
       <div>123</div>

    </div>
</template>

<script>
import { message } from 'ant-design-vue';
export default {
    name: 'Home',

    data() {
        return {
            value: ""
        }
    },
    methods: {
        showMsg() {
            if (this.value != "") {
                message.info('接口未实现');
                this.value=""
            }
        }
        
    }
}
</script>

<style lang="less" scoped>
.header-warp {
    background: url(../../src/assets/background.jpeg) no-repeat top;
    padding-top: 60px;
    text-align: center;
    background-position: 50%;
    min-height: 1000px;
    width: 100%;
    background-size: 100%;
    background-size: cover;
    padding-bottom: 100px;
    margin-top: 60px;
    color: #fff;

    font-size: 30px;
    font-weight: 300;
    text-align: center;
    letter-spacing: 2px;
}

.jcjutp {
    background-color: hsla(0,0%,100%,0);
    color: #fff;
    font-weight: 700;
    font-size: 21px;
    letter-spacing: 2px;
}

</style>