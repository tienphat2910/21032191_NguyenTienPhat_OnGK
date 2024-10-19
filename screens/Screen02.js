import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View, FlatList, ScrollView, TextInput, StyleSheet } from 'react-native';

const Screen02 = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [categories] = useState([
        {
            id: 1,
            type: 'Smart Phone',
            image: require("../assets/Data/smart.png"),
            backgroundColor: '#dbcaf6',
        },
        {
            id: 2,
            type: 'Ipad',
            image: require("../assets/Data/ipad.png"),
            backgroundColor: '#c5d1f7',
        },
        {
            id: 3,
            type: 'MacBook',
            image: require("../assets/Data/macbook.png"),
            backgroundColor: '#f8d8bf',
        },
    ]);

    const [categorieselected, setCategoriesSelected] = useState(categories[0]);
    const [type, setType] = useState("Smart Phone");
    const [seeAll, setSeeAll] = useState(false);
    const [choiBesst, setchoiBesst] = useState('Best Sales');

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const api = `https://6713be4d690bf212c75f99fe.mockapi.io/gkapi/products`;

        try {
            setIsLoading(true);
            const response = await fetch(api);
            const json = await response.json();
            setListProduct(json);
            console.log(json);
        } catch (error) {
            console.log(error);
            alert('Error', 'Cannot fetch account data at the moment. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const imageSources = {
        home: require('../assets/Data/clarity_home-solid.png'),
        search: require('../assets/Data/search.png'),
        favorites: require('../assets/Data/mdi_heart-outline.png'),
        inbox: require('../assets/Data/solar_inbox-outline.png'),
        account: require('../assets/Data/codicon_account.png'),
    };

    const footerLabels = ['Home', 'Search', 'Favorites', 'Inbox', 'Account'];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.searchContainer}>
                    <TouchableOpacity>
                        <Image source={require("../assets/Data/search.png")} style={styles.icon} />
                    </TouchableOpacity>
                    <TextInput style={{ outline: 'none', height: '100%', flex: 1, width: '100%' }} placeholder='Search' />
                </View>
                <View style={styles.sortContainer}>
                    <Image source={require('../assets/Data/sort.png')} style={styles.icon} />
                </View>
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
                                    borderWidth: type === category.type ? 2 : 0,
                                    paddingHorizontal: 11,
                                    paddingVertical: 5,
                                    borderColor: type === category.type ? '#fd70fd' : 'rgba(255,255,255,0)',
                                    backgroundColor: category.backgroundColor,
                                }}
                                onPress={() => {
                                    setType(category.type);
                                    setchoiBesst("Best Sales");
                                    setSeeAll(false);
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
                                    backgroundColor: choiBesst === label ? '#80d3e3' : '#f8f9f9',
                                    padding: 15,
                                    borderRadius: 10,
                                }}
                                onPress={() => {
                                    setchoiBesst(label);
                                    setSeeAll(false);
                                }}>
                                <Text style={{
                                    color: choiBesst === label ? '#032c62' : '#b5b6bb',
                                    fontWeight: choiBesst === label ? 'bold' : 'normal',
                                }}>{label}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>

                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList
                            data={seeAll
                                ? listProduct.filter((item) => item.category === type)
                                : listProduct.filter((item) => item.category === type && item.labels.includes(choiBesst)).slice(0, 3)}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.productContainer}>
                                    <View style={styles.productInfo}>
                                        <Image source={{ uri: item.image }} style={styles.productImage} />
                                        <View>
                                            <Text style={styles.productName}>{item.name}</Text>
                                            <Image source={require("../assets/Data/Rating5.png")} />
                                        </View>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <Image source={require("../assets/Data/add.png")} />
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 10, }}>$1900</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            )}

            <View>
                <TouchableOpacity
                    style={styles.seeAllButton}
                    onPress={() => setSeeAll(!seeAll)}>
                    <Text style={styles.seeAllText}>{seeAll ? 'Hide' : 'See All'}</Text>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
    },
    searchContainer: {
        flexDirection: 'row',
        margin: 20,
        paddingVertical: 10,
        alignItems: 'center',
        paddingRight: 90,
        backgroundColor: '#f3f4f6',
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 20,
    },
    icon: {
        width: 16,
        height: 16,
        marginHorizontal: 10,
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
});

export default Screen02;
