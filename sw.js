if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const t=e=>i(e,o),u={module:{uri:o},exports:l,require:t};s[o]=Promise.all(r.map((e=>u[e]||t(e)))).then((e=>(n(...e),l)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/Browser-BHb1SD2W.js",revision:null},{url:"assets/Discuss-C-zxF1pB.js",revision:null},{url:"assets/giscus-Ci9LqPcC-CP8xTvfQ.js",revision:null},{url:"assets/index-7UaNYJCk.css",revision:null},{url:"assets/index-Dr9d8_6S.js",revision:null},{url:"assets/Monitor-z4q8VOdI.js",revision:null},{url:"assets/ownerWindow-BWPyM8jg.js",revision:null},{url:"google06d56e3ecaa75745.html",revision:"eeced3102569197f8146d5ce2adbf861"},{url:"index.html",revision:"ec84e604d780390801b5010ee898f917"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"PWA/icon-192.svg",revision:"1b3678e777fe517ee83777ab476d18b8"},{url:"PWA/icon-512.svg",revision:"609df4d6ac93eb9ae0e4b2cc5e887356"},{url:"manifest.webmanifest",revision:"b4de10162a81e8350fc4a37c75d0514d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
