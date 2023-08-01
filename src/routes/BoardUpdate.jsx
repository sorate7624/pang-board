import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  faTriangleExclamation,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import updateStyles from '../scss/update.module.scss';
import 'animate.css/animate.min.css';
import classNames from 'classnames';
import Swal from 'sweetalert2';

const BoardUpdate = () => {
  const DEVELOP_URL = 'http://api.hyoshincopy.com';
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorUpdate, setErrorUpdate] = useState('');
  const location = useLocation();
  const { title, content } = location.state;
  const [updateContent, setUpdateContent] = useState(content);
  const author = localStorage.getItem('userId');

  const onChange = (event) => {
    const { value } = event.target;
    setUpdateContent(value);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${DEVELOP_URL}/board`,
        {
          boardId: id,
          content,
        },
        {
          withCredentials: true,
        }
      );
      console.log('response.data', response.data);
      Swal.fire({
        title: 'Success',
        text: 'Post update is complete.',
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
    } catch (error) {
      setErrorUpdate('Failed to update a post. Please Contact Pang.');
    }
  };

  const moveToList = () => {
    navigate('/board');
  };

  return (
    <>
      <main
        className={classNames(
          updateStyles['container'],
          'animate__animated animate__fadeIn'
        )}
      >
        <button className={updateStyles['btn-back']} onClick={moveToList}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
        <div className={updateStyles['top-header']}>
          <h3>Update a Pang board</h3>
        </div>
        <form onSubmit={handleUpdateSubmit}>
          <div className={updateStyles['input-group']}>
            <div className={updateStyles['input-field']}>
              <label>Title</label>
              <div className={updateStyles['input-effect']}>
                <input
                  type="text"
                  name="title"
                  className={classNames(
                    updateStyles['input-box'],
                    updateStyles['readonly']
                  )}
                  value={title}
                  required
                  maxLength={100}
                  readOnly
                />
              </div>
            </div>
            <div className={updateStyles['input-field']}>
              <label>Content</label>
              <div className={updateStyles['input-effect']}>
                <textarea
                  name="content"
                  cols="30"
                  rows="10"
                  className={classNames(
                    updateStyles['input-box'],
                    updateStyles['textarea']
                  )}
                  value={updateContent}
                  required
                  onChange={onChange}
                  maxLength={1000}
                />
                <span className={updateStyles['focus-border']}>
                  <i></i>
                </span>
              </div>
            </div>
            <div
              className={classNames(
                updateStyles['input-field'],
                updateStyles['readonly']
              )}
            >
              <label>Author</label>
              <span>{author}</span>
            </div>
            <input
              type="submit"
              className={updateStyles['input-submit']}
              value="Update a post"
            />
            {errorUpdate && (
              <p className={updateStyles['notice-txt']}>
                <FontAwesomeIcon icon={faTriangleExclamation} />
                {errorUpdate}
              </p>
            )}
          </div>
        </form>
      </main>
    </>
  );
};

export default BoardUpdate;
