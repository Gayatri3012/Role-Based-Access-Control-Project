    import { useContext } from 'react';
    import styles from './UserContent.module.css';
    import { DashboardContext } from '../../store/dashboardContext';

    export default function UserSearchBar({  
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        roleFilter,
        setRoleFilter,
        users
        }){

            const {roles} = useContext(DashboardContext)
        
        return <section className={styles.UserSearchBar}>
                <p className={styles.filterOptionName}>Filter Options: </p>
            <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
        </select>

        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            {roles.map(role => (
            <option key={role.id} value={role.name}>
                {role.name}
            </option>
            ))}
        </select>
        </section>
    }