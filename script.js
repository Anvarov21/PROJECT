const audio = document.getElementById("bgMusic");
const button = document.getElementById("audioToggle");

window.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch(() => {});
  }
}, { once: true });

button.addEventListener("click", () => {
  audio.muted = !audio.muted;
  button.textContent = audio.muted ? "🔇" : "🎵";
});

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();


function createCalendar(year,month) {
  const calendar = document.getElementById("calendar");
  
  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0); // последний день февраля
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  let html = `
    <div class="calendar-header">
      <button onclick="changeMonth(-1)">←</button>
      <h3>${monthNames[month]} ${year}</h3>
      <button onclick="changeMonth(1)">→</button>
    </div>
    <table class="calendar-table">
      <thead><tr>`;
  for (let day of dayNames) {
    html += `<th>${day}</th>`;
  }
  html += `</tr></thead><tbody><tr>`;

  // Добавим "тусклые" дни из февраля
  for (let i = 0; i < startDay; i++) {
    let prevDate = prevLastDay.getDate() - startDay + i + 1;
    html += `<td style="color:gray;">${prevDate}</td>`;
  }

  // Дни текущего месяца
  for (let d = 1; d <= daysInMonth; d++) {
    const currentDay = new Date(year, month, d).getDay();
    const isWeddingDay = d === 1 && year === 2025 && month === 0;
    let highlight = isWeddingDay ? ' style="background-color:#c6e6c3;font-weight:bold;"' : '';
    html += `<td${highlight}>${d}</td>`;
    if (currentDay === 6 && d !== daysInMonth) {
      html += `</tr><tr>`;
    }
  }

  html += `</tr></tbody></table>`;
  calendar.innerHTML = html;
}

function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  createCalendar(currentYear, currentMonth);
}
function showMonthsAndDaysSinceWedding() {
  const weddingDate = new Date(2025, 0, 1); // 1 января 2025
  const now = new Date();

  // Сначала считаем полное количество месяцев
  let months =
    (now.getFullYear() - weddingDate.getFullYear()) * 12 +
    now.getMonth() -
    weddingDate.getMonth();

  // Проверяем, наступило ли число свадьбы в этом месяце
  if (now.getDate() < weddingDate.getDate()) {
    months--; // ещё не полный месяц
  }

  months = Math.max(0, months); // не может быть отрицательным

  // Вычисляем дату "начала текущего месяца" после свадьбы
  let monthStart = new Date(weddingDate);
  monthStart.setMonth(weddingDate.getMonth() + months);

  // Считаем количество дней с начала этого месяца
  let days = Math.floor((now - monthStart) / (1000 * 60 * 60 * 24));

  const display = document.getElementById("monthsPassed");
  display.innerHTML = `
    <div class="months-box">
      <p>Со дня свадьбы прошло:</p>
      <strong>${months} ${pluralizeMonths(months)} и ${days} ${pluralizeDays(days)}</strong>
    </div>
  `;
}

// Склонения
function pluralizeMonths(n) {
  if (n % 10 === 1 && n % 100 !== 11) return "месяц";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return "месяца";
  return "месяцев";
}

function pluralizeDays(n) {
  if (n % 10 === 1 && n % 100 !== 11) return "день";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return "дня";
  return "дней";
}
createCalendar(currentYear, currentMonth);
showMonthsAndDaysSinceWedding();
