import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withCookies } from 'react-cookie'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Login = (props) => {

    const classes = useStyles();
    const [isLogin, setIsLogin] = useState(true)

    const [ userInfo, setUserInfo ] = useState({
        username: '',
        email: '',
        password: '',
    });

    const login = (event) => {
        event.preventDefault();
        console.log(userInfo)
        const data = {
            email: userInfo.email,
            password: userInfo.password
        }
        axios.post(
            'http://127.0.0.1:8000/authen/jwt/create/', data,
            { headers: {'Content-Type': 'application/json'}}
        )
        .then((res)=>{
            console.log(res.data.access)
            props.cookies.set('current-token', res.data.access)
            res.data.access ? window.location.href = '/home' : window.location.href = '/'
            console.log(props.cookies)
        })
        .catch((e)=>{
            console.log(e)
        })
    }


    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <form className={classes.form} onSubmit={login}>
            { isLogin || <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
                value={userInfo.username}
                onChange={(e)=>setUserInfo({...userInfo, username: e.target.value })}
            />}
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={userInfo.email}
                onChange={(e)=>setUserInfo({...userInfo, email: e.target.value })}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={userInfo.password}
                onChange={(e)=>setUserInfo({...userInfo, password: e.target.value })}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item>
                <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
    )
}

export default withCookies(Login) 
