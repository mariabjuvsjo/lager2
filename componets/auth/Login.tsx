import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import Auth from "../../interfaces/auth";
import authModel from "../../models/auth";
import AuthFields from "./AuthFields";





export default function Login({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {

        console.log(auth)
        if (auth.email && auth.password) {
            const result = await authModel.login(auth.email, auth.password)

            if (result.type === "success") {
                setIsLoggedIn(true);
            }

            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            })

        } else {
            showMessage({
                message: "Fel angett",
                description: "antingen epost eller lösenord saknas",
                type: "warning"
            })
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