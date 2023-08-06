import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import updateStyles from '../scss/update.module.scss';
import 'animate.css/animate.min.css';
import classNames from 'classnames';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '@sweetalert2/themes/dark/dark.scss';
import '../css/custom-sweetalert2.css';

const DEVELOP_URL = 'http://api.hyoshincopy.com';

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { title, content } = location.state;
  const [updateContent, setUpdateContent] = useState(content);
  const author = localStorage.getItem('userId');

  const onChange = (event) => {
    const { value } = event.target;
    setUpdateContent(value);
  };

  const updateMutation = useMutation(
    (newPost) =>
      axios.put(
        `${DEVELOP_URL}/board`,
        {
          ...newPost,
        },
        {
          withCredentials: true,
        }
      ),
    {
      onError: (error) => {
        console.error('error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Post update is failed.',
          icon: 'error',
          confirmButtonColor: '#ff5252',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'dark-mode popup',
            confirmButton: 'dark-mode btn',
            cancelButton: 'dark-mode btn',
          },
        });
      },
      onSuccess: () => {
        Swal.fire({
          title: 'Success',
          text: 'Post update is complete.',
          icon: 'success',
          confirmButtonColor: '#48bf91',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'dark-mode popup',
            confirmButton: 'dark-mode btn',
            cancelButton: 'dark-mode btn',
          },
        }).then(() => {
          navigate('/board');
        });
      },
    }
  );

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    updateMutation.mutate({
      boardId: Number(id),
      content: updateContent,
    });
  };

  const moveToDetail = () => {
    navigate(`/board/${id}`);
  };

  return (
    <>
      <main
        className={classNames(
          updateStyles['container'],
          'animate__animated animate__fadeIn'
        )}
      >
        <button className={updateStyles['btn-back']} onClick={moveToDetail}>
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
          </div>
        </form>
      </main>
    </>
  );
};

export default BoardUpdate;
