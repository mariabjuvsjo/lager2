import { render } from '@testing-library/react-native'
import DeliveriesList from '../componets/deliveries/DeliveriesList';



const navigation = () => false;

test('Header should exist containing Historik Inleverans', async () => {
    const { getByText } = render(<DeliveriesList navigation={navigation} />);

    const header = await getByText('Historik Inleveranser')

    expect(header).toBeDefined();
})

test('Button should exist with the label Skapa ny inleverans', async () => {
    const { getByA11yHint } = render(<DeliveriesList navigation={navigation} />);


    const a11yHint = `Skapa ny Inleverans`;
    const submitButton = await getByA11yHint(a11yHint);

    expect(submitButton).toBeDefined();


})

