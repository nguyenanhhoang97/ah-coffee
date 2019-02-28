<template>
  <div :class="['pages', mainCss]">
    <!-- <page-header/> -->
    <div class="wrapper wrapper-full-page">
      <div :class="['full-page', mainCss]">
        <slot></slot>
        <!-- <app-footer/> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PageHeader from './page-header.vue';
import AppFooter from '../AppFooter/index.vue';

export default {
  components: {
    // PageHeader,
    // AppFooter
  },

  props: {
    mainCss: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
};
</script>
