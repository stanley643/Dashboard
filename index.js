// Connect to the MongoDB database
const MongoClient = require('').MongoClient;
const uri ='mongodb+srv://nmurigi:2461314454@cluster0.3tythl5.mongodb.net/test'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to MongoDB');

  // Retrieve orders and populate the orders table
  const ordersTableBody = document.querySelector('#orders-table-body');
  const orderStatusMap = {
    'pending': 'Pending',
    'processing': 'Processing',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  };
  const ordersCollection = client.db('mydb').collection('orders');
  ordersCollection.find().toArray((err, orders) => {
    if (err) {
      console.error(err);
      return;
    }
    orders.forEach(order => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${orders._id}</td>
        <td>${order.user.name}</td>
        <td>${orders.phone_number}</td>
        <td>${orders.productname}</td>
        <td>${orders.quantity}</td>
        <td>${new Date(orders.orderDate).toLocaleDateString()}</td>
        <td class="status-${order.status}">${orderStatusMap[order.status]}</td>
      `;
      ordersTableBody.appendChild(tr);
    });
  });

  // Retrieve users and populate the users table
  const usersTableBody = document.querySelector('#users-table-body');
  const usersCollection = client.db('mydb').collection('users');
  usersCollection.find().toArray((err, users) => {
    if (err) {
      console.error(err);
      return;
    }
    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user._id}</td>
        <td>${user.name}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.location}</td>
        <td>${new Date(user.registrationDate).toLocaleDateString()}</td>
        <td class="status-${user.status}">${user.status}</td>
      `;
      usersTableBody.appendChild(tr);
    });
  });
});
