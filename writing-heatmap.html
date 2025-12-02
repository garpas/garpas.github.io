---
layout: about
title: Writing Heatmap
permalink: /writing-heatmap.html
---
<h2>Writing Heatmap</h2>
<p>
  한 칸이 1주를 뜻하고, 색이 진할수록 그 주에 쓴 글이 많습니다.
  목표는 <strong>한 주에 글 1개</strong>입니다.
</p>

<div class="whm-wrapper">
  <div class="whm-header">
    <div>
      <strong>주간 글쓰기 패턴</strong>
      <div class="whm-subtitle">
        이 구간 기준으로 <span id="whm-total-weeks">-</span>주 중
        <span id="whm-active-weeks">-</span>주에 글을 썼어요.
        (<span id="whm-success-rate">-</span>% 달성)
      </div>
      <div class="whm-range">
        표시 구간:
        <span id="whm-range-start">-</span>
        ~
        <span id="whm-range-end">-</span>
      </div>
    </div>

    <!-- 오른쪽: 연속 작성 스트릭 표시 -->
    <div class="whm-streak-box">
      <div class="whm-streak-label">현재 연속 작성</div>
      <div class="whm-streak-value">
        <span id="whm-current-streak">0</span>주
      </div>
      <div class="whm-streak-sub">
        최고 기록 <span id="whm-best-streak">0</span>주
      </div>
    </div>
  </div>

  <div class="whm-legend">
    <span>미작성</span>
    <span class="whm-legend-swatch whm-level-0"></span>
    <span>1개(목표)</span>
    <span class="whm-legend-swatch whm-level-1"></span>
    <span>2개</span>
    <span class="whm-legend-swatch whm-level-2"></span>
    <span>3개</span>
    <span class="whm-legend-swatch whm-level-3"></span>
    <span>4개 이상</span>
    <span class="whm-legend-swatch whm-level-4"></span>
  </div>

  <!-- 월 라벨 + 주간 박스 -->
  <div class="whm-grid-wrapper">
    <div id="whm-months" class="whm-month-row"></div>
    <div id="whm-grid" class="whm-grid"></div>
  </div>

  <div class="whm-footnote">
    기준: 최근 1년(52주) 기준으로 표시하며, 화면이 좁을 경우 최근 26주만 표시합니다.
  </div>
</div>

{%- comment -%}
  모든 포스트 날짜를 JSON으로 넘겨서
  자바스크립트에서 주 단위로 묶어 사용합니다.
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
    gap: 1rem;
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

  /* 스트릭 박스 */
  .whm-streak-box {
    text-align: right;
    min-width: 140px;
  }

  .whm-streak-label {
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .whm-streak-value {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .whm-streak-sub {
    font-size: 0.8rem;
    opacity: 0.75;
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

  .whm-grid-wrapper {
    margin-top: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }

  /* 월 라벨 줄 */
  .whm-month-row {
    display: grid;
    grid-template-columns: repeat(var(--whm-cols, 52), 1fr);
    column-gap: 3px;
    font-size: 0.7rem;
    margin-bottom: 4px;
  }

  .whm-month-label {
    text-align: center;
    white-space: nowrap;
  }

  /* 주간 박스 그리드 */
  .whm-grid {
    display: grid;
    grid-template-columns: repeat(var(--whm-cols, 52), 1fr);
    column-gap: 3px;
    row-gap: 3px;
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

  /* 색 레벨: 0(없음), 1(목표 1개), 2(2개), 3(3개), 4(4개 이상) */
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
    .whm-header {
      flex-direction: column;
      align-items: flex-start;
    }
    .whm-streak-box {
      text-align: left;
    }
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

  const grid = document.getElementById('whm-grid');
  const monthsRow = document.getElementById('whm-months');
  if (!grid || !monthsRow) return;

  if (!posts.length) {
    grid.textContent = '아직 포스트가 없어요.';
    return;
  }

  // 문자열 -> Date
  posts.forEach(p => {
    p.dateObj = new Date(p.date + 'T00:00:00');
  });

  // 가장 이른 날짜
  let minDate = posts[0].dateObj;
  posts.forEach(p => {
    if (p.dateObj < minDate) minDate = p.dateObj;
  });

  const today = new Date();
  const DAY_MS = 24 * 60 * 60 * 1000;
  const WEEK_MS = 7 * DAY_MS;

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

  const totalWeeks =
    Math.floor((endWeek.getTime() - startWeek.getTime()) / WEEK_MS) + 1;

  const weekCounts = new Array(totalWeeks).fill(0);

  // 각 포스트를 해당 주 인덱스로 묶기 (전체 데이터용)
  posts.forEach(p => {
    const wStart = mondayOf(p.dateObj);
    const idx = Math.floor((wStart.getTime() - startWeek.getTime()) / WEEK_MS);
    if (idx >= 0 && idx < totalWeeks) {
      weekCounts[idx] += 1;
    }
  });

  // 스트릭 계산 (전체 기준)
  let bestStreak = 0;
  let run = 0;
  for (let i = 0; i < weekCounts.length; i++) {
    if (weekCounts[i] > 0) {
      run++;
      if (run > bestStreak) bestStreak = run;
    } else {
      run = 0;
    }
  }

  let currentStreak = 0;
  for (let i = weekCounts.length - 1; i >= 0; i--) {
    if (weekCounts[i] > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  const currentStreakSpan = document.getElementById('whm-current-streak');
  const bestStreakSpan = document.getElementById('whm-best-streak');
  if (currentStreakSpan) currentStreakSpan.textContent = String(currentStreak);
  if (bestStreakSpan) bestStreakSpan.textContent = String(bestStreak);

  // 화면 너비에 따라 52주 또는 26주만 표시
  const DESKTOP_MAX_WEEKS = 52; // 1년
  const MOBILE_MAX_WEEKS = 26;  // 반년
  const isNarrow = window.innerWidth < 768;
  const maxWeeks = isNarrow ? MOBILE_MAX_WEEKS : DESKTOP_MAX_WEEKS;

  const viewWeeks = Math.min(totalWeeks, maxWeeks);
  const startIndex = Math.max(0, totalWeeks - viewWeeks);

  // 이 구간 기준 주 수 / 작성 주 / 성공률
  const totalWeeksSpan = document.getElementById('whm-total-weeks');
  const activeWeeksSpan = document.getElementById('whm-active-weeks');
  const successRateSpan = document.getElementById('whm-success-rate');
  const rangeStartSpan = document.getElementById('whm-range-start');
  const rangeEndSpan = document.getElementById('whm-range-end');

  const viewCounts = weekCounts.slice(startIndex);
  const active = viewCounts.filter(c => c > 0).length;

  if (totalWeeksSpan) totalWeeksSpan.textContent = String(viewWeeks);
  if (activeWeeksSpan) activeWeeksSpan.textContent = String(active);
  if (successRateSpan) {
    const rate = viewWeeks > 0 ? Math.round((active / viewWeeks) * 100) : 0;
    successRateSpan.textContent = String(rate);
  }

  const viewStartWeek = new Date(startWeek.getTime() + startIndex * WEEK_MS);
  const viewEndWeekMonday = new Date(
    viewStartWeek.getTime() + (viewWeeks - 1) * WEEK_MS
  );
  const viewEndWeek = new Date(viewEndWeekMonday.getTime() + 6 * DAY_MS);

  if (rangeStartSpan && rangeEndSpan) {
    rangeStartSpan.textContent = fmt(viewStartWeek);
    rangeEndSpan.textContent = fmt(viewEndWeek);
  }

  // 그리드 컬럼 수를 CSS 변수로 전달
  grid.style.setProperty('--whm-cols', viewWeeks);
  monthsRow.style.setProperty('--whm-cols', viewWeeks);

  // 월 라벨 생성 (예: 25-Jan)
  monthsRow.innerHTML = '';
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  let lastMonth = -1;
  for (let i = 0; i < viewWeeks; i++) {
    const globalIndex = startIndex + i;
    const weekStart = new Date(startWeek.getTime() + globalIndex * WEEK_MS);
    const m = weekStart.getMonth();

    const cell = document.createElement('div');
    cell.className = 'whm-month-label';

    if (m !== lastMonth) {
      const yearShort = String(weekStart.getFullYear()).slice(-2);
      cell.textContent = `${yearShort}-${monthNames[m]}`;
      lastMonth = m;
    } else {
      cell.textContent = '';
    }

    monthsRow.appendChild(cell);
  }

  // 주간 박스 생성 (viewWeeks만 표시)
  grid.innerHTML = '';
  for (let i = 0; i < viewWeeks; i++) {
    const globalIndex = startIndex + i;
    const count = weekCounts[globalIndex];

    const weekStart = new Date(startWeek.getTime() + globalIndex * WEEK_MS);
    const weekEnd = new Date(weekStart.getTime() + 6 * DAY_MS);

    const cell = document.createElement('div');
    cell.className = 'whm-cell';

    // 색 레벨: 0(없음), 1(1개), 2(2개), 3(3개), 4(4개 이상)
    let level = 0;
    if (count === 1) level = 1;
    else if (count === 2) level = 2;
    else if (count === 3) level = 3;
    else if (count >= 4) level = 4;

    cell.classList.add('whm-level-' + level);
    cell.title = `${fmt(weekStart)} ~ ${fmt(weekEnd)}\n글 ${count}개`;

    grid.appendChild(cell);
  }
})();
</script>