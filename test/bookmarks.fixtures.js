const { v4: uuid } = require('uuid');

function makeTestBookmarks() {
  return [
    {
      id: uuid(),
      title: 'Google (from fixtures file)',
      url: 'http://www.google.com',
      rating: '3',
      description: 'Internet-related services and products.',
    },
    {
      id: uuid(),
      title: 'Thinkful (from fixtures file)',
      url: 'http://www.thinkful.com',
      rating: '5',
      description:
        '1-on-1 learning to accelerate your way to a new high-growth tech career!',
    },
    {
      id: uuid(),
      title: 'Github (from fixtures file)',
      url: 'http://www.github.com',
      rating: '4',
      description:
        "brings together the world's largest community of developers.",
    },
  ];
}

module.exports = {
  makeTestBookmarks,
};
