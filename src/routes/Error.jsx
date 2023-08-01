import errorStyles from '../scss/error.module.scss';
const Error = ({ props }) => {
  console.log('props', props);

  return (
    <>
      <main className={errorStyles['container']}>
        <div className={errorStyles['error-area']}>
          <p className={errorStyles['error']}>404</p>
          <p className={errorStyles['error-text']}>ERROR</p>
        </div>
      </main>
    </>
  );
};

export default Error;
