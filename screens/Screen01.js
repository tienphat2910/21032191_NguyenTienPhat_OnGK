import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

const Screen01 = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('user1@example.com');
    const [password, setPassword] = useState('123456');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetch('https://6713be4d690bf212c75f99fe.mockapi.io/gkapi/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleLogin = () => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            navigation.navigate('Screen02');
        } else {
            setErrorMessage('Thông tin đăng nhập không chính xác');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.logo}>
                <Image style={styles.icon} source={require('../assets/Data/icon.png')} />
                <Text style={styles.greetingText}>Hello Again!</Text>
                <Text style={styles.loginText}>Log into your account</Text>
            </View>
            <View style={styles.loginFormContainer}>
                <View style={styles.loginFormEmail}>
                    <Image source={require('../assets/Data/Vector.png')} />
                    <TextInput
                        style={{
                            fontSize: 16,
                            marginLeft: 10,
                            height: '100%',
                            flex: 1,
                            outline: 'none',
                        }}
                        placeholder='Enter your email address'
                        placeholderTextColor="#9b9b9b"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <Text style={styles.errorText}>{errorMessage}</Text>

                <View style={styles.loginFormPassword}>
                    <Image source={require('../assets/Data/lock.png')} />
                    <TextInput
                        style={{
                            fontSize: 16,
                            marginLeft: 10,
                            height: '100%',
                            flex: 1,
                            outline: 'none',
                        }}
                        placeholder='Enter your password'
                        placeholderTextColor="#9b9b9b"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={require('../assets/Data/eye.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <View style={styles.line}>
                    <View style={styles.lineSegment}></View>
                    <Text style={styles.footerText}>Or</Text>
                    <View style={styles.lineSegment}></View>
                </View>
                <View style={styles.footerIcon}>
                    <Image source={require('../assets/Data/google.png')} style={styles.iconStyle} />
                    <Image source={require('../assets/Data/face.png')} style={styles.iconStyle} />
                    <Image source={require('../assets/Data/apple.png')} style={styles.iconStyle} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        flexDirection: 'column',
        marginTop: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    greetingText: {
        marginTop: 20,
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loginText: {
        fontSize: 20,
        color: '#bfbfbf',
        marginBottom: 20,
    },
    loginFormEmail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: 370,
        marginLeft: 10,
        height: 50,
    },
    loginFormPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: 370,
        marginLeft: 10,
        height: 50,
    },
    forgotPasswordText: {
        color: 'blue',
        justifyContent: 'flex-end',
        display: 'flex',
        marginRight: 10,
        fontSize: 16,
    },
    button: {
        width: 370,
        height: 50,
        padding: 10,
        marginLeft: 10,
        marginTop: 20,
        backgroundColor: 'rgb(34, 200, 247)',
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    lineSegment: {
        width: 150,
        height: 1,
        backgroundColor: '#bfbfbf',
        marginHorizontal: 10,
    },
    footerText: {
        fontSize: 16,
        color: '#bfbfbf',
    },
    footerIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    iconStyle: {
        marginHorizontal: 10,
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginLeft: 10,
        marginBottom: 10,
    },
});

export default Screen01;
