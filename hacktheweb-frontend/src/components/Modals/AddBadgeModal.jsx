import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBadge } from '../../helpers/admin.helpers';
import { modifyBadge, setBadges } from '../../slices/labSlice';
import CustomInput from '../Inputs/CustomInput';
import Select from 'react-select/dist/declarations/src/Select';

const AddBadgeModal = ({badge,token,isOpen,handleCloseViewModal}) => {
    const initial_state = {
        name: badge ? badge.name : '',
        category_id: badge ? badge.category_id : '',
      };
      const [inputState, setInputState] = useState(initial_state);
      const [errors, setErrors] = useState('');
      const dispatch = useDispatch();
      const navigate=useNavigate();
      const categories = useSelector((state) => state.labs.badgeCategories);
      const badges = useSelector((state) => state.labs.badges);
      const [selectedImageName, setSelectedImageName] = useState('');

      const category_options = categories.map((category) => ({
        value: category.id,
        label: category.category,
      }));
      
    useEffect(() => {
        setInputState(initial_state);
        setErrors('');
        setSelectedImageName('');
    }, [isOpen]);

    function onChange(e) {
        const { value, name } = e.target;
          setInputState((prev) => ({ ...prev, [name]: value }));
    }

    const handleAction = async () => {
        setErrors('');
        if (badge) {
            const modifiedInput = {};

            for (const key in inputState) {
                if (inputState[key] !== initial_state[key]) {
                  modifiedInput[key] = inputState[key];
                }
              }
              if (Object.keys(modifiedInput).length === 0) {
                console.log("No changes to submit.");
                return;
              }
          const { data, message, errorMessages } = await updateBadge(token, badge.id, modifiedInput);
          if (errorMessages) {
            setErrors(errorMessages[0]);
          } else if (message) {
            setErrors(message);
          } else if (message && message === "Unauthenticated.") {
            navigate("/");
          } else if (data && data.badge) {
            dispatch(modifyBadge(data.badge));
          }
        } else {
          const { data, message, errorMessages } = await addBadge(token, inputState);
          if (errorMessages) {
            setErrors(errorMessages[0]);
          } else if (message) {
            setErrors(message);
          } else if (message && message === "Unauthenticated.") {
            navigate("/");
          } else if (data && data.badge) {
            dispatch(setBadges([...badges, data.badge]));
            handleCloseViewModal();
          }
    }
    }
    function fileHandler(e) {
        let selectedImage = e.target.files[0];
        if (!selectedImage) {
        console.log('Please select an image.');
        return;
        }
        const reader = new FileReader();
        reader.onloadend = function () {
            const base64Image = reader.result.split(',')[1];
            setInputState((prev) => ({ ...prev, [e.target.name]: base64Image }));
            setSelectedImageName(selectedImage.name);

        };
        reader.readAsDataURL(selectedImage);
    }
    const { name,category_id}=inputState;

    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border dark:bg-slate-900 dark:text-slate-200 signIn-container flex flex-col items-center gap-5 rounded-2xl shadow-lg"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
      >
        <CustomInput
            label="Name"
            name="name"
            type="text"
            onChange={onChange}
            value={name}
            placeholder="Name"
          />
            <label  className='uppercase'>
                Category   
            </label>
            <Select 
            name="category_id" 
            value={category_options.find(option => option.value === category_id)}
            onChange={(selectedOption) => setInputState((prev) => ({ ...prev, category_id: selectedOption.value }))}
            options={category_options} 
            placeholder='Select a difficulty'
            >
            </Select> 
        <div className='flex flex-col basis-full self-stretch justify-end'>
          {selectedImageName && <p>Selected Image: {selectedImageName}</p>}
          <label className="btn-2 secondary-btn self-start">
            Upload File
            <input type="file" name="icon" accept="image/*" onChange={fileHandler} style={{ display: 'none' }} />
            </label>
          </div>
      </Modal>
    );
}
 
export default AddBadgeModal;