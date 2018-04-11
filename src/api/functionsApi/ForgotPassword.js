import { API_FORGOT_PASSWORD } from "../allLinksApi";
const forgotPassword=(userName)=>(
    fetch(API_FORGOT_PASSWORD, {
        method: 'POST', 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            Username:userName, 
        })
    })
    .then ((response)=>response.json())
    .catch((error)=>{
        console.log(error);
    })
    );
export default forgotPassword;