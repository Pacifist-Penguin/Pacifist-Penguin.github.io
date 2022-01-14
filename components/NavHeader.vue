<template>
  <header>
    <ul>
      <li>
        <nuxt-link to="/">
          About Me
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/projects">
          Projects demo
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/git">
          Git
        </nuxt-link>
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

</style>
