
import { View, Text, TextInput, Button } from "react-native";


export default function AuthFields({ auth, setAuth, title, submit, navigation }) {
    return (
        <View >
            <Text>{title}</Text>
            <Text >E-post</Text>
            <TextInput
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text>Lösenord</Text>
            <TextInput
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
            />
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
            />
            {title === "Logga in" &&
                <Button
                    title="Registrera dig"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }
        </View>
    );
};