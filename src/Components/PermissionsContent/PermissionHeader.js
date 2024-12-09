import styles from './PermissionContent.module.css';

export default function PermissionHeader(){
    return <section className={styles.PermissionHeader}>
        <p>Permission's List</p>
        {/* <div className={styles.addButton}>
            + Add New Permission
        </div> */}
    </section>
}