
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import { currencyFormatter } from '../utils'
export default function BudgetCard({
    name,
    amount,
    max,
    gray,
    hideButtons,
    onViewExpensesClick,
    onAddExpenseClick }) {
    const classNames = [];
    if (amount > max) {
        classNames.push("bg-danger", "bg-opacity-10")
    } else if (gray) {
        classNames.push("bg-light");
    }
    return (
        <div>
            <Card>
                <Card.Body className={classNames.join(" ")}>
                    <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                        <div className='me-2'>{name}</div>
                        <div className='d-flex align-items-baseline'>{currencyFormatter.format(amount)}
                            {max && <span className='text-muted fs-6 ms-1'> / {currencyFormatter.format(max)}</span>}
                        </div>
                    </Card.Title>
                    {max && <ProgressBar className='rounded-pill'
                        variant={getProgressBarVariant(amount, max)}
                        min={0}
                        max={max}
                        now={amount}
                    ></ProgressBar>}
                    {!hideButtons && <Stack direction='horizontal' gap={2} className='mt-4'>
                        <Button
                            variant='outline-primary'
                            className='ms-auto'
                            onClick={onAddExpenseClick}>Add Expense</Button>
                        <Button onClick={onViewExpensesClick} variant='outline-secondary'>View Expense</Button>
                    </Stack>}
                </Card.Body>
            </Card>
        </div>
    )
}
var getProgressBarVariant = (amount, max) => {
    if (amount / max < 0.5) return 'primary'
    if (amount / max < 0.75) return 'warning'
    return 'danger'
}