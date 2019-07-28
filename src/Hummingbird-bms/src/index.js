import Resource from './resources/define-resource';

Resource.define('player');

var query = Resource.select('player')
  .where({
      id: ['ehllo', 'world']
  })
  .result({
      fields: ['foo', 'bar'],
      range: [0, 14]
  });


query.send();