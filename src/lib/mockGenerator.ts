import type { Transaction } from "@/types.ts";

export function generateMockTransactions() {
  const STORAGE_KEY = "transactions";
  const today = new Date();           // ~20 февраля 2026
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const transactions: Transaction[] = [];
  let id = 1;

  const add = (
    targetDate: Date,
    title: string,
    amount: number,
    isIncome: boolean,
    categoryId: string,
    variation = 0.0,
    onlyWeekdays = false
  ) => {
    if (targetDate > today) return;

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

  // ─── Фиксированные ежемесячные платежи ─────────────────────────────────
  for (let offsetMonth = -11; offsetMonth <= 0; offsetMonth++) {
    const baseMonth = (currentMonth + offsetMonth + 12) % 12;
    const baseYear = currentYear + Math.floor((currentMonth + offsetMonth) / 12);

    const isCurrentMonth = offsetMonth === 0;

    // Зарплата — всегда 95 000 ₽, всегда 7-е число
    const salaryDay = 7;
    const salaryDate = new Date(baseYear, baseMonth, salaryDay);

    // Пропускаем только если дата в будущем
    if (salaryDate <= today) {
      add(salaryDate, "Зарплата", 95000, true, "salary", 0.0, false);
    }

    // Дополнительный доход / премия — иногда, с вариацией (можно убрать, если не нужен)
    if (Math.random() > 0.70) {
      const extraDay = 20 + Math.floor(Math.random() * 8);
      const extraDate = new Date(baseYear, baseMonth, extraDay);
      if (extraDate <= today) {
        add(extraDate, "Премия / подработка", 15000 + Math.floor(Math.random() * 25000), true, "salary", 0.15);
      }
    }

    // Аренда — ровно 35 000 ₽
    const rentDay = 3 + Math.floor(Math.random() * 4);
    const rentDate = new Date(baseYear, baseMonth, rentDay);
    if (rentDate <= today) {
      add(rentDate, "Аренда квартиры", 35000, false, "housing", 0.0);
    }

    // ЖКХ + интернет + связь — ровно 9 500 ₽
    if (new Date(baseYear, baseMonth, 12) <= today) {
      add(new Date(baseYear, baseMonth, 10 + Math.floor(Math.random() * 10)), "ЖКХ + интернет + мобильная связь", 9500, false, "housing", 0.0);
    }

    // Подписки — ровно 990 ₽
    if (new Date(baseYear, baseMonth, 15) <= today) {
      add(new Date(baseYear, baseMonth, 14 + Math.floor(Math.random() * 5)), "Яндекс Плюс / IVI / Okko", 990, false, "fun", 0.0);
    }
  }

  // ─── Распределённые траты (без изменений) ──────────────────────────────
  const daysBack = 370;

  // Продукты — много мелких чеков
  for (let i = 0; i < 240; i++) {
    const offset = -Math.floor(Math.random() * daysBack);
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    if (d > today) continue;
    if (Math.random() > 0.65) continue;

    const isMedium = Math.random() > 0.65;
    const isSmall  = Math.random() > 0.40;

    let baseAmt: number;
    if (isMedium) baseAmt = 1200 + Math.floor(Math.random() * 600);
    else if (isSmall) baseAmt = 600 + Math.floor(Math.random() * 400);
    else baseAmt = 900 + Math.floor(Math.random() * 800);

    const shops = ["Пятёрочка", "Магнит", "Перекрёсток", "Красное&Белое", "Бахетле", "На рынке"];
    const shop = shops[Math.floor(Math.random() * shops.length)];

    add(d, `Продукты — ${shop}`, baseAmt, false, "groceries", 0.18);
  }

  // Кафе / доставка
  for (let i = 0; i < 150; i++) {
    const offset = -Math.floor(Math.random() * daysBack);
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    if (d > today) continue;
    if (Math.random() > 0.44) continue;

    const base = 380 + Math.floor(Math.random() * 950);
    const title = Math.random() > 0.58
      ? "Обед в столовой / кафе"
      : Math.random() > 0.5
        ? "Доставка Яндекс.Еда"
        : "Кофе / перекус";
    add(d, title, base, false, "food", 0.22, true);
  }

  // Транспорт
  for (let i = 0; i < 100; i++) {
    const offset = -Math.floor(Math.random() * daysBack);
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    if (d > today) continue;
    if (Math.random() > 0.36) continue;

    const base = 250 + Math.floor(Math.random() * 1100);
    const title = Math.random() > 0.62
      ? "Проездной / автобус / метро"
      : "Такси Яндекс / Драйв";
    add(d, title, base, false, "transport", 0.32);
  }

  // ─── Редкие крупные события ────────────────────────────────────────────
  const rareEvents = [
    {daysAgo: 50,  title: "Годовая премия",           amount: 140000, income: true,  cat: "salary"},
    {daysAgo: 120, title: "13-я зарплата",            amount: 65000,  income: true,  cat: "salary"},
    {daysAgo: 80,  title: "Стоматология / чекап",     amount: 18000,  income: false, cat: "health"},
    {daysAgo: 35,  title: "Перевод родителям",        amount: 12000,  income: false, cat: "expense"},
    {daysAgo: 100, title: "Подарок на день рождения", amount: 8000,   income: false, cat: "gift"},
    {daysAgo: 18,  title: "Ремонт телефона",          amount: 13500,  income: false, cat: "other-exp"},
    {daysAgo: 210, title: "Покупка ноутбука",         amount: 65000,  income: false, cat: "other-exp"},
    {daysAgo: 280, title: "Отпуск (билеты + отель)",  amount: 52000,  income: false, cat: "fun"},
    {daysAgo: 150, title: "Платёж по кредиту",        amount: 28000,  income: false, cat: "credit"},
  ];

  rareEvents.forEach(e => {
    const d = new Date(today);
    d.setDate(d.getDate() - e.daysAgo);
    if (d <= today) {
      add(d, e.title, e.amount, e.income, e.cat, 0.10); // небольшая вариация для редких событий
    }
  });

  transactions.sort((a, b) => a.date.localeCompare(b.date));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  console.log(`Сгенерировано ${transactions.length} транзакций`);

  return transactions;
}