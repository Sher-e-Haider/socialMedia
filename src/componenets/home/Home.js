import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Form from '../form/Form'
import {  getPostsBySearch } from '../../redux/actions/action'
import { useState } from 'react'
import Posts from '../posts/Posts'
import { Grow } from '@mui/material'
import { Container } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import useStyles from '../../styles'
import Appbar from '../appbar/appbar'
import { useNavigate,useLocation } from 'react-router-dom'
import Paginate from '../Pagination'
import { Paper } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import { AppBar } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const [currentId,setCurrentId] = useState(null)
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
    const dispatch=useDispatch()
    const query = useQuery();
   const page = query.get('page') || 1;
   const searchQuery = query.get('searchQuery');

  
   const history = useNavigate();

    const data =JSON.parse(localStorage.getItem('profile'))
    const classes = useStyles();
    
     

      
      const searchPost = () => {
        
        if (search.trim() || tags) {
          dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
         
          history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`,{replace:true});
        } else {
          history('/',{replace:true});
        }
      };

      const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
          searchPost();
        }
      };
     
  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <div>

<Appbar/>
    <Grow in>
    <Container maxWidth="xl">
      <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={2}>
        <Grid item xs={12} sm={7} md={9}>
          <Posts setCurrentId={setCurrentId}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3} >
        <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
          <Form currentId={currentId} setCurrentId= {setCurrentId}/>
          {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
        </Grid>
      </Grid>
    </Container>
  </Grow> 
  </div>
    // <div>
   
  
     
  
   
    //    <Form currentId={currentId} setCurrentId={setCurrentId}  />
    
  
    
    
    //    {
    //    posts &&(
    //      <ul className="cards">
    //    {
    //      posts.map((x,i)=>(
    //       <div key={x._id} >
          
    //      <div className='single_card'>
    //            <Posts key={x._id} x={x} currentId={currentId} data={data} setCurrentId={setCurrentId} />
           
    //          </div>
          
            
          
             
          
            
            
         
          
    //        </div>
           
           
    //      ))
    //    }
    //    </ul>
    //    )
    //  } 
      
    // </div>
   
  )
}

export default Home
