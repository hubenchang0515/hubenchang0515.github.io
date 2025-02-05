import { ApplicationProps } from "./features/Application";
import Discuss from "./components/Discuss";

export const APPS:ApplicationProps[] = [
    {
        title: 'Qt Theme',
        icon: 'https://hubenchang0515.github.io/QtTheme/icon.svg',
        url: 'https://hubenchang0515.github.io/QtTheme/',
        subtitle: 'Qt theme in pure qss',
    },

    {
        title: 'Shift',
        icon: 'https://hubenchang0515.github.io/shift/favicon.svg',
        url: 'https://hubenchang0515.github.io/shift/',
        subtitle: 'WebAssembly runtime for Python, Lua, Ruby and etc',
    },

    {
        title: 'Moe Tools',
        icon: 'https://hubenchang0515.github.io/moe-tools/favicon.svg',
        url: 'https://hubenchang0515.github.io/moe-tools/',
        subtitle: 'Versatile online toolset',
    },

    {
        title: 'Discuss',
        icon: 'https://avatars.githubusercontent.com/in/106117',
        url: 'https://github.com/hubenchang0515/hubenchang0515.github.io/discussions',
        subtitle: 'Discussions',
        children: <Discuss/>
    },
]

export const AUTH = {
    CLIENT_ID: "Iv23liNpcW8LG11yMI8M",
    CLIENT_SECRET: "635377fcadca3598890563274e7ee7b7a5aa019c",
}