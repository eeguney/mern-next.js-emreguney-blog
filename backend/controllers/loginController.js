import dotenv from "dotenv";

dotenv.config();

export const signin = async (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", process.env.TOKEN, {
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json("Succesfull");
  } else {
    res.status(400).json("Wrong Credentials!");
  }
};
