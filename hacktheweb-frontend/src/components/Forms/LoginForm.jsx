import React, { useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import { logIn } from '../../helpers/auth.helpers';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice';

const initialState = {
  email: '',
  password: '',
};
Modal.setAppElement('#root');

const LoginForm = ({ isOpen,handleCloseViewModal,handleOpenRegisterModal }) => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignIn() {
    const { data, message, errorMessages } = await logIn(inputState);
    if (errorMessages) {
      setErrors(errorMessages[0]);
      return;
    } else if (message) {
      setErrors(message);
      return;
    }
    if (data) {
      const user = {
        user_id: data.user.id,
        token: data.token,
        name: data.user.name,
        type_id: data.user.type_id,
        rank: data.rank,
      };
      dispatch(loginUser(user));
      navigate('/user-dashboard');
    }
  }

  const { email, password } = inputState;
  return (
      <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseViewModal}
      className="z-30 transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border dark:bg-slate-900 dark:text-slate-200 signIn-container flex flex-col items-center gap-5 insta-border rounded-2xl shadow-lg"
      overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
      >
      <h4 className="p-4">
        Login
      </h4>
      <div className="form-container flex flex-col gap-5 p-6 pb-0 ">
        <CustomInput
          label="Email"
          name="email"
          type="text"
          onChange={onChange}
          value={email}
          className={'w-[300px]'}
          labelStyle={{color: 'white'}}
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          className={'w-[300px]'}
        />
      </div>
      <div className="error font-normal text-red-700 text-sm">{errors}</div>
      <div className=" monster flex justify-between gap-3 w-full px-5 pb-5">
        <button
          onClick={() => handleSignIn()}
          className="btn primary-btn"
        >
          Sign In
        </button>
        <button
          onClick={handleCloseViewModal}
          className="btn"
        >
          Cancel
        </button>
      </div>
      <div className='p-5'>
        Want to <span className="cursor-pointer text-color-main" onClick={()=>{handleCloseViewModal(); handleOpenRegisterModal();}}>register</span>?
      </div>
    </Modal>
  );
};

export default LoginForm;
