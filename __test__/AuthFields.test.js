import { render, fireEvent } from '@testing-library/react-native'
import AuthFields from '../componets/auth/AuthFields';

let auth = {};

const setAuth = (newAuth) => {
    auth = newAuth;
};

const mockSubmit = jest.fn();

const navigation = () => false;

test('test authfield for login ', async () => {
    const title = "Logga in";
    const { getAllByText, getByTestId, getByA11yHint } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);

    const titleElements = await getAllByText(title)

    expect(titleElements.length).toBe(2)
    expect(titleElements).toBeDefined();

    const emailField = await getByTestId("email-field")

    expect(emailField).toBeDefined()

    const passField = await getByTestId("password-field")

    expect(passField).toBeDefined()

    const fakeEmail = "maria@gmail.com";

    fireEvent.changeText(emailField, fakeEmail)

    expect(auth?.email).toEqual(fakeEmail)

    const fakePassword = "mmmmmmammmmmmmmaaaa";
    fireEvent.changeText(passField, fakePassword);
    expect(auth?.password).toEqual(fakePassword);

    const a11yHint = `${title} genom att trycka`;
    const submitButton = await getByA11yHint(a11yHint);

    expect(submitButton).toBeDefined();

    fireEvent.press(submitButton);
    expect(mockSubmit).toHaveBeenCalled();



})