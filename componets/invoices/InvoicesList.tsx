// del av components/DeliveriesList.tsx
import { SafeAreaView, ScrollView, View, Text, Button, StyleSheet, Pressable } from "react-native";
import { Base, Typography } from '../../styles'
import { useState, useEffect } from "react";
import deliveryModel from "../../models/deliveries";
import Delivery from "../../interfaces/delivery";
import authModel from "../../models/auth";
import storage from "../../models/storage";
import { DataTable } from "react-native-paper";
import Invoice from "../../interfaces/invoice";
import invoiceModel from "../../models/invoices";

export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;

    const [invoices, setInvoices] = useState<Invoice[]>([])

    async function reloadInvoices() {
        setInvoices(await invoiceModel.getInvoices())

    }

    if (reload) {
        reloadInvoices()
    }

    useEffect(() => {
        reloadInvoices()

    }, [])

    async function logOut() {
        await storage.deleteToken()
        setIsLoggedIn(false)

    }

    const invoiceData = invoices.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
                <DataTable.Cell>{invoice.total_price}</DataTable.Cell>
            </DataTable.Row>
        )

    })


    return (
        <ScrollView>
            <Text>Fakturor</Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title>Förfallodag</DataTable.Title>
                    <DataTable.Title>Total Belopp</DataTable.Title>
                </DataTable.Header>
                {invoiceData}
            </DataTable>
            <Button
                title="Skapa Faktura"
                onPress={() => {
                    navigation.navigate('Form')
                }}
            />
            <Button
                title="Logga Ut"
                onPress={async () => {
                    await logOut()
                }}
            />


        </ ScrollView>

    )
};

