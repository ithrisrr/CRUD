const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Task = require('../models/taskschema');
// const ObjectId = require

router.use(cors());


function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, 'Rr@9786', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach user information to the request for further use
    req.user = decoded;

    next();
  });
}

router.post('/updateuser', async (req, res) => {
  try {
    console.log(req.body)
    const { id, user_name, user_email, user_role } = req.body;

    // Validate that the required fields are present
    if (!id || !user_name || !user_email || !user_role) {
      return res.status(400).json({ message: 'Invalid request. Missing required fields.' });
    }

    // Find the user by ID and update
    const updatedUser = await Task.UserList.findByIdAndUpdate(id, { user_name, user_email, user_role }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    else{
      Task.UserList.find()
      .then(result => res.json(result))
      .catch(err => res.json(err))
    }

  }
  catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/deleteuser', (req, res) => {
  console.log(req.body)
  Task.UserList.deleteOne({ _id: req.body.rowId })
    .then(result => {
      if (result.deletedCount === 1) {
        Task.UserList.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
})

router.get('/getuserList',  (req, res) => {
  Task.UserList.find()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.post('/adduser', (req, res) => {
  const {user_name, user_email, user_role} = req.body

  Task.UserList.findOne({user_name}, function(err, user) {
    if(user){
      res.json('User name Already Exist')
    }
    else{
      const new_user = new Task.UserList({
        user_name,
        user_email,
        user_role
      })

      Task,Task.UserList.insertMany([new_user], function(err, result) {
        if(err){
          return res.status(500).json({ message: 'Error Adding user' });
        }
        else{
          Task.UserList.find()
          .then((result) => {
            res.json(result)
            res.status(201).json({ message: 'User Added Successfully' });

          })
          .catch(err => res.json(err))
        }
      })
    }
    
  })
})

router.post('/login', (req, res) => {
  const { email_id, pwd } = req.body;

  Task.Users.findOne({ email_id }, function (err, user) {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    bcrypt.compare(pwd, user.pass_word, function (err, isMatch) {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (!isMatch) {
        return res.json({ message: 'Invalid password' });
      }

      // Passwords match, generate a JWT
      const token = jwt.sign({ userId: user._id, email: user.email_id}, 'Rr@9786', { expiresIn: '7d' });

      res.json({ message: 'Login successful', token, email: user.email_id });
    });
  });
});


router.post('/checkemail', (req, res) => {
  console.log(req.body)

  const { email_id } = req.body;

  // Check if the email already exists in the database
  Task.Users.findOne({ email_id }, function (err, result) {
    if (err) {
      return res.status(500).json({ error: 'Error checking email' });
    }

    if (result) {
      // Email already exists
      return res.json({ exists: true });
    } 
    else {
      console.log(result)

      // Email does not exist
      return res.json({ exists: false });
    }
  });
})

router.post('/signupuser', (req, res) => {
  const saltRounds = 10;
  const {email_id, new_password } = req.body;

  const hashedPassword = bcrypt.hashSync(new_password, saltRounds);

  const new_user = new Task.Users({
    email_id,
    pass_word : hashedPassword
  })

  Task.Users.insertMany(new_user, function(err, result){
    if(err){
      return res.status(500).json({ message: 'Error saving user' });
    }
    return res.status(201).json({ message: 'User Registration Successful' });
  })

});

module.exports = router;
