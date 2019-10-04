const connection = require('../models/connection');

const News = require('../models/News');

const news = {

  name:'К нам едет Ревизор!'
}
  

News.insertMany(news).then(() => {
  console.log(`Count of users: ${news.length}`);
  console.log('-------------------');
  connection.close();
});

