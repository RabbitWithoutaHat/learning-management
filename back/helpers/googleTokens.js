const axios = require('axios');

const refreshToken = () => {
  try {
    axios
      .post('https://www.googleapis.com/oauth2/v4/token', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: {
          clientID:
            '25492420798-qjo4b8c9nj7p3hibsocb6raf5m91443t.apps.googleusercontent.com',
          clientSecret: 'J20xLC9i0yNPGwjHSXk54UcO',
          refreshToken: '1/NAWXsZgRq6HQR-h3LpNAlFV4k1raG7Pv5UH6t0Q7ylM',
        },
      })
      .then((resp) => {
        const data = resp.json();
        console.log(resp);
      });
  } catch (error) {
    console.log('error token', error);
  }
};

module.exports = refreshToken;
