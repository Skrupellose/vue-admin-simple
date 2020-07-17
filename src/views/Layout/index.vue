<template>
  <div id="layout">
    <LayoutHeader/>
    <LayoutMain/>
    <LayoutNav/>
  </div>
</template>

<script>
import LayoutHeader from './Components/header'
import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav'
export default {
  name: 'Layout',
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup(){

  }
}
</script>

<style lang="scss" scoped>
#layout{
  background-color: #f7f7f7;
}
</style>