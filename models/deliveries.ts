import config from "../config/config.json";
import Delivery from "../interfaces/delivery";

const deliveryModel = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data


    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
        const response = await fetch(`${config.base_url}/deliveries`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: delivery.product_id,
                amount: delivery.amount,
                delivery_date: delivery.delivery_date,
                api_key: config.api_key,
                comment: delivery.comment
            })
        })

        const deliv = await response.json()

        console.log(deliv)


    }
};

export default deliveryModel;