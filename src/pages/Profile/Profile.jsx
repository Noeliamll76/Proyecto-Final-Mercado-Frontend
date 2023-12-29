

import React, { useState, useEffect } from 'react';
import './Profile.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { getUser, updateUser, inactivateUser } from "../../services/apiCalls";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

export const Profile = () => {
    const dispatch =useDispatch();
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token

    const navigate = useNavigate();

    const [isEnabled, setIsEnabled] = useState(true);
    const [msgError, setMsgError] = useState();

    const [profile, setProfile] = useState({
        name: '',
        address: '',
        zip_code: '',
        town: '',
        phone: '',
        DNI: '',
        birthdate: '',
        email: '',
    })

    const [profileError, setProfileError] = useState({
        nameError: '',
        addressError: '',
        zip_codeError: '',
        townError: '',
        phoneError: '',
        DNIError: '',
        birthdateError: '',
        emailError: '',

    })

    useEffect(() => {
        console.log(rdxUser);
    }, [rdxUser]);

    useEffect(() => {
        setMsgError("")
        for (let test in profile) {
            if (profile[test] === "") {
                getUser(token)
                    .then
                    ((results) => {
                        setProfile(results.data.data);
                    })
                    .catch((error) => console.log(error));
            }
        }
    }, []);

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
        console.log(error)
        setProfileError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const functionHandler = (e) => {
        setProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const sendData = async () => {
        try {
            for (let test in profile) { if (profile[test] === "") return; }
            for (let test in profileError) { if (profileError[test] !== "") return; }

            const body = {
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
            };
            console.log(body)
            const response = await updateUser(body, token);
            setMsgError(response.data.message)
            setTimeout(() => {
                setIsEnabled(true)
                navigate("/login");
            }, 400);
        }
        catch (error) { console.log(error) }
    };

    const inactivate = async () => {
        try {

            const response = await inactivateUser(token);
            setMsgError(response.data.message)
            setTimeout(() => {
                dispatch(logout({ credentials: "" }));
                navigate("/");
            }, 400);
        }
        catch (error) { console.log(error) }
    };

    return (
        <div className="profileDesign">
            <div>Nombre :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${profileError.nameError !== ""
                        ? "inputDesignError"
                        : ""
                        }`}
                    type={"text"}
                    name={"name"}
                    value={profile.name}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{profileError.nameError}</div>
            </div>

            <div>Email :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${profileError.emailError !== ""
                        ? "inputDesignError"
                        : ""
                        }`}
                    type={"email"}
                    name={"email"}
                    value={profile.email}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{profileError.emailError}</div>
            </div>

            <div>Phone :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${profileError.phoneError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    name={"phone"}
                    value={profile.phone}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{profileError.phoneError}</div>

                <div className='errorMsg'>{msgError}</div>

            </div>
            {
                isEnabled
                    ? (<div className="buttonSubmit" onClick={() => setIsEnabled(!isEnabled)}>EDIT</div>)

                    : (<div className="buttonSubmit" onClick={() => sendData()}>UPDATE DATA</div>)
            }
            <div className="buttonDeleteUser" onClick={() => inactivate()}>DELETE USER</div>
        </div>
    );
}
