<%*
let today = tp.date.now("YYYY-MM-DD");
let title = await tp.system.prompt("제목?");
await tp.file.rename(`${today}-${title}`);
-%>
---
layout: post
title: "<% title %>"
subtitle: ""
author: "Garpas"
categories: ""
tags: []
sidebar: ""
---
# <% title %>

본문 시작

 