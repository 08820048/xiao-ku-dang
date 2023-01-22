import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
// @ts-ignore
// @ts-ignore
// @ts-ignore
export default defineUserConfig({
  base: "/xiao-ku-dang/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Docs Demo",
      description: "A docs project for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "小库档",
      description: "配合个人博客-八尺妖剑，实现文章与笔记的分离。",
    },
  },

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      locales: {
        "/zh/": {
          // 覆盖 placeholder
          placeholder: "开始搜索",
        },
        // 为分类和标签添加索引
      },
    })
  ],
  theme,

  shouldPrefetch: false,
});
