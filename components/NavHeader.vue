<template>
  <header class="navbar">
    <nav class="nav-links">
      <input id="dropdown_toggle" ref="hiddenCheckbox" type="checkbox">
      <label
        role="button"
        for="dropdown_toggle"
        tabindex="0"
        class="hamburger"
        @keyup.enter.space="$refs.hiddenCheckbox.checked = !$refs.hiddenCheckbox.checked"
      >&#9776;</label>
      <ul class="menu">
        <li>
          <nuxt-link to="/">
            About me / Contacts
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/project-list">
            Projects demo
          </nuxt-link>
        </li>
        <li>
          <new-anchor :href="$config.PERSONAL_GIT">
            Git
          </new-anchor>
        </li>
        <li>
          <nuxt-link to="/credits">
            Credits
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/blog">
            Blog
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import NewAnchor from './NewAnchor.vue'
export default Vue.extend({
  components: { NewAnchor },
  watch: {
    $route () {
      (this.$refs.hiddenCheckbox as HTMLInputElement).checked = false
    }
  }
})
</script>

<style scoped>
a {
  text-decoration: none;
  color: var(--foreground);
}
li {
  list-style: none;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
}
.menu {
  display: flex;
  gap: 1em;
  font-size: 1.25rem;
  padding-left: 0;
}
.menu a:hover {
  background-color: var(--background-dark);
  border-radius: 0.5rem;
}
.menu a {
  padding: 0.5rem 1rem;
}
.dropdown {
  background-color: var(--background-dark);
  position: absolute;
  display: none;
  top: 1.2rem;
}
.dropdown li + li {
  margin-top: 1rem;
}
input[type="checkbox"] {
  display: none;
}
.hamburger {
  display: none;
  user-select: none;
}

li a:hover {
  background-color: var(--background-dark);
  color: var(--contrast);
}
a.nuxt-link-exact-active {
  color: var(--contrast-lite);
}

header {
  max-width: 62rem;
  margin: 0 auto;
}

@media (max-width: 768px) and (orientation: portrait) {
  .menu {
    display: none;
    position: fixed;
    background-color: var(--background);
    right: 0;
    left: 0;
    text-align: center;
    padding: 1rem 0;
    margin-top: 0px;
    z-index: 1;
  }
  .menu li + li {
    margin-top: 1rem;
  }
  input[type="checkbox"]:checked ~ .menu {
    display: block;
  }
  input[type="checkbox"]:checked ~ .hamburger {
    color: var(--contrast);
  }
  .hamburger {
    display: block;
    font-size: 2rem;
    padding-left: 1rem;
  }
  .dropdown {
    left: 50%;
    top: 1rem;
  }
  .menu li a {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: block;
  }
  .navbar {
    justify-content: space-between;
  }
}
</style>
