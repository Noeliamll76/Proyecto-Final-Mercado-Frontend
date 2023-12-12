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
        case 'location':
            if (value.length > 100) {
                return "Escribe un nombre correcto"
            } else {
                return ""
            }

        case 'phone':
        case 'telefono':

            if (! /(?=.*?[0-9])/.test(value)) {
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

    }
}