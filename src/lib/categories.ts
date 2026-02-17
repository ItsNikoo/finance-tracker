import type {Category} from "@/types.ts";

export const categories: Category[] = [
  // Доходы
  {id: 'salary', name: 'Зарплата', type: 'income'},
  {id: 'income', name: 'Перевод от человека', type: 'income'},
  {id: 'gift', name: 'Подарки', type: 'income'},
  {id: 'other-inc', name: 'Другое', type: 'income'},

  // Расходы
  {id: 'food', name: 'Еда / кафе', type: 'expense'},
  {id: 'groceries', name: 'Продукты', type: 'expense'},
  {id: 'transport', name: 'Транспорт', type: 'expense'},
  {id: 'housing', name: 'Жильё', type: 'expense'},
  {id: 'fun', name: 'Развлечения', type: 'expense'},
  {id: 'health', name: 'Здоровье', type: 'expense'},
  {id: 'expense', name: 'Перевод человеку', type: 'expense'},
  {id: 'credit', name: "Кредитные задолженности", type: 'expense'},
  {id: 'other-exp', name: 'Другое', type: 'expense'},
]
