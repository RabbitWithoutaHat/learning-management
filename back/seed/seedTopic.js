const connection = require('../models/connection');

const Topic = require('../models/Topic');

const beaverId = '5d95f85bd93180d422d24895';

const topics = [
  {
    topicName: 'CSS',
    description: 'стили',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    phase: 1,
    week: 1,
    day: 2,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'AJAX',
    description: 'асинхронные запросы',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    phase: 2,
    week: 1,
    day: 3,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-2/blob/master/week-1/3-wednesday.md',
    comments: [],
  },
  {
    topicName: 'Redux',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    phase: 3,
    week: 1,
    day: 4,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },

];


Topic.insertMany(topics).then(() => {
  console.log(`Count of topics: ${topics.length}`);
  console.log('-------------------');
  connection.close();
});
