import emptyStyles from '../scss/empty.module.scss';

const EmptyRows = () => {
  return (
    <div className={emptyStyles['empty']}>
      <p>No data.</p>
      <p>Please write a post.</p>
    </div>
  );
};

export default EmptyRows;
