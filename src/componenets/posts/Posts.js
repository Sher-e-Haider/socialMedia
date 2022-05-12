import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import React from 'react'
import { useSelector } from 'react-redux';
import Post from './post/Post'
import useStyles from './styles'

function Posts({setCurrentId}) {
    const {posts} = useSelector((state)=>state.alldata)
    const classes = useStyles();
  
  
  
    return (
       !posts?.length ? <div><CircularProgress/></div>:(
           <Grid className={classes.container} container alignItems="stretch" spacing={3}>
             {posts?.map((post)=>(
                <Grid key={post._id} item xs={12} md={4} sm={8}>
                   <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>
             ))}
           </Grid>
       )
     
    )
}

export default Posts
