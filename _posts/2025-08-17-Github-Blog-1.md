---
layout: post
title: Jekyll을 이용한 Github 블로그 만들기 (1)
subtitle: Github Action을 이용한 개인 페이지 생성하기
author: Garpas
categories: Blog
tags:
  - jekyll
  - "#blog"
  - "#Github"
---
안녕하세요! 
최근에 생각할 것들이 너무 많고 기억하기에 머리가 너무 나빠서 블로그를 하나 만들어야겠다는 다짐을 했습니다. 마침 Github Page를 추천 받아서 템플릿 만들고 하는데 생각보다 어렵더라고요. 단순히 버튼 한번 클릭으로 개설하지는 못하지만, 내가 원하는 방법으로 커스텀 할 수 있다는 점이 큰 장점인 것 같아요. 앞으로 Github 블로그 개설을 하는 방법을 차근차근 알아 보도록 할께요.

## 0. 준비
### Github ID 만들기 & Github Page 만들기
앞으로 여러 포스트 동안 만들 블로그는 Github Action, Git을 사용합니다. 따라서 Github 아이디가 필요해요. 특별히 유료 버전 결제할 필요는 없습니다. Github page가 사전에 제대로 작동하는지 확인하고 싶은 사람들은 다음 링크 들어가서 따라해 보세요. 필수는 아니고 Github page가 작동한다!를 확인해볼 수 있어요. 
https://zeddios.tistory.com/1222 
매우 친절하게 이분 가이드를 쭉 따라하셔도 되고 제가 만든 방법을 따라하실 분들은 템플릿 골라서 복사하는 방법까지 따라하시고 돌아오시면 됩니다.

### Jekyll 테마 고르기
Jekyll(지킬)은 정적 웹사이트 생성기입니다.  Markdown과 같은 텍스트 파일을 블로그, 웹사이트로 변환하여 제공해준답니다. 사실 크게 알아야 하는 사전 지식은 없어요. Jekyll의 철학 중 하나인 "It Jsut Works"를 따라 어떻게 생

