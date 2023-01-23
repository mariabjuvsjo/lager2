import { render } from '@testing-library/react-native'
import Stock from '../componets/Stock'

jest.mock("../componets/StockList", () => "StockList");

test('Header should exist containing Produkter ', async () => {
    const { getByText } = render(<Stock />);

    const header = await getByText('Produkter')

    expect(header).toBeDefined();
})