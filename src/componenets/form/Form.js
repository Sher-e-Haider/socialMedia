import React from 'react'
import { useState } from 'react'
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector} from 'react-redux'
// import { AiOutlineEdit } from "react-icons/ai"
import TextField from '@mui/material/TextField'
import {useNavigate} from 'react-router-dom'
// import EditIcon from '@mui/icons-material/Edit';
import { createPosts, getPosts, updatePost } from '../../redux/actions/action'
import { Button, Paper, Typography } from '@mui/material'

// import { signout } from '../../redux/actions/userAction'
// import { useEffect } from 'react'

const Form = ({currentId,setCurrentId}) => {
    const [postData,setPostData] = useState({
        title:'',message:'',tags:'',selectedFile:''
    })
    const dispatch=useDispatch()
    const data = useState(JSON.parse(localStorage.getItem('profile')))
    const posts = useSelector(state=>state.alldata)
    //console.log(data,'dataaa');
    const history = useNavigate()
    const classes = useStyles();
    const handleSubmit=(e)=>{
        e.preventDefault()
       
        if(currentId){
          dispatch(updatePost(currentId,postData))
        }else{
          dispatch(createPosts(postData))
          console.log('create');
        }
        
      
        setCurrentId(null)
        setPostData({title:'',message:'',tags:'',selectedFile:''})
    //       if (!currentId) {
    //         dispatch(createPosts({ ...postData, name: data?.result?.name }));
    //        console.log('create');
    //       } else {
    //         dispatch(updatePost(currentId, { ...postData, name: data?.result?.name }));
           
    //       }
    //       setCurrentId(null)
    //      setPostData({title:'',note:''})
       }
      
  return (
    <div className='form_displays'>
    <Paper className={classes.paper}>
           <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
             <Typography variant="h6">{ currentId? 'Editing':'Creating' } a memory</Typography>
             {/* <TextField name="creator" variant="outlined" label="creator" fullWidth value={postData.creator} onChange={(e)=> setPostData({...postData, creator:e.target.value})}/> */}
             <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title:e.target.value})}/>
             <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e)=> setPostData({...postData, message:e.target.value})}/>
             <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData, tags:e.target.value.split(',')})}/>

             <div className={classes.fileInput}>
               <FileBase type="file" multiple = {false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
             </div>
             <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
             {/* <Button  variant="contained" color="secondary" size="small"  fullWidth>Clear</Button>
            */}
             </form>

        </Paper>
     
     </div>
  )
}

export default Form
