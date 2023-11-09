# Spotless Solutions

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
[![Linting](https://github.com/se3-3124/spotless-solutions-workspace/actions/workflows/lint.yml/badge.svg)](https://github.com/se3-3124/spotless-solutions-workspace/actions/workflows/lint.yml)
[![Tests](https://github.com/se3-3124/spotless-solutions-workspace/actions/workflows/tests.yml/badge.svg)](https://github.com/se3-3124/spotless-solutions-workspace/actions/workflows/tests.yml)


A Cleaning Services Booking & Management System

## Developing

### Prerequisites

Please make sure you have the following prerequisites:

- Node.js >= 18.18
- Postgres

When working with the codebase, we recommend using an IDE with intelligent code
completion and syntax highlighting, such as latest version of [Visual Studio Code](https://code.visualstudio.com)
with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
extension and [JetBrains' WebStorm](https://www.jetbrains.com/webstorm/).

### Downloading the source code

Clone the repository:

```
git clone https://github.com/se3-3124/spotless-solutions
cd spotless-solutions
```

To update the source code to the latest commit, run the following command inside the
`spotless-solutions` directory:

```
git pull
```

### Resolving project dependencies

Run the following command:

```
npm install
```

### Setting up Environment variables

Each packages contain their own `.env.example` for you to configure. In `pakages/client`
you must configure ports of the backend API will listen to. This will allow the client
to access backend API using [vite's proxy](https://vitejs.dev/config/server-options.html#server-proxy).

### Merging migrations/setting up database schema

Run the command:

```
npm run db:push -w server
```

Whenever there's new changes to the model on the database, please run the command
again to merge the changes into your database.

### Building

Run the command:

```
npm run build
```

When running locally, you can just start the server by running `npm run start`.

### Code Analysis

Before committing your code, please run `npm lint` to see which part of your changes does
not match the [style guidelines](CONTRIBUTING.md#code-style). This will also be spotted
by the CI during the pull request, however it is a good practice to have it checked first
before committing.

## Contributing

To contribute effectively, you can report issues or submit pull requests. Check our
[contributing guidelines](CONTRIBUTING.md) for guidance on how to help the project.

## License

Spotless Solution's Source code is licensed under [BSD 3-Clause License](LICENSE). Please see the
[LICENSE](LICENSE) file for more information. [tl;dr](https://www.tldrlegal.com/license/bsd-3-clause-license-revised)
