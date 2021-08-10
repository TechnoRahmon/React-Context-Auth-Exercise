
export const Reducer =(state , action )=>{

    switch (action.type) {
        case 'REGISTER_REQUEST':
            return { ...state , isLoading:true }
            break;


        case 'REGISTER_SUCCESS':
            return { ...state ,
                    success:action.success ,
                    isLoading:false  }
            break;


        case 'REGISTER_FAILED':
            return { ...state , 
                    Error:action.payload , 
                    success : action.success ,
                    isLoading:false }
        
            break;

        // login action 
        case 'LOGIN_REQUEST':
            return { ...state , isLoading:true }
            break;


        case 'LOGIN_SUCCESS':
            return { ...state ,
                    success:true ,
                    isLoading:false,
                    userDetailes:action.payload,
                    Token:action.payload.token
                  }
            break;


        case 'LOGIN_FAILED':
            return { ...state , 
                    Error:action.payload , 
                    success : false ,
                    isLoading:false,
                    userDetailes:{},
                    token:null
                }
        
            break;

        // is tokenValid Action 
        case 'TOKEN_VALID_REQUEST':
            return { ...state , isLoading:true }
            break;


        case 'TOKEN_VALID_SUCCESS':
            return { ...state ,
                    success:true ,
                    isLoading:false,
                    userDetailes:action.payload,
                    
                }
            break;


        case 'TOKEN_VALID_FAILED':
            return { ...state , 
                    Error:action.payload , 
                    success : false ,
                    isLoading:false,
                    Token:null,
                    userDetailes:{}
                }

        case 'LOGOUT_SUCCESS':
            return { ...state , 
                    Error:null , 
                    success : true ,
                    isLoading:false,
                    Token:null,
                    userDetailes:{}
                }
        
            break;


        default:
            break;
    }

}



