import React, { useState } from 'react';
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

const RegisterForm = ({ isOpen, handleCloseViewModal }) => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

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
    }
  }

  const { email, password ,name} = inputState;
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={handleCloseViewModal}
    className="z-30  transition-opacity fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border dark:bg-slate-900 bg-white dark:text-slate-200 signIn-container text-black  text-lg   flex flex-col items-center gap-5 insta-border rounded-2xl "
    overlayClassName="bg fixed top-0 z-10 left-0 w-[100vw] h-full bg-opacity-20 backdrop-blur-sm drop-shadow-lg "
    >
      <div className=" dark:bg-slate-900 form-header gothic justify-center flex p-6 w-full rounded-t-2xl text-black ">

        Register
      </div>
      <div className="form-container flex flex-col gap-5 p-6 pb-0 ">
      <CustomInput
          label="Name"
          name="name"
          type="text"
          onChange={onChange}
          value={name}
          className={'w-[300px]  '}
        />
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
          label="password"
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          className={'w-[300px]'}
        />
        
      </div>
      <div className="error font-normal text-red-700 text-sm">{errors}</div>
      <div className=" monster flex  gap-3 w-full px-5 pb-5">
        <div
          onClick={() => handleRegister()}
          className="btn btn-primary"
        >
          Add User
        </div>
        <div
          onClick={handleCloseViewModal}
          className="btn"
        >
          Cancel
        </div>
      </div>
    </Modal>
  );
};

export default RegisterForm;
