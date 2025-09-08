# Playwright TypeScript Automation for The Internet

[![Typescript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.0+-orange.svg)](https://playwright.dev/python/)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Enabled-brightgreen.svg)

This repository contains automated test scripts written in TypeScript using Playwright to test various scenarios on "The Internet" test automation practice application ([https://the-internet.herokuapp.com/](https://the-internet.herokuapp.com/)). It also includes a complete GitHub Actions workflow for Continuous Integration (CI), automatically setting up the testing environment and running the tests upon code changes.

## Features

- **Comprehensive Test Coverage:** Includes test scripts for various interactive elements and functionalities.
- **GitHub Actions Integration:** Fully automated CI workflow that:
    - Checks out the code.
    - Sets up Node.js environment.
    - Sets up Playwright — from cache, if available.
    - Sets up Docker container for The Internet.
    - Installs necessary dependencies.
    - Runs the Playwright tests in a headless browser.
- **Headless Browser Execution:** Tests are configured to run in a headless browser, making them suitable for CI environments.
- **Easy Setup:** Simple instructions to get the project running locally.

## Usage

1. **Fork the repository.** Click the "Fork" button at the top right of the repository page on GitHub to create a copy under your account.
2. **Make a change and commit on GitHub.** You can do this directly through the GitHub web interface.
3. **Observe the GitHub Action running.** After you make a commit to your forked repository, the GitHub Actions workflow defined in `.github/workflows/action.yml` will automatically be triggered.
