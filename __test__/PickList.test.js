import { render } from '@testing-library/react-native';
import PickList from '../componets/orders/PickList';

const order = {
    name: "maria", address: "sanda", zip: "62379", city: "klintehamn", order_items: [
        { name: "hallon", amount: 30, location: "rad 3", stock: 11 }
    ]
}

const setProducts = () => false;

const route = {
    params: {
        order: order
    }
};

test('Check to see if Picklist returns right information about the order and have the right structure', async () => {
    const { getByText } = render(<PickList route={route} setProducts={setProducts} />);

    const name = await getByText('maria', { exact: false })
    const address = await getByText('sanda')
    const orderItems = await getByText(`hallon - 30 - rad 3`);

    expect(name).toBeDefined();
    expect(address).toBeDefined()
    expect(orderItems).toBeDefined();

})