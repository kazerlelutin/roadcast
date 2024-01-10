export const menuItems = [
    {
      name: "bold",
      label: "B",
      command: "toggleBold",
    },
    {
      name: "italic",
      label: "I",
      command: "toggleItalic",
    },
    {
      name: "underline",
      label: "U",
      command: "toggleUnderline",
    },
    {
      name: "strike",
      label: "S",
      command: "toggleStrike",
    },
    {
      name: "code",
      label: "</>",
      command: "toggleCode",
    },
    {
      name: "link",
      label: "🔗",
      command: "toggleLink",
    },
    {
      name: "heading",
      label: "H",
      command: "toggleHeading",
      param:{level: 1},
      menu: 'floating',
      items: [
        {
            name: "heading",
            label: "H1",
            command: "toggleHeading",
            param:{level: 1},
            },
            {
            name: "heading",
            label: "H2",
            command: "toggleHeading",
            param:{level: 2},
            },
            {
            name: "heading",
            label: "H3",
            command: "toggleHeading",
            param:{level: 3},
            },
            {
            name: "heading",
            label: "H4",
            command: "toggleHeading",
            param:{level: 4},
            },
            {
            name: "heading",
            label: "H5",
            command: "toggleHeading",
            param:{level: 5},
            },
            {
            name: "heading",
            label: "H6",
            command: "heading",
            param:{level: 6},
        }
      ]
    },
    {
        name: "bulletList",
        label: "•",
        command: 'toggleBulletList',
        menu: 'floating',

    },
    {
      name: "blockquote",
      label: "“”",
      command: "toggleBlockquote",
    },
    {
      name: "bulletList",
      label: "•",
      command: "toggleBulletList",
    },
    {
      name: "orderedList",
      label: "1.",
      command: "toggleOrderedList",
    },
    {
      name: "todoList",
      label: "☐",
      command: "toggleTodoList",
    },
    {
      name: "codeBlock",
      label: "</>",
      command: "toggleCodeBlock",
    },
    {
      name: "horizontalRule",
      label: "―",
      command: "toggleHorizontalRule",
    },

  ];