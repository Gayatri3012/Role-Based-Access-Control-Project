import { useState } from 'react';
import Modal from '../UI/Modal';
import AddNewUserForm from './AddNewUserForm';
import styles from './UserContent.module.css';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UsersList({users, fetchUsers}){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateUser, setUpdateUser] = useState()

    function handleOpenModal(user) {
        setUpdateUser(user);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleDeleteUser(id) {
        
        fetch(`/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            if(!res.ok){
                throw new Error('Failed to delete user!!!')
            }
            return res.json();
        }).then(resData => {
        
            toast.success('User deleted successfully!' , {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchUsers();
        }).catch(err => {
            toast.error('Failed to delete user. Please try again.', {
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
    }

  

    return <section className={styles.UsersList}>
        <table>
            <thead>
                <tr className={styles.listHeadings}>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className={styles.buttonHeadings}>Edit</th>
                    <th className={styles.buttonHeadings}>Delete</th>
                </tr>
            </thead>
           
           <tbody>            
                {users.map(user => {
                    return (
                        <tr className={styles.listItem} key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td className={styles.statusContainer}>
                                <div>
                                    <span className={`${ user.status === 'Active' ? styles.statusActive: styles.statusInactive }`}>
                                        {user.status}
                                    </span>
                                    <span className={`${ user.status === 'Active' ? styles.statusActiveIndicator: styles.statusInactiveIndicator }`}></span>
                                </div>
                               
                            </td>
                            <td className={styles.buttonContainers}>
                                <div>
                                    <button className={styles.editButton}
                                    onClick={() => handleOpenModal(user)}
                                    >
                                        <span>Edit</span>
                                        <img className={styles.editIcon} src='/edit.png' alt='edit icon'/>
                                    </button>
                                </div>
                                
                                </td>
                            <td className={styles.buttonContainers}>
                                <div>
                                    <button className={styles.deleteButton}
                                    onClick={() => handleDeleteUser(user.id)}
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
            <AddNewUserForm handleCloseModal={handleCloseModal} 
                fetchUsers={fetchUsers}
                updateUser={updateUser}
            />
        </Modal>

    </section>
}