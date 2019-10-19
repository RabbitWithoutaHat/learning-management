const express = require('express');

const router = express.Router();
const Topic = require('../models/Topic');
const Group = require('../models/Group');

router.get('/:id', async (req, res) => {
  const allGroups = await Group.find();
  // Последняя группа
  let selectedGroupName = '';
  if (req.params.id !== 'undefined') {
    selectedGroupName = req.params.id;
  } else {
    selectedGroupName = allGroups[1].name;
  }
  // Массив из имён всех групп
  const groupNames = [];
  for (let i = 0; i < allGroups.length; i++) {
    if (allGroups[i].name === 'Без группы' || allGroups[i].name === 'admin') {
      continue;
    } else {
      const obj = {
        key: `${i + 1}`,
        value: `${i + 1}`,
        text: allGroups[i].name,
      };
      groupNames.push(obj);
    }
  }
  // если нет групп вообще
  if (allGroups.length === 0) {
    const arr = [];
    res.json({ arr });
  }
  // Для админа составим топики последней группы,а для пользователя его группы
  let topics = [];
  if (req.user.status === 'admin') {
    topics = await Topic.find({ groupName: selectedGroupName });
  } else {
    topics = await Topic.find({ groupName: req.user.groupName });
  }
  // Максимальное кол-во фаз и недель!
  let Phase = 0;
  let Week = 0;
  for (let i = 0; i < topics.length; i++) {
    Phase = Math.max(Phase, topics[i].phase);
    Week = Math.max(Week, topics[i].week);
  }
  const result = [];
  for (let p = 1; p < Phase + 1; p++) {
    const phase = [];
    for (let w = 1; w < Week + 1; w++) {
      const week = topics
        .filter((el) => el.phase === `${p}`)
        .filter((el) => el.week === `${w}`)
        .sort((el) => (el.day ? 1 : -1));
      if (week.length === 0) {
        continue;
      } else {
        phase.push(week);
      }
    }

    result.push(phase);
  }
  // Для админа верне топики последней группые ,все группы и поле конкретной группы для Select!
  // Для юзера вернем топики его группы
  if (req.user.status === 'admin') {
    res.json({
      result,
      topics,
      groupNames,
      selectedGroupName,
    });
  } else {
    res.json({ result, topics });
  }
});

router.put('/:id', async (req, res) => {
  const {
 id, githubLink, video, fileLink, topicName 
} = req.body;
  await Topic.findOneAndUpdate(
    { _id: id },
    {
      githubLink,
      video,
      fileLink,
      topicName,
    },
  );

  res.json({ status: 'done' });
});

module.exports = router;
