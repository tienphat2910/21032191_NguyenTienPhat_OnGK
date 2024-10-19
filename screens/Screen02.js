import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView,
    TextInput,
    StyleSheet,
    Modal,
} from 'react-native';

const Screen02 = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [productList, setProductList] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('Best Sales');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 1, type: 'Smart Phone', image: require("../assets/Data/smart.png"), backgroundColor: '#dbcaf6' },
        { id: 2, type: 'Ipad', image: require("../assets/Data/ipad.png"), backgroundColor: '#c5d1f7' },
        { id: 3, type: 'MacBook', image: require("../assets/Data/macbook.png"), backgroundColor: '#f8d8bf' },
    ];

    const [categoryType, setCategoryType] = useState("Smart Phone");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const api = `https://6713be4d690bf212c75f99fe.mockapi.io/gkapi/products`;

        try {
            setIsLoading(true);
            const response = await fetch(api);
            const json = await response.json();
            setProductList(json);
            console.log(json);
        } catch (error) {
            console.log(error);
            alert('Error', 'Cannot fetch account data at the moment. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredProducts = productList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleAddToCart = (item) => {
        const cartItem = { ...item, quantity };
        setCartItems((prevItems) => [...prevItems, cartItem]);
        setModalVisible(false);
        navigation.navigate('Screen03', { cartItems: [...cartItems, cartItem] });
    };

    const handleOpenModal = (item) => {
        setSelectedProduct(item);
        setModalVisible(true);
    };

    const totalCartPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const imageSources = {
        leftArrow: require('../assets/Data/left-arrow.png'),
        cart: require('../assets/Data/cart.png'),
        home: require('../assets/Data/clarity_home-solid.png'),
        search: require('../assets/Data/search.png'),
        favorites: require('../assets/Data/mdi_heart-outline.png'),
        inbox: require('../assets/Data/solar_inbox-outline.png'),
        account: require('../assets/Data/codicon_account.png'),
        sort: require('../assets/Data/sort.png'),

    };

    const footerLabels = ['Home', 'Search', 'Favorites', 'Inbox', 'Account'];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerIcon}>
                <TouchableOpacity onPress={() => navigation.navigate('Screen01')}>
                    <Image source={imageSources.leftArrow} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={imageSources.cart} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerContainer}>
                <View style={styles.searchContainer}>
                    <Image source={imageSources.search} style={styles.searchIcon} />
                    <TextInput style={{
                        flex: 1,
                        height: 40,
                        outline: 'none'
                    }} placeholder='Search' value={searchQuery} onChangeText={text => setSearchQuery(text)} />
                </View>
                <TouchableOpacity>
                    <Image source={imageSources.sort} style={styles.icon} />
                </TouchableOpacity>
            </View>

            <View>
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryTitle}>Categories</Text>
                    <Text>See all</Text>
                </View>
            </View>

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <View style={styles.categoryList}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={{
                                    borderWidth: categoryType === category.type ? 2 : 0,
                                    paddingHorizontal: 11,
                                    paddingVertical: 5,
                                    borderColor: categoryType === category.type ? '#fd70fd' : 'rgba(255,255,255,0)',
                                    backgroundColor: category.backgroundColor,
                                }}
                                onPress={() => {
                                    setCategoryType(category.type);
                                    setSelectedLabel("Best Sales");
                                    setShowAll(false);
                                }}>
                                <Image source={category.image} style={styles.categoryImage} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.bestChoiceContainer}>
                        {['Best Sales', 'Best Matches', 'Popular'].map((label) => (
                            <TouchableOpacity
                                key={label}
                                style={{
                                    backgroundColor: selectedLabel === label ? '#80d3e3' : '#f8f9f9',
                                    padding: 15,
                                    borderRadius: 10,
                                }}
                                onPress={() => {
                                    setSelectedLabel(label);
                                    setShowAll(false);
                                }}>
                                <Text style={{
                                    color: selectedLabel === label ? '#032c62' : '#b5b6bb',
                                    fontWeight: selectedLabel === label ? 'bold' : 'normal',
                                }}>{label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <FlatList
                        data={searchQuery.length > 0
                            ? filteredProducts
                            : showAll
                                ? productList.filter((item) => item.category === categoryType) // Hiển thị tất cả sản phẩm trong loại danh mục
                                : productList.filter((item) => item.category === categoryType && item.labels.includes(selectedLabel)).slice(0, 3)}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.productContainer}
                                onPress={() => handleOpenModal(item)}>
                                <View style={styles.productInfo}>
                                    <Image source={{ uri: item.image }} style={styles.productImage} />
                                    <View>
                                        <Text style={styles.productName}>{item.name}</Text>
                                        <Image source={require("../assets/Data/Rating5.png")} />
                                    </View>
                                </View>
                                <View style={styles.priceContainer}>
                                    <TouchableOpacity onPress={() => handleOpenModal(item)}>
                                        <Image source={require("../assets/Data/add.png")} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>
                                        ${item.price}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />




                </View>
            )}

            <View>
                <TouchableOpacity
                    style={styles.seeAllButton}
                    onPress={() => setShowAll((prev) => !prev)}>
                    <Text style={styles.seeAllText}>{showAll ? 'Hide' : 'See All'}</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.bannerContainer}>
                <Image source={require("../assets/Data/banner.png")} style={styles.bannerImage} />
            </View>

            <View style={styles.footer}>
                {footerLabels.map((label, index) => (
                    <View key={index} style={styles.footerItem}>
                        <Image source={imageSources[label.toLowerCase()]} />
                        <Text style={{ color: '#09c7c7' }}>{label}</Text>
                    </View>
                ))}
            </View>

            {selectedProduct && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Select Quantity</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                                    <Text style={styles.quantityButton}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{quantity}</Text>
                                <TouchableOpacity onPress={() => setQuantity((prev) => prev + 1)}>
                                    <Text style={styles.quantityButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.addToCartButton}
                                onPress={() => handleAddToCart(selectedProduct)}>
                                <Text style={styles.addToCartText}>Add to Cart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeModalText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    headerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    searchIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },

    icon: {
        width: 24,
        height: 24,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: "600",
    },
    categoryList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    categoryImage: {
        width: 100,
        height: 100,
    },
    bestChoiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        borderWidth: 0.5,
        borderColor: "#999",
        marginVertical: 5,
    },
    productInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    productName: {
        marginVertical: 10,
    },
    priceContainer: {
        alignItems: 'center',
    },
    seeAllButton: {
        alignSelf: 'center',
        backgroundColor: '#f3f4f6',
        paddingVertical: 10,
        paddingHorizontal: 100,
        borderRadius: 10,
        marginTop: 10,
        width: 410,
    },
    seeAllText: {
        fontSize: 15,
        textAlign: 'center'
    },
    bannerContainer: {
        marginVertical: 20,
        marginHorizontal: 10,
    },
    bannerImage: {
        width: '100%',
        borderRadius: 10,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'end',
        justifyContent: 'space-between',
        marginHorizontal: 14,
    },
    footerItem: {
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    quantityButton: {
        fontSize: 20,
        marginHorizontal: 10,
    },
    quantityText: {
        fontSize: 20,
    },
    addToCartButton: {
        backgroundColor: '#80d3e3',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeModalText: {
        color: '#007bff',
        marginTop: 10,
    },
    cartItem: {
        marginVertical: 5,
    },
    totalPrice: {
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default Screen02;
