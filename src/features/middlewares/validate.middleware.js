
import { body, validationResult } from "express-validator";
import { ApplicationError } from "../../errorHandler/applicationError.js";

export const formValidation = async (req, res, next) => {
  // Write your code here
//   console.log('req.body :', req.body);
  const rules = [
    body("caption").notEmpty().withMessage("Caption is required"),
    
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new ApplicationError("Image is required");
      }
      return true;
    })
  ]

  await Promise.all(rules.map(rule => rule.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
//   console.log('errors :', errors);
        return res.status(500).send("Error: "+ errors.array());
    return new ApplicationError("Error: " + errors.array().join(","));
  }

  next();
};
