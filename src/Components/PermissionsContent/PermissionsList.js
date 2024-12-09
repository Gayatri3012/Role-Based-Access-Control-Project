import { useContext } from 'react';
import { DashboardContext } from '../../store/dashboardContext';
import styles from './PermissionContent.module.css';

export default function PermissionsList(){

    const {permissions} = useContext(DashboardContext);

    return <section className={styles.PermissionsList}>
        <table>
            <thead>
                <tr className={styles.listHeadings}>
                    <th>Permission</th>
                    <th>Description</th>
                </tr>
            </thead>
           
           <tbody>                      
             
            
                {permissions.map(permission => {
                    return (
                        <tr className={styles.listItem} key={permission.id}>
                            <td className={styles.permissionName}>{permission.name}</td>
                            <td className={styles.permissionDesc}>{permission.description}</td>
                        </tr>
                    )  
                })}
                
           </tbody>
            
        </table>
       
    </section>
}