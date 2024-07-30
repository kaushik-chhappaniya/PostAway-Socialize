import jwt from "jsonwebtoken";
const MYSECRETKEY = "THISISJWTSeCreTK^Y";
const jwtAuth = (req, res, next) => {
   const token = req.headers["authorization"];
   // console.log('req.headers :', req.headers);
   if (!token) {
      return res.status(401).send("Unauthorized");
   }

   try {
      const payload = jwt.verify(token, MYSECRETKEY);
      // console.log("payload :", payload);
      req.userId = payload.userId;
   } catch (err) {
      console.log(err);
      return res.status(401).send("Invalid Token | Unauthorized");
   }
   next();
};
export default jwtAuth;
