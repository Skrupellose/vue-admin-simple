<template>
  <div id="main-wrap">main
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~@/styles/config.scss';
#main-wrap {
  position: fixed;
  top: 75px;
  left: $nav-w;
  right: 0;
  bottom: 0;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  -webkit-box-shadow:0 3px 16px 0 rgba(0,0,0,.1)
}
</style>