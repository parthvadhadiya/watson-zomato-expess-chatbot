# A.I. Chatbot to find Restaurants
This project is demo Chat-bot that will help user to find restaurants.

## Technology Used
- Fabulous :purple_heart: Watson API used as NLP engine.
- Awesome :blue_heart: Zometo API used to get restaurants data.
- Phenomenal :green_heart: ExpressJS used to create back-end engine.
- Amazing :heartpulse: VueJS used to create front-end GUI.


## Back-End
-  An ExpressJs server that uses watson NLP engine and zometoWrapper API to get restaurant details. 

![zometoWrapper.js] (https://github.com/parthvadhadiya/watson-zomato-expess-chatbot/blob/master/zometoWrapper.js)

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


