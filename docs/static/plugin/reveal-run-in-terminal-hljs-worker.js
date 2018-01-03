self.window = {};
// importScripts("//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js");
// importScripts('/plugin/highlight/highlight.js');
importScripts('/plugin/worker-highlight.js');

onmessage = (event) => {
  postMessage({
    code: self.window.hljs.highlightAuto(event.data.code, ["java"]), // FIXME scala highlighting is not working...
    callbackId: event.data.callbackId
  });
};
