<template>
  <div class="main_content">
    <nav-header />
    <main>
      <Nuxt />
    </main>
    <footer>
      <hr>
      This site is under
      <new-anchor href="https://www.gnu.org/licenses/agpl-3.0.en.html">
        GNU Affero General Public License
      </new-anchor>. So here is the
      <new-anchor
        :href="$config.SOURCE_CODE_URL"
      >
        source code
      </new-anchor>.
    </footer>
  </div>
</template>
