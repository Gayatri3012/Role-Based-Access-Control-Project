import { useContext, useEffect, useState } from "react";
import styles from './HomeContent.module.css'
import { DashboardContext } from "../../store/dashboardContext";
import RolesChart from "./RolesChart";
import CardContainer from "./CardContainer";
import { toast } from 'react-toastify';

export default function HomePage() {

    const {roles} = useContext(DashboardContext);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    function fetchUsers() {
      // setIsLoading(true)
      const loadingToast = toast.loading("Loading data, please wait...");
    
        fetch("https://standing-alive-airship.glitch.me/users")
        .then((res) => {
            if(!res.ok){
                throw new Error('HTTP error!!')
            }
            return res.json()
        })
        .then((data) => {
        
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
            toast.dismiss(loadingToast);
            setIsLoading(false)
        }).catch(err => {
          toast.dismiss(loadingToast);
          toast.error('Failed to load users')
          setIsLoading(false);
          console.log(err)
        });
    }
     
    useEffect(() => {
           fetchUsers();
  
    },[roles])

    const roleCounts = roles.map(role => ({
      name: role.name,
      count: users.filter(user => user.role === role.name).length 
  }));

    // if(isLoading){
    //   return <p style={{textAlign:"center"}}>Loading...</p>
    // }
    

    return (<section className={styles.HomeContent}> 
      
      { isLoading && <p style={{textAlign:"center", fontWeight:500}}>
        Loading data, please wait... (Server might take some time to start)
        </p>
      }
      {!isLoading && <>
        <p className={styles.pageName}>Admin Dashboard</p>
       { users && <CardContainer users={users}/>}
        {users.length !== 0 && roleCounts && <RolesChart roleCounts={roleCounts}  />}
        </> }
     
    </section>
  )
  
}