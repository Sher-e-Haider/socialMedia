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
//import {deletePost,likePost} from '../../../actions/posts'

const Post=({post,setCurrentId})=> {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    //const p = useSelector((state) => state.alldata);
    //console.log(p,'posts')
    const history = useNavigate();
    //console.log(user,'user');
    const dispatch = useDispatch()
   //console.log(post,'posts');
    const Likes = () => {
      if (post?.likes?.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
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
             <Typography variant="body2">{moment(post.createAt).fromNow()}</Typography>
             
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
               <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
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


