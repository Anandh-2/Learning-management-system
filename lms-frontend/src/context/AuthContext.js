import {createContext, useContext, useState} from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(()=>{
        const name = localStorage.getItem("userName");
        const role = localStorage.getItem("userRole");
        const token = localStorage.getItem("userToken");
        // const dept = localStorage.getItem("userDepartment");
        console.log(name, role, token);
        if(name && role &&token){
            return {
                name: JSON.parse(name),
                role: JSON.parse(role),
                token: JSON.parse(token)
            }
        }
        //console.log(user)
        return null;
        // return {name:"Anandh", role:"admin"}
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("userName", JSON.stringify(userData.name));
        localStorage.setItem("userRole", JSON.stringify(userData.role));
        localStorage.setItem("userToken", JSON.stringify(userData.token));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        localStorage.removeItem("userToken");
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);