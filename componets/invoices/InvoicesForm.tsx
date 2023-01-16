// del av components/DeliveriesList.tsx
import { Platform, ScrollView, View, Text, TextInput, Button, Pressable } from "react-native";
import { Base, Typography, Forms } from '../../styles'
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Delivery from "../../interfaces/delivery";
import Product from "../../interfaces/products";
import productModel from "../../models/products";
import deliveryModel from "../../models/deliveries";
import orders from "../../models/orders";
import Invoice from "../../interfaces/invoice";
import Order from "../../interfaces/orders";
import invoiceModel from "../../models/invoices";
import config from "../../config/config.json";

function zeroPad(number: number): string {

    if (number < 10) {
        return "0" + number;

    }

    return "" + number;

}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroPad((date.getMonth() + 1))}-${zeroPad(date.getDate())}`
}

function OrderDropDown(props) {
    const [order, setOrder] = useState<Order[]>([]);

    async function fetchDocs() {
        setOrder(await orders.getOrders());

    }

    useEffect(() => {

        fetchDocs()

    }, []);

    const orderList = order.filter(order => order.status_id < 600).map((order, index) => {
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoices?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoices({ ...props.invoices, order_id: itemValue });

            }}>
            {orderList}
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

                        props.setInvoices({
                            ...props.invoices,
                            creation_date: formatDate(date),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function InvoicesForm({ navigation }) {
    const [invoices, setInvoices] = useState<Partial<Invoice>>({});

    async function createInvoice() {

        let updatee = invoices.order_id

        let ord = await orders.getOrder(updatee)



        let changedOrder = {
            id: ord.id,
            name: ord.name,
            status_id: 600,
            api_key: config.api_key
        }

        let res = await orders.updateOrder(changedOrder)


        await invoiceModel.createInvoice(invoices)

        navigation.navigate('List', { reload: true })

    }


    return (
        <ScrollView>
            <Text>Ordrar</Text>
            <OrderDropDown
                invoices={invoices}
                setInvoices={setInvoices} />
            <Text>Faktura Datum</Text>
            <DateDropDown
                invoices={invoices}
                setInvoices={setInvoices} />
            <Button
                title="Skapa faktura"
                onPress={() => {
                    createInvoice()
                }} />
        </ScrollView>

    )
};