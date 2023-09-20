import React, { useEffect, useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import { useNavigate } from 'react-router-dom';
import { register } from '../../helpers/auth.helpers';
import Modal from 'react-modal';

const initialState = {
  email: '',
  password: '',
  name:'',
};
Modal.setAppElement('#root');

const RegisterForm = ({ isOpen, handleCloseViewModal, handleOpenLoginModal, myEmail,setMyEmail}) => {
  const [inputState, setInputState] = useState({...initialState});
  const [errors, setErrors] = useState('');
  useEffect(()=>{
    setInputState((prev) => ({ ...prev, email: myEmail }));
    setMyEmail("");
  },[]);

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleRegister() {
    const { data, message, errorMessages } = await register(inputState);
    if (errorMessages) {
      setErrors(errorMessages[0]);
      return;
    } else if (message) {
      setErrors(message);
      return;
    }
    if (data) {
      handleCloseViewModal();
      handleOpenLoginModal();
    }
  }
  
  const { email, password ,name} = inputState;
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={handleCloseViewModal}
    className="z-30  transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border signIn-container flex flex-col items-center gap-5 rounded-2xl "
    overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
    >
      <h4 className="p-4">
        Register
      </h4>
      <div className="form-container flex flex-col gap-5 p-6 pb-0 ">
      <CustomInput
          label="Email"
          name="email"
          type="text"
          onChange={onChange}
          value={email}
          className={'w-[300px]'}
          labelStyle={{ color: 'white' }}
      />
      <CustomInput
          label="Name"
          name="name"
          type="text"
          onChange={onChange}
          value={name}
          className={'w-[300px]  '}
        />
        <CustomInput
          label="password"
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          className={'w-[300px]'}
        />
        
      </div>
      <div className="error font-normal text-red-700 text-sm">{errors}</div>
      <div className=" monster flex justify-between gap-3 w-full px-5 pb-5">
        <div
          onClick={handleCloseViewModal}
          className="btn"
        >
          Cancel
        </div>
        <div
          onClick={() => handleRegister()}
          className="btn primary-btn"
        >
          Add User
        </div>
      </div>
    </Modal>
  );
};

export default RegisterForm;
