import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

// export const getUsers = async (res, resp) => {
//   try {
//     const user = await User.find();

//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const signin = async (req, resp) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return resp.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return resp.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    resp.status(200).json({ result: existingUser, token });
  } catch (error) {
    resp.status(500).json({ message: "Something went wrong." });
  }
};
export const signup = async (req, resp) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return resp.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return resp.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    resp.status(200).json({ result, token });
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
};
