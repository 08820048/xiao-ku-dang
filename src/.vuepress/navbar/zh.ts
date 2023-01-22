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
/*  {
    text: "指南",
    icon: "creative",
    prefix: "/zh/guide/",
    children: [
      {
        text: "Bar",
        icon: "creative",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "more", link: "" }],
      },
      {
        text: "Foo",
        icon: "config",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "more", link: "" }],
      },
    ],
  },*/
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
