
import React, { useState, useEffect } from 'react';
import './Register.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';

export const Register = () => {

    const navigate = useNavigate();
    const [msgError, setMsgError] = useState('');

    const [user, setUser] = useState({
        name: '',
        address: '',
        zip_code: '',
        town: '',
        phone: '',
        DNI: '',
        birthdate: '',
        email: '',
        password: ''
    });

    const [userError, setUserError] = useState({
        nameError: '',
        addressError: '',
        zip_codeError: '',
        townError: '',
        phoneError: '',
        DNIError: '',
        birthdateError: '',
        emailError: '',
        passwordError: ''

    });

    const functionHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        setMsgError("")
    };

    const errorCheck = (e) => {
        let error = ""
        error = validator(e.target.name, e.target.value);
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const Submit = () => {
        for (let test in user) {
            if (user[test] === "") {
                return;
            }
        }
        for (let test in userError) {
            if (userError[test] !== "") {
                return;
            }
        }
        registerUser(user)
            .then(resultado => {
                if (resultado.data.message === "Error registering user") {
                    setMsgError("Incorrect data or existing user")
                    return;
                }
                setTimeout(() => {
                    navigate("/login");
                }, 500)
            }
            )
            .catch(error => console.log(error));
    }

    return (
        <div className="registerDesign">

            <div className="containerRegisterDesign">
                <div className='containerTitle'>
                    <div>Nombre : </div>
                    <div>Dirección : </div>
                    <div>Código Postal : </div>
                    <div>Población : </div>
                    <div>Phone number : </div>
                    <div>DNI : </div>
                    <div>Fecha de nacimiento : </div>
                    <div>Email de usuario : </div>
                    <div>Password : </div>
                </div>

                <div className='containerText'>
                    <CustomInput
                        design={`inputDesign ${userError.nameError !== "" ? 'inputDesignError' : ''}`}
                        type={"text"}
                        name={"name"}
                        placeholder={"Name and surname"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{userError.nameError}</div>

                    <CustomInput
                        design={`inputDesign ${userError.addressError !== "" ? 'inputDesignError' : ''}`}
                        type={"text"}
                        name={"address"}
                        placeholder={"Calle, número y puerta"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{userError.addressError}</div>

                    <CustomInput
                        design={`inputDesign ${userError.zip_codeError !== "" ? 'inputDesignError' : ''}`}
                        type={"number"}
                        name={"zip_code"}
                        placeholder={"46000"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{userError.zip_codeError}</div>

                    <CustomInput
                        design={`inputDesign ${userError.townError !== "" ? 'inputDesignError' : ''}`}
                        type={"text"}
                        name={"town"}
                        placeholder={"Valencia"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{userError.townError}</div>

                    <CustomInput
                        design={`inputDesign ${userError.phoneError !== "" ? 'inputDesignError' : ''}`}
                        type={"text"}
                        name={"phone"}
                        placeholder={"phone"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{userError.phoneError}</div>

                    <CustomInput
                        design={`inputDesign ${userError.DNIError !== "" ? 'inputDesignError' : ''}`}
                        type={"text"}
                        name={"DNI"}
                        placeholder={"00000000X"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{userError.DNIError}</div>

                    <CustomInput
                        design={`inputDesign ${userError.birthdateError !== "" ? 'inputDesignError' : ''}`}
                        type={"date"}
                        name={"birthdate"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{userError.birthdateError}</div>

                    <CustomInput
                        design={`inputDesign ${userError.emailError !== "" ? 'inputDesignError' : ''}`}
                        type={"email"}
                        name={"email"}
                        placeholder={"Email"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{userError.emailError}</div>

                    <CustomInput
                        design={`inputDesign ${userError.passwordError !== "" ? 'inputDesignError' : ''}`}
                        type={"password"}
                        name={"password"}
                        placeholder={"password 8-10 characters"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{userError.passwordError}</div>
                </div>

                <div className='errorMsg'>{msgError}</div>
            </div>
                <div className='buttonSubmit' onClick={Submit}>Check </div>
        </div>
    )
}