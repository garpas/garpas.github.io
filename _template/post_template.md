<%*
let today = tp.date.now("YYYY-MM-DD");
let title = await tp.system.prompt("제목?");
await tp.file.rename(`${today}-${title}`);
%>
---
title: "<% title %>"
date: "<% today %>"
tags: []
layout: post
---

 