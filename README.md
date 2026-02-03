# Finch

This is a community-maintained example. If you experience a problem, please submit a pull request with a fix. GitHub Issues will be closed.

## What's inside?

This Turborepo includes the following packages & apps:

### Apps and Packages

```shell
.
├── apps
│   ├── api                       # NestJS app
│   └── web                       # Next.js app
└── packages
    ├── @repo/eslint-config       # `eslint` configurations (includes `prettier`)
    ├── @repo/jest-config         # `jest` configurations
    ├── @repo/typescript-config   # `tsconfig.json`s used throughout the monorepo
    └── @repo/ui                  # Shareable stub React component library.
```

Each package and application are mostly written in TypeScript.

### Commands

This `Turborepo` already configured useful commands for all your apps and packages.

#### Build

```bash
# Will build all the app & packages with the supported `build` script.
pnpm run build

# ℹ️ If you plan to only build apps individually,
# Please make sure you've built the packages first.
```

#### Develop

```bash
# Will run the development server for all the app & packages with the supported `dev` script.
pnpm run dev
```

#### test

```bash
# Will launch a test suites for all the app & packages with the supported `test` script.
pnpm run test

# You can launch e2e testes with `test:e2e`
pnpm run test:e2e

# See `@repo/jest-config` to customize the behavior.
```

#### Lint

```bash
# Will lint all the app & packages with the supported `lint` script.
# See `@repo/eslint-config` to customize the behavior.
pnpm run lint
```

#### Format

```bash
# Will format all the supported `.ts,.js,json,.tsx,.jsx` files.
# See `@repo/eslint-config/prettier-base.js` to customize the behavior.
pnpm format
```
