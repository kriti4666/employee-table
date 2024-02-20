const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user")

const  register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);   

    res.status(200).json({ message: 'Login successful', token, user: user._id, });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports= {register,login}