import './App.css';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Home from './componenets/home/Home';
import Auths from './auth/Auths';
import PostDetails from './componenets/postDetails/PostDetails';
import { Container } from '@material-ui/core';

function App() {
  
  return (
   
       <BrowserRouter>
    <Container maxWidth="xl">
   <Routes>
     

      <Route path="/" exact element={<Navigate to="/posts" replace={true}/>} />
          <Route path="/posts"  element={<Home/>} />
          <Route path="/posts/search"  element={<Home/>} />
          <Route path="/posts/:id"  element={<PostDetails/>} />
          <Route path="/auth"  element={<Auths />} />
    
   </Routes>
   </Container>
 </BrowserRouter> 
   
  );
}

export default App;
