// Sample JavaScript for interactions (fetching data, toggling sections)

// Switch between sections (Dashboard, Inventory, Wallet)
const dashboardLink = document.getElementById('dashboardLink');
const inventoryLink = document.getElementById('inventoryLink');
const walletLink = document.getElementById('walletLink');
const transactionsLink = document.getElementById('transactionsLink');

const dashboardSection = document.getElementById('dashboardSection');
const inventorySection = document.getElementById('inventorySection');
const walletSection = document.getElementById('walletSection');

dashboardLink.addEventListener('click', () => toggleSection(dashboardSection));
inventoryLink.addEventListener('click', () => toggleSection(inventorySection));
walletLink.addEventListener('click', () => toggleSection(walletSection));

function toggleSection(section) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active'));
  section.classList.add('active');
}

// Modal toggle for product addition
const addProductBtn = document.getElementById('addProductBtn');
const addProductModal = document.getElementById('addProductModal');
const closeModalBtn = document.getElementById('closeModalBtn');

addProductBtn.addEventListener('click', () => addProductModal.style.display = 'block');
closeModalBtn.addEventListener('click', () => addProductModal.style.display = 'none');

// Handle adding product
const addProductForm = document.getElementById('addProductForm');
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const productData = {
    name: document.getElementById('productName').value,
    sku: document.getElementById('productSKU').value,
    category: document.getElementById('productCategory').value,
    price: parseFloat(document.getElementById('productPrice').value),
    quantity: parseInt(document.getElementById('productQuantity').value)
  };
  // Send data to the backend to add the product (replace URL with actual backend API)
  fetch('/api/inventory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  })
    .then(response => response.json())
    .then(data => {
      alert('Product added successfully');
      // Close modal
      addProductModal.style.display = 'none';
    })
    .catch(error => alert('Error adding product:', error));
});

// Handle adding funds (similar to adding product)
const addFundsBtn = document.getElementById('addFundsBtn');
const addFundsModal = document.getElementById('addFundsModal');
const closeFundsModalBtn = document.getElementById('closeFundsModalBtn');

addFundsBtn.addEventListener('click', () => addFundsModal.style.display = 'block');
closeFundsModalBtn.addEventListener('click', () => addFundsModal.style.display = 'none');

const addFundsForm = document.getElementById('addFundsForm');
addFundsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('fundsAmount').value);
  // Send data to backend to add funds to the wallet
  fetch('/api/wallet/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'userId', amount: amount })
  })
    .then(response => response.json())
    .then(data => {
      alert('Funds added successfully');
      addFundsModal.style.display = 'none';
    })
    .catch(error => alert('Error adding funds:', error));
});
