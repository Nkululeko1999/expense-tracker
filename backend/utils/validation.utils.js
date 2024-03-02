import validator from "validator";

export const validateEmail = (email) => {
    let isValid;
    if(validator.isEmail(email)){
        isValid = true
    }else {
        isValid = false
    }

    return isValid;
}

export const validatePass = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    return passwordRegex.test(password);
}