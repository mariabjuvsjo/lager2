// del av components/DeliveriesList.tsx
import { Platform, ScrollView, View, Text, TextInput, Button, Pressable } from "react-native";
import { Base, Typography, Forms } from '../styles'
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Delivery from "../interfaces/delivery";
import Product from "../interfaces/products";
import productModel from "../models/products";
import deliveryModel from "../models/deliveries";


function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    async function fetchDocs() {
        setProducts(await productModel.getProducts());

    }

    useEffect(() => {

        fetchDocs()

    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Pressable onPress={showDatePicker} style={Base.btn} ><Text style={Base.btnText}>Välj Datum</Text></Pressable>
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);
        setProducts(await productModel.getProducts());

        navigation.navigate("List", { reload: true });
    }
    return (
        <ScrollView  >
            <Text style={Typography.header3}>Ny Inleverans:</Text>

            <Text style={Typography.header3}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={Typography.header3}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery} />

            <Text style={Typography.header3}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={Typography.header3}>Kommentar</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Pressable style={Base.btn} onPress={addDelivery}><Text style={Base.btnText}>Gör inleverans</Text></Pressable>



        </ScrollView>
    )
};