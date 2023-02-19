const express = require("express");
const { getAllUsers, getSingleUserById, deleteUser, updateUserById, createNewUser, getSubscriptionDetailsById } = require("../controllers/user-controller");
const { users } = require("../data/users.json");  //importing array
// we can't use two app() and for route we use Router()
const router = express.Router();

// importing user and book model
const { UserModel, BookModel } = require("../models/model-index");

// creating routes
/**
 * Route: /users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parmanters: none
 */
//at place of double times users in url we will replace one user here with /
// http://localhost/users/users  =>  http://localhost/users//
/*router.get("/", (req, res) => {
  res.status(200).json({   //multiple parameters can be passed
    success: true,
    data: users,
  });
});*/
router.get("/", getAllUsers);

// finding users by their id
/**
 * Route: /users/:id
 * /users/2
 * Method: GET
 * Description: Get single user by their id
 * Access: Public
 * Parmanters: id
 */
/*
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {  // if user is not present
    return res.status(404).json({  //return is a last statement in any function
      success: false,
      message: "User not found"
    });
  } else {
    return res.status(200).json({
      success: true,
      data: user
    })
  }
});*/
router.get('/:id', getSingleUserById);

// inserting users by their id
/*
Route:/users
Method:POST
Description:Get all the users
Access: Public
Parameters:none
*/
// http://localhost/users/users  =>  http://localhost/users//
/*router.post('/', (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;  //initially return and issue date will not be there
  // checking whether user already exists or not 
  const user = users.find((each) => each.id === id);   //each is a particular object in user.json users array
  if (user) {  //if user already exists so we can't create new user with same id
    return res.status(404).json({
      success: false,
      message: "User already exists"
    });
  }   // else we can push info of user into users array

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(200).json({
    success: true,
    data: users,
  });
});*/
router.post('/', createNewUser);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user data
 * Access: Public
 * Parmanters: id
 */
/*
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);

  if (!user)
    return res.status(404).json({ success: false, message: "User Not Found" });

  const UpdatedUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,//spread operator
        ...data
      }

      /*
       * spread operator
       * let each={
       * name="mohan",
       * age=25
       * }
       * 
       * ...each      we will get  the value and not array  
       * name="mohan",
       * age=25
       * 
       * let data={
       * name="kinnal"
       * }
       * 
       * ...data     will return
       * name="kinnal"
       * 
       * 
       * if we write
       * ...each
       * ...data      together will return
       * 
       * age=25
       * name="kinnal"   //which us updated name
       */
    /*};
    return each;
  });
  return res.status(200).json({
    success: true,
    data: UpdatedUser,
  });
});
*/
router.put("/:id", updateUserById);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parmanters: id
 */
/*
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User to be deleted is not found",
    });
  }

    // finding index to delete 
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    data: users
  });
});
*/
router.delete("/:id", deleteUser);


// Subscription
// /users/subscription-details/{id}
/*
router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      // current date
      date = new Date();
    } else {
            // getting date on basis of variable  starting from Jan 1, 1970
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

    //subscriptions  :    Basic(3 months)   ,  Standard(6 months) ,   Premium(12 months)
  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };
  // subscription calc here
  // Jan 1, 1970
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };
  return res.status(200).json({ success: true, data });
});*/
router.get("/subscription-details/:id",getSubscriptionDetailsById);

// default export
module.exports = router;
