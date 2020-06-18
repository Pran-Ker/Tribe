import axios from 'axios';

const auth_rec = (detail)=>{
    const token = detail.token;
    const id_user = detail.id_user;
    console.log(detail)
    if(token==undefined || id_user==undefined)
        {
            return {error:"session_exp",auth:"denied" };
        }
    const auth_detail = axios.post("https://tribe-test-server-v1.herokuapp.com/auth_rec",{token:token,id_user:id_user}).then((res)=>{
                            
                            if(res.data.auth=="NotGranted")
                            {
                                return {error:"session_exp",auth:"denied" };
                            }
                            else if(res.data.auth=="ServerError")
                            {
                                return {error:"tech_issue",auth:"denied" };
                            }
                            else if(res.data.auth=="NoSessions")
                            {
                                return {error:"session_exp",auth:"denied" };
                            }
                            else
                            {
                                return {error:"no error",auth:"success"};
                            } 
                        })
            
            return auth_detail;
}

export default auth_rec;