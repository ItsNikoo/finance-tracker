export const defaultCategorySeed = [
  {name: "Зарплата", type: "income"},
  {name: "Перевод от человека", type: "income"},
  {name: "Подарки", type: "income"},
  {name: "Другое", type: "income"},
  {name: "Еда / кафе", type: "expense"},
  {name: "Продукты", type: "expense"},
  {name: "Транспорт", type: "expense"},
  {name: "Жилье", type: "expense"},
  {name: "Развлечения", type: "expense"},
  {name: "Здоровье", type: "expense"},
  {name: "Перевод человеку", type: "expense"},
  {name: "Кредитные задолженности", type: "expense"},
  {name: "Другое", type: "expense"}
] as const

export const defaultLimitSeed = [
  {categoryName: "Продукты", amount: 25000},
  {categoryName: "Еда / кафе", amount: 8000},
  {categoryName: "Транспорт", amount: 5000},
  {categoryName: "Развлечения", amount: 10000},
  {categoryName: "Здоровье", amount: 5000},
  {categoryName: "Жилье", amount: 45000},
  {categoryName: "Перевод человеку", amount: 10000},
  {categoryName: "Кредитные задолженности", amount: 30000},
  {categoryName: "Другое", amount: 8000}
] as const
