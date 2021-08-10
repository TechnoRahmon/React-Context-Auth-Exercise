import React,{ useState , useEffect, useContext  } from 'react'
import Spinner from './../Layout/Spinner'
import { useHistory } from 'react-router-dom'
import AuthStore from './../context/Auth/AuthStore'


export default function Login() {
    
    const { isLoading , Error , UserLogin } = useContext(AuthStore)
    
    const History = useHistory();
    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');
    
    const [ loading , setLoading ] =useState(false);
    const [ErrorLogin , setErrorLogin ] = useState('');
  

    const inputChange =(e)=>{
        // clean error
        setErrorLogin('');
        switch (e.target.id) {
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    const onSub = async (e)=>{
        e.preventDefault();
        
        // clean error
        setErrorLogin('');
        // show the spinner 
        setLoading(true);
        console.log({ email:email , password : password  });
        let data = { email:email , password : password  }; 
        if ( email && password ){
            // invok login function
            UserLogin(data)
           
        }else{
            alert('All Fields Are Requiered')
        }
    }

    

    
    return (
        <div className="container pt-5">
            <form className="row w-25 mx-auto" onSubmit={onSub}>
                 <h2>Login</h2>
                {Error ? <p className="text-danger text-start mb-0"> {Error}</p>:null }
                <div className="col-sm-12 mt-3">
                    <input className="form-control" type="email" placeholder="Email" id="email" 
                    value={email} onChange={inputChange} />
                </div>

                <div className="col-sm-12 mt-3">
                    <input type="password"  className="form-control" placeholder="Password" id="password"
                    value={password} onChange={inputChange}  />
                </div>

                <button className="btn btn-primary mt-3">{ isLoading ? <Spinner color={'light'}/> :'Login' }  </button>
            </form>
            

        </div>
    )
}
