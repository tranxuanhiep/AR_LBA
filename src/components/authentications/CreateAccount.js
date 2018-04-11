import React, { Component, PropTypes } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Text, View } from 'react-native-animatable'
import DatePicker from 'react-native-datepicker'
import RadioButton from 'radio-button-react-native'

import CustomButton from "../../components/customes/CustomButton";
import CustomTextInput from "../../components/customes/CustomeTextInput";
import metrics from "../../config/metrics";

export default class CreateAccount extends Component {
    state = {
        Firstname: '',
        Lastname: '',
        date: "2016-05-15",
        value: null
    }
    handleOnPress(value) {
        this.setState({
            value: value
        });
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
        const { Firstname, Lastname, date, value } = this.state
        const { isLoading, onLoginLinkPress, onSignupPress } = this.props
        const isValid = Firstname !== '' && Lastname !== '' && date !== '' && value !== null
        return (
            <View style={styles.container}>
                <View style={styles.form} ref={(ref) => this.formRef = ref}>
                    <CustomTextInput
                        ref={(ref) => this.firstnameInputRef = ref}
                        placeholder={'First name'}
                        editable={!isLoading}
                        returnKeyType={'next'}
                        withRef={true}
                        onSubmitEditing={() => this.lastnameInputRef.focus()}
                        onChangeText={(value) => this.setState({ Firstname: value })}
                        isEnabled={!isLoading}
                    />
                    <CustomTextInput
                        ref={(ref) => this.lastnameInputRef = ref}
                        placeholder={'Last name'}
                        editable={!isLoading}
                        returnKeyType={'done'}
                        withRef={true}
                        onChangeText={(value) => this.setState({ Lastname: value })}
                        isEnabled={!isLoading}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }} >
                        <DatePicker
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="1900-01-01"
                            maxDate="2018-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => { this.setState({ date: date }) }}
                            iconSource={require('../../images/DateofBirth.png')}
                        />
                        <RadioButton
                            currentValue={this.state.value} value={1}
                            onPress={this.handleOnPress.bind(this)}
                            outerCircleColor='white'
                            outerCircleSize={15}
                            outerCircleWidth={1}
                            innerCircleColor='white'
                            innerCircleSize={11}
                        />
                        <Text style={styles.textGender}> Male </Text>
                        <RadioButton
                            currentValue={this.state.value} value={0}
                            onPress={this.handleOnPress.bind(this)}
                            outerCircleColor='white'
                            outerCircleSize={15}
                            outerCircleWidth={1}
                            innerCircleColor='white'
                            innerCircleSize={11}
                        />
                        <Text style={styles.textGender}> Female </Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                        <CustomButton
                            onPress={async () => {
                                const Email = await AsyncStorage.getItem('@EmailCreate');
                                const Password = await AsyncStorage.getItem('@PasswordCreate');
                                const TypeCode = 'createAccount';
                                AsyncStorage.setItem('@TypeCode', TypeCode);
                                onSignupPress(Email, Password, Firstname, Lastname, date, value);
                            }}
                            isEnabled={isValid}
                            isLoading={isLoading}
                            buttonStyle={styles.createAccountButton}
                            textStyle={styles.createAccountButtonText}
                            text={'Create Account'}
                        />
                    </View>
                    <Text
                        ref={(ref) => this.linkRef = ref}
                        style={styles.loginLink}
                        onPress={onLoginLinkPress}
                        animation={'fadeIn'}
                        duration={600}
                        delay={400}
                    >
                        {'Already have an account?'}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: metrics.DEVICE_WIDTH * 0.1,
    },
    form: {
        marginTop: 20
    },
    footer: {
        height: 100,
        justifyContent: 'center',
        marginTop: 10
    },
    createAccountButton: {
        backgroundColor: 'white'
    },
    createAccountButtonText: {
        color: '#3E464D',
        fontWeight: 'bold'
    },
    loginLink: {
        color: 'rgba(255,255,255,0.6)',
        alignSelf: 'center',
        padding: 20
    }
})
