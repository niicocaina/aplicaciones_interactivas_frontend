import { Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { serviceLogin } from "src/services/authService";
import { createContext, useState, Children } from "react";

const AuthContext = createContext();
export function AuthProvider ({children}){
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (mail, password)=>{
        try{
            const response = await serviceLogin(mail, password);
            const userData = response.data;
            setUser(userData);
            navigate("/products");
        } catch (err) {
            setError("Ha ocurrido un error");
        }
    };

    const logout = () => {
        setUser(null);
        navigate("/login");
    };
    login("","");
    return (
        <AuthContext.Provider value={{user, login, logout, error}}>
            {Children}
    </AuthContext.Provider>
    );
}

export default AuthContext;