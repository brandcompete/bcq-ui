# Contributing

Thank you for your interest in contributing to this project.

Whether you're reporting a bug, suggesting a feature, improving documentation, or submitting code, your help is appreciated.

## Reporting Bugs

Before opening a bug report:

* Search existing issues to avoid duplicates.
* Make sure you're using the latest version of the library.
* Provide a minimal reproducible example when possible.

When reporting a bug, please include:

* Library version
* Vue version
* Browser and operating system (if relevant)
* Steps to reproduce
* Expected behavior
* Actual behavior

## Suggesting Features

Feature requests are welcome.

Before opening a feature request:

* Check whether a similar request already exists.
* Clearly describe the problem you're trying to solve.
* Explain why the feature would benefit other users.

## Development Setup

Clone the repository:

```bash
git clone https://github.com/brandcompete/bcq-ui
cd bcq-ui
```

Install dependencies:

```bash
npm install
```

Start the docs/demo site with hot reload (it uses the library sources directly):

```bash
npm run dev
```

There is no automated test suite. Check your change in the docs site, then check that the npm bundle
behaves exactly like the sources (any difference is a bundling bug):

```bash
npm run dev:bundle
```

Scaffold a new component (component, demo page, documentation and snippet):

```bash
npm run bcq:create
```

Build the docs site and the library:

```bash
npm run build
```

## Pull Requests

Please follow these guidelines when submitting a pull request:

1. Create a feature branch from the main branch.
2. Keep pull requests focused on a single change.
3. Write clear commit messages.
4. Check the change with both `npm run dev` and `npm run dev:bundle`.
5. Update documentation when necessary.
6. Make sure `npm run build` succeeds before submitting.

## Coding Standards

* Follow the existing code style.
* Prefer readability over cleverness.
* Keep components focused and reusable.
* Avoid introducing unnecessary dependencies.
* Declare `props` and `emits` on every component: `npm run bcq:types` generates the TypeScript types
  from them, so never edit `src/bcq-ui-components.d.ts` by hand.

## Documentation

Good documentation is valuable.

Contributions that improve examples, API documentation, tutorials, or usage guides are always welcome.

## Questions

If you're unsure about a change, feel free to open an issue before investing significant time in implementation.

## Code of Conduct

By participating in this project, you agree to abide by the project's Code of Conduct.
