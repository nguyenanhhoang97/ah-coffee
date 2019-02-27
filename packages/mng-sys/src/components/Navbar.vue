<template>
  <nav class="navbar navbar-expand-lg navbar-absolute navbar-transparent">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-minimize d-inline">
          <button
            class="minimize-sidebar btn btn-link btn-just-icon"
            rel="tooltip"
            data-original-title="Sidebar toggle"
            data-placement="right"
          >
            <i class="fas fa-align-center visible-on-sidebar-regular text-muted"></i>
            <i class="fas fa-align-justify visible-on-sidebar-mini text-muted"></i>
          </button>
        </div>
        <div class="navbar-toggle d-inline">
          <button type="button" class="navbar-toggler">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <p class="navbar-brand">AdminCP</p>
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
      <div class="collapse navbar-collapse" id="navigation">
        <ul class="navbar-nav ml-auto">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <div class="photo">
                <img src="../assets/img/mike.jpg" alt="Profile Photo">
              </div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item>Log out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- <li class="dropdown nav-item">
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <div class="photo">
                <img src="../assets/img/mike.jpg" alt="Profile Photo">
              </div>
              <b class="caret d-none d-lg-block d-xl-block"></b>
              <p class="d-lg-none">Log out</p>
            </a>
            <ul class="dropdown-menu dropdown-navbar">
              <li class="nav-link">
                <a href="javascript:void(0)" class="nav-item dropdown-item">Profile</a>
              </li>
              <li class="nav-link">
                <a href="javascript:void(0)" class="nav-item dropdown-item">Settings</a>
              </li>
              <li class="dropdown-divider"></li>
              <li class="nav-link">
                <a href="javascript:void(0)" class="nav-item dropdown-item">Log out</a>
              </li>
            </ul>
          </li> -->
          <li class="separator d-lg-none"></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style>
</style>
