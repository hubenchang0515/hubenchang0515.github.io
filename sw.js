if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const c=e=>i(e,o),t={module:{uri:o},exports:l,require:c};s[o]=Promise.all(r.map((e=>t[e]||c(e)))).then((e=>(n(...e),l)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/Browser-oSrSjtOA.js",revision:null},{url:"assets/Discuss-BnRjRWpT.js",revision:null},{url:"assets/giscus-Ci9LqPcC-CP8xTvfQ.js",revision:null},{url:"assets/index-7UaNYJCk.css",revision:null},{url:"assets/index-BEFniQnP.js",revision:null},{url:"assets/Monitor-YSuXfAZr.js",revision:null},{url:"assets/ownerWindow-Be48zllh.js",revision:null},{url:"google06d56e3ecaa75745.html",revision:"eeced3102569197f8146d5ce2adbf861"},{url:"icons/browser.svg",revision:"39540706ec9e3e51d01956228637198a"},{url:"icons/launcher.svg",revision:"c74b45823bb1271ac189d7fb91c1ca73"},{url:"icons/monitor.svg",revision:"3233e73c0e2bfff5a04adf809aff8448"},{url:"index.html",revision:"3bf88120c885f4a05f917516a882aa91"},{url:"PWA/icon-192.svg",revision:"d652531f21f6939aec851d39a039479d"},{url:"PWA/icon-512.svg",revision:"c642b67f27367a9854ab9320b3722bdf"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"PWA/icon-192.svg",revision:"d652531f21f6939aec851d39a039479d"},{url:"PWA/icon-512.svg",revision:"c642b67f27367a9854ab9320b3722bdf"},{url:"manifest.webmanifest",revision:"60e803fae18d884928ea77314cb466a3"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{allowlist:[/^\/$/]}))}));
