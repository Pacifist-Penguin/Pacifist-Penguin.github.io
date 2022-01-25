# personal-page

This site is totally usable with **noscript**, and that's on purpose. Please, try to keep it the way it is.
Still, it have some quality of life features for those with javascript enabled.

This app has been designed with [SSG](https://nuxtjs.org/docs/concepts/static-site-generation#static-site-generation) mode in mind. While it will work flawlessly as an [SPA](https://nuxtjs.org/docs/concepts/static-site-generation#spa-fallback) (please don't) or [SSR](https://nuxtjs.org/docs/concepts/server-side-rendering/) modes, I don't see the point in using those modes instead of SSG nor i feel safe using nodejs as a server for anything other than development.

## CI/CD

This project is already automated with GitHub Actions, you only need to give it your [PAT](https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) via [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets). It made sense to me since I was already using GitHub Pages. However, I believe you can do the same (in case you're hosting everything yourself) with just [git post-recive hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) or CI/CD tools other than GitHub Actions.

## Host yourself

```bash
# First, clone repo with the content submodule:
$ git clone --recursive https://github.com/NewPirateOfUASeas/personal-page.git
# Cd into cloned repo
$ cd personal-page
# Install node modules
$ npm i
# Start development mode
$ npm run dev
# Generate static project
$ npm run generate
```
For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `content`

Source of all content on your site. Used as a kind of headless CMS based on Git. More on this in [nuxt/content documentation](https://content.nuxtjs.org/) 

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
