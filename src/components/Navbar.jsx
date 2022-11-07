
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Context from '../context/AuthContext';
import { useContext } from 'react';




const drawerWidth = 240;
const navItems = [{Home:"/"},{Login:"/login"},{Register:"/register"}];
const navItems2 = [{Home:"/"}, {User:'/'}, {Logout:""}];

export default function Navbar(props){
  
    const{user,logout}=useContext(Context);
    
    
    let a=[];
    Boolean(user?.email) ? a=navItems2 : a=navItems ;
    
    
    const navigate=useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        REACT MOVIE APP
      </Typography>
      <Divider />
      <List>
        
        {a.map((item) => (
          <ListItem key={Object.keys(item)[0]} disablePadding>
            <ListItemButton onClick={()=>{Object.keys(item)[0]==="Logout" ? logout() : navigate(`${item[Object.keys(item)[0]]}`)}}  sx={{ textAlign: 'center' }}>
              <ListItemText primary={Object.keys(item)[0]==="User" ? `${user.email}` : Object.keys(item)[0]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            REACT MOVIE APP
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {a.map((item) => (
              <Button onClick={()=>{Object.keys(item)[0]==="Logout" ? logout() : navigate(`${item[Object.keys(item)[0]]}`)}} key={Object.keys(item)[0]} sx={{ color: '#fff' }}>
                {Object.keys(item)[0]==="User" ? `${user.email}` : Object.keys(item)[0] }
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
      </Box>
    </Box>
  );
}