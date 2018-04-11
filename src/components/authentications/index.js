import React, { Component, PropTypes } from 'react'
import { KeyboardAvoidingView, LayoutAnimation, Platform, StyleSheet, UIManager, AsyncStorage } from 'react-native'
import { Image, View } from 'react-native-animatable'

import imgLogo from '../../images/logo.png'
import metrics from '../../config/metrics'

import Opening from './Opening'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import ForgetPassword from './ForgetPassword'
import EnterCode from './EnterCode'
import ChangePassword from './ChangePassword'
import CreateAccount from './CreateAccount'
import SignUp from '../../api/functionsApi/SignUp'
import codeConfirmSignUp from '../../api/functionsApi/CodeConfirmSignUp'
import CodeConfirmForgotPassword from '../../api/functionsApi/CodeConfirmForgotPassword'
import forgotPassword from '../../api/functionsApi/ForgotPassword'
import ChangePasswords from '../../api/functionsApi/ChangePassword'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true)
export default class AuthScreen extends Component {
  state = {
    visibleForm: null,
  }

  componentDidUpdate(nextProps) {
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideAuthScreen()
    }
  }

  _verifyCode = async (code, UserName) => {
    const TypeCode = await AsyncStorage.getItem('@TypeCode');
    this.props.setisLoading(true);
    if (TypeCode === 'createAccount') {
      console.log(UserName);
      codeConfirmSignUp(UserName, code)
        .then((reasonJson) => {
          let success = reasonJson.message.success;
          if (success) {
            alert("Sign Up successful");
            AsyncStorage.setItem('@TypeCode', '');
            this._setVisibleForm('LOGIN');
            this.props.setisLoading(false);
            AsyncStorage.setItem('@UserName','');
          }
          else {
            let errorLogin = reasonJson.message.error;
            alert("Code verify not match!");
            this.props.setisLoading(false);
          }
        }).catch((error) => {
          alert("Network error!");
          this.props.setisLoading(false);
        })
    }
    else {
      if (TypeCode === 'forgetpassword') {
        CodeConfirmForgotPassword(UserName, code)
          .then((reasonJson) => {
            console.log(reasonJson)
            let success = reasonJson.message.success;
            if (success) {
              AsyncStorage.setItem('@TypeCode', '');
              this._setVisibleForm('CHANGEPASSWORD');
              this.props.setisLoading(false);
            }
            else {
              let errorLogin = reasonJson.message.error;
              alert(errorLogin);
              this.props.setisLoading(false);
            }
          }).catch((error) => {
            alert(error);
            this.props.setisLoading(false);
          })
      }
    }
  }

  _ChangePassWord = (UserName, NewPassword) => {
    this.props.setisLoading(true);
    ChangePasswords(UserName, NewPassword)
      .then((reasonJson) => {
        let success = reasonJson.message.success;
        if (success) {
          alert("Change password succeed")
          this._setVisibleForm('LOGIN');
          AsyncStorage.setItem('@UserName','');
          this.props.setisLoading(false);
        }
        else {
          let error = reasonJson.message.error;
          alert(error);
          this.props.setisLoading(false);
        }
      }).catch((error) => {
        alert(error);
        this.props.setisLoading(false);
      })
  }

  _ForgetPassword = async (email) => {
    this.props.setisLoading(true);
    forgotPassword(email)
      .then((reasonJson) => {
        let success = reasonJson.message.success;
        if (success) {
          AsyncStorage.setItem('@UserName', email);
          AsyncStorage.setItem('@TypeCode', 'forgetpassword');
          this._setVisibleForm('ENTERCODE');
          this.props.setisLoading(false);
        }
        else {
          let error = reasonJson.message.error;
          alert(error);
          this.props.setisLoading(false);
        }
      }).catch((error) => {
        alert(error);
        this.props.setisLoading(false);
      })
  }


  _createAccount = (email, password, firstName, lastName, dateSendtoServer, value) => {
    console.log(email)
    this.props.setisLoading(true);
    SignUp(email, password, firstName, lastName, dateSendtoServer, value)
      .then((reasonJson) => {
        let success = reasonJson.message.success;
        if (success) {
          this._setVisibleForm('ENTERCODE');
          this.props.setisLoading(false);
        }
        else {
          let errorLogin = reasonJson.message.error;
          alert(errorLogin);

          this.props.setisLoading(false);
          this._setVisibleForm('SIGNUP');
        }
      }).catch((error) => {
        alert(error);
        this.props.setisLoading(false);
        this._setVisibleForm('SIGNUP');
      })
  }
  
  _hideAuthScreen = async () => {
    await this._setVisibleForm(null)
    this.props.onLoginAnimationCompleted()
  }

  _setVisibleForm = async (visibleForm) => {
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm()
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ visibleForm:visibleForm })
  }

  render() {
    const { isLoggedIn, isLoading, signup, login } = this.props
    const { visibleForm } = this.state
    const formStyle = (!visibleForm) ? { height: 0 } : { marginTop: 40 }
    return (
      <View style={styles.container}>
        <Image
          animation={'bounceIn'}
          duration={1200}
          delay={200}
          ref={(ref) => this.logoImgRef = ref}
          style={styles.logoImg}
          source={imgLogo}
        />
        {(!visibleForm && !isLoggedIn) && (
          <Opening
            onCreateAccountPress={() => this._setVisibleForm('SIGNUP')}
            onSignInPress={() => this._setVisibleForm('LOGIN')}
          />
        )}
        <KeyboardAvoidingView
          keyboardVerticalOffset={-200}
          behavior={'padding'}
          style={[formStyle, styles.bottom]}
        >
          {(visibleForm === 'SIGNUP') && (
            <SignUpForm
              ref={(ref) => this.formRef = ref}
              onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
              onNextCreate={() => this._setVisibleForm('NEXTCREATE')}
              isLoading={isLoading}
            />
          )}
          {(visibleForm === 'NEXTCREATE') && (
            <CreateAccount
              ref={(ref) => this.formRef = ref}
              onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
              onSignupPress={this._createAccount}
              isLoading={isLoading}
            />
          )}
          {(visibleForm === 'LOGIN') && (
            <LoginForm
              ref={(ref) => this.formRef = ref}
              onSignupLinkPress={() => this._setVisibleForm('SIGNUP')}
              onForgetPassword={() => this._setVisibleForm('FORGET')}
              onLoginPress={login}
              isLoading={isLoading}
            />
          )}
          {(visibleForm === 'FORGET') && (
            <ForgetPassword
              ref={(ref) => this.formRef = ref}
              onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
              onSignupLinkPress={() => this._setVisibleForm('SIGNUP')}
              onForgetCode={this._ForgetPassword}
              isLoading={isLoading}
            />
          )}
          {(visibleForm === 'ENTERCODE') && (
            <EnterCode
              ref={(ref) => this.formRef = ref}
              onPressButton={this._verifyCode}
              isLoading={isLoading}
            />
          )}
          {(visibleForm === 'CHANGEPASSWORD') && (
            <ChangePassword
              ref={(ref) => this.formRef = ref}
              onChangePasswordPress={this._ChangePassWord}
              isLoading={isLoading}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: 'white'
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
  bottom: {
    backgroundColor: '#1976D2'
  }
})