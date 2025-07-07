# SauceDemo

## Prerequisites
[Node.js](https://nodejs.org/) (v16 or newer recommended)
[npm](https://www.npmjs.com/)

## Setup
1. Clone the repository (if you haven't already):
   ```sh
   git clone <repo-url>
   cd SauceDemo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Running Tests

### Run All Tests
```sh
npx playwright test
```

### Run Only API Tests
```sh
npx playwright test tests/API
```

### Run Only End-to-End Tests
```sh
npx playwright test tests/EndToEnd
```

## Viewing the HTML Report
After running tests, view the Playwright HTML report:
```sh
npx playwright show-report
```

## Project Structure
 `tests/API/` - API tests (TypeScript)
 `tests/EndToEnd/` - End-to-end UI tests (JavaScript)
 `playwright.config.js` - Playwright configuration

## More Playwright Commands
 To run tests in a specific file:
  ```sh
  npx playwright test <path-to-spec-file>
  ```
To run tests with a specific browser:
  ```sh
  npx playwright test --project=chromium
  npx playwright test --project=firefox
  npx playwright test --project=webkit
  ```

For more, see the [Playwright documentation](https://playwright.dev/docs/intro).