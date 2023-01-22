import { sidebar } from "vuepress-theme-hope";

// @ts-ignore
export const zhSidebar = sidebar({
  "/zh/": [
    {
      icon: "discover",
      text: "项目实战",
      prefix: "project/",
      link: "project/",
      children: "structure",
    },
    {
      text: "功能案例",
      icon: "note",
      prefix: "guide/",
      children: "structure",
    },
  /*  "slides",*/
  ],
  "/zh/notes/": [
     /* "java",
      "linux",*/
    {
      text: "编程语言",
      icon: "note",
      prefix: "notes/",
      children: "structure",
    },
    {
      text: "项目框架",
      icon: "note",
      prefix: "notes/",
      children: "structure",
    },
  ],
  "/zh/course/": [
    "typora",
  ],
});
