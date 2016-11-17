# simple-directives
*A refreshingly simple, declarative directive library for Angular.*

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![NPM](https://nodei.co/npm/simple-directives.png)](https://nodei.co/npm/simple-directives/)
## Install
```
npm install --save simple-directives
bower install --save simple-directives
yarn add simple-directives
```
Once you've done that, you'll have a copy of `simple-directives` in your project's
`bower_components` or `node_modules` directory.

## Include
The easiest way to use `simple-directives` in your project is by including it with
a script tag.
```html
<script
  type="application/javascript"
  src="./bower_components/simple-directives/simple-directives.js">
</script>
```

This library also works well with build systems like `gulp` especially with `gulp-main-bower-files`.

## Use

Once you've added a script tag, or bundled `simple-directives.js`, you can use it by adding it as a dependency to your angular app like this:
```javascript
(function() {
  angular.module('ExampleApp', [
      'simple-directives'
    ])
})()
```

Here's an example of how to build a flexible, declarative table.
```html
<s-table
  s-model-list="ActorsController.myFavoriteActors"
  default-sort-key="vm.defaultSortKey"
  default-sort-order="vm.defaultSortOrder"
  on-sort-change="vm.doStuff">
  <s-thead>
    <s-row>
      <s-column s-order-by="name">Name</s-column>
      <s-column s-order-by="age">Age</s-column>
      <s-column s-order-by="award_count">Number of Awards</s-column>
    </s-row>
  </s-thead>
  <s-tbody>
    <s-row>
      <s-cell>{{ model.name }}</s-column>
      <s-cell>{{ model.age }}</s-column>
      <s-cell>{{ model.award_count }}</s-column>
    </s-row>
  </s-body>
</s-table>
```

Made with precision by [@nilz3ro](https://github.com/nilz3ro).
