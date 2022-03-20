When running tests out of the box you may find that they don't work anymore, this is because of the underlying styling library we use, [aphrodite]((https://github.com/Khan/aphrodite|true)). We can fix this though very easily by updating your test setup file with the following

```js
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();
```
