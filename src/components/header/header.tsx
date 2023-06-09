import React, {useState} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import styles from './header.module.scss';
import Modal from '../modal/modal';

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [email] = useState<string>('vurtnevk@gmail.com');
  const [isLogin] = useState<boolean>(true);
  const closeModalHandler = () => setOpenModal(!openModal);
  const logoutConfirmHandler = () => {
    setOpenModal(!openModal);
  };
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <header className={styles.header}>
        {openModal && <Modal closeModalHandler={closeModalHandler} logoutConfirmHandler={logoutConfirmHandler}/>}
        <div className={styles.container}>
          <NavLink to="/home" className={styles.logoNavLink}>
            <div className={styles.logo}/>
          </NavLink>
          {isLogin && (
            <div className={styles.userHeaderMenu}>
              <div className={styles.userIcon}>
                <span className={styles.userNameFirstLetter}>{email.charAt(0).toUpperCase()}</span>
              </div>
              <span className={styles.userEmail}>{email}</span>
              <div className={styles.separator}/>
              <button className={styles.logoutButton} onClick={handleOpenModal}>Exit</button>
              <button className={styles.logoutButtonMobile} onClick={handleOpenModal}/>
            </div>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};