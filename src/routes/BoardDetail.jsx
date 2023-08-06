import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectBoardList } from '../actions/detailActions';
import axios from 'axios';
import Board from '../components/Board';
import { DEVELOP_URL } from '../consts/consts';

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectBoardList = useSelector((state) => state.detail.selectBoardList);

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
        dispatch(setSelectBoardList(dataList));
      } catch (error) {
        console.log('error', error);
        navigate('/error', { state: error });
      }
    };
    getBoardList();
  }, [id, navigate]);

  return (
    <>
      <Board boardList={selectBoardList} />
    </>
  );
};

export default BoardDetail;
