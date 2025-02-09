import React from "react";
import { ApplicationProps } from "./features/Application";
import { DockTrayItemProps } from "./components/DockTrayItem";

const Discuss = React.lazy(() => import("./components/Discuss"))
const Browser = React.lazy(() => import("./components/Browser"))
const Monitor = React.lazy(() => import("./components/Monitor"))

// 应用列表
export const APPS:ApplicationProps[] = [
    {
        title: 'Qt Theme',
        icon: 'https://hubenchang0515.github.io/QtTheme/icon.svg',
        url: 'https://hubenchang0515.github.io/QtTheme/',
        subtitle: 'Qt theme in pure qss',
        poor: true,
    },

    {
        title: 'Shift',
        icon: 'https://hubenchang0515.github.io/shift/favicon.svg',
        url: 'https://hubenchang0515.github.io/shift/',
        subtitle: 'WebAssembly runtime for Python, Lua, Ruby and etc',
    },

    {
        title: 'Phosphophyllite',
        icon: 'https://hubenchang0515.github.io/Phosphophyllite/static/favicon.svg',
        url: 'https://hubenchang0515.github.io/Phosphophyllite/',
        subtitle: 'Plan C\'s Blog',
    },

    {
        title: 'Moe Tools',
        icon: 'https://hubenchang0515.github.io/moe-tools/favicon.svg',
        url: 'https://hubenchang0515.github.io/moe-tools/',
        subtitle: 'Versatile online toolset',
    },

    {
        title: 'Browser',
        icon: 'icons/browser.svg',
        subtitle: 'Simple Browser in iframe',
        component: Browser,
        componentProps: {defaultUrl: "https://www.google.com/?igu=1"},

    },

    {
        title: 'Monitor',
        icon: 'icons/monitor.svg',
        subtitle: 'System Monitor',
        component: Monitor,
    },

    {
        title: "Friends",
        subtitle: 'Friendship links',
        icon: 'https://hubenchang0515.github.io/friends/favicon.svg',
        url: 'https://hubenchang0515.github.io/friends/',
    },

    {
        title: 'Discuss',
        icon: 'https://avatars.githubusercontent.com/in/106117',
        url: 'https://github.com/hubenchang0515/hubenchang0515.github.io/discussions',
        subtitle: 'Discussions',
        component: Discuss,
    },
];

// 托盘列表
export const TRAYS:DockTrayItemProps[] = [
    {
        icon:'https://hubenchang0515.github.io/friends/favicon.svg',
        title:'友情链接',
        app: {
            title: "Friends",
            icon: 'https://hubenchang0515.github.io/friends/favicon.svg',
            url: 'https://hubenchang0515.github.io/friends/',
        },
    },

    {
        icon:'https://travel.moe/images/ico64.png',
        title:'萌ICP备20250515号',
        app: {
            title: '萌ICP备20250515号',
            icon: 'https://travel.moe/images/ico64.png',
            url: 'https://icp.gov.moe/?keyword=20250515',
        },
    },
];


// GitHub 登录公钥
export const AUTH = {
    CLIENT_ID: "Iv23liNpcW8LG11yMI8M",
    CLIENT_SECRET: "635377fcadca3598890563274e7ee7b7a5aa019c",
};