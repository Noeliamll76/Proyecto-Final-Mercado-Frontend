
import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { logoutBasket, basketData } from "../../pages/basketSlice";
import { useNavigate } from 'react-router-dom';
import logoMercat from '../../../public/image/LOGO-MERCAT.png'

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const rdxCredentialsUser = useSelector(userData);
    const rdxInfoBasket = useSelector(basketData);

    const logOutMe = () => {
        dispatch(logout({ credentials: "" }))
        dispatch(logoutBasket({ infoBasket: "" }))
        navigate("/")
    }

    return (
        <>
            <div className="headerDesign">
                <div className='headerBox'>
                    <div className="headerLogo">
                        <div><img className="logoDesign" src={logoMercat} /></div>
                    </div>

                    <div className="headerButtons">
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
                                {!rdxInfoBasket?.info
                                    ? (<LinkButton path={"/profileBasket"} title={"CESTA"} />)
                                    : ('')}
                            </>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}