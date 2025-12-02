---
layout: about
title: Writing Heatmap
permalink: /writing-heatmap.html
---

<h2>Writing Heatmap</h2>
<p>
  한 칸이 1주를 뜻하고, 색이 진할수록 그 주에 쓴 글이 많습니다.
  목표는 <strong>한 주에 글 1편</strong>입니다.
</p>

<div class="whm-wrapper">
  <div class="whm-header">
    <div>
      <strong>주간 글쓰기 패턴</strong>
      <div class="whm-subtitle">
        목표: 한 주에 글 1편<br>
        지금까지 <span id="whm-total-weeks">-</span>주 중
        <span id="whm-active-weeks">-</span>주에 글을 썼어요.
        (<span id="whm-success-rate">-</span>% 달성)
      </div>
      <div class="whm-range">
        기간:
        <span id="whm-range-start">-</span>
        ~
        <span id="whm-range-end">-</span>
      </div>
    </div>
  </div>

  <div class="whm-legend">
    <span>미작성</span>
    <span class="whm-legend-swatch whm-level-0"></span>
    <span>1편(목표)</span>
    <span class="whm-legend-swatch whm-level-1"></span>
    <span>2편</span>
    <span class="whm-legend-swatch whm-level-2"></span>
    <span>3편</span>
    <span class="whm-legend-swatch whm-level-3"></span>
    <span>4편 이상</span>
    <span class="whm-legend-swatch whm-level-4"></span>
  </div>

  <div id="whm-grid" class="whm-grid"></div>

  <div class="whm-footnote">
    기준: 한 주에 글 1편 이상을 목표로 합니다.
  </div>
</div>

{%- comment -%}
  모든 포스트 날짜를 JSON으로 넘겨서 자바스크립트에서 주 단위로 묶어 사용합니다.
{%- endcomment -%}
<script id="whm-posts-data" type="application/json">
[
  {%- for post in site.posts -%}
    {"date": "{{ post.date | date: '%Y-%m-%d' }}"}{% unless forloop.last %},{% endunless %}
  {%- endfor -%}
]
</script>

<style>
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
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }

  .whm-subtitle {
    margin-top: 0.25rem;
    font-size: 0.85rem;
    opacity: 0.9;
  }

  .whm-range {
    margin-top: 0.25rem;
    font-size: 0.8rem;
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

  // 가장 이른 날짜 구하기
  let minDate = posts[0].dateObj;
  posts.forEach(p => {
    if (p.dateObj < minDate) minDate = p.dateObj;
  });

  const today = new Date();

  function mondayOf(d) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const day = x.getDay(); // 0: 일, 1: 월, ...
    const diff = (day + 6) % 7; // 월 기준 0
    x.setDate(x.getDate() - diff);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  function fmt(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  const startWeek = mondayOf(minDate);
  const endWeek = mondayOf(today);

  const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const totalWeeks =
    Math.floor((endWeek.getTime() - startWeek.getTime()) / WEEK_MS) + 1;

  const weekCounts = new Array(totalWeeks).fill(0);

  // 각 포스트를 해당 주 인덱스로 묶기
  posts.forEach(p => {
    const wStart = mondayOf(p.dateObj);
    const idx = Math.floor((wStart.getTime() - startWeek.getTime()) / WEEK_MS);
    if (idx >= 0 && idx < totalWeeks) {
      weekCounts[idx] += 1;
    }
  });

  // 색 레벨: 0(없음), 1(목표 1편), 2(2편), 3(3편), 4(4편 이상)
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
  const successRateSpan = document.getElementById('whm-success-rate');
  const rangeStartSpan = document.getElementById('whm-range-start');
  const rangeEndSpan = document.getElementById('whm-range-end');

  const active = weekCounts.filter(c => c > 0).length;

  if (totalWeeksSpan) totalWeeksSpan.textContent = String(totalWeeks);
  if (activeWeeksSpan) activeWeeksSpan.textContent = String(active);

  if (successRateSpan) {
    const rate = totalWeeks > 0
      ? Math.round((active / totalWeeks) * 100)
      : 0;
    successRateSpan.textContent = String(rate);
  }

  if (rangeStartSpan && rangeEndSpan) {
    rangeStartSpan.textContent = fmt(startWeek);
    rangeEndSpan.textContent = fmt(endWeek);
  }
})();
</script>
