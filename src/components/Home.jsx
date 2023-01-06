
import {React,Fragment,useEffect,useState} from 'react'
import {styled,Box, Button, Typography} from '@mui/material'
import { getProducts } from '../redux/action/dataActions';
import { useDispatch,useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import SpinnerA from './SpinnerA';

const StyledButton = styled(Button)`
    width: 50px;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

const Component = styled(Box)`
background: #F2F2F2;
padding : 10px 10px;
`

const Home = () => {

    const dispatch  = useDispatch();
    const [image,setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png");
    const [firstname,setFirstname] = useState("First &");
    const [lastname,setLastname] = useState("Last_name");
    const [email,setEmail] = useState("abc@gmail.com");
    const [loader,setLoader] = useState(false);
    const wrapper = document.getElementById('wrapper');
    

    wrapper&&wrapper.addEventListener('click', async(event) => {
      const isButton = event.target.nodeName === 'BUTTON';
      if (!isButton) {
        return;
      }
      setLoader(true);
    const {data} = await axios.get(`https://reqres.in/api/users/${event.target.id}`);
    setEmail(data.data.email);
    setImage(data.data.avatar);
    setFirstname(data.data.first_name);
    setLastname(data.data.last_name);
      setTimeout(function(){
        setLoader(false);
      }, 2000);
    })

    useEffect(()=>{
        dispatch(getProducts())
     },[])

     const {products}=useSelector(state => state.getProducts);

  return (
    <Component>
        {!loader?
        <Box style={{ marginLeft:'510px',marginTop:'100px' }}>
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 240 }}
                image={image}
                title={firstname}
            />
            <CardContent sx={{ marginLeft:10 }} >
                <Typography gutterBottom variant="h5" component="div">
                <Box style={{display:'flex'}}>
                    <Box>
                        {firstname}
                    </Box>&nbsp;
                    <Box>
                        {lastname}
                    </Box>
                </Box>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {email}
                </Typography>
            </CardContent>
        </Card>
        </Box >:<SpinnerA style={{ marginLeft:'510px',marginTop:'100px' }}/>}
        <Box id="wrapper" style={{ display:'flex', marginLeft:'63px'}}>
            {
                
                        products.data && (products.data.map(product => (
                                <Box textAlign="center" style={{ padding: '25px 15px' }}>
                                    <StyledButton id={product.id} style={{marginRight: 10, background: '#ff9f00'}} variant="contained">{product.id}</StyledButton>
                                </Box> ) 
                            ))
            }
        </Box>
    </Component>
  )
}

export default Home;