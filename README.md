# Vanilla SPA
POC vanilla SPA experiment

## Resources
- <https://glitch.com/edit/#!/vanilla-spa?path=script.js%3A24%3A12>
- <https://github.com/rishavs/vanillajs-spa>
- <https://javascript.christmas/2019/12>
- <https://dev.to/rishavs/making-a-single-page-app-in-ye-good-olde-js-es6-3eng>
- <https://medium.com/better-programming/js-vanilla-script-spa-1b29b43ea475>
- <https://github.com/ewan-m/vanilla-js-spa/blob/master/routing/router.js>
- <https://gomakethings.com/how-to-update-the-browser-url-without-refreshing-the-page-using-the-vanilla-js-history-api/>
- <https://restfulapi.net/resource-naming/>
- <https://github.com/AurelianSpodarec/Calendar_Dashboard>
- <https://stackoverflow.com/questions/54231533/how-to-create-a-vanilla-js-routing-for-spa>
- <https://www.npmjs.com/package/director>
- <https://github.com/flatiron/director>
- <https://github.com/ryanramage/miki>
- <https://stackoverflow.com/questions/26395992/single-page-application-router-without-hash-and-small>
- <https://www.youtube.com/watch?v=6BozpmSjk-Y>
- <https://github.com/chokcoco/ccrouter>
- <https://stackoverflow.com/questions/75266770/how-to-open-a-new-tab-in-spa-with-vanilla-javascript>

## TODO
- `"/gists/:username"` format support, can use <https://www.npmjs.com/package/route-parser>
- find a better way to handle elements no longer existing and fetch calls needing abortion after a navigation occurs.
  - maybe return a promise and reject it if the page reloads.
  - or return/store references to any elements we care about in a systematic way as a cleanup function.
    - kind of getting into virtual DOM territory... could try simple hooks?
- Sanitize inputs with <https://www.npmjs.com/package/escape-html>
- Wrapper for `fetch`