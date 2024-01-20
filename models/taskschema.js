const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email_id : {type : String},
    pass_word : {type : String}
})

const userList_Schema = mongoose.Schema({
  user_name : {type : String},
  user_email : {type : String},
  user_role : {type : String}
})

const Users = mongoose.model('Users', userSchema);
const userList = mongoose.model('userlists', userList_Schema)

module.exports = {
  Users: Users,
  UserList : userList
};
