import { makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
   authField:{
         maxWidth: '100%',
        
         
    },
    button:{
       margin:'10px 0',
       padding:'11px 0',
       letterSpacing:'2px',
       fontSize:'15px'
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
      paper: {
        padding: theme.spacing(2),
      },
      form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      googleButton: {
        marginBottom: theme.spacing(1),
        
      },
      signButton:{
        minWidth: '100%'
      }
      


}))

export default useStyles