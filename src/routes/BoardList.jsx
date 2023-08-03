import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import boardStyles from '../scss/board.module.scss';
import classNames from 'classnames';
import '../css/custom-grid.css';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import EmptyRows from '../components/EmptyRows';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '@sweetalert2/themes/dark/dark.scss';
import '../css/custom-sweetalert2.css';

const DEVELOP_URL = 'http://api.hyoshincopy.com';

const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [likes, setLikes] = useState(false);
  const [totalRow, setTotalRow] = useState(0);

  const getBoardList = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${DEVELOP_URL}/board`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    setBoardList(response.data.data_list);
    setTotalRow(response.data.data_list.length);
    return response.data.data_list;
  };

  const { isError } = useQuery('boardList', getBoardList, {
    onError: (error) => {
      console.log('Error occurred:', error);
      navigate('/error', { state: error });
    },
  });

  if (isError) {
    navigate('/error');
    return null;
  }

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

  const moveToWrite = () => {
    navigate('/board/write');
  };

  const handleMouseOver = useMemo(() => {
    setIsHovering(true);
  }, []);

  const handleMouseOut = useMemo(() => {
    setIsHovering(false);
  }, []);

  const handleLikes = async (boardId) => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.post(
        `${DEVELOP_URL}/board/likes`,
        {
          boardId,
          userId,
        },
        {
          withCredentials: true,
        }
      );
      const result = response.data.result;
      if (result) {
        console.log('좋아요!!');
        setLikes(true);
      } else {
        console.log('좋아요 취소');
        setLikes(false);
      }
      getBoardList();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error has occurred in Likes.',
        icon: 'error',
        confirmButtonColor: '#ff5252',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'dark-mode popup',
          confirmButton: 'dark-mode btn',
          cancelButton: 'dark-mode btn',
        },
      });
    }
  };

  useEffect(() => {
    getBoardList();
  }, []);

  useEffect(() => {
    setColumns([
      {
        key: 'id',
        name: 'No',
        width: 35,
        renderCell(props) {
          return <>{props.row.id - 1}</>;
        },
      },
      { key: 'author', name: 'Author' },
      {
        key: 'title',
        name: 'Title',
        minWidth: 400,
        renderCell(props) {
          return (
            <Link to={`/board/${props.row.id}`} className="title">
              {props.row.title}
            </Link>
          );
        },
      },
      {
        key: 'updated_at',
        name: 'Update Date',
        renderCell(props) {
          return convertUtcToKst(props.row.updated_at);
        },
      },
      { key: 'views', name: 'Views', width: 100 },
      {
        key: 'likes',
        name: 'Likes',
        width: 100,
        renderCell(props) {
          return (
            <div
              onClick={() => handleLikes(props.row.id)}
              className={likes ? 'likes-cell active' : 'likes-cell'}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              {props.row.likes}
            </div>
          );
        },
      },
    ]);
    const modifiedList = boardList.map((item, index) => ({
      ...item,
      no: totalRow - index,
    }));
    setRows(modifiedList);
  }, [boardList]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
  }, []);

  return (
    <>
      <main className={boardStyles['container']}>
        <button
          onClick={moveToWrite}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className={classNames(boardStyles['btn-write'], {
            'animate__animated animate__pulse': isHovering,
          })}
        >
          Write post
        </button>
        <section className={boardStyles['section']}>
          <DataGrid
            columns={columns}
            rows={rows}
            className="pang-grid"
            headerRowHeight={45}
            style={{ blockSize: 'calc(100%)' }}
            renderers={{ noRowsFallback: <EmptyRows /> }}
          />
        </section>
      </main>
    </>
  );
};

export default BoardList;
