const axios = require('axios');
const Token = require('../models/Token');
// 'ya29.ImCbB9Ycc01Sny138ZgIjahuwiAZxT0kqSmaJ2XsjrelAo0Ete2ALiHGx7KN2KK8e2EC9jer-4BtOfMd2wMMGrSD0kz36I4kMw7zPmn6q5hC68ljhelvF_4Vsx5SgS_kecU'

const refreshToken = async () => {
  const res = await axios.post('https://oauth2.googleapis.com/token', {
    refresh_token: '1/PUkT3kek9HCypLvj6KoudvrOBaNw7bwHZ3bffqVK34A',
    client_id:
      '25492420798-qjo4b8c9nj7p3hibsocb6raf5m91443t.apps.googleusercontent.com',
    client_secret: 'J20xLC9i0yNPGwjHSXk54UcO',
    grant_type: 'refresh_token',
  });
  const date = new Date();
  Token.refresh({ accessToken: res.data.access_token });
};

module.exports = refreshToken;
