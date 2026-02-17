import type { Transaction } from "@/types.ts";

export function generateMockTransactions() {
  const STORAGE_KEY = "transactions";
  const today = new Date();           // 13 февраля 2026
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 1 = февраль

  const transactions: Transaction[] = [];
  let id = 1;

  // ─── Помощник для добавления транзакции ───────────────────────────────
  const add = (
    targetDate: Date,
    title: string,
    amount: number,
    isIncome: boolean,
    categoryId: string,
    variation = 0.0,
    onlyWeekdays = false
  ) => {
    if (targetDate > today) return; // ничего в будущем

    if (onlyWeekdays) {
      const dayOfWeek = targetDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) return;
    }

    let finalAmount = amount;
    if (variation > 0) {
      finalAmount = Math.round(amount * (1 + (Math.random() * 2 - 1) * variation));
      finalAmount = Math.max(100, finalAmount);
    }

    transactions.push({
      id: id++,
      title,
      amount: finalAmount,
      isIncome,
      categoryId,
      date: targetDate.toISOString().split('T')[0] as string,
    });
  };

  // ─── Генерация за 12 месяцев (всегда полный цикл) ──────────────────────
  for (let offsetMonth = -11; offsetMonth <= 0; offsetMonth++) {
    const baseMonth = (currentMonth + offsetMonth + 12) % 12;
    const baseYear = currentYear + Math.floor((currentMonth + offsetMonth) / 12);

    const isCurrentMonth = offsetMonth === 0;

    // ── Зарплата (7–9 число) ──
    const salaryDay = 7 + Math.floor(Math.random() * 3);
    const salaryDate = new Date(baseYear, baseMonth, salaryDay);
    if (!isCurrentMonth || salaryDate <= today) {
      add(salaryDate, "Зарплата ООО «Ромашка»", 80000, true, "salary", 0.0, true);
    }

    // ── Аванс (15–17 число) ──
    const advanceDay = 15 + Math.floor(Math.random() * 3);
    const advanceDate = new Date(baseYear, baseMonth, advanceDay);
    if (!isCurrentMonth || advanceDate <= today) {
      add(advanceDate, "Аванс", 75000, true, "salary", 0.0, true);
    }

    // ── Аренда (~3 число) ──
    const rentDate = new Date(baseYear, baseMonth, 3);
    if (!isCurrentMonth || rentDate <= today) {
      add(rentDate, "Аренда квартиры", 54000, false, "housing", 0.04);
    }

    // ── Подписки (привязываем к середине месяца) ──
    if (!isCurrentMonth || new Date(baseYear, baseMonth, 15) <= today) {
      add(new Date(baseYear, baseMonth, 15), "YouTube Premium + Netflix", 1850, false, "fun", 0.0);
      add(new Date(baseYear, baseMonth, 16), "Spotify Family", 1690, false, "fun", 0.0);
    }
  }

  // ─── Продукты, кафе, транспорт — распределены по всем месяцам ────────
  const daysBack = 365; // ~12 месяцев

  // Продукты
  for (let i = 0; i < 120; i++) {
    const offset = -Math.floor(Math.random() * daysBack);
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    if (d > today) continue;
    if (Math.random() > 0.32) continue;
    const baseAmt = Math.random() > 0.6 ? 6800 : 3900;
    add(d, "Продукты", baseAmt, false, "groceries", 0.28);
  }

  // Обеды / кафе (больше в будни)
  for (let i = 0; i < 140; i++) {
    const offset = -Math.floor(Math.random() * daysBack);
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    if (d > today) continue;
    if (Math.random() > 0.45) continue;
    add(d, "Обед / кофе", 450 + Math.floor(Math.random() * 900), false, "food", 0.25, true);
  }

  // Транспорт
  for (let i = 0; i < 90; i++) {
    const offset = -Math.floor(Math.random() * daysBack);
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    if (d > today) continue;
    add(d, "Такси / метро / автобус", 800 + Math.floor(Math.random() * 1600), false, "transport", 0.38);
  }

  // ─── Редкие / разовые траты (разбрасываем по году) ────────────────────
  const rareEvents = [
    { daysAgo: 38,  title: "Годовая премия",         amount: 120000, income: true,  cat: "salary",  var: 0.12 },
    { daysAgo: 97,  title: "Премия за квартал",      amount: 65000,  income: true,  cat: "salary",  var: 0.18 },
    { daysAgo: 68,  title: "Стоматология (лечение)", amount: 15800,  income: false, cat: "health",  var: 0.15 },
    { daysAgo: 41,  title: "Перевод маме на др",     amount: 12000,  income: false, cat: "expense", var: 0.10 },
    { daysAgo: 105, title: "Подарок на свадьбу",     amount: 8500,   income: false, cat: "gift",    var: 0.20 },
    { daysAgo: 9,   title: "Ремонт ноутбука",        amount: 18400,  income: false, cat: "other-exp", var: 0.08 },
  ];

  rareEvents.forEach(e => {
    const d = new Date(today);
    d.setDate(d.getDate() - e.daysAgo);
    if (d <= today) {
      add(d, e.title, e.amount, e.income, e.cat, e.var);
    }
  });

  // Сортировка от старых к новым
  transactions.sort((a, b) => a.date.localeCompare(b.date));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  console.log(`Сгенерировано ${transactions.length} транзакций (12-месячный цикл)`);

  return transactions;
}