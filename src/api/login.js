import service from '@/api/request'
// 验证码
export function GetSms(data) {
 return service.request({
    method: 'post',
    url: '/getSms/',
    data
  })
}
// 获取用户角色


// 登录
export function login(data) {
  return service.request({
     method: 'post',
     url: '/login/',
     data
   })
 }


// 注册
export function register(data) {
  return service.request({
     method: 'post',
     url: '/register/',
     data
   })
 }