const t=`<div>\r
  <h1>Hello BROADCAST!</h1>\r
  <div kll-t="buttonCount" kll-ctrl="buttonCount" kll-s-word="salut ceci vient d'une props" data-trans="test"\r
    kll-id="my_button"></div>\r
\r
  <div kll-t="text-to-render" kll-b="truc.rien,my_button.count" kll-ctrl="textToRender"></div>\r
\r
  <div kll-t="with-children">\r
    <div>hello, children</div>\r
  </div>\r
  <div kll-t="inception" kll-ctrl="inception" kll-b="inception_button.count"></div>\r
  <div kll-t="button" kll-ctrl="ui.button">Button in folder "ui"</div>\r
\r
  <br />\r
  <div kll-t="wsTest" kll-ctrl="wsTest"></div>\r
</div>`;export{t as default};
