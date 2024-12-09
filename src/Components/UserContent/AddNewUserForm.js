import { useContext, useEffect, useRef, useState } from 'react';
import styles from './AddNewForm.module.css';
import { DashboardContext } from '../../store/dashboardContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddNewUserForm({updateUser, handleCloseModal, fetchUsers}) {

    const {roles, permissions} = useContext(DashboardContext);

    const nameRef = useRef();
    const emailRef = useRef();
    const [selectedRole, setSelectedRole] = useState('');
    const [isStatusChecked, setIsStatusChecked] = useState(false);
    const [roleError, setRoleError] = useState(false);

    useEffect(() => {
        if(updateUser){
            nameRef.current.value = updateUser.name || '';
            emailRef.current.value = updateUser.email || '';
           
            const updateUserRole = roles.find(role => role.name === updateUser.role)?.name || '';
            setSelectedRole(updateUserRole)
            setIsStatusChecked(updateUser.status === 'Active'? true: false);
        }

    
    },[updateUser, roles])

    function handleStatusChecked(event) {
        setIsStatusChecked(event.target.checked)
    }

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);  
        setRoleError(false)
    };

    function handleSubmitForm(event) {
        event.preventDefault();
        

        if (!selectedRole) {
            setRoleError(true); 
            return; 
        }
        const formData = new FormData()
        formData.name = nameRef.current?.value;
        formData.email = emailRef.current?.value;
        let userRole = roles.find(r => selectedRole === r.name )
        if(userRole)formData.role = userRole.id;
    

        formData.status = isStatusChecked ? 'Active' : 'Inactive';
        fetch(updateUser ? `/api/users/${updateUser.id}` : '/api/users', {
            method: updateUser? 'PUT' : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then(res=> {
            if(res.ok){
                
                toast.success(updateUser ? 'User updated successfully!' : 'User created successfully!' , {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                handleCloseModal();
                fetchUsers();
            }
        }).catch((err) => {
            toast.error(updateUser ? 'Failed to update user. Please try again.' : 'Failed to create user. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            console.error(err);
        })
        
    }

    return <form className={styles.From} onSubmit={handleSubmitForm}> 
        <div className={styles.inputDiv}>
            <label htmlFor="name">Name<span className={styles.required}>*</span></label>
            <input type='text' name='name' required  ref={nameRef} />
        </div>
        
        <div className={styles.inputDiv}>
            <label htmlFor="email">Email<span className={styles.required}>*</span></label>
            <input type='email' name="email" required ref={emailRef}/>
        </div>
        
       
        <div className={styles.inputDiv}>
            <label htmlFor='role'>Role<span className={styles.required}>*</span></label>
            
            {roleError && <p className={styles.roleErrorText}>Please select a role...</p>}

            <select id="roles" name="role"  value={selectedRole} onChange={handleRoleChange} >
                {/* <option value="" disabled>- - Not selected - -</option> */}
                {roles && roles.length > 0 ? (
                    roles.map(role => (
                    <option key={role.id} value={role.name} >{role.name}</option>
                    ))
                ) : (
                    <option value="" disabled>- - No Roles Defined - -</option>
                )}
            </select>

            
        </div>
        
        <div className={styles.inputDiv}>
            <label>Status<span className={styles.required}>*</span></label>
            <span className={styles.statusDesc}>{isStatusChecked ? 'Active' : 'Inactive'}</span>
            <label className={styles.switch}>
                <input type="checkbox"  onChange={handleStatusChecked} checked={isStatusChecked} />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          
        </div>
        
        <button className={styles.submitButton}>{updateUser ? 'Update' : 'Save'}</button>
    </form>
   
}