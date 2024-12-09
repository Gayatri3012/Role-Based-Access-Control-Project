import { useContext, useEffect, useRef, useState } from 'react';
import styles from './AddNewRoleForm.module.css';
import { DashboardContext } from '../../store/dashboardContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddNewRoleForm({updateRole, handleCloseModal}) {
    const {roles, permissions, fetchAndSetRoles} = useContext(DashboardContext)

    const roleName = useRef();

    const [selected, setSelected] = useState([]);
    const [permissionError, setPermissionError] = useState(false)

    useEffect(() => {
        if(updateRole){
            roleName.current.value = updateRole.name || '';
            const updatedPermissionIds = updateRole.permissions.map(permission => permission.id);
            setSelected(updatedPermissionIds);
            fetchAndSetRoles()
        }

    
    },[updateRole, permissions])

    function handleSubmitForm(event) {
        event.preventDefault();

        if(selected.length === 0){
            setPermissionError(true)
            return;
        }
        const formData = new FormData()
        formData.name = roleName.current?.value;
        formData.permissions = selected;


        fetch(updateRole ? `https://standing-alive-airship.glitch.me/roles/${updateRole.id}` :'https://standing-alive-airship.glitch.me/roles', {
            method: updateRole? 'PUT' : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then(res=> {
            if(res.ok){
                handleCloseModal();
                fetchAndSetRoles();
                toast.success(updateRole ? 'Role updated successfully!' : 'Role created successfully!' , {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch((err) => {
            toast.error(updateRole ? 'Failed to update role. Please try again.' : 'Failed to create role. Please try again.', {
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

    const handleCheckboxChange = (id) => {
        setPermissionError(false)
        const updatedSelections = selected.includes(id)
            ? selected.filter(permissionId => permissionId !== id)
            : [...selected, id];
        setSelected(updatedSelections);

    };

    return <form className={styles.From} onSubmit={handleSubmitForm}> 
        <div className={styles.inputDiv}>
            <label htmlFor="role">Role Name<span>*</span></label>
            <input type='text'  name='role' required  ref={roleName}/>
        </div>

        <div className={styles.inputDiv}>
        <label htmlFor="permissions">Permissions<span>*</span></label>
        {/* <select id="permissions" name="permissions"  >
            {permissions.map(per => {
                return <option key={per.id} value={per.name}>{per.name}</option>
            })}
        </select> */}
        {permissionError && <p className={styles.permissionErrorText}>Please select atleast one permission...</p>}
        {permissions.map(permission => (
                    <div key={permission.id}>
                        <label className={styles.permissionInputLabels}>
                            <input
                                type="checkbox"
                                value={permission.id}
                                checked={selected.includes(permission.id)}
                                onChange={() => handleCheckboxChange(permission.id)}
                            />
                            {permission.name}
                        </label>
                    </div>
                ))}
        </div>
    
        <button className={styles.submitButton}>Save</button>
    </form>
   
}