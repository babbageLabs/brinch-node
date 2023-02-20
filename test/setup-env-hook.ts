import * as path from 'path';

before(() => {
  require('dotenv').config({
    path: path.join(__dirname, '..', '.test.env'),
  });
});
