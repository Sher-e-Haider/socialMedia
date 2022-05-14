import React from 'react'
import useStyles from './styles'
import {Card , CardActions, CardContent, CardMedia, Button ,Typography, ButtonBase} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
//import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import { deletePost, getPost, likePost } from '../../../redux/actions/action'
import moment from 'moment'
import { ThumbUpAltOutlined } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
//import {deletePost,likePost} from '../../../actions/posts'

const Post=({post,setCurrentId})=> {
  const [likes, setLikes] = useState(post?.likes);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
   
    const history = useNavigate();
    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = post?.likes?.find((like) => like === userId);
  
    const dispatch = useDispatch()
    const handleLike =async () => {
      dispatch(likePost(post._id));
  
      if (hasLikedPost) {
        setLikes(post?.likes?.filter((id) => id !== userId));
      } else {
        setLikes([...post.likes, userId]);
      }
    };
  
    const Likes = () => {
      if (likes.length > 0) {
        return likes.find((like) => like === (userId))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = (e) => {
      //dispatch(getPost(post._id, history));
    console.log('replace');
      history(`/posts/${post._id}`,{replace:true});
    };
   
    return (
        <Card className={classes.card}  >
             
         <div onClick={openPost}>
             <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
             </div>
             {/* </ButtonBase> */}
             <div className={classes.overlay}>
             <Typography variant="h6">{post.name}</Typography>
             <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
             
             </div>
             {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
             <div className={classes.overlay2}>
                <Button style={{color:"white"}} size="small" onClick={()=>setCurrentId(post._id)}>
                   <MoreHorizIcon fontSize="default"/>
                </Button>
             </div>
             )}
             <div className={classes.details}>
              <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
              
             </div>
             <Typography variant="h5" className={classes.title}>{post.title}</Typography>
             <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
             </CardContent>
            
             <CardActions className={classes.post}>
               <Button size="small" color="primary" onClick={handleLike}>
                  {/* <ThumbUpAltIcon fontSize="small"/> */}
                 <Likes/>
                   {/* {post.likeCount} */}
               </Button>
              
               {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
               <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                  <DeleteIcon fontSize="small"/>
                  
                  
               </Button>
               
               )}
             </CardActions>
             {/* </ButtonBase> */}
       </Card>
    )
}

export default Post


