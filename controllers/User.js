import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      res.status(404).send({ message: "user already created with this email" });
      return;
    }
    let userInfo = await UserModel.create({
      ...req.body,
      profilePic: req?.file?.name,
    });
    if (userInfo)
      res.status(201).send({ message: "User successfully register" });
    else res.status(404).send({ message: "User not register" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const login = async (req, res) => {
  try {
    let user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) res.status(200).send({ id: user._id, role: user.role });
    else res.status(404).send({ message: "Wrong user / pwd" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
