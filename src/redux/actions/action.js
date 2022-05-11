import Axios from "axios"

const API = Axios.create({ baseURL: 'https://social-sahil.herokuapp.com' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

//const url = 'http://localhost:5000/api'

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });

    const { data } = await API.get(`/api/${id}`);

    dispatch({ type: 'FETCH_POST', payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};
export const getPosts=(page)=>async(dispatch)=>{
   
    try {
      dispatch({ type: 'START_LOADING' });
      const { data: { data, currentPage, numberOfPages } } = await API.get(`/api?page=${page}`)
        
        //console.log(data,'get');
        dispatch({type:"FETCH",payload:{ data, currentPage, numberOfPages }})
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
       
        console.log(error.message);
    }
}

export const createPosts=(newPost)=>async(dispatch)=>{
   
    try {
      dispatch({ type: 'START_LOADING' });
        const {data} = await API.post('/api',newPost)
        dispatch({type:"CREATE",payload:data})
    } catch (error) {
       
       console.log(error.message);
    }
}

// export const createPosts = (postData)=> async(dispatch)=>{
//     dispatch({type:CREATEREQUEST})
//     try {
//         const {data} = await Axios.post(url,postData)
//         dispatch({type:CREATESUCCESS,payload:data})
//     } catch (error) {
//         dispatch({type:CREATEFAIL,payload:error})
//     }
// }



export const deletePost=(id)=>async(dispatch)=>{
  
    try {
        const {data} =await await API.delete(`/api/delete/${id}`)
        dispatch({type:"DELETE",payload:id})
    } catch (error) {
       
       console.log(error.message);
    }
}

export const updatePost=(id,post)=>async(dispatch)=>{
  
    try {
        const {data} = await API.patch(`/api/update/${id}`,post)
        dispatch({type:"UPDATE",payload:data})
    } catch (error) {
       
       console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
  
    try {
      const { data } = await API.patch(`/api/like/${id}/likepost`, user?.token);
  
      dispatch({ type: "LIKE", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: 'START_LOADING' });
      const { data: { data } } = await API.get(`/api/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
      //console.log(data,'pppp');
      dispatch({ type: "FETCH_BY_SEARCH", payload:  data  });
      dispatch({ type: 'END_LOADING' });
      
    } catch (error) {
      console.log(error);
    }
  };

  export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await API.post(`/api/${id}/commentpost`,{value});
   console.log(data,'commentpost');
      dispatch({ type: "COMMENT", payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };