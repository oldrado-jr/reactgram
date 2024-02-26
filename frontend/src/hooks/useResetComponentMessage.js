const useResetComponentMessage = (dispatch, resetMessage) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};

export default useResetComponentMessage;
