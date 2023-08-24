/* 
 * Allows users to inject custom scripts to the page, wither it's in the body or head.
 */

function prependBody(tag: string, content: string) {
  let el = document.createElement(tag);
  el.innerHTML = content;
  document.querySelector("body")?.prepend(el);
}

function appendBody(tag: string, content: string) {
  let el = document.createElement(tag);
  el.innerHTML = content;
  document.querySelector("body")?.append(el);
}

function prependHead(tag: string, content: string) {
  let el = document.createElement(tag);
  el.innerHTML = content;
  document.querySelector("head")?.prepend(el);
}

function appendHead(tag: string, content: string) {
  let el = document.createElement(tag);
  el.innerHTML = content;
  document.querySelector("head")?.appendChild(el);
}

export default defineNuxtPlugin(() => {
  const lpoConfig = useLpoConfig();

  if (lpoConfig.customScripts?.length) {
    for (const cs of lpoConfig.customScripts) {
      if (cs.location === 'prependHead') {
        prependHead(cs.tag, cs.content);
      } else if (cs.location === 'appendHead') {
        appendHead(cs.tag, cs.content);
      } else if (cs.location === 'prependBody') {
        prependBody(cs.tag, cs.content);
      } else if (cs.location === 'appendBody') {
        appendBody(cs.tag, cs.content);
      }
    }
  }
})