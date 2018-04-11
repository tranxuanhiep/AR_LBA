import {API_CODE_CONFIRM_FORGOT_PASSWORD} from "../allLinksApi"
const codeConfirmSignUp=(userName, account_ForgotPasswordCode)=>(
    fetch(API_CODE_CONFIRM_FORGOT_PASSWORD, {
        method: 'POST', 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            Username:userName, 
            Account_ForgotPasswordCode:account_ForgotPasswordCode,
        })
    })
    .then ((response)=>response.json())
    .catch((error)=>{
        console.log(error);
    })
    );
export default codeConfirmSignUp;