
import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { ProfileStore } from '../ProfileStore/ProfileStore';
import { Guilds } from '../Guilds/Guilds';

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/profileStore" element={<ProfileStore />}/>
                <Route path="/guilds" element={<Guilds />}/>
            </Routes>
         </>
     )
}