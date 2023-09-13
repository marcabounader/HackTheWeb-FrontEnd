import Modal from 'react-modal';
import CustomInput from '../Inputs/CustomInput';
import { useDispatch } from 'react-redux';
import TextArea from '../Inputs/TextArea';
import { useEffect, useState } from 'react';
import { addLab } from '../../helpers/admin.helpers';
const initial_state=
{ 
name: '',
objective:'',
difficulty_id: '',
category_id: '',
launch_api: '',
reward: '',
icon_url: ''
};

const AddLabModal = ({token,isOpen,handleCloseViewModal}) => {
    const [inputState, setInputState] = useState(initial_state);
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setInputState(initial_state);
        setErrors('');
    }, [isOpen]);
  
    function onChange(e) {
      const { value, name } = e.target;
      setInputState((prev) => ({ ...prev, [name]: value }));
    }
    const handleSave = async () => {
        const { data, message, errorMessages } = await addLab(token, inputState);
        // if (data && data.changes) {

        // }
      };
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
        };
        reader.readAsDataURL(selectedImage);
      }
    const { name,objective,difficulty_id,category_id,launch_api,reward,icon_url}=inputState;
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border dark:bg-slate-900 dark:text-slate-200 signIn-container flex flex-col items-center gap-5 rounded-2xl shadow-lg"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
      >
        <h4 className="p-4">Add Lab</h4>
        <div className="form-container flex flex-col gap-5 p-6 pb-0">
          <CustomInput
            label="Name"
            name="name"
            type="text"
            onChange={onChange}
            value={name}
            className={'w-[300px]'}
            labelStyle={{ color: 'white' }}
            placeholder="Name"
          />
        <CustomInput
            label="Reward"
            name="reward"
            type="number"
            onChange={onChange}
            value={name}
            className={'w-[300px]'}
            labelStyle={{ color: 'white' }}
            placeholder="Reward"
          />
            <CustomInput
            label="Launch API"
            name="launch_api"
            type="text"
            onChange={onChange}
            value={launch_api}
            className={'w-[300px]'}
            labelStyle={{ color: 'white' }}
            placeholder="Launch API"
          />
            <select name="difficulty_id" onChange={onChange}>
                <option value="1">Hard</option>
                <option value="2">Medium</option>
                <option value="3">Easy</option>
            </select>       
            <select name="category_id" onChange={onChange}>
                <option value="1">1</option>
            </select>     
            <TextArea
            label="Objective"
            name="objective"
            onChange={onChange}
            value={objective}
            className={'w-[300px]'}
            labelStyle={{ color: 'white' }}
            placeholder="Objective"
          />
        <label className="btn secondary-btn self-end">
          Upload File
          <input type="file" name="icon_url" accept="image/*" onChange={fileHandler} style={{ display: 'none' }} />
        </label>
        </div>
        <div className="error font-normal text-red-700 text-sm">{errors}</div>
        <div className=" monster flex justify-between gap-3 w-full px-5 pb-5">
          <button onClick={() => handleSave()} className="btn primary-btn">
            Save
          </button>
          <button onClick={handleCloseViewModal} className="btn">
            Cancel
          </button>
        </div>
      </Modal>
     );
}
 
export default AddLabModal;