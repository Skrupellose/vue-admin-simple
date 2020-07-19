<template>
  <div class="svgControl">
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    styles: {
      type: String,
      default: ''
    }
  },
  setup(props, { refs, root }) {
    // data
    const iconName = computed(() => `#icon-${props.icon}`)
    const svgClass = computed(() => {
      if (props.styles) {
        return `svg-icon ${props.styles}`
      } else {
        return 'svg-icon'
      }
    })
    return {
      iconName,
      svgClass
    }
  }
}
</script>

<style lang="scss" scoped>
.svgControl {
  display: inline-block;
  padding-bottom: 2px;
  .svg-icon {
    width: 1rem;
    height: 1rem;
    // margin-right: 0.5rem;
    // fill: currentColor;
    // color: #fff;
    &.font-m {
      width: 2rem;
      height: 2rem;
    }
    &.font-lg {
      width: 3rem;
      height: 3rem;
    }
  }
}
</style>