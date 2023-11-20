import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

export const useLoginModal = () => {
  const dispatch = useDispatch();
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const showLoginModal = () => {
    setIsShowLoginModal(true);
  };
  const hideLoginModal = () => {
    setIsShowLoginModal(false);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return { showLoginModal, hideLoginModal, isShowLoginModal, logoutHandler };
};
