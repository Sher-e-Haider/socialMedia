// export const fetchData= (product=[],action)=>{
//     switch(action.type){
//      //    case "REQUEST":
//      //        return {
//      //            product:[],
//      //            loading:false
//      //        }
//          case "FETCH":
//              return action.payload
                
             
//              // case "FAIL":
//              //     return {
//              //        product:action.payload,
//              //        loading:false
//              //     }
//              case "CREATE":
//                  return [...product,action.payload]
//                  case "COMMENT":
//                     return product.map((post) => {
//                         if (post._id === action.payload._id) {
//                           return action.payload;
//                         }
//                         return post;
//                       })
                    
            
//              case "DELETE":
//                  return product.filter(x=>x._id!==action.payload)
//              case "UPDATE":
//             case "LIKE":
//                      return product.map(x=>x._id===action.payload._id?action.payload:x)
                 
//      default:
//          return product
//     }
//  }


export const fetchData= (state = { isLoading: false, posts: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case "FETCH":
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case "FETCH_BY_SEARCH":
      return { ...state, posts: action.payload };
    case "FETCH_POST":
      return { ...state, post: action.payload.post };
    case "LIKE":
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case "COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case "CREATE":
      return { ...state, posts: [...state.posts, action.payload] };
    case "UPDATE":
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case "DELETE":
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};