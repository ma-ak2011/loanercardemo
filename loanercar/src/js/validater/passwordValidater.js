export const validatePassword = password => {
    const result = password.match(/^[a-z\d]{8,12}$/i) !== null;
    return result;
};
