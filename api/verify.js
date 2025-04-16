const { validate } = require('deep-email-validator');

module.exports = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    const result = await validate({
      email,
      validateRegex: true,
      validateMx: true,
      validateTypo: false,
      validateDisposable: true,
      validateSMTP: true,
      smtpTimeout: 5000 // 5 seconds timeout for SMTP check
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
};
