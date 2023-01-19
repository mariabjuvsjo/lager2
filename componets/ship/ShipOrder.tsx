import { SafeAreaView, ScrollView, View, Text, Button, StyleSheet, Pressable } from "react-native";
import { Base, Typography } from '../../styles'
import { useState, useEffect } from "react";

import { Marker } from "react-native-maps";
import MapView from "react-native-maps";

import getCoordinates from "../../models/nominatim";
import * as Location from 'expo-location'


import orders from '../../models/orders'

import { useRef } from "react";


export default function ShipOrder({ route }) {
    const { order } = route.params;
    console.log(order)

    const [marker, setMarker] = useState(null)
    const [locationMarker, setLocationMarker] = useState(null)
    const [errorMess, setErrorMess] = useState('')

    const map = useRef(null);

    useEffect(() => {
        (async () => {
            const result = await getCoordinates(`${order.address}, ${order.city}`);
            console.log('hej')
            console.log(result)
            setMarker(<Marker
                identifier={'mk1'}
                coordinate={{ latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon) }
                }
                title={result[0].display_name}

            />)
        })();
    }, []);


    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMess('Permission to access location was denied');
                console.log(errorMess)
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({})

            setLocationMarker(<Marker
                identifier={'mk2'}
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title='current position'
                pinColor="blue"
            />);

        })();
    }, [])

    function fitMarkers() {
        if (map?.current && marker) {
            map.current.fitToSuppliedMarkers(['mk1', 'mk2'], {
                edgePadding:
                {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50
                }

            })
        }
    }


    return (

        <ScrollView style={Base.basic}>
            <Text style={Typography.header3}>Karta över vart produkter ska skickas</Text>
            <View style={styles.container} >
                <MapView
                    ref={map}

                    key={marker}
                    style={styles.map}
                    onMapReady={fitMarkers}
                    onMapLoaded={fitMarkers}
                >
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
            <View style={Base.prod}>
                <Text style={Typography.p}>Order Detaljer: </Text>
                <Text style={Typography.p}>{order.name}</Text>

                <Text style={Typography.p}>{order.address}</Text>
                <Text style={Typography.p}>{order.zip} {order.city}</Text>
                <Text style={Typography.p}>{order.country}</Text>
            </View>
        </ScrollView >




    )
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        justifyContent: "flex-end",
        alignItems: "center"



    },
    map: {
        ...StyleSheet.absoluteFillObject,
        margin: 10

    },
});