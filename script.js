let balance = 5000; // Initial balance in the wallet

function navigate(page) {
  document.querySelector('.container').style.display =
    page === 'home' ? 'block' : 'none';
  document.getElementById('sendPage').style.display =
    page === 'send' ? 'block' : 'none';
  document.getElementById('rechargePage').style.display =
    page === 'recharge' ? 'block' : 'none';
  updateBalance();
}

function updateBalance() {
  document.getElementById('walletBalance').textContent = balance.toFixed(2);
}

function addTransaction(message) {
  const transactionList = document.getElementById('transactionList');
  const li = document.createElement('li');
  li.textContent = message;
  transactionList.prepend(li);
}

function sendMoney() {
  const name = document.getElementById('receiver').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const messageEl = document.getElementById('sendMessage');

  if (!name) {
    messageEl.textContent = '❌ Receiver name is required.';
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    messageEl.textContent = '❌ Enter a valid 10-digit phone number.';
    return;
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    messageEl.textContent = '❌ Enter a valid amount.';
    return;
  }

  if (Number(amount) > balance) {
    messageEl.textContent = '❌ Insufficient balance.';
    return;
  }

  balance -= Number(amount); // Deduct from balance
  const message = `Sent ₹${amount} to ${name} (${phone})`;
  messageEl.textContent = `✅ ${message}`;
  addTransaction(message);
  updateBalance();
  document.getElementById('successSound').play();
  // Update the balance after sending money

  // Clear inputs
  document.getElementById('receiver').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('amount').value = '';
}

function recharge() {
  const operator = document.getElementById('operator').value;
  const mobile = document.getElementById('mobile').value.trim();
  const amount = document.getElementById('rechargeAmount').value.trim();
  const messageEl = document.getElementById('rechargeMessage');

  if (!/^\d{10}$/.test(mobile)) {
    messageEl.textContent = '❌ Enter a valid 10-digit mobile number.';
    return;
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    messageEl.textContent = '❌ Enter a valid recharge amount.';
    return;
  }

  balance += Number(amount); // Add to balance
  const message = `Recharged ₹${amount} to ${mobile} (${operator})`;
  messageEl.textContent = `✅ ${message}`;
  addTransaction(message);
  updateBalance();
  document.getElementById('successSound').play();
  // Update the balance after recharge

  // Clear inputs
  document.getElementById('mobile').value = '';
  document.getElementById('rechargeAmount').value = '';
}
