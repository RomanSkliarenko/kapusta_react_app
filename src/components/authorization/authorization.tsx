import * as React from 'react';
import {FC} from 'react';
import {useFormik} from 'formik';
import {useLocation, useNavigate} from 'react-router-dom';
import style from './authorization.module.scss';
import SharedButton from '../../common/sharedButton/sharedButton';
import {validate} from '../../helpers/validate/validate';
import {getIsLogin} from '../../redux/auth/authSelectors';
import {AuthorizationPropsTypes, NavigationHandlerTypes} from './authorizationTypes';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {loginThunk, signUpThunk} from '../../redux/auth/authOperations';

const AuthorizationForm:FC<AuthorizationPropsTypes> = ({ type }):JSX.Element => {

  const formType = { SIGNUP: 'signup', LOGIN: 'login' };
  const { pathname } = useLocation();
  const isLogin = useAppSelector(getIsLogin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginButtonHandler:NavigationHandlerTypes = () => navigate('/login');
  const registerButtonHandler:NavigationHandlerTypes = () => navigate('/register');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values, formikHelpers) => {
      switch (type) {
        case formType.LOGIN:
          dispatch(loginThunk(values)).unwrap().then(() => formik.resetForm());
          break;
        case formType.SIGNUP:
          dispatch(signUpThunk(values)).unwrap().then(() => formik.resetForm());
          break;
      }
    },
  });
  return (
    <div className={style.authFormWrapper}>
      <div className={style.authNavButtonWrapper}>
        <SharedButton className={style.loginNavButton} onClick={loginButtonHandler} active={pathname === '/login'}>
                    LOG IN</SharedButton>
        <SharedButton onClick={registerButtonHandler} active={pathname === '/register'}>REGISTRATION</SharedButton>
      </div>
      {type === formType.LOGIN && <div className={style.loginWithGoogleWrapper}>
        <span className={style.authFormSubText}>You can log in with your Google Account:</span>
        <a href='https://kapusta-backend.goit.global/auth/google'>
          <SharedButton className={style.loginWithGoogleButton} type='button'>
            <div className={style.googleLogo} />
                        GOOGLE</SharedButton>
        </a>
        <span className={style.authFormSubText}>Or log in using an email and password</span>
      </div>}
      {type === formType.SIGNUP &&
                <span className={style.authFormSubText}>You can sign up with your email and password:</span>}
      <form className={style.authForm} onSubmit={formik.handleSubmit}>
        <label htmlFor='email'><span>*</span>Email:</label>
        <input
          onBlur={formik.handleBlur}
          className={style.authInput}
          placeholder='Your@email.com'
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email &&
                    <p className={style.requiredText}>{formik.errors.email}</p>}
        <label htmlFor='password'><span>*</span>Password</label>
        <input
          onBlur={formik.handleBlur}
          className={style.authInput}
          placeholder='Password'
          id='password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password &&
                    <p className={style.requiredText}>{formik.errors.password}</p>}
        <SharedButton disabled={isLogin} className={style.authFormSubmitButton} type='submit'
          active={true}>{type === formType.LOGIN ? 'LOGIN' : 'JOIN'}</SharedButton>
      </form>
    </div>
  );
};

export default AuthorizationForm;