 // Get a reference to the orders table body and users table body
const ordersTableBody = document.querySelector('#orders-table-body');
const usersTableBody = document.querySelector('#users-table-body');

// Define the order status map
const orderStatusMap = {
  'pending': 'Pending',
  'processing': 'Processing',
  'shipped': 'Shipped',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled'
};

// Fetch the orders and populate the orders table
fetch('/api/orders')
  .then(response => response.json())
  .then(orders => {
    orders.forEach(order => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${order._id}</td>
        <td>${user.Name}</td>
        <td>${order.PhoneNumber}</td>
        <td>${order.productName}</td>
        <td>${order.Quantity}</td>
        <td>${new Date(order.orderDate).toLocaleDateString()}</td>
        <td class="status-${order.status}">${orderStatusMap[order.status]}</td>
      `;
      ordersTableBody.appendChild(tr);
    });
  });

// Fetch the users and populate the users table
fetch('/api/users')
  .then(response => response.json())
  .then(users => {
    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user._id}</td>
        <td>${user.name}</td>
        <td>${user.PhoneNumber}</td>
        <td>${user.Location}</td>
        <td>${new Date(user.registrationDate).toLocaleDateString()}</td>
         <td class="status-${user.status}">${user.status}</td>
      `;
      usersTableBody.appendChild(tr);
    });
  });

// Get the canvas element
var ctx = document.getElementById('myChart').getContext('2d');

// Define the data for the chart
var data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Sales',
    data: [10, 20, 30, 40, 50, 60, 70],
    borderColor: 'blue',
    fill: false
  }]
};

// Create the chart
var chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {}
});
