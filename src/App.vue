<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-container class="position-relative">
        <b-navbar-brand href="/">Logo</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse">
          <template>
            <span class="material-icons-outlined">menu</span>
          </template>
        </b-navbar-toggle>

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
        <b-navbar-nav class="ml-auto" v-click-outside="closeSearch">
          <div class="search-input" v-if="toggleSearch" @keyup.enter="search">
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
    <header class="navbar-header">
      <div class="navbar-container">
        <div class="logo">Logo</div>
        <div class="navbar-links">

        </div>
        <div class="search-bar-button" @click="toggleSearch = !toggleSearch">
          <span class="material-icons-outlined">search</span>
        </div>
      </div>
    </header>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
@Component({
  components: {
    Footer,
  },
})
export default class App extends Vue {
  searchText: any = "";
  toggleSearch: any = false;
  closeSearch() {
    this.toggleSearch = false;
    this.searchText = "";
  }
  search() {
    const h = this.$createElement;

    const vNodesMsg = h("p", { class: ["mb-0"] }, [
      h("strong", "Are you looking for"),
      ` ${this.searchText} ?`,
    ]);

    // Create the title
    const vNodesTitle = h(
      "div",
      { class: ["d-flex", "flex-grow-1", "align-items-baseline", "mr-2"] },
      [h("strong", { class: "mr-2" }, "Search Value")]
    );

    this.$bvToast.toast([vNodesMsg], {
      title: [vNodesTitle],
      solid: true,
      variant: "info",
      autoHideDelay: 2000,
    });
  }
}
</script>
<style lang="scss"></style>
