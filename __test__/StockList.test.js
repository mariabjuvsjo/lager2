import { render } from '@testing-library/react-native';
import StockList from '../componets/StockList';

const products = [
    { name: "Shampoo", stock: 2 },
    { name: "Balsam", stock: 3 },
    { name: "Inpackning", stock: 20 }

]

const setProducts = () => false;

test('List should contain three items', async () => {
    const { getByText } = render(<StockList products={products} setProducts={setProducts} />);

    const shampoo = await getByText('Shampoo', { exact: false })

    const conditioner = await getByText('Balsam', { exact: false })

    const leavein = await getByText('Inpackning', { exact: false })

    expect(shampoo).toBeDefined();
    expect(conditioner).toBeDefined();
    expect(leavein).toBeDefined();
})