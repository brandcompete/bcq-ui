# Becquerel App

A Vue 3 + Vite project with [Becquerel UI](https://bcq-ui.brandcompete.com/) preconfigured.

## Scripts

```sh
npm run dev      # start the dev server
npm run build    # build for production into dist/
npm run preview  # preview the production build
```

(Use `pnpm`, `yarn` or `bun` instead of `npm run` if that's your package manager.)

## What's preconfigured

- `src/main.js` installs Becquerel UI and everything it needs: the `$emitter` event bus (`mitt`),
  Material Design Icons (`@mdi/font`) and `RecycleScroller` (`vue-virtual-scroller`, used by `<bc-dropdown>`).
- `src/styles/variables.css` holds the theme variables (colors, fonts, etc.). Customize them there;
  the file is imported before the Becquerel UI styles.
- `src/App.vue` is a small starter page. Replace it with your own.

## Documentation

All components, directives and utility classes: https://bcq-ui.brandcompete.com/
