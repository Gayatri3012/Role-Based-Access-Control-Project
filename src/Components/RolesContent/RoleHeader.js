import { useState } from 'react';
import styles from './RoleContent.module.css';
import Modal from '../UI/Modal';
import AddNewRoleForm from './AddNewRole';

export default function RoleHeader(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    return <section className={styles.RoleHeader}>
        <p className={styles.headerName}>Role's List</p>
        <div onClick={handleOpenModal} className={styles.addButton}>
            + Add New Role
        </div>
        <Modal isOpen={isModalOpen} onClose={() => handleCloseModal()}>
            <AddNewRoleForm handleCloseModal={handleCloseModal}/>
        </Modal>
    </section>
}