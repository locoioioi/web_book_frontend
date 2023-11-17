class UserModel {
  userId: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  shoppingAddress: string;
  deliveryAddress: string;
  phoneNumber: string;

  constructor(
    userId: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    deliveryAddress: string,
    shoppingAddress: string,
    phoneNumber: string
  ) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
    this.gender = gender;
    this.deliveryAddress = deliveryAddress;
    this.shoppingAddress = shoppingAddress;
    this.phoneNumber = phoneNumber;
  }
}

export default UserModel;
