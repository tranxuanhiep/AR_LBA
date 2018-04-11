import React, { Component, PropTypes } from 'react'
import { StyleSheet, TextInput, AsyncStorage } from 'react-native'
import { Text, View } from 'react-native-animatable'
import CustomButton from "../../components/customes/CustomButton";
import CustomTextInput from "../../components/customes/CustomeTextInput";
import metrics from "../../config/metrics";

export default class EnterCode extends Component {
    state = {
        code01: '',
        code02: '',
        code03: '',
        code04: '',
        code05: '',
    }

    hideForm = async () => {
        if (this.buttonRef && this.formRef && this.linkRef) {
            await Promise.all([
                this.buttonRef.zoomOut(200),
                this.formRef.fadeOut(300),
                this.linkRef.fadeOut(300)
            ])
        }
    }
    render() {
        const { code01, code02, code03, code04, code05 } = this.state
        const { isLoading, onPressButton } = this.props
        const isValid = code01 !== '' && code02 !== '' && code03 !== '' && code04 !== '' && code05 !== ''
        return (
            <View style={styles.container}>
                <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
                    <TextInput
                        maxLength={1}
                        onChangeText={(text) => {
                            text.length === 1 ? this.mot.focus() : null,
                                this.setState({
                                    code01: text
                                })
                        }}
                        keyboardType={'numeric'}
                        style={styles.text}
                        underlineColorAndroid={'white'}
                    >
                    </TextInput>
                    <TextInput
                        maxLength={1}
                        ref={(input) => { this.mot = input }}
                        onChangeText={(text) => {
                            text.length === 1 ? this.hai.focus() : null,
                                this.setState({
                                    code02: text
                                })
                        }}
                        keyboardType={'numeric'}
                        style={styles.text}
                        underlineColorAndroid={'white'}
                    >
                    </TextInput><TextInput
                        maxLength={1}
                        ref={(input) => { this.hai = input }}
                        onChangeText={(text) => {
                            text.length === 1 ? this.ba.focus() : null,
                                this.setState({
                                    code03: text
                                })
                        }}
                        keyboardType={'numeric'}
                        style={styles.text}
                        underlineColorAndroid={'white'}
                    >
                    </TextInput><TextInput
                        maxLength={1}
                        ref={(input) => { this.ba = input }}
                        onChangeText={(text) => {
                            text.length === 1 ? this.bon.focus() : null,
                                this.setState({
                                    code04: text
                                })
                        }}
                        keyboardType={'numeric'}
                        style={styles.text}
                        underlineColorAndroid={'white'}
                    >
                    </TextInput><TextInput
                        maxLength={1}
                        ref={(input) => { this.bon = input }}
                        onChangeText={(text) => {
                            this.setState({
                                code05: text
                            })
                        }}
                        keyboardType={'numeric'}
                        style={styles.text}
                        underlineColorAndroid={'white'}
                    >
                    </TextInput>
                </View>
                <View style={styles.footer}>
                    <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                        <CustomButton
                            onPress={ async () => {
                                const code = code01 + code02 + code03 + code04 + code05;
                                const Email = await AsyncStorage.getItem('@EmailCreate');
                                AsyncStorage.setItem('@EmailCreate','')
                                onPressButton(code,Email);
                            }}
                            isEnabled={isValid}
                            isLoading={isLoading}
                            buttonStyle={styles.loginButton}
                            textStyle={styles.loginButtonText}
                            text={'Verify Email'}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
    },
    form: {
        marginTop: 20,
        flexDirection: 'row', justifyContent: 'space-between',
        marginBottom: 10
    },
    footer: {
        height: 100,
        justifyContent: 'center',
        marginBottom: 20
    },
    loginButton: {
        backgroundColor: 'white'
    },
    loginButtonText: {
        color: '#3E464D',
        fontWeight: 'bold'
    },
    signupLink: {
        color: 'rgba(255,255,255,0.6)',
        alignSelf: 'center',
    },
    forgotPassword: {
        color: 'rgba(255,255,255,0.6)',
        alignSelf: 'center',
    }
})