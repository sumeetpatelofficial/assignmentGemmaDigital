<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-container class="position-relative">
        <b-navbar-brand href="#">Logo</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto mr-auto">
            <b-nav-item :class="{ active: $route.name == 'Page1' }" to="/"
              >Page 1</b-nav-item
            >
            <b-nav-item :class="{ active: $route.name == 'Page2' }" to="/page2"
              >Page 2</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div
            class="search-input"
            v-click-outside="closeSearch"
            v-if="toggleSearch"
          >
            <b-form-group>
              <div class="search-icon">
                <span class="material-icons-outlined">search</span>
              </div>
              <b-form-input
                v-model="searchText"
                placeholder="Search..."
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="search-bar-button" @click="toggleSearch = !toggleSearch">
            <span class="material-icons-outlined">search</span>
          </div>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import vClickOutside from "v-click-outside";
@Component({
  components: {
    Footer,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
})
export default class App extends Vue {
  searchText: any = "";
  toggleSearch: any = false;
  closeSearch() {
    this.toggleSearch = false;
  }
}
</script>
<style lang="scss"></style>
