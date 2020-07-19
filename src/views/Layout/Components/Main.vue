<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~@/styles/config.scss';
#main-wrap {
  height: 100vh;
  // position: fixed;
  // top: 75px;
  // left: $nav-w;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
.main-content {
  @include webkit(transition, all 0.5s ease);
  width: 100%;
  height: 100%;
  padding-top: $header-h + 30;
  padding-right: 30px;
  padding-left: $nav-w + 30;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
.close {
  .main-content{
    padding-left: $nav-minw + 30px;
  }
}
</style>