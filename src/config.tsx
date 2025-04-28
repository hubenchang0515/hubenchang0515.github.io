import React from "react";
import { ApplicationProps } from "./features/Application";
import { SearchEngine } from "./components/SearchBox";

const Discuss = React.lazy(() => import("./components/Discuss"))
const Browser = React.lazy(() => import("./components/Browser"))
const Monitor = React.lazy(() => import("./components/Monitor"))
const Advertising = React.lazy(() => import("./components/Advertising"))

// 快捷方式列表，显示在桌面上
export const SHORTCUTS:ApplicationProps[] = [
    {
        title: 'Moe Nav',
        icon: 'https://xplanc.org/moe-nav/favicon.svg',
        url: 'https://xplanc.org/moe-nav/',
        subtitle: 'Navigation page',
    },

    {
        title: 'Primers',
        icon: 'https://xplanc.org/primers/icon.svg',
        url: 'https://xplanc.org/primers/',
        subtitle: 'Learn to Program From Scratch',
    },

    {
        title: 'Shift',
        icon: 'https://xplanc.org/shift/favicon.svg',
        url: 'https://xplanc.org/shift/',
        subtitle: 'WebAssembly runtime for Python, Lua, Ruby and etc',
    },
    
    {
        title: 'Qt Theme',
        icon: 'https://xplanc.org/QtTheme/icon.svg',
        url: 'https://xplanc.org/QtTheme/',
        subtitle: 'Qt theme in pure qss',
        poor: true,
    },

    {
        title: 'Phosphophyllite',
        icon: 'https://xplanc.org/Phosphophyllite/favicon.svg',
        url: 'https://xplanc.org/Phosphophyllite/',
        subtitle: 'Plan C\'s Blog',
    },

    {
        title: 'Moe Tools',
        icon: 'https://xplanc.org/moe-tools/favicon.svg',
        url: 'https://xplanc.org/moe-tools/',
        subtitle: 'Versatile online toolset',
    },
]

// 全部应用列表，显示在启动器上
export const APPS:ApplicationProps[] = [
    {
        title: 'Qt Theme',
        icon: 'https://xplanc.org/QtTheme/icon.svg',
        url: 'https://xplanc.org/QtTheme/',
        subtitle: 'Qt theme in pure qss',
        poor: true,
    },

    {
        title: 'Primers',
        icon: 'https://xplanc.org/primers/icon.svg',
        url: 'https://xplanc.org/primers/',
        subtitle: 'Learn to Program From Scratch',
    },

    {
        title: 'Shift',
        icon: 'https://xplanc.org/shift/favicon.svg',
        url: 'https://xplanc.org/shift/',
        subtitle: 'WebAssembly runtime for Python, Lua, Ruby and etc',
    },

    {
        title: 'Phosphophyllite',
        icon: 'https://xplanc.org/Phosphophyllite/favicon.svg',
        url: 'https://xplanc.org/Phosphophyllite/',
        subtitle: 'Plan C\'s Blog',
    },

    {
        title: 'Moe Nav',
        icon: 'https://xplanc.org/moe-nav/favicon.svg',
        url: 'https://xplanc.org/moe-nav/',
        subtitle: 'Navigation page',
    },

    {
        title: 'Moe Tools',
        icon: 'https://xplanc.org/moe-tools/favicon.svg',
        url: 'https://xplanc.org/moe-tools/',
        subtitle: 'Versatile online toolset',
    },

    {
        title: 'Nuclear & Peace',
        icon: 'https://xplanc.org/nuclear-peace/icon.svg',
        url: 'https://xplanc.org/nuclear-peace/',
        subtitle: 'Nuclear weapon demonstration',
    },

    {
        title: 'Lolipop',
        icon: 'https://raw.githubusercontent.com/hubenchang0515/Lolipop/refs/heads/master/src/resource/icon.svg',
        subtitle: 'Video Player',
        url: 'https://xplanc.org/Lolipop/Lolipop.html',

    },

    {
        title: 'Browser',
        icon: '/icons/browser.svg',
        subtitle: 'Simple Browser in iframe',
        component: Browser,
        componentProps: {defaultUrl: "https://www.google.com/?igu=1"},

    },

    {
        title: 'Monitor',
        icon: '/icons/monitor.svg',
        subtitle: 'System Monitor',
        component: Monitor,
    },

    {
        title: "Friends",
        subtitle: 'Friendship links',
        icon: 'https://xplanc.org/friends/favicon.svg',
        url: 'https://xplanc.org/friends/',
        poor: true,
    },

    {
        title: 'Discuss',
        icon: 'https://avatars.githubusercontent.com/in/106117',
        url: 'https://github.com/hubenchang0515/hubenchang0515.github.io/discussions',
        subtitle: 'Discussions',
        component: Discuss,
    },
];

// 预启动的应用列表
export const STARTS:ApplicationProps[] = [
    {
        title: '萌ICP备20250515号',
        icon: 'https://travel.moe/images/ico64.png',
        url: 'https://icp.gov.moe/?keyword=20250515',
        tray: true,
        minimum: true,
        closeIsMinimum: true,
    },

    {
        title: "Friends",
        icon: 'https://xplanc.org/friends/favicon.svg',
        url: 'https://xplanc.org/friends/',
        tray: true,
        minimum: true,
        closeIsMinimum: true,
    },

    {
        title: 'AD',
        icon: '/icons/ad.svg',
        component: Advertising,
        componentProps: {image:"images/AD.png"},
        x: document.body.clientWidth - 320,
        y: document.body.clientHeight - 360 - 64,
        width: 320,
        height: 360,
        tray: true,
        minimum: true,
        closeIsMinimum: true,
    },
];


// GitHub 登录公钥
export const GITHUB_AUTH = {
    CLIENT_ID: "Iv23liNpcW8LG11yMI8M",
    CLIENT_SECRET: "635377fcadca3598890563274e7ee7b7a5aa019c",
};

// UptimeRobot 只读密钥
export const UPTIME_ROBOT = {
    KEY: "m798606311-a60159ad1c3368e6a56cfc72",
};

// 搜素引擎
export const SEARCH_ENGINES:SearchEngine[] = [
    {
        label: 'Google',
        action: (text:string) => {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(text)}`);
        }
    },

    {
        label: 'Bing',
        action: (text:string) => {
            window.open(`https://www.bing.com/search?q=${encodeURIComponent(text)}`)
        }
    },
]