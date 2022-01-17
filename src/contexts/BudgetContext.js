import react, { useContext } from 'react'
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage'

export const UNCATEGURIZED_BUDGET_ID = "Uncategorized"
const BudgetContext = react.createContext();
export function useBudgets() {
    return useContext(BudgetContext)
}
export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
    const getBudgetExpense = (budgetId) => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    const addBudget = ({ name, max }) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }
    const addExpense = ({ description, amount, budgetId }) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    }
    const deleteBudget = ({ id }) => {

        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense;
                return { ...expense, budgetId: UNCATEGURIZED_BUDGET_ID }
            })
        })
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    const deleteExpense = ({ id }) => {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(Expense => Expense.id !== id)
        })
    }
    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpense,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetContext.Provider>
    )
}   