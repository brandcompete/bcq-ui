# npm
$ npm create becquerel@latest my-app
# pnpm
$ pnpm create becquerel my-app
# yarn
$ yarn create becquerel my-app
# bun
$ bun create becquerel my-app

# Then start the dev server (if you let the script install the dependencies):

$ cd my-app
$ npm run dev   # npm
$ pnpm dev      # pnpm
$ yarn dev      # yarn
$ bun dev       # bun

# To skip the prompts, pass options (with npm, put `--` before them):

$ npm create becquerel@latest my-app -- --ts --router --axios --pinia --theme light
$ pnpm create becquerel my-app --ts --router --axios --pinia --theme light
$ yarn create becquerel my-app --ts --router --axios --pinia --theme light
$ bun create becquerel my-app --ts --router --axios --pinia --theme light

# Available options:

`--ts` / `--js`, `--theme dark|light`, `--router` / `--no-router`, `--axios` / `--no-axios`, `--pinia` / `--no-pinia`, `--install` / `--no-install`, `-f` / `--force` (empty a folder that is not empty, keeps `.git`), `-h` / `--help`.
