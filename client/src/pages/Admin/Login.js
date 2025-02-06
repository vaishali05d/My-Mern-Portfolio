import React from 'react';
import {useDispatch} from 'react-redux';
import { Input, message } from 'antd';
import axios from 'axios';
import { HideLoading, ShowLoading } from '../../redux/rootSlice';

function Login() {
    const [user, setUser] = React.useState({
        username:"",
        password:""
    });

const dispatch = useDispatch();
const login = async()=>{
    try {
        dispatch(ShowLoading());
        const response = await axios.post("/api/portfolio/admin-login", user);
        dispatch(HideLoading());
        if(response.data.success){
            message.success(response.data.message);
            localStorage.setItem('token', JSON.stringify(response.data));
            window.location.href = '/admin';
        }else{
            message.error(response.data.message);
        }
    } catch (error) {
        message.error(error.message);
        dispatch(HideLoading());
    }
};

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
        <div className='w-96 gap-5 border border-gray-500 p-5 flex flex-col bg-white'>
        <h1 className='text-2xl'>Portfolio - Admin Login</h1>
        <hr />
        <Input type='text' placeholder="User Name" value={user.username} onChange={(e)=> setUser({...user, username: e.target.value})}/>
        <Input type='password' placeholder='Password' value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})}/>
        <button className='bg-primary text-white p-2 ' onClick={login}>Login</button>
    </div>
    </div>
  )
}

export default Login;