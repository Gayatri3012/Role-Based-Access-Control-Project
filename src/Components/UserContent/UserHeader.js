import { useState } from 'react';
import styles from './UserContent.module.css';
import Modal from '../UI/Modal';
import AddNewUserForm from './AddNewUserForm';

export default function UserHeader({fetchUsers}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    return <section className={styles.UserHeader}>
        <p className={styles.headerName}>User's List</p>
        <div onClick={handleOpenModal} className={styles.addButton}>
            + Add New User
        </div>
        <Modal isOpen={isModalOpen} onClose={() => handleCloseModal()}>
            <AddNewUserForm handleCloseModal={handleCloseModal} fetchUsers={fetchUsers}/>
        </Modal>
    </section>
}