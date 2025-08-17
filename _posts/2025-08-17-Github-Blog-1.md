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
최근에 생각할 것들이 너무 많고 기억하기에 머리가 너무 나빠서 블로그를 하나 만들어야겠다는 다짐을 했습니다. 마침 Github Page를 추천 받아서 템플릿으로 만들어 볼까 하는데 생각보다 어렵더라고요. 단순히 버튼 한번 클릭으로 개설하지는 못하지만, 내가 원하는 방법으로 커스텀 할 수 있다는 점이 큰 장점인 것 같아요. 앞으로 Github 블로그 개설을 하는 방법을 차근차근 알아 보도록 할께요.

## 0. 준비
### Github ID 만들기 & Github Page 만들기
앞으로 여러 포스트 동안 만들 블로그는 Github Action, Git을 사용합니다. 따라서 Github 아이디가 필요해요. 특별히 유료 버전 결제할 필요는 없습니다. Github page가 사전에 제대로 작동하는지 확인하고 싶은 사람들은 다음 링크 들어가서 따라해 보세요. 필수는 아니고 Github page가 작동한다!를 확인해볼 수 있어요. 
[왕초보를 위한 Github 블로그 만들기](https://zeddios.tistory.com/1222 )
매우 친절하게 이분 가이드를 쭉 따라하셔도 되고 제가 만든 방법을 따라하실 분들은 템플릿 골라서 복사하는 방법까지 따라하시고 돌아오시면 됩니다.

### Git 설치
지금 블로그는 Github라는 사이트에 Github Action를 사용할 예정입니다. 따라서 컴퓨터에서 Github에 블로그 내용을 보내줄 Git Bash가 필요합니다. 다음 링크 [Git](https://git-scm.com/downloads) 에 들어가서 해당 os에 맞는 git 프로그램을 설치하고 

### Jekyll 테마 고르기
Jekyll(지킬)은 정적 웹사이트 생성기입니다.  Markdown과 같은 텍스트 파일을 블로그, 웹사이트로 변환하여 제공해준답니다. 사실 크게 알아야 하는 사전 지식은 없어요. Jekyll의 철학 중 하나인 "It Jsut Works"를 따라 어떻게 웹사이트가 생기는지 자세하게 알지 않아도 됩니다. 이미 만들어진 좋은 테마를 고르고 내용만 채우면 끝입니다.
#### 대표적으로 테마를 고를 수 있는 링크
- https://github.com/topics/jekyll-theme
- [jekyllthemes.org](http://jekyllthemes.org/)
- [jamstackthemes.dev](https://jamstackthemes.dev/ssg/jekyll/)
- [jekyllthemes.io](https://jekyllthemes.io/) (유료 다수 포함)

가장 흔하게 선택하는 테마는 [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) 입니다. 깔끔한 디자인 때문에 많은 분들이 선택하셨고 인터넷에 예시도 많아서 따라하기도 편합니다. 
![[jekyll_chirpy.png]]
전 [Yet Another Theme](https://github.com/jeffreytse/jekyll-theme-yat)이라는 템플릿을 선택하였습니다. 다들 Chirpy 이용하길래 색다른 페이지를 만들고 싶다는 이유가 제일 큽니다. 물론 깔끔하고 이미지가 강조되는 점도 좋긴 했습니다.
![[jekyll_yat.png]]

## 1. Github 레포지토리 생성하기
마음에 드는 템플릿을 골랐다면 레포지토리를 생성하러갑시다. 위 왕초보 가이드를 따라하셨다면 이미 "사용자ID.github.io"라는 이름의 레포지토리가 있을 것입니다. 그대로 사용하셔도 무방하고 새롭게 만드셔도 상관 없습니다. 템플릿의 내용이 해당 레포지토리에 그대로 담겨있으면 오케이 입니다.
#### 방법 A. 이미 레포지토리가 있을 경우
1. (만약 컴퓨터에 레포지토리 폴더가 없다면) 명렁어 Git clone 레포지토리주소.git을 통해 레포지토리 폴더를 컴퓨터에 만듭니다.
2. 원하는 템플릿의 레포지토리에 들어가서 우측 Code -> Download Zip 버튼을 눌러 압축 파일을 받습니다.
3. 압축을 해제합니다.
4. 압축 해제된 내용물을 컴퓨터의 레포지토리 폴더에 복사합니다.(껍때기 폴더는 굳이 필요없습니다.)
5. Git Bash를 실행한 후 해당 폴더로 이동합니다.
6. Git Push를 통해 Github에 변경된 파일들을 보냅니다.
```bash
 git add .
 git commit -m "add jekyll template files"
 git push
 ```
#### 방법 B. 레포지토리가 없을 경우
1. 원하는 템플릿의 레포지토리에 들어가서 우측 상단에 fork 버튼을 클릭합니다.
2. 확인을 눌러 본인의 레포지토리에 복사합니다.
3. 레포지토리에서 Settings -> General -> Repository name을 "사용자.github.io"로 변경합니다.