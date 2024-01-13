export const menuItems = [
  {
    name: 'bold',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 32H32 80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32 0V416H32 48V256 96H32 0V32zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"/></svg>',
    command: 'toggleBold'
  },
  {
    name: 'italic',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M128 32h32H352h32V96H352 293.3L160 416h64 32v64H224 32 0V416H32 90.7L224 96H160 128V32z"/></svg>',
    command: 'toggleItalic'
  },
  {
    name: 'underline',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M16 32H48h96 32V96H144 128V224c0 53 43 96 96 96s96-43 96-96V96H304 272V32h32 96 32V96H400 384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48 16V32zM0 480V416H32 416h32v64H416 32 0z"/></svg>',
    command: 'toggleUnderline'
  },
  {
    name: 'strike',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M161.3 144c3.2-17.2 14-30.1 33.7-38.6c21.1-9 51.8-12.3 88.6-6.5c11.9 1.9 48.8 9.1 60.1 12l30.9 8.2 16.5-61.8-30.9-8.2c-14.3-3.8-53.6-11.4-66.6-13.4c-44.7-7-88.3-4.2-123.7 10.9c-36.5 15.6-64.4 44.8-71.8 87.3c-.1 .6-.2 1.1-.2 1.7c-2.8 23.9 .5 45.6 10.1 64.6c4.5 9 10.2 16.9 16.7 23.9H32 0v64H32 480h32V224H480 270.1c-.1 0-.3-.1-.4-.1l-1.1-.3c-36-10.8-65.2-19.6-85.2-33.1c-9.3-6.3-15-12.6-18.2-19.1c-3.1-6.1-5.2-14.6-3.8-27.4zM348.9 337.2c2.7 6.5 4.4 15.8 1.9 30.1c-3 17.6-13.8 30.8-33.9 39.4c-21.1 9-51.7 12.3-88.5 6.5c-18-2.9-49.1-13.5-74.4-22.1l0 0c-5.6-1.9-11-3.7-15.9-5.4l-30.4-10.1L87.5 436.3l30.4 10.1c3.6 1.2 7.9 2.7 12.7 4.3l0 0 0 0c24.9 8.5 63.6 21.7 87.6 25.6l0 0 .2 0c44.7 7 88.3 4.2 123.7-10.9c36.5-15.6 64.4-44.8 71.8-87.3c3.6-21 2.7-40.4-3.1-58.1H335.1c7 5.6 11.4 11.2 13.9 17.2z"/></svg>',
    command: 'toggleStrike'
  },

  {
    name: 'paragraph',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M192 32h64H416h32V96H416 384l0 352v32H320V448l0-352H288V448v32H224V448 352H192c-88.4 0-160-71.6-160-160s71.6-160 160-160z"/></svg>',
    command: 'setParagraph',
    param: undefined
  },
  {
    name: 'heading',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 96V64H0V96 256 416v32H64V416 288H256V416v32h64V416 256 96 64H256V96 224H64V96zm341 61.2l43-19.1V384H416 384v64h32 64 64 32V384H544 512V96 64H480 464h-6.8L451 66.8 384 96.5v70l21-9.3z"/></svg>',
    command: 'toggleHeading',
    menu: 'floating',
    param: { level: 1 }
  },
  {
    name: 'heading',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 96V64H0V96 256 416v32H64V416 288H256V416v32h61.7l0 0H320l0 0 0-2.1 0-29.9V256 96 64H256V96 224H64V96zm427.5 32H496c35.3 0 64 28.7 64 64v5.8c0 17.9-7.5 35.1-20.8 47.2L378.4 392.4 368 401.9V448h32H608h32V384H608 482.3l100.2-91.9c26.4-24.2 41.5-58.5 41.5-94.4V192c0-70.7-57.3-128-128-128h-4.5c-30.6 0-60.1 10.9-83.3 30.8l-29 24.9-24.3 20.8 41.6 48.6 24.3-20.8 29-24.9c11.6-9.9 26.4-15.4 41.7-15.4z"/></svg>',
    command: 'toggleHeading',
    param: { level: 2 },
    menu: 'floating'
  },
  {
    name: 'heading',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 96V64H0V96 256 416v32H64V416 288H256V416v32h64V416 256 96 64H256V96 224H64V96zm560 13.3V64H592 400 368v64h32H514.7L432 210.7V272h16 72c30.9 0 56 25.1 56 56s-25.1 56-56 56H459.7c-11 0-20.6-7.5-23.3-18.2L431 344.2 369 359.8l5.4 21.6c9.8 39.2 45 66.7 85.4 66.7H520c66.3 0 120-53.7 120-120c0-64.6-51-117.2-114.9-119.9l89.5-89.5 9.4-9.4z"/></svg>',
    command: 'toggleHeading',
    param: { level: 3 },
    menu: 'floating'
  },
  {
    name: 'code',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M362.8 8l-9.4 30.6-128 416L216 485.2 277.2 504l9.4-30.6 128-416L424 26.8 362.8 8zm71.9 136l22.6 22.6L546.7 256l-89.4 89.4L434.7 368 480 413.3l22.6-22.6 112-112L637.3 256l-22.6-22.6-112-112L480 98.7 434.7 144zM160 98.7l-22.6 22.6-112 112L2.7 256l22.6 22.6 112 112L160 413.3 205.3 368l-22.6-22.6L93.3 256l89.4-89.4L205.3 144 160 98.7z"/></svg>',
    command: 'toggleCode',
    param: { language: 'javascript' }
  },
  {
    name: 'codeBlock',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M448 32H0V480H448V32zM177 209l-47 47 47 47 17 17L160 353.9l-17-17L79 273l-17-17 17-17 64-64 17-17L193.9 192l-17 17zM305 175l64 64 17 17-17 17-64 64-17 17L254.1 320l17-17 47-47-47-47-17-17L288 158.1l17 17z"/></svg>',
    command: 'toggleCodeBlock',
    param: { language: 'javascript' }
  },

  {
    name: 'bulletList',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M112 48H16v96h96V48zm80 16H160v64h32H480h32V64H480 192zm0 160H160v64h32H480h32V224H480 192zm0 160H160v64h32H480h32V384H480 192zM16 208v96h96V208H16zm96 160H16v96h96V368z"/></svg>',
    command: 'toggleBulletList',
    menu: 'floating'
  },
  {
    name: 'orderedList',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32H56 80h24V56 176h8 24v48H112h-8H56 48 24V176H48h8V80H32V32zM8 352c0-35.3 28.7-64 64-64H89.2c34.7 0 62.8 28.1 62.8 62.8c0 17.7-7.5 34.6-20.5 46.5L93.4 432H128h24v48H128 32 8V456v-.6V444.8l7.8-7.1 83.3-75.9c3.1-2.8 4.8-6.8 4.8-11c0-8.2-6.6-14.8-14.8-14.8H72c-8.8 0-16 7.2-16 16H8zM224 64H480h32v64H480 224 192V64h32zm0 160H480h32v64H480 224 192V224h32zm0 160H480h32v64H480 224 192V384h32z"/></svg>',
    command: 'toggleOrderedList',
    menu: 'floating'
  },
  {
    name: 'blockquote',
    label:
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M88 0C39.4 0 0 39.4 0 88v8 72 72H144V96H64V88c0-13.3 10.7-24 24-24h8 32V0H96 88zM264 0c-48.6 0-88 39.4-88 88v8 72 72H320V96H240V88c0-13.3 10.7-24 24-24h8 32V0H272h-8zM488 512c48.6 0 88-39.4 88-88v-8V344 272H432V416h80v8c0 13.3-10.7 24-24 24h-8H448v64h32 8zm-176 0c48.6 0 88-39.4 88-88v-8V344 272H256V416h80v8c0 13.3-10.7 24-24 24h-8H272v64h32 8z"/></svg>',
    command: 'toggleBlockquote'
  },
  {
    name: 'horizontalRule',
    label: '―',
    command: 'setHorizontalRule',
    menu: 'floating'
  }
]
