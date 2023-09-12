import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import CustomInput from '../Inputs/CustomInput';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { saveProfile } from '../../helpers/user.helpers';
const initialState={
    old_password:'',
    new_password:'',
    new_re_password:''
}

const PasswordModal = ({isOpen,handleCloseViewModal}) => {
    const [inputState, setInputState] = useState(initialState);
    const [errors, setErrors] = useState('');
    const [confirmation,setConfirmation]= useState('');
    const {token} = useSelector((state) => state.user);
    function onChange(e) {
      const { value, name } = e.target;
      setInputState((prev) => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        setInputState(initialState);
        setErrors('');
        setConfirmation('');
    }, [isOpen]);

    const handleChangePassword = async () =>{
        if(new_re_password==new_password)
        {
            setErrors('');
 
            const {data,message,errorMessages}=await saveProfile(token,{new_password,old_password})
            if(data && data.changes){
                data.changes.forEach(change => {
                    if(change=='password'){
                        setConfirmation('Password changed');
                    }
                });
            }
            if(message && message=='Old password is incorrect.'){
                setConfirmation('')
                setErrors(message);
            }
        }
        else{
            setConfirmation('')
            setErrors('New password does not match.')
        }
    }
    const {old_password,new_re_password,new_password} = inputState;
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border dark:bg-slate-900 dark:text-slate-200 signIn-container flex flex-col items-center gap-5 rounded-2xl shadow-lg"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
        >
        <h4 className="p-4">
          Profile
        </h4>
        <div className="form-container flex flex-col gap-5 p-6 pb-0 ">
          <CustomInput
            label="Old Password"
            name="old_password"
            type="text"
            onChange={onChange}
            value={old_password}
            className={'w-[300px]'}
            labelStyle={{color: 'white'}}
          />
          <CustomInput
            label="New Password"
            name="new_password"
            type="text"
            onChange={onChange}
            value={new_password}
            className={'w-[300px]'}
            labelStyle={{color: 'white'}}
          />
                    <CustomInput
            label="Re-enter Password"
            name="new_re_password"
            type="text"
            onChange={onChange}
            value={new_re_password}
            className={'w-[300px]'}
            labelStyle={{color: 'white'}}
          />
        </div>
        <div className="error">{errors}</div>
        <div className="confirmation">{confirmation}</div>
        <div className=" monster flex justify-between gap-3 w-full px-5 pb-5">
          <button
            onClick={() => handleChangePassword()}
            className="btn primary-btn"
          >
            Change
          </button>
          <button
            onClick={handleCloseViewModal}
            className="btn"
          >
            Cancel
          </button>
        </div>
      </Modal>  
        );
}
 
export default PasswordModal;