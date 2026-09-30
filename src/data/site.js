// 사이트 전역 콘텐츠. 표현(컴포넌트)과 분리해서 여기에서만 수정한다.
export const site = {
  name: 'GARPAS',
  tagline: 'AI · GAMES · INTERACTIVE',
  year: new Date().getFullYear(),
  menu: [
    { id: 'projects', label: 'PROJECTS', href: '#projects' },
    { id: 'about', label: 'ABOUT', href: '#about' },
    { id: 'archive', label: 'ARCHIVE', href: '#archive' },
    { id: 'contact', label: 'CONTACT', href: 'mailto:garpas@naver.com' },
  ],
}
