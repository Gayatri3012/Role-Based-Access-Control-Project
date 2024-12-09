import { useContext, useEffect, useState } from 'react';
import styles from './RoleContent.module.css';
import { DashboardContext } from '../../store/dashboardContext';
import Modal from '../UI/Modal';
import AddNewRoleForm from './AddNewRole';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RolesList(){
    const {roles, permissions, fetchAndSetRoles} = useContext(DashboardContext);

    const [rolesWithPermissions, setRolesWithPermissions] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateRole, setUpdateRole] = useState();

    useEffect(() => {
        fetchAndSetRoles()
        const rolesWithPer = roles.map(role => {
            if (permissions ) {
                let per = permissions.filter(permission => 
                    role.permissions.map(Number).includes(Number(permission.id))
                )
                return {
                    ...role,
                    permissions: per
                };
            }
        });
        setRolesWithPermissions(rolesWithPer);  

    },[roles])

    function handleOpenModal(role) {
        setUpdateRole(role);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }
     
  

    function handleDeleteRole(id) {

        fetch(`https://standing-alive-airship.glitch.me/users?role=${id}`)
        .then(res => {
            if(!res.ok){
                throw new Error('Network response was not ok');
            }
            return res.json()
        })
        .then(users => {
            users.forEach(user => {
                fetch(`https://standing-alive-airship.glitch.me/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...user, role: roles.find(role => role.name === 'User').id })
                });
            });
        })
        .then(() => {
            fetch(`https://standing-alive-airship.glitch.me/roles/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => {
                if(!res.ok){
                    throw new Error('Failed to delete role!!!')
                }
                return res.json();
            }).then(resData => {
                toast.success('Role deleted successfully!' , {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                fetchAndSetRoles()
            }).catch(err => {
                toast.error('Failed to delete role. Please try again.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                console.log(err)
            })
        });
        
       
    }


    return <section className={styles.RolesList}>
        <table>
            <thead>
                <tr className={styles.listHeadings}>
                    <th>Role</th>
                    <th>Permissions</th>
                    <th className={styles.buttonHeadings}>Edit</th>
                    <th className={styles.buttonHeadings}>Delete</th>
                </tr>
            </thead>
           
           <tbody>
                {rolesWithPermissions && rolesWithPermissions.map(role => {
                    return (
                        <tr className={styles.listItem} key={role.id}>
                            <td>{role.name}</td>
                            <td className={styles.rolePermissions}>
                                {role.permissions.map(permission => {
                                    return <p key={`${permission.id}${Math.random()}`}>{permission.name}</p>
                                })}
                            </td>
                            <td className={styles.buttonContainers}>
                                <div>
                                    <button className={styles.editButton}
                                    onClick={() => handleOpenModal(role)}
                                    >
                                        <span>Edit</span>
                                        <img className={styles.editIcon} src='/edit.png' alt='edit icon'/>
                                    </button>
                                </div>
                                
                                
                                </td>
                            <td className={styles.buttonContainers}>
                                <div>
                                    <button className={styles.deleteButton} 
                                    onClick={() => handleDeleteRole(role.id)}
                                    >
                                        <img src='/delete.png' alt='delete icon'/>
                                    </button>
                                </div>
                               
                            </td>
                        </tr>
                    )  
                })}
                
           </tbody>
            
        </table>

        <Modal isOpen={isModalOpen} onClose={() => handleCloseModal()}>
            <AddNewRoleForm handleCloseModal={handleCloseModal} 
                updateRole={updateRole}
            />
        </Modal>
       
    </section>
}