import React,{useState , useContext  } from 'react'


import Spinner from './../Layout/Spinner'
import { useHistory } from 'react-router-dom'
import AuthStore from './../context/Auth/AuthStore'



export default function Register() {

    const { UserRegister , isLoading, Error  } = useContext(AuthStore);

    const History  = useHistory();
    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');
    const [name , setName ] = useState('');
    const [ phone , setPhone ] = useState(''); 

  
    

    const inputChange =(e)=>{
        switch (e.target.id) {
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            case 'name':
                setName(e.target.value)
                break;
            case 'phone':
                setPhone(e.target.value)
                break;
            default:
                break;
        }
    }

    const onSub =async (e)=>{
        e.preventDefault();

        console.log({ email:email , password : password , fullName: name ,phone : phone });
        let data = { email:email , password : password , fullName: name ,phone : phone }
        if ( email && password && name && phone  ){
           
            // call user register function , from context 
            UserRegister(data)
        }else{
            // hide spinner 
            alert('All Fields Are Requiered')
        }
    }


    return (
        <div className="container pt-5">
            <form className="row w-25 mx-auto" onSubmit={onSub}>
                 <h2  className="mb-4">Sign UP</h2>
                {Error ? <p className="text-danger text-start mb-0"> {Error}</p>:null }
                <div className="col-sm-12 mt-3">
                    <input className="form-control" type="text" placeholder="Full Name" id="name" 
                    value={name} onChange={inputChange} />
                </div>

                <div className="col-sm-12 mt-3">
                    <input className="form-control" type="text" placeholder="Phone Number" id="phone" 
                    value={phone} onChange={inputChange} />
                </div>


                <div className="col-sm-12 mt-3">
                    <input className="form-control" type="email" placeholder="Email" id="email" 
                    value={email} onChange={inputChange} />
                </div>

                <div className="col-sm-12 mt-3">
                    <input type="password"  className="form-control" placeholder="Password" id="password"
                    value={password} onChange={inputChange}  />
                </div>

                <button className="btn btn-primary mt-3"> {isLoading ? <Spinner  color={'light'} /> : 'Register' } </button>
            </form>
            

        </div>
    )
}
