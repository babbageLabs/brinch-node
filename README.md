# Usage

## Installation

    $ npm install

## Configuration
Add the following environment variables to your ``.env`` file:

    SCHEMA_DIR='./path/to/schemas' # path to the directory containing the zod schemas


# Testing

In order to test the application, please make sure the
dev dependencies are installed:

    $ npm install

then set up the environment variables by adding them to ``.test.env``:

    SCHEMA_DIR='./test/testData'

Then run the tests:

    $ npm run test
