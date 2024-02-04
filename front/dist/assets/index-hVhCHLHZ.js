const e=`<template id="button">\r
  <button type="button" class="rounded-md border border-green-700 text-green-700 p-3 mt-3">\r
    <slot></slot>\r
  </button>\r
</template>`,S=Object.freeze(Object.defineProperty({__proto__:null,default:e},Symbol.toStringTag,{value:"Module"})),t=`<template id="link">\r
    <a href="{{href}}" alt="{{alt}}"><slot></slot></a>\r
</template>`,O=Object.freeze(Object.defineProperty({__proto__:null,default:t},Symbol.toStringTag,{value:"Module"})),n=`<template id="addChronicleButton">\r
    <button class="flex items-center gap-1 w-full transition-opacity ease-in-out opacity-5 hover:opacity-100"\r
        aria-label="button for add chronicle">\r
        <div class="h-[5px] bg-rc-highlight w-full flex-1"></div>\r
        <div>\r
            <svg class="pointer-events-none fill-rc-highlight" xmlns="http://www.w3.org/2000/svg" height="20" width="20"\r
                viewBox="0 0 512 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->\r
                <path\r
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 368V344 280H168 144V232h24 64V168 144h48v24 64h64 24v48H344 280v64 24H232z" />\r
            </svg>\r
        </div>\r
        <div class="h-[5px] bg-rc-highlight flex-1"></div>\r
    </button>\r
</template>`,V=Object.freeze(Object.defineProperty({__proto__:null,default:n},Symbol.toStringTag,{value:"Module"})),r=`<template id="addFirstChronicle">\r
    <div class="justify-center hidden">\r
        <button id="add-first-chronicle" data-trans="add_chronicle" class="btn">\r
        </button>\r
    </div>\r
</template>`,L=Object.freeze(Object.defineProperty({__proto__:null,default:r},Symbol.toStringTag,{value:"Module"})),l=`<template id="basicLayout">\r
    <div class="dark:bg-rc-bg bg-light-bg grid grid-rows-[auto_1fr_auto] h-[100dvh]">\r
        <header kll-tc="header"></header>\r
        <main kll-ctrl="translate" class="h-full relative">\r
            <div class="inset-0 absolute overflow-y-auto">\r
                <slot></slot>\r
            </div>\r
        </main>\r
        <footer kll-t="footer" kll-ctrl="translate"></footer>\r
    </div>\r
</template>`,H=Object.freeze(Object.defineProperty({__proto__:null,default:l},Symbol.toStringTag,{value:"Module"})),o=`<template id="broadcastInfo">\r
    <div class="h-full grid grid-rows-[1fr_auto] overflow-x-hidden">\r
        <div kll-t="loader" kll-id="broadcast_info_loader"></div>\r
        <div kll-id="broadcast_info" class="hidden p-3">\r
\r
            <div class="flex flex-col gap-3 text-sm">\r
                <div class="flex gap-3 flex-wrap">\r
                    <label data-trans="Title" class="text-rc-highlight" for="broadcastName"></label>\r
                    <input kll-id="broadcast_info_title" kll-tc="invisibleInput" kll-b="lock.lock" name="broadcastName"\r
                        id="broadcastName" />\r
                </div>\r
                <div class="">\r
                    <label data-trans="slider_link" class="text-rc-highlight" for="sliderLink"></label>\r
                    <input disabled kll-id="broadcast_info_slider" class="input w-full text-xs" name="sliderLink"\r
                        id="sliderLink" />\r
                </div>\r
                <div class="">\r
                    <label data-trans="reader_link" class="text-rc-highlight" for="readerLink"></label>\r
                    <input disabled kll-id="broadcast_info_reader" class="input w-full text-xs" name="readerLink"\r
                        id="readerLink" />\r
                </div>\r
            </div>\r
        </div>\r
        <div class="flex p-4 ">\r
            <div kll-tc="lock" kll-id="lock"></div>\r
        </div>\r
    </div>\r
</template>`,T=Object.freeze(Object.defineProperty({__proto__:null,default:o},Symbol.toStringTag,{value:"Module"})),a=`<template id="broadcastLayout">\r
    <div class="dark:bg-rc-bg bg-light-bg grid grid-rows-[auto_1fr] h-[100dvh] relative">\r
        <div class="absolute top-2 right-2 flex flex-col gap-2 max-h-[80dvh] overflow-hidden z-50 w-56" id="toasts">\r
        </div>\r
        <header kll-tc="header"></header>\r
        <main kll-ctrl="translate" class="h-full">\r
            <slot></slot>\r
        </main>\r
    </div>\r
</template>`,C=Object.freeze(Object.defineProperty({__proto__:null,default:a},Symbol.toStringTag,{value:"Module"})),i=`<template id="chronicle">\r
    <div class="flex flex-col gap-2" kll-ctrl="chronicle">\r
        <div class="self-end">\r
            <div kll-t="miniLock" kll-b="lock.lock" kll-ctrl="chronicleLock" data-lock></div>\r
        </div>\r
\r
        <div class="gap-2 text-3xl font-bold flex justify-between">\r
            <div kll-c="invisibleInput" kll-t="invisibleTextarea" kll-m="textareaAutoResize" kll-b="lock.lock"\r
                data-title placeholder="no_title" data-theme="light">\r
            </div>\r
            <div kll-t="trash" kll-ctrl="chronicleDelete" data-delete kll-b="lock.lock"></div>\r
        </div>\r
\r
        <div>\r
            <span>Source: </span>\r
            <div kll-tc="invisibleInput" kll-b="lock.lock" data-source placeholder="no_source"></div>\r
        </div>\r
\r
        <div data-editor></div>\r
\r
        <div kll-tc="medias" kll-b="lock.lock,broadcast.broadcast" data-medias></div>\r
        <div kll-tc="addChronicleButton" kll-b="lock.lock" kll-s-position="0" data-add></div>\r
    </div>\r
</template>`,P=Object.freeze(Object.defineProperty({__proto__:null,default:i},Symbol.toStringTag,{value:"Module"})),s=`<template id="createBroadcastForm">\r
    <form class="flex gap-2 max-w-[300px]">\r
        <input class="input" placeholder="createBroadcast" name="name" kll-ctrl="input" kll-id="createBroadcastName" />\r
        <button class="btn" data-trans="create" name="create"></button>\r
    </form>\r
</template>`,F=Object.freeze(Object.defineProperty({__proto__:null,default:s},Symbol.toStringTag,{value:"Module"})),c=`<template id="errorMsg">\r
    <span class="text-rc-warning text-xs italic"></span>\r
</template>`,$=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"})),d=`<template id="footer">\r
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
</template>`,B=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"})),p=`<template id="header">\r
    <header class="flex justify-between p-2">\r
        <a href="/" class="font-bold"><span class="text-rc-warning border-t border-white">R</span><span\r
                class="border-b border-rc-warning text-white">OADCAST</span>\r
        </a>\r
        <div class="flex gap-2 items-center">\r
            <div class="flex gap-1 items-center">\r
                <div data-trans="kofi" class="text-xs"></div>\r
                <img src="/public/kofi_logo.svg" alt="Ko-fi" class="w-6 inline-block" width="24" height="15">\r
            </div>\r
            <div kll-tc="rupteur"></div>\r
        </div>\r
    </header>\r
</template>`,I=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"})),m=`<template id="invisibleInput">\r
    <input type="text"\r
        class="outline-none border-none text-light-text dark:text-rc-text p-0 bg-transparent max-w-[100%]" />\r
</template>`,A=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"})),v=`<template id="lastBroadcast">\r
    <div class="p-3">\r
        <div kll-t="loader"></div>\r
    </div>\r
</template>`,D=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"})),u=`<template id="loader">\r
    <div class="fill-rc-light flex justify-center">\r
        <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" height="16" width="16"\r
            viewBox="0 0 512 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->\r
            <path\r
                d="M288 32V0H224V32 96v32h64V96 32zm0 384V384H224v32 64 32h64V480 416zM0 224v64H32 96h32V224H96 32 0zm416 0H384v64h32 64 32V224H480 416zM97.6 52.4L52.4 97.6 75 120.2l45.3 45.3 22.6 22.6 45.3-45.3-22.6-22.6L120.2 75 97.6 52.4zM391.8 346.5l-22.6-22.6-45.3 45.3 22.6 22.6L391.8 437l22.6 22.6 45.3-45.3L437 391.8l-45.3-45.3zM52.4 414.4l45.3 45.3L120.2 437l45.3-45.3 22.6-22.6-45.3-45.3-22.6 22.6L75 391.8 52.4 414.4zM346.5 120.2l-22.6 22.6 45.3 45.3 22.6-22.6L437 120.2l22.6-22.6L414.4 52.3 391.8 75l-45.3 45.3z" />\r
        </svg>\r
    </div>\r
</template>`,Z=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"})),h=`<template id="lock">\r
    <div>\r
        <button data-type="lock" class="fill-rc-text bg-rc-warning-light cursor-pointer p-3 rounded-md" id="lock"\r
            aria-label="lock">\r
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" class="pointer-events-none"\r
                viewBox="0 0 448 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->\r
                <path\r
                    d="M224 64c44.2 0 80 35.8 80 80v48H144V144c0-44.2 35.8-80 80-80zM80 144v48H0V512H448V192H368V144C368 64.5 303.5 0 224 0S80 64.5 80 144zM256 320v64 32H192V384 320 288h64v32z" />\r
            </svg>\r
\r
        </button>\r
        <button data-type="unlock" class="fill-rc-text cursor-pointer bg-rc-highlight p-3 rounded-md" id="unlock"\r
            aria-label="unlock">\r
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" class="pointer-events-none"\r
                viewBox="0 0 576 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->\r
                <path\r
                    d="M432 64c-44.2 0-80 35.8-80 80v48h96V512H0V192H288V144C288 64.5 352.5 0 432 0s144 64.5 144 144v48 32H512V192 144c0-44.2-35.8-80-80-80zM256 384h32V320H256 192 160v64h32 64z" />\r
            </svg>\r
        </button>\r
    </div>\r
</template>`,N=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"})),f=`<template id="miniLock">\r
    <div class="pointer-events-none fill-rc-warning flex gap-2 items-center transition-opacity ease-in-out ">\r
        <div data-type="msg" class="text-rc-warning-light italic text-xs"></div>\r
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14"\r
            viewBox="0 0 448 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->\r
            <path\r
                d="M224 48c44.2 0 80 35.8 80 80v64H144V128c0-44.2 35.8-80 80-80zM96 128v64H48 0v48V464v48H48 400h48V464 240 192H400 352V128C352 57.3 294.7 0 224 0S96 57.3 96 128zM48 240H400V464H48V240zm200 80V296H200v24 64 24h48V384 320z" />\r
        </svg>\r
    </div>\r
</template>`,R=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"})),g=`<template id="rupteur">\r
    <div>\r
        <button data-type="dark" class="fill-rc-light" id="darkRupteur" aria-label="dark rupteur">\r
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" class="pointer-events-none"\r
                viewBox="0 0 384 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->\r
                <path\r
                    d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48H112c0-44.2 35.8-80 80-80v32zM112 416H272v96H112V416z" />\r
            </svg>\r
        </button>\r
        <button data-type="light" class="fill-rc-light cursor-pointer" id="lightRupteur" aria-label="light rupteur">\r
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" class="pointer-events-none"\r
                viewBox="0 0 384 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->\r
                <path\r
                    d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM112 416v96H272V416H112zm0-240H80c0-61.9 50.1-112 112-112V96c-44.2 0-80 35.8-80 80z" />\r
            </svg>\r
        </button>\r
    </div>\r
</template>`,K=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"})),b=`<template id="trash">
    <div class="cursor-pointer fill-rc-warning flex gap-2 items-center transition-opacity ease-in-out ">
        <div data-type="msg" class="text-rc-warning-light italic text-xs"></div>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" class="pointer-events-none"
            viewBox="0 0 448 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->
            <path
                d="M160 0H147.2L140 10.7 93.8 80H80 32 0v48H32V464v48H80 368h48V464 128h32V80H416 368 354.2L308 10.7 300.8 0H288 160zM296.5 80h-145l21.3-32H275.2l21.3 32zM80 464V128H368V464H80zm80-272V176H128v16V400v16h32V400 192zm80 0V176H208v16V400v16h32V400 192zm80 0V176H288v16V400v16h32V400 192z" />
        </svg>
    </div>
</template>`,q=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"})),w=`<template id="tree">
    <div>
        <div kll-tc="chronicleTreeDropZone" kll-id="dropzone_0" kll-s-position="0"></div>
        <div data-tree class="flex flex-col "></div>
    </div>
</template>`,E=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"})),_=`<template id="chronicleTree">

    <div class="w-full flex flex-col">

        <div class="flex items-center">
            <div data-grab class="cursor-grab" draggable="true" kll-ctrl="chronicleTree">
                <svg data-grab-icon class="pointer-events-none mr-2 fill-rc-highlight" mlns="http://www.w3.org/2000/svg"
                    height="16" width="14"
                    viewBox="0 0 448 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->
                    <path d="M0 288l0 64 448 0 0-64L0 288zM0 160l0 64 448 0 0-64L0 160z" />
                </svg>
            </div>
            <div class="text-xs cursor-pointer" kll-ctrl="titleTree" data-title></div>
        </div>
        <div kll-tc="chronicleTreeDropZone"></div>
    </div>

</template>`,G=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"})),y=`<template id="chronicleTreeDropZone">
    <div class=" py-1 opacity-0 transition-colors ease-in-out duration-300" data-dropzone>
        <div class="h-1 bg-rc-highlight-dark w-full">
        </div>
    </div>
</template>`,J=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),k=`<template id="medias">
    <div class="flex flex-wrap gap-2 justify-center" data-medias-container>
        medias
    </div>
</template>`,Q=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"})),x=`<template id="addMedia">

    <label
        class="cursor-pointer w-16 h-16 border border-dashed border-rc-highlight flex items-center justify-center transition-colors ease-in-out duration-200 opacity-50 hover:opacity-100">
        <input type="file" data-input name="file" class="hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
            class="pointer-events-none fill-rc-highlight w-5"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->
            <path d="M256 80V48H192V80 224H48 16v64H48 192V432v32h64V432 288H400h32V224H400 256V80z" />
        </svg>
    </label>

</template>`,U=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"})),z=`<template id="mediaImage">

    <div class="w-[100px] h-[70px] overflow-hidden">
        <img data-img class="object-cover w-full h-full" />
    </div>
</template>`,W=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"})),j=`<template id="invisibleTextarea">
    <textarea
        class="outline-none border-none text-light-text dark:text-rc-text p-0 bg-transparent w-[100%] resize-none h-auto">
    </textarea>
</template>`,X=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"})),M=`<template id="mediaVideo">

    <div class="w-[100px] h-[70px] overflow-hidden">
        <video data-video class="object-cover w-full h-full">
            <source>
        </video>
    </div>
</template>`,Y=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"}));export{V as addChronicleButton,L as addFirstChronicle,U as addMedia,H as basicLayout,T as broadcastInfo,C as broadcastLayout,S as button,P as chronicle,G as chronicleTree,J as chronicleTreeDropZone,F as createBroadcastForm,$ as errorMsg,B as footer,I as header,A as invisibleInput,X as invisibleTextarea,D as lastBroadcast,O as link,Z as loader,N as lock,W as mediaImage,Y as mediaVideo,Q as medias,R as miniLock,K as rupteur,q as trash,E as tree};
