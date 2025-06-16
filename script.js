let token = null;

const showMessage = (msg) => {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = msg;
  messageDiv.classList.remove('hidden');
};

const hideMessage = () => {
  document.getElementById('message').classList.add('hidden');
};

const login = async () => {
  hideMessage();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      token = data.token;
      document.getElementById('login-section').classList.add('hidden');
      document.getElementById('features').classList.remove('hidden');
      showMessage('✅ Login successful!');
    } else {
      showMessage(
        '❌ Login failed: ' + (data.message || 'Invalid credentials')
      );
    }
  } catch (err) {
    showMessage('⚠️ Login error: ' + err.message);
  }
};

const checkBalance = async () => {
  hideMessage();
  try {
    const res = await fetch('http://localhost:5000/api/v1/account/balance', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    showMessage('💸 Your balance is ₹' + data.balance);
  } catch {
    showMessage('⚠️ Error fetching balance');
  }
};

const sendMoney = async () => {
  hideMessage();
  const receiver = document.getElementById('receiver').value;
  const amount = document.getElementById('amount').value;

  try {
    const res = await fetch('http://localhost:5000/api/v1/account/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ to: receiver, amount }),
    });
    const data = await res.json();
    showMessage('📨 ' + data.message);
  } catch {
    showMessage('⚠️ Send error');
  }
};

const rechargeWallet = async () => {
  hideMessage();
  const amount = document.getElementById('rechargeAmount').value;

  try {
    const res = await fetch('http://localhost:5000/api/v1/account/recharge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    showMessage('🔄 ' + data.message);
  } catch {
    showMessage('⚠️ Recharge error');
  }
};

const getTransactions = async () => {
  hideMessage();
  try {
    const res = await fetch(
      'http://localhost:5000/api/v1/account/transactions',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    showMessage(
      '📜 Transactions: ' + JSON.stringify(data.transactions, null, 2)
    );
  } catch {
    showMessage('⚠️ Error fetching transactions');
  }
};

const logout = () => {
  token = null;
  document.getElementById('login-section').classList.remove('hidden');
  document.getElementById('features').classList.add('hidden');
  showMessage('👋 Logged out');
};
const viewTransactionHistory = async () => {
  hideMessage();

  try {
    const res = await fetch(
      'http://localhost:5000/api/v1/account/transactions',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok && Array.isArray(data.transactions)) {
      const historyHTML = data.transactions
        .map(
          (tx) =>
            `📝 ${tx.type} ₹${tx.amount} ${
              tx.to ? `to ${tx.to}` : ''
            } on ${new Date(tx.time).toLocaleString()}`
        )
        .join(' ');
      showMessage(historyHTML);
    } else {
      showMessage('⚠️ No transactions found');
    }
  } catch (err) {
    showMessage('⚠️ Failed to fetch transaction history');
  }
};
