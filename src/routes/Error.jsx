import { Link } from 'react-router-dom';
import errorStyles from '../scss/error.module.scss';

const Error = () => {
  return (
    <>
      <main className={errorStyles['container']}>
        <div className={errorStyles['error-area']}>
          <p className={errorStyles['error-text']}>Error</p>
          <Link to="/" className={errorStyles['link']}>
            Go login page
          </Link>
        </div>
      </main>
    </>
  );
};

export default Error;
