// start up the elasticsearch client
var client = new $.es.Client({
  hosts: 'localhost:9200'
});

// setup the templates
var courseTmpl = $.templates('#courseTemplate');
$.views.converters('hideDecimal', function (val) {
  return val.toLowerCase().replace(/\.000/g, '');
});
$.views.converters('deptName', function (val) {
  return val.split(' ')[0];
});
$.views.converters('courseNum', function (val) {
  return val.split(' ')[1];
});

// search logic
$('#search-form button').click(searchCourses);
$('#search').keyup(searchCourses);
$('input[type="checkbox"]').click(searchCourses);

function searchCourses() {
  var keyword = $('#search').val();
  client.search({
    q: keyword.replace(/([\!\*\+\&\|\(\)\[\]\{\}\^\~\?\:\"\/])/g, "\\$1")
  }).then(function (body) {
    $('#results').empty();
    console.log($('#hide-no-sections').prop('checked'));
    body.hits.hits.forEach(function (hit) {
      if (hit._source.semesters.length || !$('#hide-no-sections').prop('checked')) {
        hit._source.attributes = hit._source.attributes.split(', ');
        $('#results').append(courseTmpl.render(hit._source));
      }
    });
    //
  }, function (error) {
    console.trace(error.message);
  });
}

// add to cart
// remove from cart

// check if sections full


$('#schedule').fullCalendar({
  header: {
    left: '',
    center: '',
    right: ''
  },
  weekends: false,
  defaultView: 'agendaWeek',
  allDaySlot: false,
  minTime: "08:00:00",
  maxTime: "18:00:00",
  editable: false,
  events: [
    {
      id: 999,
      title: 'Repeating Event',
      start: '2016-03-21T16:00:00'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: '2016-03-22T16:00:00'
    },
    {
      title: 'Meeting',
      start: '2016-03-23T10:30:00',
      end:   '2016-03-23T12:30:00'
    },
    {
      title: 'Lunch',
      start: '2016-03-24T12:00:00'
    },
    {
      title: 'Birthday Party',
      start: '2016-03-25T08:00:00'
    }
  ]
});
