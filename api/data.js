import axios from './axios.js'

export const loginApi = (loginForm) => {
    return axios.request({
        url:'auth/login',
        method: 'post',
        data: loginForm
    })
}

export const getTenantList = () => {
    return axios.request({
        url: '/tenant/list',
        method: 'get',
    })
}

export const addVersionRecord = (vrForm) => {
    return axios.request({
        url:'version-record/add',
        method: 'post',
        data: vrForm
    })
}


export const delVersionRecord = (id) => {
    return axios.request({
        url:'version-record/del/' + id,
        method: 'get',
    })
}


export const changeVersionRecord = (vrForm) => {
    return axios.request({
        url:'version-record/change',
        method: 'post',
        data: vrForm
    })
}

export const queryVersionRecord = (vrForm) => {
    return axios.request({
        url:'version-record/query',
        method: 'post',
        data: vrForm
    })
}


/**
 * 递归数组,把所有children都拆出来到第一层
 * @param {*} list 
 * @param {*} item 
 */
function getDeepChildrens(list,item,parentId){
    const {children,...reset} =  item
    list.push(
        {
            ...reset,
            parentId,
        }
    )
    if(children&&children.length>0){
        children.forEach(child=>{
            getDeepChildrens(list,child,item.id)
        })
    }
}