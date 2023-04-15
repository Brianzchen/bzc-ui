### No !important

Under the hood, bzc-ui uses the [aphrodite]((https://github.com/Khan/aphrodite)) library. This by default implements `!important` syntax on all style properties. This can be overridden in the application project by adding the following code snippet to your webpack config under `resolve`.

```js
resolve: {
  alias: {
    aphrodite: 'aphrodite/no-important',
    // ... other alias
  },
  // ... other resolvers
},
```
