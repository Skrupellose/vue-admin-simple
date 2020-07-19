<template>
  <div id="nav-wrap">
    <div class="logo">
      <img src="@/assets/logo.png" alt />
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      router
    >
      <template v-for="(route,index) in routers">
        <el-submenu :index="index+''" :key="index" v-if="!route.hidden">
          <template slot="title">
            <svg-icon :icon="route.icon" styles="svg-icon" />
            <span>{{route.meta}}</span>
          </template>

          <el-menu-item
            v-for="childRoute in route.children"
            :index="childRoute.path"
            :key="childRoute.id"
          >{{childRoute.meta}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive, isRef, ToRef, computed } from '@vue/composition-api'
export default {
  name: 'navmenu',
  setup(props, { root }) {
    // data
    // const isCollapse = ref(false)
    const routers = reactive(root.$router.options.routes)
    // methods

    // computed
    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse
    })
    return {
      isCollapse,
      routers
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/config.scss';
.logo {
  width: 50px;
  margin: 1rem auto 0;
  img {
    width: 100%;
  }
}
#nav-wrap {
  width: $nav-w;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #344a5f;
  @include webkit(transition, all 0.5s ease);
  ::v-deep svg-icon {
    margin-right: 1rem;
  }
}
ul.el-menu {
  border-right: 0 !important;
  ::v-deep .el-menu-item {
    padding-left: 45px !important;
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
.el-submenu__title {
  .svgControl {
    margin-right: 1.8rem;
  }
}
.close {
  #nav-wrap {
    width: $nav-minw;
    li.el-submenu {
      &.is-opened {
        ::v-deep .el-submenu__title {
          background-color: red !important;
        }
      }
    }
  }
}
// .el-menu--vertical {
//   ::v-deep .el-menu {
//     background-color: red !important;
//   }
// }
</style>
<style lang="scss">
.el-menu--vertical {
  .el-menu {
    .el-menu-item {
      color: #000 !important;
    }
    .el-menu-item:hover{
      background-color:red !important;
    }
  }
}
</style>