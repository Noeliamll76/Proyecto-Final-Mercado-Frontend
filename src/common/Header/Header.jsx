
import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const rdxCredentialsUser = useSelector(userData);

    const logOutMe = () => {
        dispatch(logout({ credentials: "" }))
        navigate("/")
    }

    return (
        <div className="headerDesign">
            <LinkButton path={"/"} title={"Home"} />
            {!rdxCredentialsUser?.credentials.token ? (
                <>
                    <LinkButton path={"/register"} title={"Register"} />
                    <LinkButton path={"/login"} title={"Login"} />
                </>
            ) : (
                <>
                    <LinkButton path={"/profile"} title={"Profile"} />
                    
                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"Log out"} />
                    </div>
                    <LinkButton path={"/profileOrders"} title={"CESTA"} />
                </>
            )}
        </div>
    )
}