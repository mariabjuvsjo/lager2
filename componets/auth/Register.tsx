import Auth from '../../interfaces/auth';
import { useState } from 'react';
import authModel from '../../models/auth';
import AuthFields from './AuthFields';

import { showMessage } from 'react-native-flash-message';

export default function Register({ navigation }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});




    async function doReg() {
        const patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        const patternPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/

        if (!auth.email?.match(patternEmail)) {
            showMessage({
                message: "Icke giltigt email",
                description: "skriv in en giltig email",
                type: "warning"
            })
            return

        }

        if (!auth.password?.match(patternPass)) {
            showMessage({
                message: "Icke giltigt Lösenord",
                description: "Lösenordet måste va minst 4 tecken, stor bokstav, specialtecken",
                type: "warning"
            })
            return

        }


        if (auth.email && auth.password) {
            const result = await authModel.register(auth.email, auth.password);
            navigation.navigate("Login");
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
            submit={doReg}
            title="Registrera"
            navigation={navigation}
        />
    );
};
