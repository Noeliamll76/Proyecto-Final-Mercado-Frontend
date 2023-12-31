
import moment from 'moment';

export const validator = (type, value) => {

    switch (type) {

        case 'email':
        case 'correo':
        case 'mail':

            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
                return "Invalid e-mail format";
            } else {
                return "";
            }

        case 'name':
        case 'surname':
        case 'store_name':
        case 'store_owner':
        case 'town':
        case 'location':
        case 'address':
            if (value.length > 100) {
                return "Escribe un texto correcto"
            } else {
                return ""
            }

        case 'phone':
        case 'telefono':
            if (! /(?=.*?[0-9])/.test(value) || value.length < 8) {
                return "Incorrect phone number";
            } else {
                return "";
            }

        case 'password':
        case 'password2':
        case 'contraseña':
            if (value.length < 8 && value.length > 10) {
                return "Invalid password write 8-10 characters"
            } else {
                // if (! /[\d()+-]/g.test(value)) {
                //     return "Invalid password format";
                // } else {
                return "";
                // }
            }
        case 'zip_code':
        case 'codigo_postal':
            if (value === 46011 || (value > 46020 && value < 46025)) {
                return ""
            } else {
                return "Invalid zip code";
            }

        case 'DNI':
            if (value.length !== 9) {
                return false;
            }
            const dniRegex = /^\d{8}[A-HJ-NP-TV-Z-a-hj-np-tv-z]$/
            if (!dniRegex.test(value)) {
                return false;
            }
            const letters = "TRWAGMYFPDXBNJZSQVHLCKET"
            const letter = value.charAt(8).toUpperCase()
            const number = parseInt(value.substr(0, 8), 10)
            const index = number % 23
            if (letters.charAt(index) === letter) {
                return "";
            } else {
                return "Invalid DNI";
            };

        case 'birthdate':
        case 'cumpleaños':
            const fechaNacimiento = moment(value);
            const hoy = moment();
            const edad = hoy.diff(fechaNacimiento, 'years');

            if (edad >= 18) {
                return "";
            } else {
                return "Es menor de edad";
            }

        case 'comment':
        case 'comentario':
            if (value.length < 500 || value === '') {
                return ""
            } else {
                return "Comentario demasiado largo"
            }

        case 'ud':
            if (value <= 0) {
                return "Añadir unidades"
            } else {
                return ""
            }
    }
}