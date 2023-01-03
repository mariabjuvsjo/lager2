import config from "../config/config.json";
import Order from "../interfaces/orders";
import OrderItem from "../interfaces/order_item";
import products from "./products";


let orderReq = `${config.base_url}/orders?api_key=${config.api_key}`;
const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(orderReq);
        const result = await response.json();

        return result.data


    },

    pickOrder: async function pickOrder(order: Partial<Order>) {
        await Promise.all(order.order_items.map(async (order_item:
            Partial<OrderItem>) => {
            let changedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
                api_key: config.api_key
            };
            await products.updateProduct(changedProduct);



        }));

        let changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key,
        }

        await orders.updateOrder(changedOrder)
        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern

        // TODO: Ändra status för ordern till packad
    },
    updateOrder: async function updateOrder(order: Partial<Order>) {
        await fetch(orderReq, {
            body: JSON.stringify(order),
            headers: {
                'content-type': 'application/json'

            },
            method: 'PUT'
        })

    }


};

export default orders;