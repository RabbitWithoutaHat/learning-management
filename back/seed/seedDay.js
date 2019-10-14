const connection = require('../models/connection');

const Day = require('../models/Day');
const groupId = '5d95f85bd93180d422d24895';
const days = [
  {
  name: '1',
  weekId:'5d96185d1cfee93271eae5d3',
  description: '',
  video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
  group: groupId,
  
  githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
  comments: [],
},
{
  name: '2',
  weekId:'5d96185d1cfee93271eae5d3',
  description: '',
  video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
  group: groupId,
  
  githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
  comments: [],
},
{
  name: '3',
  weekId:'5d96185d1cfee93271eae5d3',
  description: '',
  video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
  group: groupId,
  
  githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
  comments: [],
},
{
  name: '4',
  weekId:'5d96185d1cfee93271eae5d3',
  description: '',
  video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
  group: groupId,
  
  githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
  comments: [],
},
 
];

Day.insertMany(days).then(() => {
  console.log(`Count of topics: ${days.length}`);
  console.log('-------------------');
  connection.close();
});
