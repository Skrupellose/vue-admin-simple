<template>
  <div id="header-wrap">
    <div class="header-icon" @click="changeNav">
      <svg-icon icon="menu" styles="font-m" />
    </div>
    <div class="f-r header-icon">
      <svg-icon icon="exit" styles="font-m" />
    </div>
    <div class="f-r">
      <div class="userInfo">{{username}}</div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'
import { mapMutations } from 'vuex'
export default {
  setup(props, { root }) {
    //  methods
    const changeNav = () => {
      root.$store.commit('app/SET_COLLAPSE')
    }
    // const isCollapse = computed(() => {
    //   return root.$store.state.app.isCollapse
    // })
    const username = computed(() => root.$store.state.app.username)
    return {
      changeNav,
      username
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/config.scss';
.close {
  #header-wrap {
    left: 64px;
  }
}
#header-wrap {
  position: fixed;
  left: $nav-w;
  top: 0;
  right: 0;
  height: 75px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 75px;
  @include webkit(transition, all 0.5s ease);
}
.svgControl {
  padding: 0;
}
.header-icon {
  margin: 0 2rem;
  display: inline-block;
  cursor: pointer;
  padding-top: 0.6rem;
}
.userInfo {
  display: inline-block;
  height: 100%;
  margin-left: 2rem;
  padding-right: 2rem;
  border-right: 1px solid grey;
}
</style>