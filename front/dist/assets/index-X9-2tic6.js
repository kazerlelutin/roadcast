const t=`<template id="button">\r
  <button type="button" class="rounded-md border border-green-700 text-green-700 p-3 mt-3">\r
    <slot></slot>\r
  </button>\r
</template>`,u=Object.freeze(Object.defineProperty({__proto__:null,default:t},Symbol.toStringTag,{value:"Module"})),e=`<template id="link">\r
    <a href="{{href}}" alt="{{alt}}"><slot></slot></a>\r
</template>`,m=Object.freeze(Object.defineProperty({__proto__:null,default:e},Symbol.toStringTag,{value:"Module"})),r=`<template id="wsTest">\r
\r
    <div>\r
\r
        <div>------------------------------</div>\r
\r
        <h2 data-msg></h2>\r
    </div>\r
</template>`,b=Object.freeze(Object.defineProperty({__proto__:null,default:r},Symbol.toStringTag,{value:"Module"})),n=`<template id="header">\r
    <header class="flex justify-between p-2">\r
        <div class="font-bold"><span class="text-rc-warning border-t border-white">R</span><span\r
                class="border-b border-rc-warning">OADCAST</span></div>\r
        <div class="flex gap-2 items-center">\r
            <div class="flex gap-1 items-center">\r
                <div data-trans="kofi" class="text-xs"></div>\r
                <img src="/public/kofi_logo.svg" alt="Ko-fi" class="w-6 inline-block">\r
            </div>\r
            <div kll-tc="rupteur"></div>\r
        </div>\r
    </header>\r
</template>`,f=Object.freeze(Object.defineProperty({__proto__:null,default:n},Symbol.toStringTag,{value:"Module"})),a=`<template id="rupteur">\r
    <div>\r
        <button data-type="dark" class="fill-rc-light">\r
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" class="pointer-events-none"\r
                viewBox="0 0 384 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->\r
                <path\r
                    d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48H112c0-44.2 35.8-80 80-80v32zM112 416H272v96H112V416z" />\r
            </svg>\r
        </button>\r
        <button data-type="light" class="fill-rc-light cursor-pointer">\r
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" class="pointer-events-none"\r
                viewBox="0 0 384 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->\r
                <path\r
                    d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM112 416v96H272V416H112zm0-240H80c0-61.9 50.1-112 112-112V96c-44.2 0-80 35.8-80 80z" />\r
            </svg>\r
        </button>\r
    </div>\r
</template>`,g=Object.freeze(Object.defineProperty({__proto__:null,default:a},Symbol.toStringTag,{value:"Module"})),l=`<template id="footer">\r
    <footer>\r
        <ul class="list-none flex flex-wrap items-center justify-center gap-3 m-0 p-3">\r
            <li class="p-0">\r
                <a href="/" kll-ctrl="link" data-trans="home"></a>\r
            </li>\r
            <li class="p-0">\r
                <a href="/about" kll-ctrl="link" data-trans="about"></a>\r
            </li>\r
            <li class="p-0">\r
                <a href="/legal" kll-ctrl="link" data-trans="legalNotice"></a>\r
            </li>\r
\r
            <li class="p-0">\r
                <a href="https://bouteiller.contact" target="_blank" rel="noopener noreferrer" data-trans="contact"></a>\r
            </li>\r
        </ul>\r
    </footer>\r
</template>`,v=Object.freeze(Object.defineProperty({__proto__:null,default:l},Symbol.toStringTag,{value:"Module"})),o=`<template id="basicLayout">\r
    <div class="dark:bg-rc-bg bg-light-bg grid grid-rows-[auto_1fr_auto] h-[100dvh]">\r
        <header kll-tc="header"></header>\r
        <main kll-ctrl="translate" class="h-full relative">\r
            <div class="inset-0 absolute overflow-y-auto">\r
                <slot></slot>\r
            </div>\r
        </main>\r
        <footer kll-t="footer" kll-ctrl="translate"></footer>\r
    </div>\r
</template>`,h=Object.freeze(Object.defineProperty({__proto__:null,default:o},Symbol.toStringTag,{value:"Module"})),s=`<template id="lastBroadcast">\r
    <div class="p-3">\r
        <div kll-t="loader"></div>\r
    </div>\r
</template>`,_=Object.freeze(Object.defineProperty({__proto__:null,default:s},Symbol.toStringTag,{value:"Module"})),c=`<template id="createBroadcastForm">\r
    <form class="flex gap-2 max-w-[300px]">\r
        <input class="input" placeholder="createBroadcast" name="name" kll-ctrl="input" kll-id="createBroadcastName"/>\r
        <button class="btn" data-trans="create"></button>\r
    </form>\r
</template>`,w=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"})),i=`<template id="errorMsg">\r
    <span class="text-rc-warning text-xs italic"></span>\r
</template>`,y=Object.freeze(Object.defineProperty({__proto__:null,default:i},Symbol.toStringTag,{value:"Module"})),d=`<template id="broadcastLayout">\r
    <div class="dark:bg-rc-bg bg-light-bg grid grid-rows-[auto_1fr] h-[100dvh]">\r
        <header kll-tc="header"></header>\r
        <main kll-ctrl="translate" class="h-full">\r
            <slot></slot>\r
        </main>\r
    </div>\r
</template>`,j=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"})),p=`<template id="loader">\r
    <div class="fill-rc-light flex items-center justify-center">\r
        <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" height="16" width="16"\r
            viewBox="0 0 512 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->\r
            <path\r
                d="M288 32V0H224V32 96v32h64V96 32zm0 384V384H224v32 64 32h64V480 416zM0 224v64H32 96h32V224H96 32 0zm416 0H384v64h32 64 32V224H480 416zM97.6 52.4L52.4 97.6 75 120.2l45.3 45.3 22.6 22.6 45.3-45.3-22.6-22.6L120.2 75 97.6 52.4zM391.8 346.5l-22.6-22.6-45.3 45.3 22.6 22.6L391.8 437l22.6 22.6 45.3-45.3L437 391.8l-45.3-45.3zM52.4 414.4l45.3 45.3L120.2 437l45.3-45.3 22.6-22.6-45.3-45.3-22.6 22.6L75 391.8 52.4 414.4zM346.5 120.2l-22.6 22.6 45.3 45.3 22.6-22.6L437 120.2l22.6-22.6L414.4 52.3 391.8 75l-45.3 45.3z" />\r
        </svg>\r
    </div>\r
</template>`,k=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));export{h as basicLayout,j as broadcastLayout,u as button,w as createBroadcastForm,y as errorMsg,v as footer,f as header,_ as lastBroadcast,m as link,k as loader,g as rupteur,b as wsTest};
