import axios  from "axios";
import qs from 'qs';
import router from 'vue-router';
import {Message} from "element-ui";
// import {
//   getToken,
// removeToken} from '@/utils/auth'
// import store from '../store'

var http =axios.create({
  // baseURL:processAsyncQueue.env.BASE_API,//api的base_url
  timeout:120000,//请求超时时间
  paramsSerializer:params => {
    return qs.stringify(params,{
      indices:false,
    })
  }
})

//日期转换
function transformDate(data){
  data =data  || {}
  const keylist=Object.keys(data)
  keylist.forEach(name=>{
    if(data[name] && data[name].length===2 && sata[name][0] && isNaN(data[name][0]) && !isNaN(Data.parse(data[name][1]))){
      data[name+'Start']=parseTime(new Data(data[name][0]),'{y}-{m}-{d}')+'00:00:00'
      data[name+'End']=parseTime(new Data(data[name][1]),'{y}-{m}-{d}')+'23:59:59'
    }
  })
  return data
}

//请求拦截器
http.interceptors.request.use(config=>{
  config.baseURL=process.env.BABEL_API
  if(getToken(tokenKey)||getToken()){
    config.headers['Authorization']=getToken(tokenKey)||gettoken()//让每一个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  //console.log(config)
  //debugger
  try{
    const data =typeof config.data ==='string'? JSON.parse(config.date||'{}'):config.data
    const params =config.params
    config.data=typeof config.data==='string'? JSON.stringify(transformDate()):transformDate(data)
    config.params=transformDate(params)
  }catch (error) {
    console.log(error)
  }
})

//处理响应的文件类型
http.interceptors.response.use(response=> {
  //后端返回文件流成功和失败异常
  const headers = response.headers
  let contentType = headers['content-type'] || ''
  contentType = contentType.toLowerCase()
  const contentTypeMap = [
    'application/vnd.ms-excel;charset=utf-8',
    'application/octet-stream;charset=utf-8',
    'image/png;charset=utf-8',
    'image/gif;charset=utf-8',
  ]
  const hasContentType = contentTypeMap.some(item => item.startsWith(contentType))
  if (hasContentType) {
    console.log('成功', response)
    return {
      contentDisposition: response.headers['content-disposition'],
      data: response.data
    }
  }
  if (response.config.responseType === 'blob' && response.data.type === 'application/json') {
    console.log('失败', response)
    const reader = new FileReader()
    reader.onload = () => {
      const content = reader.result
      const message = JSON.parse(content).error.message
      console.log(reader, message)
      Message({
        type: 'error',
        message
      })
    }
    reader.readAsText(response.data)
    return
  }
  //其他
  if(response.data.success){
    return response.data
  }else{
    //debugger
    switch (response.data.error.code) {
      case '100000.100403':
        removeEventListener(tokenKey)
        //location.reload()
        break
      case '000403':
        removeToken(tokenKey)
        router.push({
          path:'/login'
        })
        //location.load()
        // Message({
        //   message:response.error.message,
        //   type:'error',
        //   duration:3000
        // })
        break
      default:
        Message({
          message:response.dara.error.message || response.data.message,
          type:'error',
          duration:3000
        })
    }
    return  Promise.reject(new Error(response.data.error))
  }
},
  error=>{
  switch (error.response.status){
    case 401:
      Message({
        message:error.response.data.message,
        type:'error',
        duration:1000
      })
      break
    case 403:
      Message({
        message:error.response.data.message,
        type:'error',
        duration:1000
      })
      break
    default:
      Message({
        message:error.response.data.message || '系统繁忙',
        type:'error',
        duration:1000
      })
  }
})

export default {
  post(url,data){
    return http({
      method:'post',
      url,
      data:qs.stringify(data),
      timeout:3000,
      headers:{
        'Content-Type':"application/x-www-form-urlencoded;charset=utf-8"
      }
    })
  },
  get(url,params){
    return http({
      method:'get',
      url,
      params,
      timeout:3000,
      headers:{

      }
    })
  },
  postJson(url,data,responseType){
    return http({
      responseType:responseType || 'json',
      method:'post',
      url,
      data:data,
      headers:{
        'Content-Type':'application/json;charset=utf-8'
      }
    })
  },
  putJson(url,data,responseType){
    return http({
      responseType: responseType || 'json',
      method:'post',
      url,
      data:data,
      headers:{
        'Content-Type':'application/json;charset=utf-8'
      }
    })
  },
  del:function(url,data){
    return http({
      method:'delete',
      url,
      data,
      timeout:3000
    })
  },
  patch:function(url,data){
    return http({
      method:'patch',
      url,
      data,
      timeout:3000
    })
  },
  put:function(url,data){
    return http({
      method:'put',
      url,
      data:qs.stringify(data),
      timeout:3000
    })
  },
  exportMethod(url,data={}){
    return http({
      responseType:'blob',
      method:'get',
      url,
      data:data,
      headers:{
        'content-type':'application/json;charset=utf-8'
      }
    })
  },
  exportMethodPost(url,data={}){
    return http({
      responseType:'blob',
      method:'get',
      url,
      data:data,
      headers:{
        'content-type':'application/json;charset=utf-8'
      }
    })
  },
  exportMethodPostForLong(url,data={}){
    return http({
      responseType:'blob',
      method:'get',
      url,
      data:data,
      timeout:10*60*6000,
      headers:{
        'content-type':'application/json;charset=utf-8'
      }
    })
  }
}
