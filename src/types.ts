export interface Category {
  id: number
  name: string
  type: "income" | "expense"
}

export interface Transaction {
  id: number
  title: string
  amount: number
  isIncome: boolean
  categoryId: number
  date: string
}

export interface Limit {
  id: number
  categoryId: number
  name: string
  limit: number
}

export interface CategorySelection {
  categoryId: number
  name: string
  total: number
  count: number
  transactions: Transaction[]
}
