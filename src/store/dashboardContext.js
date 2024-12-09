import { createContext, useEffect, useState } from "react";

export const DashboardContext = createContext({
    isAuth: null,
    permissions: [],
    roles: [],
    fetchAndSetRoles: () => {},
    fetchAndSetPermissions: () => {}
})


export default function DashboardContextProvider({children}){

    const [isAuth, setIsAuth] = useState(true);
    const [permissions, setPermissions] = useState();
    const [roles, setRoles] = useState();
    
    useEffect(() => {
        const updatePermissions = () => {
            fetch("/api/permissions")
            .then((res) => res.json())
            .then((data) => {
                setPermissions(data)
            }).catch(err => console.log(err));;
        }
        const updateRoles = () => {
            fetch("/api/roles")
            .then((res) => res.json())
            .then((data) => {
                setRoles(data)
            }).catch(err => console.log(err));
        }
        updatePermissions();
        updateRoles()
    },[])

    const fetchAndSetRoles = async () => {
        const res = await fetch('/api/roles');
        const updatedRoles = await res.json();
        setRoles(updatedRoles); 
    };


    function login() {
        setIsAuth(true); 

      };
    
    function logout() {
        setIsAuth(false);
    };
    

    return <DashboardContext.Provider value={{isAuth, roles, permissions, fetchAndSetRoles}}>
        {children}
    </DashboardContext.Provider>

}