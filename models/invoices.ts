import Invoice from "../interfaces/invoice";
import config from "../config/config.json";
import storage from './storage'
import orders from './orders'
import Invoices from "../componets/invoices/Invoices";


const invoiceModel = {

    getInvoices: async function getInvoices() {

        let myToken: any = await storage.readToken()

        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': myToken.token
            }
        });

        const result = await response.json()

        return result.data


    },
    createInvoice: async function createInvoice(invoice: Partial<Invoice>) {

        let order = await orders.getOrder(invoice.order_id)


        let total = order.order_items.reduce((price, item) => {
            return price + item.amount * item.price;
        }, 0);


        let stringDate = String(invoice.creation_date)
        let dueDate = new Date(stringDate);
        dueDate.setDate(dueDate.getDate() + 30);

        invoice.due_date = dueDate.toLocaleDateString('se-SV')

        invoice.total_price = total;

        invoice.api_key = config.api_key

        const myToken: any = await storage.readToken()

        const response = await fetch(`${config.base_url}/invoices`, {
            body: JSON.stringify(invoice),
            headers: {
                'content-type': 'application/json',
                'x-access-token': myToken.token
            },
            method: 'POST'
        });

        const docs = await response.json();

    }

};

export default invoiceModel;