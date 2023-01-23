
import { View, Text, TextInput, Button, Pressable } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Base, Forms, Typography } from "../../styles";


export default function AuthFields({ auth, setAuth, title, submit, navigation }) {


    return (
        <View >
            <Text style={Typography.header2}>{title}</Text>
            <Text>E-post</Text>
            <TextInput
                style={Forms.inputWhite}
                onChangeText={(content: string) => {

                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                testID="email-field"
            />
            <Text>Lösenord</Text>
            <TextInput
                style={Forms.inputWhite}
                onChangeText={(content: string) => {

                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                testID="password-field"
            />
            <Pressable onPress={() => {
                submit();
            }}
                accessibilityHint={`${title} genom att trycka`}
                style={Base.btn}>
                <Text style={Base.btnText}>{title}</Text>

            </Pressable>
            {title === "Logga in" &&
                <Pressable

                    style={Base.btn}
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                ><Text style={Base.btnText}>Registera Dig</Text></Pressable>
            }
        </View>
    );
};