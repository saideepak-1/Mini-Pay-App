import jwt from 'jsonwebtoken';

export const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (username === 'sai' && password === '1234') {
    const token = jwt.sign({ username }, 'secret123', { expiresIn: '1h' });
    return res.json({
      success: true,
      message: 'Login successful',
      token,
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid username or password',
  });
};
