import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api'


const AuthContext = createContext();

const AuthProvider = ({children}) => {
       
    const [data, setData] = useState(() => {
        const token = localStorage.getItem('@Finstagram:token');
        const user = localStorage.getItem('@Finstagram:user');

        if(token && user){
            api.defaults.headers.authorization = `Bearer ${token}`;
            return {token, user: JSON.parse(user)}  
        }
           return {user: null, token: null};
    });

    const signIn = useCallback(async ({username, password}) =>{

    }, []);
        

     const signOut = useCallback(() =>{
        localStorage.removeItem('@Finstagram:token');
        localStorage.removeItem('@Finstagram:user');

        setData({
            user:null,
            token: null
        })

     },[])


return (
      <AuthContext.Provider value={{user: data.user, signIn, signOut}}>

        {children}
      </AuthContext.Provider>

)
}

function useAuth(){
    const context = useContext(AuthContext);

    if(!context) throw new Error('useAuth no se puede usar sin importar dentro de un AuthProvider');

    return context

}

export { AuthProvider, useAuth };