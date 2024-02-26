import { like } from '../slices/photoSlice';

const useHandleLike = (dispatch, resetComponentMessage) => {
  return (photo) => {
    dispatch(like(photo._id));

    resetComponentMessage();
  };
};

export default useHandleLike;
