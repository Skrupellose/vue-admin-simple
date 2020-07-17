<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { refs, root }) {
    // data
    const iconName = computed(() => `#icon-${props.icon}`)
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
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
.svg-icon {
  width: 1rem;
  height: 1rem;
  // fill: currentColor;
  color: #fff;
  &.font-m {
    width: 1.5rem;
    height: 1.5rem;
  }
  &.font-lg {
    width: 2rem;
    height: 2rem;
  }
}
</style>