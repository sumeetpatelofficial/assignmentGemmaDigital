<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand href="#">Logo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto mr-auto">
          <b-nav-item href="#">Page 1</b-nav-item>
          <b-nav-item href="#">Page 2</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-button variant="light" squared><span class="material-icons-outlined">search</span></b-button>           -->
        </b-navbar-nav>      
      </b-container>      
    </b-navbar>
    <router-view />
  </div>
</template>

<style lang="scss">

</style>
