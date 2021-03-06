import { Grid, InputAdornment, TextField,IconButton } from '@material-ui/core'
import React from 'react'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const input = ({name, half,handleShowpassword,label,autoFocus,type,handleChange}) => {

    
    return (
       <Grid item xs={12} sm={half?6:12}>
          <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name==='password'?{
                endAdornment:(
                    <InputAdornment position="end">
                       <IconButton onClick={handleShowpassword}>
                       {type==="password"?<Visibility/>:<VisibilityOff/>}

                       </IconButton>
                    </InputAdornment>
                )
            }:null}
          />
            
         
       </Grid>
    )
}

export default input
