## Back-End
-  An ExpressJs server that uses watson NLP engine and zometoWrapper API to get restaurant details. 

### How to run back-end

```
$ cd chatBot_backend
$ npm install
$ node index.js
```


### How to use back-end

```
curl -X GET \
  'http://{{API_ENDPOINT}}:5000/bot?Text=&From=abc' \
  -H 'content-type: application/json'
```

- [Text] parameter is msg from user,  [From] parameter help to manage context of the user. you can pass any string here.

- to get welcome msg from bot pass "" {empty} string in Text


