import { useContext, useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import UserSearchBar from "./UserSearchBar";
import UsersList from "./UsersList";

import styles from './UserContent.module.css'
import { DashboardContext } from "../../store/dashboardContext";

export default function UsersMainContent() {

    const {roles} = useContext(DashboardContext);

    const [users, setUsers] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');

    const [filteredUsers, setFilteredUsers] = useState(users);

    function fetchUsers() {
        fetch("/api/users")
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
        });
    }
    
    useEffect(() => {
           fetchUsers();
    
    },[roles])

    useEffect(() => {
        filterUsers();
      }, [searchQuery, statusFilter, roleFilter, users]);
    
      const filterUsers = () => {
        let updatedUsers = [...users];
    
        if (searchQuery) {
          updatedUsers = updatedUsers.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
    
        if (statusFilter !== 'all') {
          updatedUsers = updatedUsers.filter(user => user.status === statusFilter);
        }
    
        if (roleFilter !== 'all') {
          updatedUsers = updatedUsers.filter(user => user.role === roleFilter);
        }
    
        setFilteredUsers(updatedUsers);
      };
    
    

    return <section className={styles.UserContent}> 
        <UserHeader fetchUsers={fetchUsers}/>
        <UserSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        users={users}
        />
        {users && filterUsers && <UsersList users={filteredUsers} fetchUsers={fetchUsers}/>}
        
    </section>

}