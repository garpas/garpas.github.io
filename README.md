# garpas.github.io

인터랙티브 포트폴리오. Vite + React + GSAP, GitHub Pages 배포.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

구조

```
src/
├── pages/Home/        DesktopHome / MobileHome (입력만 다르고 장면은 공유)
├── components/        typography, cursor, navigation, transitions
├── hooks/             usePointer, useDeviceTilt, useViewport, useInput
├── data/              site.js, projects.js (콘텐츠는 여기에만)
└── styles/            global.css
```

`main`에 push 하면 `.github/workflows/deploy.yml` 이 빌드해서 Pages 에 올린다.
