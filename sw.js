if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),c={module:{uri:l},exports:o,require:t};s[l]=Promise.all(n.map((e=>c[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/Browser-oSrSjtOA.js",revision:null},{url:"assets/Discuss-BnRjRWpT.js",revision:null},{url:"assets/giscus-Ci9LqPcC-CP8xTvfQ.js",revision:null},{url:"assets/index-7UaNYJCk.css",revision:null},{url:"assets/index-BEFniQnP.js",revision:null},{url:"assets/Monitor-YSuXfAZr.js",revision:null},{url:"assets/ownerWindow-Be48zllh.js",revision:null},{url:"google06d56e3ecaa75745.html",revision:"eeced3102569197f8146d5ce2adbf861"},{url:"index.html",revision:"3bf88120c885f4a05f917516a882aa91"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"PWA/icon-192-maskable.svg",revision:"4c03c467affd00d5e61cbe263f9b3fc8"},{url:"PWA/icon-192.svg",revision:"d652531f21f6939aec851d39a039479d"},{url:"PWA/icon-512-maskable.svg",revision:"0e9f802b4e0f4ba7fcc47a05f6b3ccfe"},{url:"PWA/icon-512.svg",revision:"c642b67f27367a9854ab9320b3722bdf"},{url:"manifest.webmanifest",revision:"bb61715cb4e0e87e49b8be2bf8a81ef0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{allowlist:[/^\/$/]}))}));
