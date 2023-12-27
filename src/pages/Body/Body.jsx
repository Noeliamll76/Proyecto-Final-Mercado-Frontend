
import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { ProfileStore } from '../ProfileStore/ProfileStore';
import { Guilds } from '../Guilds/Guilds';
import { StoresByGuild } from '../StoresByGuild/StoresByGuild';
import { ProductsByStore } from '../ProductsByStore/ProductsByStore';
import { CreateOrders } from '../CreateOrders/CreateOrders';
import { ProfileBasket } from '../ProfileBasket/ProfileBasket';
import { UpdateOrders } from '../UpdateOrders/UpdateOrders';
import { ConfirmBasket } from '../ConfirmBasket/ConfirmBasket';

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
                <Route path="/storesByGuild" element={<StoresByGuild />}/>
                <Route path="/productsByStore" element={<ProductsByStore />}/>
                <Route path="/createOrders" element={<CreateOrders />}/>
                <Route path="/profileBasket" element={<ProfileBasket />}/>
                <Route path="/updateOrders" element={<UpdateOrders />}/>
                <Route path="/confirmBasket" element={<ConfirmBasket />}/>
            </Routes>
         </>
     )
}