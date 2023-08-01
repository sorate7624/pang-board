import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from '../components/Board';

const BoardDetail = () => {
  const DEVELOP_URL = 'http://api.hyoshincopy.com';
  const { id } = useParams();
  const [boardList, setBoardList] = useState({});

  useEffect(() => {
    const getBoardList = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${DEVELOP_URL}/board`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const dataList = response.data.data_list.find(
          (item) => item.id === Number(id)
        );
        setBoardList(dataList);
      } catch (error) {
        console.log('error', error);
      }
    };
    getBoardList();
  }, [id]);

  return (
    <>
      <Board boardList={boardList} />
    </>
  );
};

export default BoardDetail;
