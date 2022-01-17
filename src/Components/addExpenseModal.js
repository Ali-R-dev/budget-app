import { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useBudgets, UNCATEGURIZED_BUDGET_ID } from '../contexts/BudgetContext'
export default function AddExpenseModel({ show, HandleClose, defaultBudgetId }) {
    const DescRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const { addExpense, budgets } = useBudgets()
    const handleSubmit = (e) => {
        e.preventDefault()
        addExpense({
            description: DescRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value
        })
        HandleClose()
    }
    return (
        <Modal show={show} onHide={HandleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        New Expense
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            ref={DescRef}
                            type="text"
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            ref={amountRef}
                            type="number"
                            required
                            min={0}
                            step={0.1} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select
                            ref={budgetIdRef}
                            defaultValue={defaultBudgetId}
                        >
                            <option value={UNCATEGURIZED_BUDGET_ID}>Uncategorized</option>
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
