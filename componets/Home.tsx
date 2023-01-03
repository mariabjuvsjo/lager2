import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './Stock';
import { Typography } from '../styles';
import { Base } from '../styles';



export default function Home({ products, setProducts }) {


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ padding: 15 }}>
                <Text style={Typography.header2} >Lager Appen!</Text>
                <Image source={require("../assets/skrew.png")} style={Base.imgsize} />
                <Stock products={products} setProducts={setProducts} />
                <StatusBar style="auto" />

            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252525',
    }
});