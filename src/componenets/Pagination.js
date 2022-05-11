import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

//import { getPosts } from '../actions/posts';
import useStyles from './styles';
import { getPosts } from '../redux/actions/action';

const Paginate = ({ page }) => {
  //const  {}  = useSelector((state) => state.alldata);
  //numberOfPages
  const dispatch = useDispatch();
  const {numberOfPages} = useSelector(state=>state.alldata)
  //console.log(posts,'plokiko');
  const classes = useStyles();

  useEffect(() => {
    //console.log(Number(page));
    if (page) {
      dispatch(getPosts(page));
      //console.log('pagesss');
    }
  }, [dispatch,page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page)||1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;