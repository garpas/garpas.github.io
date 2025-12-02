---
layout: about
title: Writing Heatmap
permalink: /writing-heatmap.html
---

<h2>Writing Heatmap</h2>
<p>
  주 단위로 글쓰기 리듬을 확인하는 페이지입니다.
  초록색 칸 한 개가 한 주를 뜻하고, 진할수록 그 주에 쓴 글이 많다는 뜻이에요.
</p>

<div class="whm-wrapper">
  <div class="whm-header">
    <div>
      <strong>주간 글쓰기 패턴</strong>
      <div class="whm-subtitle">
        지금까지 <span id="whm-total-weeks">-</span>주 중
        <span id="whm-active-weeks">-</span>주에 글을 썼어요.
      </div>
    </div>
  </div>

  <div class="whm-legend">
    <span>적음</span>
    <span class="whm-legend-swatch whm-level-0"></span>
    <span class="whm-legend-swatch whm-level-1"></span>
    <span class="whm-legend-swatch whm-level-2"></span>
    <span class="whm-legend-swatch whm-level-3"></span>
    <span class="whm-legend-swatch whm-level-4"></span>
    <span>많음</span>
  </div>

  <div id="whm-grid" class="whm-grid"></div>

  <div class="whm-footnote">
    기준: 한 주에 글 1편 이상을 목표로 합니다.
  </div>
</div>

{%- comment -%}
  모든 포스트 날짜를 JSON으로 넘겨서 자바스크립트에서 주단위로 묶어 쓸 거예요.
{%- endcomment -%}
<script id="whm-posts-data" type="application/json">
[
  {%- for post in site.posts -%}
    {"date": "{{ post.date | date: '%Y-%m-%d' }}"}{% unless forloop.last %},{% endunless %}
  {%- endfor -%}
]
</script>

<style>
  /* 전체 박스 */
  .whm-wrapper {
    margin-top: 1.5rem;
    padding: 1.5rem 1.25rem;
    border-radius: 8px;
    border: 1px solid #dddddd;
    background: rgba(0,0,0,0.02);
    font-size: 0.9rem;
  }

  .whm-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.75rem;
  }

  .whm-subtitle {
    margin-top: 0.25rem;
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .whm-legend {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .whm-legend-swatch {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    border: 1px solid #cccccc;
  }

  /* 히트맵 그리드: 가로 한 줄에 주 단위 박스 나열 */
  .whm-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    align-items: center;
  }

  .whm-cell {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1px solid #d0d0d0;
    box-sizing: border-box;
    cursor: default;
  }

  .whm-cell:hover {
    transform: scale(1.15);
    transition: transform 0.08s ease-out;
  }

  /* 색 레벨: 0은 글 없음, 4가 최고 */
  .whm-level-0 { background-color: #eeeeee; }
  .whm-level-1 { background-color: #c8e6c9; }
  .whm-level-2 { background-color: #a5d6a7; }
  .whm-level-3 { background-color: #81c784; }
  .whm-level-4 { background-color: #4caf50; border-color: #43a047; }

  .whm-footnote {
    margin-top: 0.75rem;
    font-size: 0.8rem;
    opacity: 0.7;
  }

  /* 화면이 좁을 때 칸 조금 줄이기 */
  @media (max-width: 600px) {
    .whm-cell {
      width: 12px;
      height: 12px;
    }
  }
</style>

<script>
(function() {
  const dataEl = document.getElementById('whm-posts-data');
  if (!dataEl) return;

  let posts = [];
  try {
    posts = JSON.parse(dataEl.textContent.trim());
  } catch (e) {
    console.error('whm: failed to parse posts json', e);
    return;
  }

  if (!posts.length) {
    const grid = document.getElementById('whm-grid');
    if (grid) {
      grid.textContent = '아직 포스트가 없어요.';
    }
    return;
  }

  // 문자열 -> Date
  posts.forEach(p => {
    p.dateObj = new Date(p.date + 'T00:00:00');
  });

  // 가장 이른 날짜, 오늘 기준으로 범위를 잡아요
  let minDate = posts[0].dateObj;
  posts.forEach(p => {
    if (p.dateObj < minDate) minDate = p.dateObj;
  });

  const today = new Date();
  function mondayOf(d) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const day = x.getDay(); // 0: 일, 1: 월, ...
    const diff = (day + 6) % 7; // 월을 기준으로 0
    x.setDate(x.getDate() - diff);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  const startWeek = mondayOf(minDate);
  const endWeek = mondayOf(today);

  const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const totalWeeks =
    Math.floor((endWeek.getTime() - startWeek.getTime()) / WEEK_MS) + 1;

  const weekCounts = new Array(totalWeeks).fill(0);

  // 각 포스트를 월요일 기준 주 인덱스로 묶기
  posts.forEach(p => {
    const wStart = mondayOf(p.dateObj);
    const idx = Math.floor((wStart.getTime() - startWeek.getTime()) / WEEK_MS);
    if (idx >= 0 && idx < totalWeeks) {
      weekCounts[idx] += 1;
    }
  });

  // 색 레벨 계산: 0(없음) ~ 4(많이)
  function levelFor(count) {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count === 3) return 3;
    return 4;
  }

  const grid = document.getElementById('whm-grid');
  grid.innerHTML = '';

  weekCounts.forEach((count, i) => {
    const weekStart = new Date(startWeek.getTime() + i * WEEK_MS);
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

    function fmt(d) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }

    const cell = document.createElement('div');
    cell.className = 'whm-cell';

    const level = levelFor(count);
    cell.classList.add('whm-level-' + level);

    cell.title = `${fmt(weekStart)} ~ ${fmt(weekEnd)}\n글 ${count}개`;

    grid.appendChild(cell);
  });

  // 통계 텍스트 업데이트
  const totalWeeksSpan = document.getElementById('whm-total-weeks');
  const activeWeeksSpan = document.getElementById('whm-active-weeks');

  if (totalWeeksSpan) totalWeeksSpan.textContent = String(totalWeeks);
  if (activeWeeksSpan) {
    const active = weekCounts.filter(c => c > 0).length;
    activeWeeksSpan.textContent = String(active);
  }
})();
</script>
