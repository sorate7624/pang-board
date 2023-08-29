import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { setTitle, setContent } from '../actions/writeActions';
import axios from 'axios';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import writeStyles from '../scss/write.module.scss';
import 'animate.css/animate.min.css';
import classNames from 'classnames';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '@sweetalert2/themes/dark/dark.scss';
import '../css/custom-sweetalert2.css';
import { DEVELOP_URL } from '../consts/consts';

const BoardWrite = () => {
  const navigate = useNavigate();
  const author = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const title = useSelector((state) => state.write.title);
  const content = useSelector((state) => state.write.content);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    dispatch(setTitle(newTitle));
  };

  const handleContentChange = (event) => {
    const newContent = event.target.value;
    dispatch(setContent(newContent));
  };

  const writeMutation = useMutation(
    (newPost) =>
      axios.post(
        `${DEVELOP_URL}/board`,
        {
          author: author,
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
          text: 'Post registration is failed.',
          icon: 'error',
          confirmButtonColor: '#ff5252',
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
      onSuccess: () => {
        Swal.fire({
          title: 'Success',
          text: 'Post registration is complete.',
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

  const handleWriteSubmit = (event) => {
    event.preventDefault();

    writeMutation.mutate({
      title,
      content,
    });
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
                  onChange={handleTitleChange}
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
                  onChange={handleContentChange}
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
          </div>
        </form>
      </main>
    </>
  );
};

export default BoardWrite;
