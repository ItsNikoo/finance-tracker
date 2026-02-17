export interface Category {
  id: string
  name: string
  type: "income" | "expense"
}

export interface Transaction {
  id: number
  title: string
  amount: number
  isIncome: boolean
  categoryId: string
  date: string
}
