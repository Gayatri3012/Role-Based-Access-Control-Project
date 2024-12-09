import { useContext, useEffect, useState } from "react";
import styles from './HomeContent.module.css'
import { DashboardContext } from "../../store/dashboardContext";
import RolesChart from "./RolesChart";
import CardContainer from "./CardContainer";

export default function HomePage() {

    const {roles} = useContext(DashboardContext);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    function fetchUsers() {
        fetch("/api/users")
        .then((res) => {
            if(!res.ok){
                throw new Error('HTTP error!!')
            }
            return res.json()
        })
        .then((data) => {
          setIsLoading(true)
            const usersWithRoles = data.map(user => {
                if (roles ) {
                    const role = roles.find(role => role.id === user.role);
                    return {
                        ...user,
                        role: role ? role.name : "No Role",
                    };
                }
            });
            setUsers(usersWithRoles);  
            setIsLoading(false)
        }).catch(err => console.log(err));
    }
    
    useEffect(() => {
           fetchUsers();
  
    },[roles])

    const roleCounts = roles.map(role => ({
      name: role.name,
      count: users.filter(user => user.role === role.name).length 
  }));

    if(isLoading){
      return <p>Loading...</p>
    }
    

    return <section className={styles.HomeContent}> 

      <p className={styles.pageName}>Admin Dashboard</p>

      {users && <CardContainer users={users}/>}

      {users.length !== 0 && roleCounts && <RolesChart roleCounts={roleCounts} />}
        
    </section>

}