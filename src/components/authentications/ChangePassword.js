import React, { Component, PropTypes } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from '../../components/customes/CustomButton'
import CustomTextInput from '../../components/customes/CustomeTextInput'
import metrics from '../../config/metrics'

export default class LoginForm extends Component {

  state = {
    newPassword: '',
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

  render() {
    const { newPassword, comfirmPassword } = this.state
    const { isLoading, onChangePasswordPress } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <CustomTextInput
            name={'password'}
            placeholder={'New password'}
            editable={!isLoading}
            returnKeyType={'next'}
            secureTextEntry={true}
            withRef={true}
            onSubmitEditing={() => this.confirmPasswordInputRef.focus()}
            onChangeText={(value) => this.setState({ newPassword: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            name={'password'}
            ref={(ref) => this.confirmPasswordInputRef = ref}
            placeholder={'Comfirm password'}
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
              onPress={async () => {
                const Username = await AsyncStorage.getItem('@UserName');
                if (newPassword === comfirmPassword)
                  onChangePasswordPress(Username, newPassword)
                else
                  alert("Comfirm password not match!")
              }}
              isLoading={isLoading}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
              text={'Change Password'}
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
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center',
    marginBottom: 10
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