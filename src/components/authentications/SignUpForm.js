import React, { Component, PropTypes } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Text, View } from 'react-native-animatable'
import DatePicker from 'react-native-datepicker'
import RadioButton from 'radio-button-react-native'

import CustomButton from "../../components/customes/CustomButton";
import CustomTextInput from "../../components/customes/CustomeTextInput";
import metrics from "../../config/metrics";
import validateEmail from './ValidateEmail'

export default class SignupForm extends Component {
  state = {
    email: '',
    password: '',
    comfirmPassword: '',
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

  CheckComfirmPassword(password, comfirmPassword) {
    if (password === comfirmPassword) {
      return true
      return false
    }
  }
  render() {
    const { email, password, comfirmPassword } = this.state
    const { isLoading, onLoginLinkPress, onNextCreate } = this.props

    const isValid = email !== '' && password !== '' && comfirmPassword !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => this.formRef = ref}>
          <CustomTextInput
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'next'}
            secureTextEntry={true}
            withRef={true}
            onSubmitEditing={() => this.comfirmpasswordInputRef.focus()}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.comfirmpasswordInputRef = ref}
            placeholder={'Confirm password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ comfirmPassword: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => {
                if (!validateEmail(email)) {
                  alert("Email not correct!")
                }
                else
                  if (!this.CheckComfirmPassword(password, comfirmPassword)) {
                    alert("Comfirm Password not match!")
                  }
                  else {
                    AsyncStorage.setItem('@EmailCreate', email);
                    AsyncStorage.setItem('@PasswordCreate', password);
                    onNextCreate();
                  }
              }}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={'Next Step'}
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
    justifyContent: 'center'
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