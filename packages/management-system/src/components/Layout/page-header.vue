<template>
  <nav class="navbar navbar-expand-lg navbar-absolute navbar-transparent fixed-top">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline">
          <button type="button" class="navbar-toggler">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="javascript:void(0)">{{pageTitle}}</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <div id="navigation" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="/" class="nav-link text-info">
              <i class="tim-icons icon-minimal-left"></i>Back to Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a href="/register" class="nav-link">
              <i class="tim-icons icon-laptop"></i>Register
            </a>
          </li>
          <li class="nav-item">
            <a href="/" class="nav-link">
              <i class="tim-icons icon-single-02"></i>Login
            </a>
          </li>
          <li class="nav-item active">
            <a href="/pricing" class="nav-link">
              <i class="tim-icons icon-coins"></i>Pricing
            </a>
          </li>
          <li class="nav-item">
            <a href="/lock" class="nav-link">
              <i class="tim-icons icon-lock-circle"></i>Lock
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class PageHeader extends Vue {
  @Prop({ default: '' })
  public title!: string;

  public get pageTitle() {
    const title = this.title;
    return title ? title : `${this.$t('title')}`;
  }
}
</script>
