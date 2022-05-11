import { makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    AppBar:{
    borderRadius:20,
    //  position:'absolute',
    // top:'0px',
    margin:'1px 0',
    
    display:'flex',
    flexDirection:'row',
      justifyContent:'center',
    // alignItems:'center',
    

},
img:{
  display:'flex',
  
  alignItems: 'center',
},
para:{
   fontSize: '5px'
},
image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
//   purple: {
//     color: theme.palette.getContrastText(deepPurple[500]),
//     backgroundColor: deepPurple[500],
//   },
}))

export default useStyles