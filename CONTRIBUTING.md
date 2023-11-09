# Contributing Guidelines

Thank you for showing interest in the development of this project! This project
is intended to be safe, welcoming space for collaboration. All contributors
are expected to adhere to the [Contributor Covenant](https://www.contributor-covenant.org/)
code of conduct.

## Table of Contents

1. [Reporting bugs](#reporting-bugs)
2. [Code Style](#code-style)
3. [Submitting pull requests](#submitting-pull-requests)
4. [Continuous Integration](#continuous-integration)

## Reporting bugs

A **bug** is a situation where there's *clearly* wrong with the software. Before reporting
issues, please search first for [issues](https://github.com/se3-3124/spotless-solutions/issues) and
[pull requests](https://github.com/se3-3124/spotless-solutions/pulls) first! This avoids
duplicating reports and conversations.

- In reporting bugs, ensure that you provide relevant details such as server logs, your OS
and Hardware information, as well as versions of the software, Node.js and Postgres you're
currently using.

- We may ask you for follow-up information to reproduce or debug the problem.

If we cannot reproduce the issue, it will be marked as low-priority by the maintainers of
the project. When the issue is left untouched for 2 weeks it will be marked as closed.
However, feel free to reopen the issue or better, open a discussion
thread [here](https://github.com/se3-3124/spotless-solutions/discussions).

## Code Style

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

This repository uses [Google's TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
to maintain code style and consistency, and to avoid style arguments.

## Submitting pull requests

We welcome pull requests from everyone, but we prioritize work on issues from our roadmap.
Reviewing PRs that aren't part of the roadmap might take some time since our focus is on the
planned tasks.

The [issue tracker](https://github.com/se3-3124/issues) and our Jira board should provide
plenty of things to start with.

Additionally, check out our Architecture document for more additional details.

For small problems, you can submit a pull request directly. But if you want to
tackle a more complex issue, please talk to us first in discussions or open an issue.
This way, we can discuss if it's a good fit for you and give you guidance on how to
approach it. Also, know that while we don't exclude external contributors from working
on planned issues, we usually handle them ourselves unless they're not very urgent.

Aside from the above, below is a brief checklist of things to watch out when you're
preparing your code changes:

- Make sure you're comfortable with the principles of object-oriented programming,
  the syntax of TypeScript and your development environment. Please check out the
  [Code Style](#code-style) section above for reference.
- Make sure you're familiar with [`git`](https://git-scm.com/) and the
  [pull request workflow](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/proposing-changes-to-your-work-with-pull-requests).
- Please do not make code changes via the GitHub web interface.
- Please add tests for your changes. We expect them to have test coverage.
- Please run tests and code style analysis via running `npm run test` and
  `npm run lint` before opening the PR. This is particularly important if you're
  a first time contributor, as CI will not run for your PR until it was submitted.

After you're done with your changes and you with to open PR, please observe the
following recommendations:

- Please submit the pull request from a [topic branch](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows#_topic_branch)
  (not `main`) and keep the *Allow edits from maintainers* check box selected, so
  that we can push fixes to your PR if necessary.
- Please avoid pushing untested or incomplete code.
- Please do not force-push or rebase unless we ask you to.
- Please do not merge `main` continually if there's no conflicts to resolve. We
  will do this for you when the change is ready for merge.

If you're unsure about any part of the code or how the server and web interface work,
please ask by opening an issue or starting a discussion. We're here to assist you as
good as we can.

## Continuous Integration

To simplify review and require less human resources, CI tests all components of the
software. Passing CI tests are not a hard requirement but a good indicator what the
bots will think about the proposed patch.
