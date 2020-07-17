<template>
  <div id="nav-wrap">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      router
    >
      <template v-for="(route,index) in routers">
        <el-submenu :index="index+''" :key="index" v-if="!route.hidden">
          <template slot="title">
            <svg-icon :icon="route.icon" class="svg-icon" />
            <span>{{route.meta}}</span>
          </template>

          <el-menu-item
            v-for="childRoute in route.children"
            :index="childRoute.path"
            :key="childRoute.id"
          >
            <svg-icon :icon="childRoute.icon" class="svg-icon" />
            {{childRoute.meta}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive, isRef, ToRef } from '@vue/composition-api'
export default {
  name: 'navmenu',
  setup(props, { root }) {
    // data
    const isCollapse = ref(false)
    const routers = reactive(root.$router.options.routes)
    // methods
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }

    return {
      isCollapse,
      routers,
      handleClose,
      handleOpen
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/config.scss';
#nav-wrap {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #344a5f;
}
ul.el-menu {
  ::v-deep .el-menu-item {
    padding-left: 50px !important;
  }
  ::v-deep .el-menu-item.is-active {
    background-color: rgba(245, 108, 108, 0.2) !important;
    color: #fff;
  }

  li.el-submenu {
    &.is-active.is-opened {
      ::v-deep .el-submenu__title {
        background-color: $navColor !important;
      }
    }
  }
}
</style>