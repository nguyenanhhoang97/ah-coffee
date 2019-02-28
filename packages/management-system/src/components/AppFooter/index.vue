<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a href="#" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">About Us</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Blog</a>
        </li>
      </ul>
      <div class="copyright">
        © {{fullYear}}
        <i class="tim-icons icon-heart-2"/>
        {{' '}}by
        <a href="#" target="_blank">AH Coffee {{' '}}</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {
  public fullYear!: number;

  public created() {
    this.fullYear = new Date().getFullYear();
  }
}
</script>
