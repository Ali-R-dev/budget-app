import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import BudgetCard from "./Components/BudgetCard";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import TotalBudgetCard from "./Components/TotalBudgetCard";
import AddBudgetModel from './Components/addBudgetModel'
import AddExpenseModel from './Components/addExpenseModal'
import ViewExpensesModal from './Components/viewExpensesModal'
import { useState } from "react";
import { UNCATEGURIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpense } = useBudgets()
  function openAddExpenseModel(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModel}>Add Expense</Button>
        </Stack>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}>
          {budgets.map((budget, index) => {
            const amount = getBudgetExpense(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModel(budget.id)}
              onViewExpensesClick={() => setViewExpenseModalBudgetId(budget.id)}
            />
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModel}
            onViewExpensesClick={() => setViewExpenseModalBudgetId(UNCATEGURIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModel show={showAddBudgetModal} HandleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModel
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        HandleClose={() => setShowAddExpenseModal(false)} />
      <ViewExpensesModal
        budgetId={viewExpenseModalBudgetId}
        HandleClose={setViewExpenseModalBudgetId} />
    </>
  );
}

export default App;
