import { useState } from "react";
import Auth from "../../interfaces/auth";
import authModel from "../../models/auth";
import AuthFields from "./AuthFields";




export default function Login({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await authModel.login(auth.email, auth.password)
            console.log('hello')
            setIsLoggedIn(true);
        }
    }
    return (

        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    );
};