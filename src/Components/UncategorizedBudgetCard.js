import { UNCATEGURIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpense } = useBudgets()
    const amount = getBudgetExpense(UNCATEGURIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)
    if (amount === 0) return null
    return (
        <BudgetCard
            name={"Uncategorized"}
            amount={amount}
            gray
            {...props}
        />
    )
}
