import { useReducer } from 'react'
import AuthStore from './AuthStore'
import { Reducer as AuthReducer } from './AuthReducer'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useHistory } from 'react-router-dom'

const initialState ={
        isLoading:false,
        Error:null,
        userDetailes:{},
        Token : localStorage.getItem('token'),
        success:false,
}


export const AuthState=( {children})=>{


    const [ state , dispatch  ] = useReducer(AuthReducer ,initialState  )
    const History = useHistory();




    // register function , Add new user 
    const Register = async(data)=>{
                try {
                    // trigger the request action 
                    dispatch({ type:'REGISTER_REQUEST'  })

                    const config ={ headers:{ 'Content-Type':'application/json'}}
    
                    let res = await axios.post('http://localhost:3004/users',data, config )
                    
                    // trigger the success action 
                    dispatch({ type:'REGISTER_SUCCESS' , success:true   })

                    // redirect user to login page 
                    History.push('/login')

                } catch (error) {
                     // trigger the Failed action 
                     dispatch({ type:'REGISTER_FAILED' , success:false, payload:error.message   })
                }
        }


    // login function and saveToken 
    const SaveToken = async (user)=>{
        try {
            const config ={ headers:{ 'Content-Type':'application/json'}}

            let res = await axios.put('http://localhost:3004/users/'+user.id ,user, config )
            return { success:true }

        } catch (error) {
                return { success:false, error:error.message}
        }
    }
    

     const UserLogin = async(data)=>{
        try {

            // trigger the request action 
            dispatch({ type:'LOGIN_REQUEST'  })

            // get all users and check if the data is exists in  the users         
            let res = await axios.get('http://localhost:3004/users')
            let Allusers = res.data;
            let AuthUser  = Allusers.filter(user=> user.email === data.email && user.password === data.password  )[0]
            console.log('Auth user : ' , AuthUser );
            
            // check if user is Authenticated 
            if( AuthUser && AuthUser.email ){
                // generate token 
                let token = uuidv4();
    
                // save token in backend (update the user with PUT request )
                AuthUser.token = token;
                let res_savetoken = await SaveToken(AuthUser);
                
                if ( res_savetoken.success ){
                    // set token in the localStorage 
                    localStorage.setItem('token',token)
            
                    // trigger login success action in reducer 
                    dispatch({ type:'LOGIN_SUCCESS' , payload:AuthUser  })
                   
                    //redirect to phone-book page 
                    History.push('/phone-book');
                }else{
                    // if the token did not save in backend give error 
                    dispatch({ type:'LOGIN_FAILED' , payload:res_savetoken.error   })
                }
                
    
            }else{
                // check if user is NOT Authenticated 
                dispatch({ type:'LOGIN_FAILED' , payload:'Invalid email Or password'  })
     
            }
           
    
        } catch (error) {
            dispatch({ type:'LOGIN_FAILED' , payload:error.message  })
        }
    }
    

    // is token valid function 
     const isTokenValid = async (token)=>{
            try {
                // trigger the request action 
                dispatch({ type:'TOKEN_VALID_REQUEST'  })

                // get all users and check if the token is exists in  one of the users         
                let res = await axios.get('http://localhost:3004/users')
                let Allusers = res.data;
                let AuthUser  = Allusers.filter(user=> token === user.token  )[0]
                console.log('Auth user : ' , AuthUser );
                if (AuthUser && AuthUser.id ){
                    // trigger is Token Valid success action in reducer 
                    dispatch({ type:'TOKEN_VALID_SUCCESS' , payload:AuthUser  })
                }else{
                    dispatch({ type:'TOKEN_VALID_FAILED'   })
                }
            } catch (error) {
                dispatch({ type:'TOKEN_VALID_FAILED' , payload:error.message  })
            }
    }

    const Logout = async ()=>{
            localStorage.removeItem('token')
            dispatch({type:'LOGOUT_SUCCESS'})
    }

    return(
        <AuthStore.Provider value={{
            isLoading:state.isLoading , 
            Error:state.Error ,
            userDetailes: state.userDetailes ,
            Token : state.Token,
            success:state.success,
            UserRegister:Register,
            UserLogin:UserLogin,
            isTokenValid:isTokenValid,
            Logout:Logout
        }} >
                {children}

        </AuthStore.Provider>
    )

}



