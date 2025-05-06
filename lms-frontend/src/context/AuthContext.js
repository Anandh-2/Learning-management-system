import {createContext, useContext, useState} from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(()=>{
        const name = localStorage.getItem("userName");
        const role = localStorage.getItem("userRole");

        /*if(name && role){
            return {
                name: JSON.parse(name),
                role: JSON.parse(role)
            }
        }
        //console.log(user)
        return null*/
        return {name:"Anandh", role:"student"}
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("userRole", JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userRole");
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);