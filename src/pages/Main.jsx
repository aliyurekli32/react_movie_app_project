import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../auth/firebase";
import Context from "../context/AuthContext";

const handleErrors=(response)=> {
  if (!response.ok) {
    alert('There is a error occured')
      throw Error(response.statusText);  
  }
  return response;
}

const Main = () => {
    const {user}=useContext(Context);
    const[search,setSearch]=useState({
      search1:"",
      search2:"",
    })
    const[page,setPage]=useState(1)
  const [data, setData] = useState([]);
  const api_key = process.env.REACT_APP_MAPI_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie/?api_key=${api_key}`;
  const urlNew = `https://api.themoviedb.org/3/search/movie/?api_key=${api_key}&query=${search.search1}&page=${page}`;
  const urlNew2 = `https://api.themoviedb.org/3/search/movie/?api_key=${api_key}&query=${search.search2}&page=${page}`;
  const getMovie = async () => {
    fetch(url).then(handleErrors)
      .then((response) => response.json())
      .then((data) => setData(data.results)).catch(error => console.log(error));
  };
  useEffect(() => {
    getMovie();
   
  }, []);
  const searchMovie = async (e) => {
    e.preventDefault();
    console.log(urlNew);
    
    fetch(urlNew).then(handleErrors)
    .then((response) => response.json())
    .then((data) => setData(data.results)).catch(error => console.log(error));
    setSearch({...search, search2:`${search.search1}`, search1:""});
    setPage(1);
  };
  const nextMovie = async (e) => {
    e.preventDefault();
    console.log(urlNew);
    setPage(page+1);
    fetch(urlNew2).then(handleErrors)
    .then((response) => response.json())
    .then((data) => setData(data.results)).catch(error => console.log(error));
    
  };
  
 
  
  return (
    <>{user?.email ? <form onSubmit={searchMovie} className="container">
    <TextField
      fullWidth
      label="Search"
      color="primary"
      id="fullWidth"
      value={search.search1}
      sx={{ width: "45%", boxShadow: "10px 5px 15px 0px #1976d2" }}
      onChange={(e)=>{setSearch({...search, search1:e.target.value})}}
    />
    <Button
      sx={{ textAlign: "center", height: "56px", marginLeft: "-86px" }}
      type="submit"
      variant="contained"
      
    >
      SEARCH
    </Button>
    {search.search2 ? <div style={{textAlign:"center"}}>
  <Button
      sx={{ textAlign: "center", height: "56px" }}
      type="submit"
      variant="contained"
      onClick={nextMovie}
    >
      NEXT PAGES
    </Button>
  </div> : "" }
  </form>
  
  : "" }
      
      
      
      
      <Grid
        sx={{ marginTop: "50px",textAlign:"center"}}
        container
        spacing={2}
      >
        {data?.map((item,index) => {
          return (<>{(item.backdrop_path || item.poster_path) ? <Grid
            key={index}
           
              item
              xs={12}
              sm={6}
              md={3}
            >
              <Link to="/detail" state={item}  sx={{border:"1px solid aqua"}}>
                <Card sx={{ maxWidth: 375, margin:"auto",position:"relative"}}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="500"
                      image={`https://image.tmdb.org/t/p/w500/${item.backdrop_path ? item.backdrop_path : item.poster_path }`}
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
                        sx={{position:"absolute",bottom:"70px",left:"-10px",padding:"2px"}}
                        color="white"
                      >
                        
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid> : ""   }
            
</>
          );
        })}
      </Grid>
    </>
  );
};
export default Main;
