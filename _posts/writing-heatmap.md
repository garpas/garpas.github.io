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

  <!-- 연도 행 + 월 행 + 주간 박스 -->
  <div class="whm-grid-wrapper">
    <div id="whm-years" class="whm-year-row"></div>
    <div id="whm-months" class="whm-month-row"></div>
    <div id="whm-grid" class="whm-grid"></div>
  </div>

  <div class="whm-footnote">
    기준: 오늘 기준 최근 1년(52주)을 표시합니다.
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

  /* 연도 행 */
  .whm-year-row {
    display: grid;
    grid-template-columns: repeat(var(--whm-cols, 52), 1fr);
    column-gap: 3px;
    font-size: 0.75rem;
    margin-bottom: 2px;
    font-weight: 600;
  }

  .whm-year-label {
    text-align: left;
    white-space: nowrap;
  }

  /* 월 라벨 행 */
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
  const yearsRow = document.getElementById('whm-years');
  if (!grid || !monthsRow || !yearsRow) return;

  if (!posts.length) {
    grid.textContent = '아직 포스트가 없어요.';
    return;
  }

  // 문자열 -> Date
  posts.forEach(p => {
    p.dateObj = new Date(p.date + 'T00:00:00');
  });

  // 가장 이른 날짜 (전체 스트릭 계산용)
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

  const endWeek = mondayOf(today);

  /* ---------- 전체 기간 기준 스트릭 계산 ---------- */
  const globalStartWeek = mondayOf(minDate);
  const globalTotalWeeks =
    Math.floor((endWeek.getTime() - globalStartWeek.getTime()) / WEEK_MS) + 1;

  const globalWeekCounts = new Array(globalTotalWeeks).fill(0);

  posts.forEach(p => {
    const wStart = mondayOf(p.dateObj);
    const idx = Math.floor((wStart.getTime() - globalStartWeek.getTime()) / WEEK_MS);
    if (idx >= 0 && idx < globalTotalWeeks) {
      globalWeekCounts[idx] += 1;
    }
  });

  let bestStreak = 0;
  let run = 0;
  for (let i = 0; i < globalWeekCounts.length; i++) {
    if (globalWeekCounts[i] > 0) {
      run++;
      if (run > bestStreak) bestStreak = run;
    } else {
      run = 0;
    }
  }

  let currentStreak = 0;
  for (let i = globalWeekCounts.length - 1; i >= 0; i--) {
    if (globalWeekCounts[i] > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  const currentStreakSpan = document.getElementById('whm-current-streak');
  const bestStreakSpan = document.getElementById('whm-best-streak');
  if (currentStreakSpan) currentStreakSpan.textContent = String(currentStreak);
  if (bestStreakSpan) bestStreakSpan.textContent = String(bestStreak);

  /* ---------- 최근 52주 뷰 데이터 ---------- */
  const VIEW_WEEKS = 52; // 항상 52주 표시
  const viewEndWeek = endWeek;
  const viewStartWeek = new Date(viewEndWeek.getTime() - (VIEW_WEEKS - 1) * WEEK_MS);

  const viewWeekCounts = new Array(VIEW_WEEKS).fill(0);

  posts.forEach(p => {
    const wStart = mondayOf(p.dateObj);
    const diff = wStart.getTime() - viewStartWeek.getTime();
    const idx = Math.floor(diff / WEEK_MS);
    if (idx >= 0 && idx < VIEW_WEEKS) {
      viewWeekCounts[idx] += 1;
    }
  });

  // 통계 텍스트 (52주 기준)
  const totalWeeksSpan = document.getElementById('whm-total-weeks');
  const activeWeeksSpan = document.getElementById('whm-active-weeks');
  const successRateSpan = document.getElementById('whm-success-rate');
  const rangeStartSpan = document.getElementById('whm-range-start');
  const rangeEndSpan = document.getElementById('whm-range-end');

  const active = viewWeekCounts.filter(c => c > 0).length;

  if (totalWeeksSpan) totalWeeksSpan.textContent = String(VIEW_WEEKS);
  if (activeWeeksSpan) activeWeeksSpan.textContent = String(active);
  if (successRateSpan) {
    const rate = VIEW_WEEKS > 0 ? Math.round((active / VIEW_WEEKS) * 100) : 0;
    successRateSpan.textContent = String(rate);
  }

  const viewStartDate = viewStartWeek;
  const viewEndDate = new Date(viewEndWeek.getTime() + 6 * DAY_MS); // 해당 주 마지막 날

  if (rangeStartSpan && rangeEndSpan) {
    rangeStartSpan.textContent = fmt(viewStartDate);
    rangeEndSpan.textContent = fmt(viewEndDate);
  }

  // 그리드 컬럼 수 CSS 변수로 전달
  grid.style.setProperty('--whm-cols', VIEW_WEEKS);
  monthsRow.style.setProperty('--whm-cols', VIEW_WEEKS);
  yearsRow.style.setProperty('--whm-cols', VIEW_WEEKS);

  /* ---------- 연도 행 / 월 행 생성 ---------- */
  yearsRow.innerHTML = '';
  monthsRow.innerHTML = '';

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  let lastMonth = -1;
  let lastYearInView = null;

  for (let i = 0; i < VIEW_WEEKS; i++) {
    const weekStart = new Date(viewStartWeek.getTime() + i * WEEK_MS);
    const y = weekStart.getFullYear();
    const m = weekStart.getMonth();

    // 연도 라벨: 첫 칸에 한 번, 그리고 해가 바뀌는 시점의 1월 칸에만 표시
    const yearCell = document.createElement('div');
    yearCell.className = 'whm-year-label';

    if (i === 0) {
      yearCell.textContent = String(y);
    } else if (m === 0 && y !== lastYearInView) {
      yearCell.textContent = String(y);
    } else {
      yearCell.textContent = '';
    }

    yearsRow.appendChild(yearCell);
    lastYearInView = y;

    // 월 라벨: 해당 달의 첫 주에만 표시
    const monthCell = document.createElement('div');
    monthCell.className = 'whm-month-label';

    if (i === 0 || m !== lastMonth) {
      monthCell.textContent = monthNames[m];
    } else {
      monthCell.textContent = '';
    }

    monthsRow.appendChild(monthCell);
    lastMonth = m;
  }

  /* ---------- 주간 박스 생성 ---------- */
  grid.innerHTML = '';

  for (let i = 0; i < VIEW_WEEKS; i++) {
    const count = viewWeekCounts[i];

    const weekStart = new Date(viewStartWeek.getTime() + i * WEEK_MS);
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