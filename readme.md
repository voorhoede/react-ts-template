# React 💖 TypeScript template

## About the project

This repo contains the source code for the React 💖 TypeScript template.
The React 💖 TypeScript template is written in [TypeScript](https://typescriptlang.org) and [React](https://reactjs.org)
The source code is bundled and made ready for deployment by [Webpack](http://webpack.js.org)

## Getting started

This project requires NodeJS and NPM (comes with NodeJS) to be installed.
Most project dependencies can be installed via NPM.

### Installation

Install NPM modules:
`$ npm install`

## Start development

To build the app and start a watcher, use:
`$ npm start`

## Scripts

- `start` (starts the development server)
- `build` (outputs a distribution build in the dist folder)
- `ts-lint` (lints the TypeScript files but does not correct mistakes)
- `ts-lint:write` (lints the TypeScript files and correct mistakes)
- `css-lint` (lints the css files but does not correct mistakes)
- `css-lint:write` (lints the CSS files and correct mistakes)
- `test:unit` (runs the unit tests)
- `test:e2e` (runs the e2e tests)
- `test:e2e-dev` (runs the e2e tests in development mode)
- `test` (runs both the unit and e2e tests)
- `create-component` (creates a new component)

### Components

All components can be found in their own folder in `src/components`.
A typical component has the following structure:

```
src/components/
	└── app
		├── index.ts
		├── app.tsx
		└── app.css
```

You can create a component by executing the following command:

`$ npm run create-component {your-component-name}`

If your component requires css:

`$ npm run create-component {your-component-name} -- --style`

If you want to create a storybook for your component:

`$ npm run create-component {your-component-name} -- --storybook`

All components in the `src/components` folder should be *reusable*. 
Reusable means that they do not depend on global state or have side effects (do server requests for example).

### The perfect component
The perfect component is dumb and would just be a function which accepts props and returns jsx. 
Without side effects it will always return the same output given the same props.
A component modeled like this will be very easily testable.

More complex components are allowed to have local state.
When introducing local state think if it might make more sense to instead use a prop.
Controlled components (which only accept props and don't have state) are more reusable but can be harder to make (see: https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/).

### Smart components (containers)

Smart components require global state or do server requests. They might be part of a specific page and can not be easily reused in a different part of the application.
To distinguish between smart and dumb components we put them in a different folder: `src/containers`.

### Folder structure

```
└── config          (Contains all the configurations required to start up the development server and prepare the app for deployment)
└── cypress         (Contains the default folder structure for Cypress)
└── public          (Files in this directory get copied to the dist folder and are NOT revision hashed)
└── scripts         (Scripts in this folder should be executed through the corresponding commands in the package.json)
└── src
    └── apps        (All the "applications")
    └── assets      (Should contain the images/ fonts and other files which are not css or ts files)
    └── components  (Contains all the dumb components)
    └── containers  (Contains all the smart components)
    └── types       (Contains global type definitions which are always available)
```

### Code style

The project contains a `.editorconfig` which contains the basic formatting rules for the project.

Your files are "linted" during development (after you have saved a file) and before commiting your changes.
Linting means that your source code is checked for correctness and bad practices. Mistakes which can be easily fixed (missing semicolons) are automaticly fixed.
Other mistakes require manual changes. Typescript files are linted using `eslint` using a combination of the Airbnb and the TypeScript Recommended rules.
CSS files are linted using `stylelint` using the standard rules.

## Tests

## Unit tests

Unit tests are created in [Jest](https://jestjs.io/). 
Test files should be put next to the file for which the test was written and they should have the suffix .test.ts(x)

Example:
```
component.ts
component.test.ts
```

## e2e tests

e2e tests are created in [Cypress](https://cypress.io).
Test files should be put in the `cypress/integration` folder where they will be get automaticly picked up by Cypress.

Use the following command to launch Cypress in development mode.

`$ npm run test:e2e-dev`

*(Note that this requires a running development server)*

Use the following commands in CI/CD's:

`$ npm run test:e2e`

*(This requires a distribution build)*

## Storybook

The project includes a demo environment where all visual components and their different variations can be tested in isolation.
This environment is created using [Storybook](https://storybook.js.org)

Use the following command to launch the demo environment in development mode:

`$ npm run start:storybook`

Use the following command to create a static build of your Storybook

`$ npm run build:storybook`
