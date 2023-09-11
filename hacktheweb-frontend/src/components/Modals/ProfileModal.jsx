import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfile } from '../../helpers/user.helpers';
import { useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import { updateUser } from '../../slices/userSlice';


const ProfileModal = ({isOpen,handleCloseViewModal}) => {
    const user = useSelector((state) => state.user);
    
    const { name: old_name , profile_url,token} = user;
    const [inputState, setInputState] = useState({name:old_name, profile_image:''});
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();
    
    function onChange(e) {
      const { value, name } = e.target;
      setInputState((prev) => ({ ...prev, [name]: value }));
    }
    function fileHandler(e) {
        let selectedImage=e.target.files[0];
        if (!selectedImage) {
            console.log('Please select an image.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = function () {
            const base64Image = reader.result.split(',')[1];
            setInputState((prev) => ({ ...prev, [e.target.name]: base64Image}));
  
          };
        reader.readAsDataURL(selectedImage);
    
    }
    const handleSave = async () => {
        const {data,message,errorMessages}=await saveProfile(token,inputState);
        if(data && data.changes){
            data.changes.forEach(change => {
                if(change=='name'){
                    dispatch(updateUser({attributeName:'name',attributeValue:data.user.name}));
                } else if(change=='profile_url'){
                    dispatch(updateUser({attributeName:'profile_url',attributeValue:data.user.profile_url}));

                }
            });
        }

    }
    const {name,profile_image}=inputState;
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
            label="Name"
            name="name"
            type="text"
            onChange={onChange}
            value={name}
            className={'w-[300px]'}
            labelStyle={{color: 'white'}}
          />
            <label class="btn secondary-btn self-end">
                Upload File
                <input type='file' name='profile_image' accept="image/*" onChange={fileHandler} style={{display:"none"}}/>
            </label>

        </div>
        <div className="error font-normal text-red-700 text-sm">{errors}</div>
        <div className=" monster flex justify-between gap-3 w-full px-5 pb-5">
          <button
            onClick={() => handleSave()}
            className="btn primary-btn"
          >
            Save
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
 
export default ProfileModal;