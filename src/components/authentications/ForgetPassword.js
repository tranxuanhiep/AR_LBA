import React, { Component, PropTypes } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Text, View } from 'react-native-animatable'
import CustomButton from "../../components/customes/CustomButton";
import CustomTextInput from "../../components/customes/CustomeTextInput";
import metrics from "../../config/metrics";

export default class ForgetPassword extends Component {
  state = {
    email: '',
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
    const { email } = this.state
    const { isLoading, onSignupLinkPress, onLoginLinkPress, onForgetCode } = this.props
    const isValid = email !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <CustomTextInput
            name={'email'}
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'done'}
            blurOnSubmit={false}
            withRef={true}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={()=>{
                AsyncStorage.setItem('@EmailCreate',email)
                onForgetCode(email);
              }}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
              text={'Comfirm Email'}
            />
          </View>
          <View style={{marginTop: 10 }} >
            <Text
              ref={(ref) => this.linkRef = ref}
              style={styles.signupLink}
              onPress={onSignupLinkPress}
              animation={'fadeIn'}
              duration={600}
              delay={400}
            >
              {'Not registered yet?'}
            </Text>
            <View style={{marginTop: 10, marginBottom: 10}} >
              <Text
                ref={(ref) => this.linkRef = ref}
                style={styles.forgotPassword}
                onPress={onLoginLinkPress}
                animation={'fadeIn'}
                duration={600}
                delay={400}
              >
                {'Already have an account?'}
              </Text>
              </View>
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
    justifyContent: 'center'
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