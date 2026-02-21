import type { Limit } from "@/types.ts";

export function generateLimits() {
  const STORAGE_KEY = "limits";

  const limits: Limit[] = [

    {
      categoryId: "groceries",
      name: "Продукты",
      limit: 25000
    },
    {
      categoryId: "food",
      name: "Еда / кафе",
      limit: 8000
    },
    {
      categoryId: "transport",
      name: "Транспорт",
      limit: 5000
    },
    {
      categoryId: "fun",
      name: "Развлечения",
      limit: 10000
    },
    {
      categoryId: "health",
      name: "Здоровье",
      limit: 5000
    },

    // Жильё — скорее справочное значение (обычно фиксировано)
    {
      categoryId: "housing",
      name: "Жильё",
      limit: 45000
    },

    // Менее жёстко контролируемые / разовые категории
    {
      categoryId: "expense",
      name: "Перевод человеку",
      limit: 10000
    },
    {
      categoryId: "credit",
      name: "Кредитные задолженности",
      limit: 30000
    },
    {
      categoryId: "other-exp",
      name: "Другое",
      limit: 8000
    }
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(limits));

  console.log(`Сгенерировано ${limits.length} лимитов по категориям`);

  return limits;
}