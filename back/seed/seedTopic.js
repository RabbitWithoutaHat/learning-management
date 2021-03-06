const connection = require('../models/connection');

const Topic = require('../models/Topic');

const beaverId = '5d9f1b7de7e77e0fa391d58f';
const bearId = '5d95fb0644533cdb91290e74';
const group = 'Jiraff';
const topics = [
  {
    topicName: 'CSS',
    description: 'стили',
    video: 'https://youtu.be/1DDW01IUHf0',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 1,
    day: 1,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'CSS',
    description: 'стили',
    video: 'https://youtu.be/vljSZbMZu98',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 1,
    day: 2,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'DOM',
    description: 'react-redux',
    video: ' https://youtu.be/CK5Vk9btOhc',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 1,
    day: 3,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/3-wednesday.md',
    comments: [],
  },
  {
    topicName: 'Document Object Model',
    description: 'Document Object Model',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 1,
    day: 4,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/4-thursday.md',
    comments: [],
  },
  {
    topicName: 'Document Object Model',
    description: 'Document Object Model',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 1,
    day: 5,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/4-thursday.md',
    comments: [],
  },
  {
    topicName: 'JS Arrays',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 2,
    day: 1,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },

  {
    topicName: 'Algorithms',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 2,
    day: 2,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Jasmine',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 2,
    day: 3,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Classes',
    description: 'react-redux',
    video: 'https://youtu.be/KwCdtCdFhFM',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 2,
    day: 4,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Classses',
    description: 'react-redux',
    video: 'https://youtu.be/KwCdtCdFhFM',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 2,
    day: 5,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Node',
    description: 'react-redux',
    video: 'https://youtu.be/KwCdtCdFhFM',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 3,
    day: 1,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Timers.Callbacks',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 3,
    day: 2,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'EventLoop',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 3,
    day: 3,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Promises',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 3,
    day: 4,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Mongo',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 3,
    day: 5,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Mongoose',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 4,
    day: 1,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Mongoose Part 2',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 4,
    day: 2,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Express more',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 4,
    day: 3,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Express Part 3',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 4,
    day: 4,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Server',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 1,
    week: 4,
    day: 5,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Ajax',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 1,
    day: 1,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Handlebars',
    description: 'react-redux',
    video: 'https://youtu.be/LN6P70YXhRo',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 1,
    day: 2,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Sessions',
    description: 'react-redux',
    video: 'https://youtu.be/LN6P70YXhRo',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 1,
    day: 3,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'REST.CRUD',
    description: 'react-redux',
    video: 'https://youtu.be/EHzMjcYAOjA',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 1,
    day: 4,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'REST.CRUD Part 2',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 1,
    day: 5,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'REST.CRUD Part 3',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 2,
    day: 1,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Passport.js',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 2,
    day: 2,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Passport.js',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 2,
    day: 3,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Проект от заказчика',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 2,
    day: 4,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Проект от заказчика',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 2,
    day: 5,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Повторение',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 3,
    day: 1,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Подготовка к экзамену',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 3,
    day: 2,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Экзамен',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 3,
    day: 3,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Доклады',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 3,
    day: 4,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Solo assessment',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 2,
    week: 3,
    day: 5,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'React Intro',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 3,
    week: 1,
    day: 1,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'React. Conditional Rendering. SASS.',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 3,
    week: 1,
    day: 2,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'React. Conditional Rendering. SASS.',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 3,
    week: 1,
    day: 2,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'React-Router',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 3,
    week: 1,
    day: 3,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Redux',
    description: 'react-redux',
    video: 'https://youtu.be/YIpgj1bF-4k',
    group: beaverId,
    groupName:group,
    phase: 3,
    week: 1,
    day: 4,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Redux',
    description: 'react-redux',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    group: beaverId,
    groupName:group,
    phase: 3,
    week: 1,
    day: 5,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },
  {
    topicName: 'Redux',
    description: 'react-redux',
    video: 'https://youtu.be/GZdfnOb4UV8',
    group: beaverId,
    groupName:group,
    phase: 3,
    week: 2,
    day: 1,
    githubLink: 'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  },

];


Topic.insertMany(topics).then(() => {
  console.log(`Count of topics: ${topics.length}`);
  console.log('-------------------');
  connection.close();
});
