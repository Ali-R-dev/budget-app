import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGURIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext'
import { currencyFormatter } from "../utils";
export default function ViewExpensesModal({ budgetId, HandleClose }) {
    const {
        getBudgetExpense,
        budgets,
        deleteBudget,
        deleteExpense } = useBudgets()

    const expenses = getBudgetExpense(budgetId)
    const budget = UNCATEGURIZED_BUDGET_ID === budgetId
        ? { name: "Uncategorized", id: UNCATEGURIZED_BUDGET_ID }
        : budgets.find(budget => budget.id == budgetId)

    return (
        <Modal show={budgetId != null} onHide={HandleClose}>

            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId != UNCATEGURIZED_BUDGET_ID && <Button onClick={() => {
                            deleteBudget(budget)
                            HandleClose()
                        }} variant="outline-danger">Delete</Button>}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>

        </Modal>
    )
}
