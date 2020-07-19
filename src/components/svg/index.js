import svg from '@/components/svg/index.vue'
const req = require.context('@/components/svg/icon', false, /\.svg$/)
const requireAll = (requireContext)=>{
  console.log(requireContext.keys())
  return requireContext.keys().map(requireContext)
}
requireAll(req)

const mySvg = {
  install: function (Vue) {
    Vue.component('svgIcon', svg)
  }
}
export default mySvg