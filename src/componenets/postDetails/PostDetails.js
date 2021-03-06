import React, { useEffect } from 'react';
import { Paper, Typography, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import Appbar from '../appbar/appbar';
import CommentSection from './CommentSection';
import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../redux/actions/action';
import { useState } from 'react';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostDetails = () => {
  const { post, posts } = useSelector((state) => state.alldata);
  const [recommendedPosts,setRecommendedPosts] = useState('')
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useNavigate()
  const classes = useStyles();
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(getPost(id));
    
  }, [dispatch,id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post,dispatch]);

  
  const openPost = (_id) => history(`/posts/${_id}`,{replace:true});

  useEffect(() => {
    if(posts){
      const re = posts?.filter((x) => x?._id !== post?._id);
      setRecommendedPosts(re)
    }
  
},[])
 
  
   
  
  return (
    <div>

<Appbar/>   
   {

   post &&(
     
       <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
       <ToastContainer position="bottom-center" limit={1} />
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {user.result.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
  {
    posts &&<div>{!!recommendedPosts?.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
   }
      
    </Paper>
    ) }
   </div>
    
  );
};

export default PostDetails;