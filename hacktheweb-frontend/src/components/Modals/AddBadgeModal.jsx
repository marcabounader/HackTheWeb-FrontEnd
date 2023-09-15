import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddBadgeModal = ({token,isOpen,handleCloseViewModal}) => {
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
      
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border dark:bg-slate-900 dark:text-slate-200 signIn-container flex flex-col items-center gap-5 rounded-2xl shadow-lg"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
      >

      </Modal>
    );
}
 
export default AddBadgeModal;