import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import  CardActionArea  from '@mui/material/CardActionArea';
import { Link, useLocation,Navigate } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import YoutubeEmbed from "../components/YoutubeEmbed";
import Context from "../context/AuthContext";
import userEvent from "@testing-library/user-event";

const MovieDetail=()=>{
    const {user}=useContext(Context)
    const[id,setId]=useState();
    const[data1,setData1]=useState([]);
    const[data2,setData2]=useState([]);
    const[count,setCount]=useState(0);
    const location=useLocation();
    console.log(location);
    console.log(count);
    
    

  const api_key = process.env.REACT_APP_MAPI_KEY;
  const url = `https://api.themoviedb.org/3/movie/${location.state.id}?api_key=${api_key}`;
  const url2 =`https://api.themoviedb.org/3/movie/${location.state.id}/videos?api_key=${api_key}`;
  const getMovie1 = async () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData1([data]));
  };
  const getMovie2 = async () => {
    fetch(url2)
      .then((response) => response.json())
      .then((data) => setData2([data]));
  };
  useEffect(() => {
    getMovie1();
    getMovie2();
  }, []);

  console.log(data1);
  console.log(data2);
  

    return(<>
    {user?.email ? <Grid
        sx={{ marginTop: "50px",textAlign:"center"}}
        container
        spacing={2}
      >
        {data1?.map((item,index) => {
          return (<>
            <Grid
            key={index}
            
              item
              xs={12}
              sm={12}
              md={6}
            >
                <Card  sx={{ maxWidth: 575, margin:"auto",position:"relative"}}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="500"
                      image={`https://image.tmdb.org/t/p/w500/${item.backdrop_path ? item.backdrop_path : item.poster_path}`}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {item.original_title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{padding:"2px",width:"450px",margin:"auto",fontSize:"24px"}}
                        color="dark"
                      >
                       {item.overview}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card> 
            </Grid>   
</>
          );
        })}
        {data1?.map((item) => {
          return (<>
            <Grid
            key={item.imdb_id}
            
              item
              xs={12}
              sm={12}
              md={6}
            >
             
<Card sx={{ maxWidth: 575, margin:"auto",position:"relative"}}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="800"
                      image={`https://image.tmdb.org/t/p/w500/${item.poster_path ? item.poster_path : item.backdrop_path}`}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {item.original_title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{position:"absolute",bottom:"70px",padding:"2px"}}
                        color="white"
                      >
                       {item.genres.map((i)=>{return(<span>  {i.name}  </span>)})} 
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>  
            </Grid>   
</>
          );
        })}
      </Grid> : <Navigate to="/"/>}
      <div style={{textAlign:"center"}} >
        <h2 style={{color:"red", fontSize:"64px"}}>YOUTUBE VIDEOS</h2>
        <Button
          sx={{ textAlign: "center", height: "56px", padding:"40px",marginRight:"50px" }}
          variant="contained"
          color="error"
          onClick={()=>{setCount(count>0 ? (count-1) : (data2[0].results.length-1))}}  
        >
          Before
        </Button>
      <Button
          sx={{ textAlign: "center", height: "56px", padding:"40px" }}
          variant="contained"
          color="success"
          onClick={()=>{setCount(count<(data2[0].results.length-1) ? (count+1) : (0) )}}  
        >
          NEXT
        </Button> </div>
      
    {data2.length!=0 ? <div>
            <YoutubeEmbed embedId={data2[0]?.results[`${count}`].key}/>
        </div>
     : ""}    
    
    </>)
}

export default MovieDetail;



