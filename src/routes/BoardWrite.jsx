import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  faTriangleExclamation,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import writeStyles from '../scss/write.module.scss';
import 'animate.css/animate.min.css';
import classNames from 'classnames';
import Swal from 'sweetalert2';

const BoardWrite = () => {
  const DEVELOP_URL = 'http://api.hyoshincopy.com';
  const navigate = useNavigate();
  const [errorWrite, setErrorWrite] = useState('');

  const [board, setBoard] = useState({
    title: '',
    content: '',
  });

  const { title, content } = board;
  const author = localStorage.getItem('userId');

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const handleWriteSubmit = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.post(
        `${DEVELOP_URL}/board`,
        {
          author: userId,
          title,
          content,
        },
        {
          withCredentials: true,
        }
      );
      Swal.fire({
        title: 'Success',
        text: 'Post registration is complete.',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#48bf91',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'OK',
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate('/board');
        }
      });
      console.log('response.data', response.data);
    } catch (error) {
      setErrorWrite('Failed to write a post. Please Contact Pang.');
    }
  };

  const moveToList = () => {
    navigate('/board');
  };

  return (
    <>
      <main
        className={classNames(
          writeStyles['container'],
          'animate__animated animate__fadeIn'
        )}
      >
        <button className={writeStyles['btn-back']} onClick={moveToList}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
        <div className={writeStyles['top-header']}>
          <h3>Write a Pang board</h3>
        </div>
        <form onSubmit={handleWriteSubmit}>
          <div className={writeStyles['input-group']}>
            <div className={writeStyles['input-field']}>
              <label>Title</label>
              <div className={writeStyles['input-effect']}>
                <input
                  type="text"
                  name="title"
                  className={writeStyles['input-box']}
                  value={title}
                  required
                  onChange={onChange}
                  maxLength={100}
                  placeholder="Enter a title..."
                />
                <span className={writeStyles['focus-border']}>
                  <i></i>
                </span>
              </div>
            </div>
            <div className={writeStyles['input-field']}>
              <label>Content</label>
              <div className={writeStyles['input-effect']}>
                <textarea
                  name="content"
                  cols="30"
                  rows="10"
                  className={classNames(
                    writeStyles['input-box'],
                    writeStyles['textarea']
                  )}
                  value={content}
                  required
                  onChange={onChange}
                  maxLength={1000}
                  placeholder="Enter a content..."
                />
                <span className={writeStyles['focus-border']}>
                  <i></i>
                </span>
              </div>
            </div>
            <div
              className={classNames(
                writeStyles['input-field'],
                writeStyles['readonly']
              )}
            >
              <label>Author</label>
              <span>{author}</span>
            </div>
            <input
              type="submit"
              className={writeStyles['input-submit']}
              value="Write a post"
            />
            {errorWrite && (
              <p className={writeStyles['notice-txt']}>
                <FontAwesomeIcon icon={faTriangleExclamation} />
                {errorWrite}
              </p>
            )}
          </div>
        </form>
      </main>
    </>
  );
};

export default BoardWrite;
