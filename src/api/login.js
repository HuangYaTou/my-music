import axios from 'axios'
import { HOST } from '../common/js/config'

//手机登录
export function loginPhone(phone, password) {
    let url = HOST + `/login/cellphone?phone=${phone}&password=${password}`;
    return axios.get(url);
}

//邮箱登录
export function loginEmail(email, password) {
    let url = HOST + `/login?email=${email}&password=${password}`;
    return axios.get(url);
}

//获取登录状态
export function loginStatus() {
    let url = HOST + '/login/status';
    return axios.get(url);
}