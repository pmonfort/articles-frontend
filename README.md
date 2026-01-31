# Articles Frontend

Angular 21 frontend.

## Backend

https://github.com/pmonfort/articles-api

## Quick Start

```bash
npm install
npm start
```

Open http://localhost:4200 (make sure the Rails API is running on port 3000).

## Run Tests

```bash
npm test
```

## Build

```bash
npm run build
```

## Structure

```
src/app/
├── components/
│   ├── article-list/
│   ├── article-detail/
│   ├── article-form/
│   ├── comment-form/
│   └── engagement-overview/
├── models/
├── services/
└── environments/
```

## Time Spent

Around 10 hours. Most time went into the components and figuring out Angular 21's zoneless signals approach. Once I had the patterns down, the rest was straightforward.

## Next Steps

With more time I'd add:

- Pagination for the articles list
- Better form validation with inline errors
- HTTP interceptor for centralized error handling
- Loading skeletons instead of "Loading..." text
