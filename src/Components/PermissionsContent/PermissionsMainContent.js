import { useContext } from "react";

import styles from './PermissionContent.module.css'
import PermissionHeader from "./PermissionHeader";
import PermissionsList from "./PermissionsList";
import { DashboardContext } from "../../store/dashboardContext";


export default function PermissionsMainContent() {

    const {permissions} = useContext(DashboardContext);

    return <section className={styles.PermissionContent}> 
        <PermissionHeader />
        {permissions && <PermissionsList />} 
        
    </section>

}