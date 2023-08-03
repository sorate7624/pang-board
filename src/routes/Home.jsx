import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import signinStyles from '../scss/signin.module.scss';
import classNames from 'classnames';
import {
  faEye,
  faEyeSlash,
  faTriangleExclamation,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const DEVELOP_URL = 'http://api.hyoshincopy.com';

const Home = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorSignin, setErrorSignin] = useState('');
  const [errorSignup, setErrorSignup] = useState('');
  const [successSignup, setSuccessSignup] = useState('');
  const [eyeIconVisible, setEyeIconVisible] = useState(false);
  const [isSigninActive, setIsSigninActive] = useState(true);

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setEyeIconVisible(!eyeIconVisible);
  };

  const signinMutation = useMutation(
    (newPost) =>
      axios.post(
        `${DEVELOP_URL}/signin`,
        {
          ...newPost,
        },
        {
          withCredentials: true,
        }
      ),
    {
      onError: (error) => {
        const errorCode = error.response?.status;
        if (errorCode === 400) {
          setErrorSignin('Invalid ID/Password. Please try again.');
        } else {
          setErrorSignin('Server error. Please Contact Pang.');
        }
      },
      onSuccess: (data) => {
        setErrorSignin('');
        const token = data.data.token;
        console.log('token:', token);

        if (state) {
          navigate(state);
        } else {
          localStorage.setItem('userId', id);
          localStorage.setItem('token', token);
          navigate('/board');
        }
      },
    }
  );

  const handleSigninSubmit = async (event) => {
    event.preventDefault();

    signinMutation.mutate({
      signinId: id,
      signinPw: password,
    });
  };

  const signupMutation = useMutation(
    (newPost) =>
      axios.post(
        `${DEVELOP_URL}/signup`,
        {
          ...newPost,
        },
        {
          withCredentials: true,
        }
      ),
    {
      onError: (error) => {
        const errorCode = error.response?.status;
        setSuccessSignup('');
        if (errorCode === 400) {
          setErrorSignup('ID is duplicated.');
        } else {
          setErrorSignup('Server error. Please Contact Pang.');
        }
        console.error('회원 등록 실패:', error.message);
        console.log(error);
      },
      onSuccess: () => {
        setErrorSignup('');
        setSuccessSignup('Sign up is complete. Please log in.');
      },
    }
  );

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    signupMutation.mutate({
      signupId: id,
      signupPw: password,
    });
  };

  const toggleSigninButton = (event) => {
    const isSigninButton =
      event.target.getAttribute('data-status') === 'signin';

    setIsSigninActive(isSigninButton);
    setId('');
    setPassword('');
    setEyeIconVisible(false);
    setErrorSignin('');
    setErrorSignup('');
    setSuccessSignup('');
  };

  return (
    <>
      <main className={signinStyles['container']}>
        <div
          className={classNames(
            signinStyles['box'],
            'animate__animated animate__fadeIn'
          )}
        >
          {isSigninActive ? (
            <>
              <div className={signinStyles['top-header']}>
                <h3>Welcome, Pang board</h3>
                <small>We are happy to have you back.</small>
              </div>
              <div
                className={signinStyles['switch']}
                onClick={toggleSigninButton}
              >
                <button
                  className={classNames(
                    signinStyles['signin'],
                    signinStyles['btn-active']
                  )}
                  data-status="signin"
                >
                  Sign In
                </button>
                <button className={signinStyles['signup']} data-status="signup">
                  Sign Up
                </button>
              </div>
              <form
                className={signinStyles['box-signin']}
                onSubmit={handleSigninSubmit}
              >
                <div className={signinStyles['input-group']}>
                  <div className={signinStyles['input-field']}>
                    <input
                      type="text"
                      value={id}
                      onChange={handleIdChange}
                      id="signinId"
                      required
                      className={signinStyles['input-box']}
                    />
                    <label htmlFor="signinId">ID</label>
                  </div>
                  <div className={signinStyles['input-field']}>
                    <input
                      type={eyeIconVisible ? 'text' : 'password'}
                      id="signinPassword"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      className={signinStyles['input-box']}
                    />
                    <label htmlFor="signinPassword">Password</label>
                    <div className={signinStyles['eye-area']}>
                      <div
                        className={signinStyles['eye-box']}
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={eyeIconVisible ? faEye : faEyeSlash}
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className={classNames(
                      signinStyles['input-submit'],
                      signinStyles['signin']
                    )}
                    value="Sign In"
                  />
                </div>
                {errorSignin && (
                  <p className={signinStyles['notice-txt']}>
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    {errorSignin}
                  </p>
                )}
              </form>
            </>
          ) : (
            <>
              <div className={signinStyles['top-header']}>
                <h3>Sign Up, Now</h3>
                <small>We are happy to have you with us.</small>
              </div>
              <div
                className={signinStyles['switch']}
                onClick={toggleSigninButton}
              >
                <button className={signinStyles['signin']} data-status="signin">
                  Sign In
                </button>
                <button
                  className={classNames(
                    signinStyles['signup'],
                    signinStyles['btn-active']
                  )}
                  data-status="signup"
                >
                  Sign Up
                </button>
              </div>
              <form
                className={signinStyles['box-signup']}
                onSubmit={handleSignupSubmit}
              >
                <div className={signinStyles['input-group']}>
                  <div className={signinStyles['input-field']}>
                    <input
                      type="text"
                      value={id}
                      onChange={handleIdChange}
                      id="signupId"
                      required
                      className={signinStyles['input-box']}
                    />
                    <label htmlFor="signupId">ID</label>
                  </div>
                  <div className={signinStyles['input-field']}>
                    <input
                      type={eyeIconVisible ? 'text' : 'password'}
                      id="signupPassword"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      className={signinStyles['input-box']}
                    />
                    <label htmlFor="signupPassword">Password</label>
                    <div className={signinStyles['eye-area']}>
                      <div
                        className={signinStyles['eye-box']}
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={eyeIconVisible ? faEye : faEyeSlash}
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className={classNames(
                      signinStyles['input-submit'],
                      signinStyles['signup']
                    )}
                    value="Sign Up"
                  />
                </div>
                {errorSignup && (
                  <p className={signinStyles['notice-txt']}>
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    {errorSignup}
                  </p>
                )}
                {successSignup && (
                  <p
                    className={classNames(
                      signinStyles['notice-txt'],
                      signinStyles['success']
                    )}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                    {successSignup}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
