export const checkValidData= (email,password) =>{


    // const isNameValid=/^[a-z ,.'-]+$/i.test(name);
    const isEmailValid=/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email);
    const isPasswordValid=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    // if(!isNameValid && !isEmailValid && !isPasswordValid)
    // {
    //     return " Name, Email & Password are not Valid";
    // }

    if(!isEmailValid && !isPasswordValid)return " Both Email & Password are not Valid";
    // if(!isNameValid&& !isPasswordValid)return " Both Name & Password are not Valid";
    // if(!isEmailValid && !isNameValid)return " Both Email & Name are not Valid";


    // if(!isNameValid)return " Name is not Valid";
    if(!isEmailValid) return "Email Id is not Valid";
    if(!isPasswordValid) return "Password is not Valid";

    return null;
};