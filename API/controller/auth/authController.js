const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const db = require("../../db");

const query = util.promisify(db.query).bind(db);

exports.Signup = async (req, res) => {
  const { name, email, password, referral_code } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate secret key and referral code
    const secretKey = uuidv4().replace(/-/g, '').slice(0, 16); // UUID v4 is more secure than random strings
    const generatedReferralCode = uuidv4().replace(/-/g, '').slice(0, 6);

    // Create the user
    const userQuery = 'INSERT INTO users (name, email, password, secret_key, referral_code) VALUES (?, ?, ?, ?, ?)';
    const userResult = await query(userQuery, [name, email, hashedPassword, secretKey, generatedReferralCode]);

    const userId = userResult.insertId;

    // Check if referral code is provided
    if (referral_code) {
      const referrerQuery = 'SELECT id FROM users WHERE referral_code = ?';
      const referrerRows = await query(referrerQuery, [referral_code]);

      if (referrerRows.length > 0) {
        const referrerId = referrerRows[0].id;

        const referralQuery = 'INSERT INTO referrals (referrer_id, referred_id) VALUES (?, ?)';
        await query(referralQuery, [referrerId, userId]);

        // Optionally, update the referrer's commission balance
        // const commissionUpdateQuery = 'UPDATE users SET commission_balance = commission_balance + ? WHERE id = ?';
        // await pool.query(commissionUpdateQuery, [commissionAmount, referrerId]);
      } else {
        return res.status(400).json({ error: 'Invalid referral code' });
      }
    }

    return res.status(201).json({ id: userId, name, email, secretKey, referral_code: generatedReferralCode });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Retrieve the user by email
      const userQuery = 'SELECT * FROM users WHERE email = ?';
      const userRows = await query(userQuery, [email]);
  
      if (userRows.length === 0) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      const user = userRows[0];
  
      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, "g[hc+7^:{%&s<vGPM5sT_Zyash_p_d/4;&f!;umN");
  
      return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };