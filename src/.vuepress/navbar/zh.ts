import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "项目笔记",
    icon: "workingDirectory",
    link: "/zh/project/"
  },
  {
    text: "学习笔记",
    icon: "note",
    link: "/zh/notes/"
  },
  {
    text: "教程文档",
    icon: "repo",
    link: "/zh/course/"
  },
 {
    text: "项目",
    icon: "info",
    prefix: "/zh/guide/",
    children: [
      {
        text: "个人博客系统",
        icon: "app",
        link: "https://github.com/08820048/wblog",
      },
        {
            text: "QQ机器人",
            icon: "anonymous",
            link: "https://github.com/08820048/xiaoUbot",
        },
        {
            text: "人力资源管理",
            icon: "context",
            link: "https://github.com/08820048/HrSysterm",
        },
        {
            text: "牛客社区项目",
            icon: "geometry",
            link: "https://github.com/08820048/community",
        },
        {
            text: "简一小程序(暂停开发)",
            icon: "input",
            link: "https://github.com/08820048/JaneOne",
        },
        {
            text: "JSP项目PRQS",
            icon: "code",
            link: "https://github.com/08820048/PRQS",
        },
    ],
  },
 /* {
    text: "学习笔记",
    icon: "creative",
    prefix: "/zh/notes/",
    children: [
      {
        text: "Java",
        icon: "creative",
        prefix: "java/",
        children: ["javabase", { text: "...", icon: "more", link: "" }],
      },
      {
        text: "Linux",
        icon: "config",
        prefix: "linux/",
        children: ["linuxbase", { text: "...", icon: "more", link: "" }],
      },
    ],
  },*/
  {
    text: "个人博客",
    icon: "blog",
    link: "https://waer.ltd",
  },
]);
