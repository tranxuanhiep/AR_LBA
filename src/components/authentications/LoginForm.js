import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'
import validateEmail from './ValidateEmail'
import CustomButton from "../../components/customes/CustomButton";
import CustomTextInput from "../../components/customes/CustomeTextInput";
import metrics from "../../config/metrics";

export default class LoginForm extends Component {

  state = {
    email:'',
    password:''
  }
  checkAccount = (email,password)=>{
      if(validateEmail(email)&&(password.length>=6)){
        return true;
      }else{return false;}
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
    const { email, password } = this.state
    const { isLoading, onSignupLinkPress, onForgetPassword, onLoginPress } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <CustomTextInput
            name={'email'}
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
            name={'password'}
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => {
                if(this.checkAccount(email,password))
                    onLoginPress(email, password)
                else{alert("Email or password it wrong!!!")}
              }}
              isLoading={isLoading}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
              text={'Log In'}
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
                onPress={onForgetPassword}
                animation={'fadeIn'}
                duration={600}
                delay={400}
              >
                {'Forgot Password?'}
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