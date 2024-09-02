# Contributing

First and foremost, thank you! We appreciate that you want to contribute to Palletone app, your time is
valuable, and your contributions mean a lot to us.

## Issues

Do not create issues about bumping dependencies unless a bug has been identified, and you can demonstrate that it
effects this app.

**Help us to help you**

Remember that we’re here to help, but not to make guesses about what you need help with:

- Whatever bug or issue you're experiencing, assume that it will not be as obvious to the maintainers as it is to you.
- Spell it out completely. Keep in mind that maintainers need to think about _all potential use cases_ of a app.
  It's important that you explain how you're using the app so that maintainers can make that connection and solve the
  issue.

_It can't be understated how frustrating and draining it can be to maintainers to have to ask clarifying questions on
the most basic things, before it's even possible to start debugging. Please try to make the best use of everyone's time
involved, including yourself, by providing this information up front._

## Repo Setup

The package manager used to install and link dependencies must be npm v7 or later.

1. Clone repo
1. `npm run dev` start electron app in watch mode.
1. `npm run es:lint` lint your code.
1. `npm run ts:lint` Run typescript check.
1. `npm run format` Reformat all codebase to project code style.