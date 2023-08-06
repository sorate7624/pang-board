import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import {
  faArrowLeft,
  faEye,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import detailStyles from '../scss/detail.module.scss';
import 'animate.css/animate.min.css';
import classNames from 'classnames';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '@sweetalert2/themes/dark/dark.scss';
import '../css/custom-sweetalert2.css';

const DEVELOP_URL = 'http://api.hyoshincopy.com';

const Board = ({ boardList }) => {
  const navigate = useNavigate();
  const { id, title, content, created_at, updated_at, author, views, likes } =
    boardList;
  const [isWriter, setIsWriter] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (author === userId) {
      setIsWriter(true);
    }
  }, [boardList]);

  const moveToUpdate = () => {
    navigate(`/board/update/${id}`, {
      state: {
        title: title,
        content: content,
      },
    });
  };

  const deleteMutation = useMutation(
    (newPost) =>
      axios.delete(
        `${DEVELOP_URL}/board`,
        {
          data: {
            ...newPost,
          },
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
          text: 'Post delete is failed.',
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
      onSuccess: (response) => {
        console.log(response);
        Swal.fire({
          title: 'Success',
          text: 'Post delete is complete.',
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

  const deleteBoard = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff5252',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Delete',
      customClass: {
        popup: 'dark-mode popup',
        confirmButton: 'dark-mode btn',
        cancelButton: 'dark-mode btn',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate({
          boardId: Number(id),
        });
      }
    });
  };

  const moveToList = () => {
    navigate('/board');
  };

  const convertUtcToKst = (utcTime) => {
    const utcDateTime = new Date(utcTime);
    const kstOffset = 9;
    const kstTime = new Date(
      utcDateTime.getTime() + kstOffset * 60 * 60 * 1000
    );

    const year = kstTime.getFullYear().toString().slice(-2);
    const month = String(kstTime.getMonth() + 1).padStart(2, '0');
    const date = String(kstTime.getDate()).padStart(2, '0');
    const hours = String(kstTime.getHours()).padStart(2, '0');
    const minutes = String(kstTime.getMinutes()).padStart(2, '0');
    const kstFormatted = `${year}.${month}.${date} ${hours}:${minutes}`;

    return kstFormatted;
  };

  return (
    <>
      <main
        className={classNames(
          detailStyles['container'],
          'animate__animated animate__fadeInDown'
        )}
      >
        <button className={detailStyles['btn-back']} onClick={moveToList}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
        <div className={detailStyles['card']}>
          <div className={detailStyles['card-inner']}>
            <div className={detailStyles['top-header']}>
              <h3>Detail Pang board</h3>
            </div>
            <div className={detailStyles['contents']}>
              <div className={detailStyles['top-area']}>
                <FontAwesomeIcon icon={faEye} />
                <span>{views}</span>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{likes}</span>
              </div>
              <div
                className={classNames(
                  detailStyles['content-area'],
                  detailStyles['author']
                )}
              >
                <label>Author:</label>
                <span>{author}</span>
              </div>
              <div
                className={classNames(
                  detailStyles['content-area'],
                  detailStyles['title']
                )}
              >
                <label>Title</label>
                <span>{title}</span>
              </div>
              <div
                className={classNames(
                  detailStyles['content-area'],
                  detailStyles['content']
                )}
              >
                <label>Content</label>
                <span>{content}</span>
              </div>
              <div
                className={classNames(
                  detailStyles['content-area'],
                  detailStyles['date']
                )}
              >
                <label>Created Date</label>
                <span>{convertUtcToKst(created_at)}</span>
              </div>
              <div
                className={classNames(
                  detailStyles['content-area'],
                  detailStyles['date']
                )}
              >
                <label>Updated Date</label>
                <span>{convertUtcToKst(updated_at)}</span>
              </div>
            </div>
            {isWriter && (
              <div className={detailStyles['btn-area']}>
                <button
                  onClick={moveToUpdate}
                  className={detailStyles['update']}
                >
                  Update
                </button>
                <button
                  onClick={deleteBoard}
                  className={detailStyles['delete']}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Board;
