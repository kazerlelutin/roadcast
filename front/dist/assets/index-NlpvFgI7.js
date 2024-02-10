const r=`<div kll-t="basicLayout">\r
  <div class="md:grid md:grid-cols-2 gap-5 flex flex-col-reverse md:justify-center justify-end items-center h-full p-3">\r
\r
    <div>\r
      <div kll-tc="createBroadcastForm" kll-id="createBroadcast"></div>\r
      <div kll-tc="errorMsg" kll-b="createBroadcast.error,createBroadcastName.error"></div>\r
      <div kll-tc="lastBroadcast"></div>\r
    </div>\r
\r
    <div class="flex flex-col gap-2">\r
      <h1 data-trans="titleHome" class="md:text-5xl text-3xl font-bold"></h1>\r
      <p data-trans="appSummary" class="text-rc-highlight-dark dark:text-rc-highlight"></p>\r
      <p data-trans="noAccountRequired" class="italic text-rc-light pt-2"></p>\r
    </div>\r
  </div>\r
</div>`;export{r as default};
