This is a shoe e-commerce API built with JavaScript, Express and MongoDB. It allows users to browse products, add them to a cart, and make mock-up purchases.

[Click Here](https://documenter.getpostman.com/view/30687617/2sAXjM2rH7) to view the documentation

### API Features:
#### For Users:
- Seamless user registration and subsequent authentication
- Retrieving all categories of products available
- Filtering products by parameters inputted
- Cart and order management
- Adding optional address for delivery option
- Mocking the purchase process

#### For Admin:
- Add new products and specify stock available
- Find a particular footwear for in-house review or changing of availability status
- Get all users of the e-commerce applications (other admins included)
- Edit footwears at admin's discretion
- Get all wears in the store (both available and non-available ones to user)
- Automatic change of availability of a footwear once it is sold out or if intentionally made unavailable for a host of reasons

To run on a development server:
```
git clone https://github.com/adedapo0x/barb-shoe-ecommerce-api.git
cd barb-shoe-ecommerce-api
npm install
```

Set up your environment variables:
Create a `.env` file in the root directory and add the following:
- MONGO_URI
- SECRET_KEY
- PORT
  
