import React ,{ useContext ,useEffect} from 'react'
import { Route , Redirect } from 'react-router-dom'
import AuthStore  from './../context/Auth/AuthStore'

export default function PrivateRoute( { component:Component , ...rest }) {
    const { Token }  = useContext(AuthStore);

    useEffect(() => {

        if ( !Token )
            alert('You Have to Login To View This Page')

    }, [Token ])


    return (
        <Route {...rest} render={props=>
        (Token ? <Component {...props} /> : <Redirect to='/login' />  )
        } />
    )
}
