import axios from 'axios'
import { Message } from 'element-ui'
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/proxyApi'
const service = axios.create({
  baseURL: BASEURL,
  timeout: 1000
})
// 请求拦截器
service.interceptors.request.use(config => {
  console.log(config.headers);
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  let data = res.data
  if (data.resCode !== 0) {
    Message.error(data.message);
    return Promise.reject(data)
  } else {
    return Promise.resolve(data)
  }
}, error => {
  return Promise.reject(error)
})

export default service