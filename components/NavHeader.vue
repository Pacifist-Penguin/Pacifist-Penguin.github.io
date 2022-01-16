<template>
  <header>
    <ul>
      <li>
        <nuxt-link to="/">
          About me / Contacts
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/projects">
          Projects demo
        </nuxt-link>
      </li>
      <li>
        <a href="https://github.com/NewPirateOfUASeas">
          Git
        </a>
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
  </header>
</template>

<style scoped>
a {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #1E1E3F;
}

li {
  display: inline;
}

li a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 0.5rem;
}

li a:hover {
  background-color: var(--background-dark);
  color: var(--contrast);
}

a.nuxt-link-exact-active {
  color: var(--contrast-lite);
}

header {
  max-width: 1000px;
  margin: 0 auto;
}

ul {
  width: 100%;
  padding-left: 0px;
  margin: 2vmin auto;
  display: flex;
  justify-content: center;
}

li {
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}

</style>
