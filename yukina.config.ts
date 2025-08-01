import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "桥边红药",
  subTitle: "xxx",
  brandTitle: "桥边红药",

  description: "我的技术与生活",

  site: "https://promefire.top",

  locale: "zh-CN", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
    // {
    //   nameKey: I18nKeys.nav_bar_github,
    //   href: "https://github.com/WhitePaper233/yukina",
    // },
  ],

  username: "桥边红药",
  sign: "我的技术与生活",
  avatarUrl: "https://img.promefire.top/blog-img/2025/07/d0c7f2b2251c7b315827b920b91ecb80.webp",
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/promefire",
    },
    {
      icon: "mingcute:bilibili-line",
      link: "https://space.bilibili.com/383302721",
    },
    // {
    //   icon: "mingcute:netease-music-line",
    //   link: "https://music.163.com/#/user/home?id=125291648",
    // },
  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "https://s2.loli.net/2025/01/25/PBvHFjr5yDu6t4a.webp",
    "https://s2.loli.net/2025/01/25/6bKcwHZigzlM4mJ.webp",
    "https://s2.loli.net/2025/01/25/H9WgEK6qNTcpFiS.webp",
    "https://s2.loli.net/2025/01/25/njNVtuUMzxs81RI.webp",
    "https://s2.loli.net/2025/01/25/tozsJ8QHAjFN3Mm.webp",
    "https://s2.loli.net/2025/01/25/Pm89OveZq7NWUxF.webp",
    "https://s2.loli.net/2025/01/25/UCYKvc1ZhgPHB9m.webp",
    "https://s2.loli.net/2025/01/25/JjpLOW8VSmufzlA.webp",
  ],

  slugMode: "PINYIN", // 'RAW' | 'HASH' | 'PINYIN'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'

  // Giscus评论系统配置
  giscus: {
    enable: true, // 设置为true启用评论，false禁用评论
    repo: "promefire/myBlogComment",
    repoId: "R_kgDOJnPF5g",
    category: "Announcements",
    categoryId: "DIC_kwDOJnPF5s4CbscM",
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    lang: "zh-CN",
    loading: "lazy",
  },
};

export default YukinaConfig;
