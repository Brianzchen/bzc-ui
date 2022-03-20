In order to avoid unnecessary bloating to your bundle with components you aren\'t using, you can transform your final imports into nested imports. This can be done with [babel-plugin-transform-imports]((https://www.npmjs.com/package/babel-plugin-transform-imports|true)). eg:

```js
'starfall': {
  transform: 'starfall/lib/$\{member}', // eslint-disable-line no-template-curly-in-string
  preventFullImport: true,
},
```
