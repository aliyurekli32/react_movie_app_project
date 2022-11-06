import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import  CardActionArea  from '@mui/material/CardActionArea';
import { Link } from "react-router-dom";



const Main = () => {
  return (
    <>
      <form className="container">
        <TextField
          fullWidth
          label="Search"
          color="primary"
          id="fullWidth"
          sx={{ width: "45%", boxShadow: "10px 5px 15px 0px #1976d2" }}
        />
        <Button sx={{textAlign:"center",height:"55px",marginLeft:"-98px"}} type="submit" variant="contained">Contained</Button>
      </form>
      <Grid sx={{marginTop:"50px"}} container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <Link to="/detail"><Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></Link>
            </Grid>

            
            
      </Grid>
    </>
  );
};
export default Main;
