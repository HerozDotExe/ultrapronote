import * as esbuild from "esbuild";

const banner = 
`// ==UserScript==
// @name         Ultra Pronote

// @version      0.1
// @description  Améliore pronote
// @author       HerozDotExe
// @match        https://*.index-education.net/pronote/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==
`;

await esbuild.build({
  entryPoints: ["src/main.ts"],
  outfile: "dist/ultra_pronote.dev.user.js",

  bundle: true,
  banner: {
    js: banner,
  },
});
