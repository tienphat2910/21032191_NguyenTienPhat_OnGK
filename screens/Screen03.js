import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';

const Screen03 = ({ route, navigation }) => {
    const { cartItems: initialCartItems } = route.params;
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [modalVisible, setModalVisible] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const totalCartPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handlePayment = () => {
        setIsPaymentSuccessful(true);
        setModalVisible(false);
        setCartItems([]);
        navigation.goBack();
    };

    const handleRefreshCart = () => {
        setCartItems([]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ Hàng</Text>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image source={item.image} style={styles.productImage} />
                        <View style={styles.itemDetails}>
                            <Text>{item.name}</Text>
                            <Text>Số lượng: {item.quantity}</Text>
                            <Text>Giá: ${item.price}</Text>
                            <Text>Thành tiền: ${item.price * item.quantity}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <Text style={styles.totalPrice}>Tổng: ${totalCartPrice}</Text>

            <TouchableOpacity
                style={styles.paymentButton}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Thanh Toán</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.refreshButton}
                onPress={handleRefreshCart}>
                <Text style={styles.buttonText}>Làm Mới Giỏ Hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Quay lại</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true} é
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Thanh toán số tiền ${totalCartPrice} thành công!</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handlePayment}>
                            <Text style={styles.buttonText}>Quay lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    totalPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 20,
    },
    paymentButton: {
        backgroundColor: '#80d3e3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    refreshButton: {
        backgroundColor: '#f39c12',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: '#bfbfbf',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButton: {
        marginTop: 20,
        backgroundColor: '#80d3e3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default Screen03;
