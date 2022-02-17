## Wandering Threads and Nesting Feathers (WTNF) Storefront Website
- The WTNF Storefront is an online web application that allows users to log in to their user account, browse products for sale, add them to a shopping cart, and place orders.

### Installing and running the application
- Prerequisite
  - Node.js
  - npm 
  - Angular CLI
  - Web browser
  - Internet connection to fetch data from external storefront API
- Clone this repo
  - ``` git clone https://github.com/JoshuaDoucet/wtnfStorefront.git main ```
- Install the external modules
  - ``` npm install```
- Run the web server
  - ``` ng serve```
- Navigate a web browser to 
  - ``` localhost:4200```

### Website Routes
- "/products" The products page displays all products available for sale
- "/products/:id" A product details page displays additional information about a signle product.
- "/signin" The signin page allows users to log in to the website so they can add items to the cart.
    - NOTE the application does not yet have the functionality to create new users. The 2 following sign in credentials can be used for testing.
      - email "josh@gmail.com"   password "password"
      - email "kenzie@gmail.com"  password "goodPass1"
- "/profile" The profile page displays information about the logged in user
- "/cart" The cart page displays all the products in the cart for the logged in user. This page also contains a checkout form to place an order
- "/cart/confirm" The cart confirm page shows a message that an order was sucessfully placed

### The application backend
- More information on the application's backend can be found in the following repo
- https://github.com/JoshuaDoucet/wtnfStorefrontAPI.git
