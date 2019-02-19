<template>
    <div class="login-wrapper">
        <div class="input-wrapper">
            <div class="input-box"><input type="text" placeholder="请输入账号" autofocus="autofocus" v-model="account"></div>
            <div class="input-box"><input type="password" placeholder="请输入密码" v-model="password"></div>
            <div class="input-box"><input type="button" value="登      录" @click="doSubmit"></div>
            <div class="link">没有账号？点击这里<a href="">注册</a></div>
        </div>
        <div class="input-tip" v-show="tipShow">{{inputTip}}</div>
    </div>
</template>

<script>
import {loginPhone} from '../../api/login'
import { ERR_OK } from '../../common/js/config'
export default {
    data() {
        return {
            account: '17729791168',
            password: 'queen19940812',
            tipShow: false,
            inputTip: ''
        }
    },
    methods: {
        doSubmit() {
            if(!this.account) {
                this.inputTip = '请输入账号';
                this.tipShow = true;
                return;
            }
            if(!this.password) {
                this.inputTip = '请输入密码';
                this.tipShow = true;
                return;
            }
            this.doLogin();
        },
        doLogin() {
            loginPhone(this.account, this.password).then((res)=>{
                // console.log('login.vue doLogin res='+JSON.stringify(res));
                if(res.status == ERR_OK) {
                    this.$router.push({
                        path: `/user`
                    });
                }
                else {
                    console.log('login.vue doLogin 登录失败！');
                }
            });
        }
    }
}
</script>

<style scoped>
    .login-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(212, 68, 57, 1);
        z-index: 100;
    }
    .input-wrapper {
        position: absolute;
        top:140px;
        width: 100%;
    }
    .input-box {
        margin-top: 20px;
    }
    input[type="button"] {
        cursor: pointer;
    }
    .input-box input{
        width: 60%;
        height: 40px;
        background: transparent;
        border: 1px solid #fff;
        border-radius: 5px;
        color: #fff;
        margin-left: 19%;
        padding: 0 1%;
    }
    .link {
        padding-right: 20px;
        text-align: right;
        margin-top: 20px;
    }
    .link a{
        color: #fff;
    }
    .input-tip {
        position: absolute;
        left: 10%;
        bottom: 10%;
        width:80%;
        height: 3em;
        line-height: 3em;
        background: rgba(0,0,0,.5);
        color: #fff;
        text-align: center;
        border-radius: 5px;
    }
</style>



