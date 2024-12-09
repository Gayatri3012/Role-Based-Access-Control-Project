import { useNavigate } from "react-router-dom";
import styles from './Navigation.module.css';

export default function NavigationBar() {

    const navigate = useNavigate();

    return <section className={styles.NavigationBar}>
        <div className={styles.appName} onClick={() => navigate("/")}>
            CTRL
        </div>
        <ul>
            <li onClick={() => navigate("/")}>
                <div >
                    <img src="/home.png" alt="home icon" /> 
                    <p>Home</p>
                </div>
            </li>
            <li onClick={() => navigate("/users")}>
                <div >
                    <img src="/users.png" alt="users icon" /> 
                    <p>Users</p>
                </div>
            </li>
            <li onClick={() => navigate("/roles")}>
                <div >
                    <img src="/roles.png" alt="roles icon" />
                    <p>Roles</p>
                </div>
            </li>
            <li onClick={() => navigate("/permissions")}>
                <div >
                    <img src="/permissions.png" alt="permissions icon" /> 
                    <p>Permissions</p>
                </div>
            </li>
          
        </ul>
    </section>
}