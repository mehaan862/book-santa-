import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import db from '../config';
//import LottieScreen from '../Components/LottieScreen';

export default class WelcomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            passsword: '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: '',
            isModalVisible: 'false',
        }
    }
    showModal = () => {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                            <Text style={styles.modalTitle}>Sign Up</Text>
                            <TextInput
                                styles={styles.signUpInput}
                                placeholder={'First Name'}
                                maxLength={8}
                                onChangeText={(text) => { this.setState({ firstName: text }) }}
                            />
                            <TextInput
                                styles={styles.signUpInput}
                                placeholder={'Last Name'}
                                maxLength={8}
                                onChangeText={(text) => { this.setState({ lastName: text }) }}
                            />

                            <TextInput
                                styles={styles.signUpInput}
                                placeholder={'Address'}
                                multiline={true}
                                onChangeText={(text) => { this.setState({ address: text }) }}
                            />

                            <TextInput
                                styles={styles.signUpInput}
                                placeholder={'Contact'}
                                maxLength={12}
                                keyboardType={'numeric'}
                                onChangeText={(text) => { this.setState({ contact: text }) }}
                            />

                            <TextInput
                                styles={styles.signUpInput}
                                placeholder={'Email'}
                                keyboardType={'email-address'}
                                onChangeText={(text) => { this.setState({ emailId: text }) }}
                            />

                            <TextInput
                                styles={styles.signUpInput}
                                placeholder={'Password'}
                                secureTextEntry={true}
                                onChangeText={(text) => { this.setState({ password: text }) }}
                            />

                            <TextInput
                                styles={styles.signUpInput}
                                placeholder={'Confirm Password'}
                                secureTextEntry={true}
                                onChangeText={(text) => { this.setState({ confirmPassword: text }) }}
                            />

                            <View>
                                <TouchableOpacity
                                    style={styles.signUpButton}
                                    onPress={() =>
                                        this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                    }>
                                    <Text>Sign Up</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity
                                    style={styles.signUpButton}
                                    onPress={() =>
                                        this.setState({ "isModalVisible": false })
                                    }>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }





    userLogin = (emailId, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(emailId, password)
            .then(() => {
                this.props.navigation.navigate('DonateBooks')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            })
    }

    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("password doesn't match\nCheck your password.")
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
                .then(() => {
                    db.collection('users').add({
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        contact: this.state.contact,
                        email_id: this.state.emailId,
                        address: this.state.address
                    })
                    return Alert.alert(
                        'User Added Successfully',
                        '',
                        [
                            { text: 'OK', onPress: () => this.setState({ "isModalVisible": false }) },
                        ]
                    );
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage)
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    {/*<LottieScreen />*/}
                    <Text style={styles.title}>Book Santa</Text>
                </View>
                {this.showModal()}
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={styles.signInBox}
                        placeholder='xyz@example.com'
                        placeholderTextColor='#FFFFFF'
                        keyboardType='email-address'
                        onChangeText={(text) => { this.setState({ emailId: text }) }}
                    />

                    <TextInput
                        style={styles.signInBox}
                        placeholder='password'
                        secureTextEntry={true}
                        placeholderTextColor='#FFFFFF'
                        onChangeText={(text) => { this.setState({ password: text }) }}
                    />

                    <TouchableOpacity
                        style={[styles.button, { marginTop: 20, marginBottom: 20 }]}
                        onPress={() => { this.userLogin(this.state.emailId, this.state.password) }}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => this.setState({ isModalVisible: true })}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00FFEC',
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold',
        paddingBottom: 30,
        color: '#1700FF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    signInBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: '#0061FF',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#0046FF',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 25
    },
    buttonText: {
        color: '#FFFF',
        fontWeight: '300',
        fontSize: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#0078FF',
        marginTop: 80,
        marginBottom: 80,
        marginLeft: 30,
        marginRight: 30,
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        margin: 50,
        color: '#1700FF',
    },
    signUpInput: {
        alignSelf: 'center',
        width: '75%',
        height: 50,
        borderRadius: 12,
        borderWidth: 2,
        marginTop: 20,
        padding: 12,
        borderColor: '#00FFE0',
    },
    signUpButton: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
    }
})
