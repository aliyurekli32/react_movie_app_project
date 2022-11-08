import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';

import Context from '../context/AuthContext';
import { useContext } from 'react';



export default function Register() {
    const {userInformations,setUserInformations, register}=useContext(Context);

  return (
    <CssVarsProvider>
      <main>
       
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign up to continue.</Typography>
          </div>
          <TextField
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            value={userInformations.registerEmail}
            // pass down to FormLabel as children
            label="Email"
            onChange={(e)=>{setUserInformations({...userInformations, registerEmail:e.target.value})}}
          />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            value={userInformations.registerPassword}
            onChange={(e)=>{setUserInformations({...userInformations, registerPassword:e.target.value})}}
          />
          <Button onClick={register} sx={{ mt: 1 /* margin top */ }}>Register</Button>
          <Typography
            endDecorator=""
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}