import Modal from 'react-modal';
import CustomInput from '../Inputs/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from '../Inputs/TextArea';
import { useEffect, useState } from 'react';
import { addLab, updateLab } from '../../helpers/admin.helpers';
import Select from 'react-select';
import { modifyLab, setLabs } from '../../slices/labSlice';
import { useNavigate } from 'react-router-dom';

const AddLabModal = ({lab,token,isOpen,handleCloseViewModal}) => {
    const initial_state = {
        name: lab ? lab.name : '',
        objective: lab ? lab.objective : '',
        difficulty_id: lab ? lab.difficulty_id : 1,
        category_id: lab ? lab.category_id : 1,
        launch_api: lab ? lab.launch_api : '',
        reward: lab ? lab.reward : '',
        icon: '',
      };
    const [inputState, setInputState] = useState(initial_state);
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const categories = useSelector((state) => state.labs.labCategories);
    const difficulties = useSelector((state) => state.labs.labDifficulties);
    const labs = useSelector((state) => state.labs.labs);
    const [selectedImageName, setSelectedImageName] = useState('');

    const category_options = categories.map((category) => ({
        value: category.id,
        label: category.category,
      }));
      const difficulty_options = difficulties.map((difficulty) => ({
        value: difficulty.id,
        label: difficulty.difficulty,
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
        const modifiedInput = {};

        if (lab) {
          for (const key in inputState) {
            if (inputState[key] !== initial_state[key]) {
              modifiedInput[key] = inputState[key];
            }
          }
        } else {
          modifiedInput = { ...inputState };
        }
      
        if (Object.keys(modifiedInput).length === 0) {
          console.log("No changes to submit.");
          return;
        }
        if (lab) {
          const { data, message, errorMessages } = await updateLab(token, lab.id, modifiedInput);
          if (errorMessages) {
            setErrors(errorMessages[0]);
          } else if (message) {
            setErrors(message);
          } else if (message && message === "Unauthenticated.") {
            navigate("/");
          } else if (data && data.lab) {
            dispatch(modifyLab(data.lab));
          }
        } else {
          const { data, message, errorMessages } = await addLab(token, inputState);
          if (errorMessages) {
            setErrors(errorMessages[0]);
          } else if (message) {
            setErrors(message);
          } else if (message && message === "Unauthenticated.") {
            navigate("/");
          } else if (data && data.lab) {
            dispatch(setLabs([...labs, data.lab]));
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

    const { name,objective,difficulty_id,category_id,launch_api,reward,icon}=inputState;
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border dark:bg-slate-900 dark:text-slate-200 signIn-container flex flex-col items-center gap-5 rounded-2xl shadow-lg"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
      >
        <h4 className="p-4">Add Lab</h4>
        <div className="flex flex-row gap-5 p-6 pb-0">
        <div className='flex flex-col gap-5 basis-[50%]'>
        <CustomInput
            label="Name"
            name="name"
            type="text"
            onChange={onChange}
            value={name}
            placeholder="Name"
          />
        <CustomInput
            label="Reward"
            name="reward"
            type="number"
            onChange={onChange}
            value={reward}
            placeholder="Reward"
          />
            <CustomInput
            label="Launch API"
            name="launch_api"
            type="text"
            onChange={onChange}
            value={launch_api}
            placeholder="Launch API"
          />
          <div className='flex flex-col basis-full self-stretch justify-end'>
          {selectedImageName && <p>Selected Image: {selectedImageName}</p>}
          <label className="btn-2 secondary-btn self-start">
            Upload File
            <input type="file" name="icon" accept="image/*" onChange={fileHandler} style={{ display: 'none' }} />
            </label>
          </div>

        </div>
        <div className='flex flex-col gap-5 basis-[50%]'>
            <div className='flex flex-col gap-2'>
            <label className='uppercase'>
            Difficulty   
            </label>
            <Select 
            name="difficulty_id" 
            value={difficulty_options.find(option => option.value === difficulty_id)}
            onChange={(selectedOption) => setInputState((prev) => ({ ...prev, difficulty_id: selectedOption.value }))}
            options={difficulty_options} 
            placeholder='Select a category'
            >
            </Select> 
            </div>
 
            <div className='flex flex-col gap-2'>
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
            </div>
        
            <TextArea
            label="Objective"
            name="objective"
            onChange={onChange}
            value={objective}
            placeholder="Objective"
            />
        </div>
        </div>

        <div className="error font-normal text-red-700 text-sm">{errors}</div>
        <div className=" monster flex justify-between gap-3 w-full px-5 pb-5">
          <button onClick={() => handleAction()} className="btn primary-btn">
            {lab ? 'Modify' : 'Add'}
          </button>

          <button onClick={handleCloseViewModal} className="btn">
            Cancel
          </button>
        </div>
      </Modal>
     );
}
 
export default AddLabModal;