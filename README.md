# Live PS

## Development

**Note 1**: `npm run format` before each commit must be called on backend and frontend  

**Note 2**: `antd.css` added for time picker from antd design, if you got some troubles with style, check this file, maybe it's rewriting your styles

**Note 2**: `getLocalDateFormatForPickers` using for flexible local date formats like 'dd/mm/yyyy'

### Frontend

```bash
$ npm i # install dependencies
$ npm start # run frontend in development mode
$ npm run storybook # run storybook in development mode
$ npm test # check all tests
$ npm run test:watch path/to/file.spec.ts # run exact test file in watch mode
```

### Backend

```bash
$ npm i # install dependencies
$ npm run start:dev # start in development mode with auto-reload on change
$ npm test # check all tests
$ npm run test:watch path/to/file.spec.ts # run exact test file in watch mode
