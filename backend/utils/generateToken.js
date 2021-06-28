import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, "SecretKey12", {expiresIn: "1d"})
}

export default generateToken;