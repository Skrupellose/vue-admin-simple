<template>
  <div id="header-wrap">header</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~@/styles/config.scss';
#header-wrap {
  position: fixed;
  left: $nav-w;
  top: 0;
  right: 0;
  height: 75px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
</style>