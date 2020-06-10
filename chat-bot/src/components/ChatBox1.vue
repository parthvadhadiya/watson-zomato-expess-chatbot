<template>
  <section class="chat-box">
    <main class="page__main">
    <div class="block--background">
      <div class="chatbot__overview">
        <ul class="chatlist">
        <li
          class="bot__output bot__output--standard"
          v-for="(message, idx) in messages"
          :key="idx"
          :class="message.author"
        >
          <p>
            <span>{{ message.text }}</span>
          </p>
        </li>
      
        </ul>
      </div>
      <div class="chatbox-area">
        <div class="chatform">
           <textarea placeholder="Talk to me!"
            class="chatbox" 
            name="chatbox" 
            minlength="2"
            v-model="message"
            @keyup.enter="sendMessage"
            />
          <input class="submit-button" @click="sendMessage"  type="submit" value="Send" />
        </div>
      </div>   
    </div>
</main>
  </section>
</template>

<script>
export default {
  name: 'ChatBox',
  data: () => ({
    message: '',
    messages: []
  }),
  methods: {
    sendMessage() {
      const message = this.message
  
      this.messages.push({
        text: message,
        author: 'client'
      })

      this.message = ''

      this.$axios.get(`http://localhost:5000/bot?Text=${message}&From=parth`)
      .then(res => {
        this.messages.push({
          text: res.data.body,
          author: 'server'
        })

        this.$nextTick(() => {
          this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

  /* https://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
@import url("https://fonts.googleapis.com/css?family=Montserrat|Roboto");
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

*, *:before, *:after {
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  font-size: 1em;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: 1.45;
  background-color: #363636;
}

.chatbot__overview {
  background-color: #363636;
  display: flex;
  flex-flow: row nowrap;
  align-content: space-between;
  min-height: 80vh;
  max-height: 80vh;
  margin: 0 auto;
  padding: 1em;
  padding-bottom: 0;
}

.chatlist {
  font-family: inherit;
  font-size: 1em;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  overflow-x: hidden;
  width: 100%;
  max-width: 35em;
  max-height: 75vh;
  margin: 0 auto;
}
.chatlist .userInput, .chatlist .bot__output {
  padding: 0.85em;
  margin: 0.5em;
  max-width: 100%;
  background-color: #fff;
  border-radius: 5px;
  border-bottom: 1px solid #777;
}
.chatlist .userInput {
  text-transform: lowercase;
  box-shadow: 1px 1px 2px #666;
  border-top: 4px solid #CC8914;
  opacity: 0;
  animation-name: animateBubble;
  animation-duration: 400ms;
  animation-iteration-count: 1;
  animation-play-state: running;
  animation-fill-mode: forwards;
}
.chatlist .bot__output {
  align-self: flex-start;
  box-shadow: -1px 1px 2px #666;
  border-top: 4px solid #27ae60;
  will-change: auto;
  height: auto;
  opacity: 0;
  animation-name: animateBubble;
  animation-duration: 400ms;
  animation-iteration-count: 1;
  animation-play-state: paused;
  animation-fill-mode: forwards;
}
.chatlist .bot__output:last-child {
  display: none;
}
.chatlist .bot__command {
  color: #f5f5f5;
  color: #27ae60;
  font-weight: 600;
  padding: 0.1em;
}
.chatlist .bot__output:nth-child(1) {
  animation-delay: 600ms;
  animation-play-state: running;
}
.chatlist .bot__output:nth-child(2) {
  animation-delay: 1200ms;
  animation-play-state: running;
}
.chatlist .bot__output:nth-child(3) {
  animation-delay: 1800ms;
  animation-play-state: running;
}
.chatlist .bot__output--standard:last-child {
  display: block;
}
.chatlist .bot__output--failed {
  display: block !important;
}
.chatlist .bot__output--second-sentence {
  display: block;
}
.chatlist .bot__outputImage {
  max-width: 16em;
  height: 12em;
}

@keyframes animateBubble {
  0% {
    transform: translateY(-20%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.block--background {
  background-color: #363636;
  width: 100vw;
  height: 100vh;
}

.chatform {
  display: flex;
  justify-content: center;
  width: 80%;
  max-width: 35em;
  margin: 0 auto;
  padding-top: 1em;
  font-size: 1em;
  font-family: Helvetica;
}
@media screen and (max-width: 29em) {
  .chatform {
    width: 90%;
  }
}

.chatbox-area {
  margin: 0 auto;
  position: relative;
  bottom: 0;
  height: auto;
  width: 100%;
}

textarea[name="chatbox"] {
  resize: none;
  border: 2px solid #27ae60;
  border-right: 0;
  width: 70%;
  background-color: transparent;
  color: #fff;
  height: 3em;
  margin: 0;
  padding: 0.75em;
  border-radius: 8px 0px 0px 8px;
  font-family: inherit;
  font-size: 1em;
}
textarea[name="chatbox"]:focus {
  outline: none;
  border: 2px solid #4bd786;
}

::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #fff;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
  opacity: 1;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
  opacity: 1;
}

input[type="submit"] {
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  width: 25%;
  margin: 0;
  background-color: #27ae60;
  color: #fff;
  border: 2px solid #27ae60;
  border-left: 0;
  border-radius: 0 8px 8px 0;
  font-family: inherit;
  font-size: 1em;
  transition: 200ms all ease-in;
}
input[type="submit"]:hover {
  background-color: #4bd786;
  border-color: #4bd786;
  color: #fff;
}

.input__nested-list {
  list-style: disc;
  list-style-position: inside;
  padding: 0.5em;
}
.input__nested-list:first-child {
  padding-top: 1em;
}

.input__nested-link {
  color: #2ecc71;
  text-decoration: none;
  border-bottom: 1px solid #2ecc71;
}

::-webkit-scrollbar {
  width: 0.65em;
  /* for vertical scrollbars */
  height: 0.65em;
  /* for horizontal scrollbars */
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
}

</style>