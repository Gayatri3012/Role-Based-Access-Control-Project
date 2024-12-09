import {  useEffect, useState } from 'react';
import styles from './HomeContent.module.css'
import InfoCard from './InfoCard'


export default function CardContainer({users}){

    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [inactiveUsers, setInactiveUsers] = useState(0);

    
    useEffect(() => {
        setTotalUsers(users.length);
        const active = users.filter(user => user.status === "Active").length;
        setActiveUsers(active);
        const inactive = users.length - active;
        setInactiveUsers(inactive)
    },[users])




    return <div className={styles.cardsContainer}>
    <InfoCard label={'Total Users'} stats={totalUsers}/>
    <InfoCard label={'Active Users'} stats={activeUsers}/>
    <InfoCard label={'Inactive Users'} stats={inactiveUsers}/>
  </div>
}