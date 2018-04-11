import { API_CHANGE_PASSWORD } from "../allLinksApi";
const changePassword=(userName, password)=>(
    fetch(API_CHANGE_PASSWORD, {
        method: 'POST', 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            Username:userName, 
            Password:password,
        })
    })
    .then ((response)=>response.json())
    .catch((error)=>{
        console.log(error);
    })
    );
export default changePassword;