
interface Invoice {
    id: number
    order_id: number
    total_price: number
    due_date: string
    name: string
    api_key: string
    creation_date: string
}

export default Invoice