import { useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../public/pang-board.png';
import signoutDoor from '../../public/signout-door.png';
import signoutArrow from '../../public/signout-arrow.png';
import variables from '../scss/variables.module.scss';
import headerStyles from '../scss/header.module.scss';
import classNames from 'classnames';
import 'animate.css/animate.min.css';
import axios from 'axios';
import { DEVELOP_URL } from '../consts/consts';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isBoardPage = location.pathname === '/board';

  useMemo(() => isBoardPage, [isBoardPage]);

  const handleSignout = async () => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.post(
        `${DEVELOP_URL}/signout`,
        {
          userId: userId,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.log('에러 페이지');
    }
  };

  return (
    <>
      <header
        className={classNames(headerStyles['header'], {
          [headerStyles['list']]: isBoardPage,
        })}
      >
        <h1
          className={classNames(
            headerStyles['logo'],
            'animate__animated animate__bounce'
          )}
        >
          <img src={logo} alt="pang-board-icon" />
          <Link style={{ color: variables.lavenderColor }}>Pang Board</Link>
        </h1>
        {isBoardPage && (
          <>
            <button
              className={headerStyles['btn-signout']}
              onClick={handleSignout}
            >
              <figure className={headerStyles['signout']}>
                <img src={signoutDoor} alt="signout-door-icon" />
                <img
                  src={signoutArrow}
                  alt="signout-arrow-icon"
                  className={headerStyles['arrow']}
                />
              </figure>
              Sign out
            </button>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
// export default React.memo(Header);
