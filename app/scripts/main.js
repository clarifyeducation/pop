$('[data-toggle="offcanvas"]').click(function () {
  $('.row-offcanvas').toggleClass('active')
});

// start up the elasticsearch client
var client = new $.es.Client({
  hosts: 'dev.tendian.io:9200'
});

var cart = [];

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

var cartTmpl = $.templates('#cartTemplate');

function renderCart() {
  $('#cart').html(cartTmpl.render({cart: cart, semester: "Fall 2016"}));
}
renderCart();

// search logic
$('#search-form button').click(searchCourses);
$('#search').typeWatch({
  callback: searchCourses,
  wait: 400,
  highlight: true,
  captureLength: 2
});
$('input[type="checkbox"]').click(function () {
  prev_search = '';
  searchCourses();
});

var prev_search = '';

function searchCourses() {
  var keyword = $('#search').val();
  if (prev_search == keyword) return;
  prev_search = keyword;
  $('#defaultcontent').hide();
  $('#results').empty();
  if (keyword.length > 1) {
    prev_search = keyword;
    var query_config = {
      index: 'courses',
      body: {
        query: {
          filtered: {
            query: {
              match: {
                _all: keyword.replace(/([\!\*\+\&\|\(\)\[\]\{\}\^\~\?\:\"\/])/g, "\\$1")
              }
            },
            filter: {
              term: {
                is_offered: true
              }
            }
          }
        }
      },
      size: 100
    };
    client.search(query_config).then(function (body) {
      if (body.hits.hits.length) {
        $('#no-results').addClass('hidden');
        body.hits.hits.forEach(function (hit) {
          hit._source.attributes = hit._source.attributes.split(', ');
          $('#results').append(courseTmpl.render(hit._source));
        });
      } else {
        $('#no-results').removeClass('hidden');
      }
    }, function (error) {
      alert('Search failed: '+error.message);
      console.trace(error.message);
    });
  } else {
    $('#results').empty();
  }
}

function search(str) {
  $('#search').val(str);
  window.setTimeout(searchCourses, 50);
}

// add to cart
function addToCart(crn) {
  removeFromCart(crn);
  client.search({
    index: 'courses',
    q: crn
  }).then(function (body) {
    try {
      var result = body.hits.hits[0]._source;
      result.semesters[0].sections.forEach(function (section) {
        if (crn === section.crn) {
          result.section = section;
        }
      });
      cart.push(result);
      renderCart();

      result.section.meetings.forEach(function (meeting, index) {
        if (meeting.time != 'TBA') {
          var dates = _generateEvent(meeting);
          var event = {
            id: crn + '_' + index,
            title: result.name + ' (' + crn + ')',
            start: dates.start,
            end: dates.end,
            dow: dates.dow
          };
          events.push(event);
        }
      });
      renderCalendar();
    } catch (e) {
      alert('Sorry, we were unable to add that course to your cart. Please try again.');
      console.trace(e);
    }
  }, function (error) {
    console.trace(error.message);
  });
}

function _generateEvent(meeting) {
  var dow = [];
  for (var index = 0; index < meeting.days.length; index++) {
    dow.push('UMTWRFS'.indexOf(meeting.days.charAt(index)));
  }
  var start = _timeFromString(meeting.time.split(' - ')[0]);
  var end = _timeFromString(meeting.time.split(' - ')[1]);
  return {start: start, end: end, dow: dow};
}

function _timeFromString(str) {
  var isPM = (str.substring(str.length - 2) == 'pm');
  var digits = str.substring(0, str.length - 2).split(':');
  var hours = (digits[0] != '12' ? parseInt(digits[0], 10) : 0);
  var minutes = (digits.length > 1 ? parseInt(digits[1], 10) : 0);
  return (hours + (isPM ? 12 : 0)) + ':' + (minutes < 10 ? '0' + minutes : minutes);
}

// remove from cart
function removeFromCart(crn) {
  cart.forEach(function (course, index) {
    if (crn === course.section.crn) {
      cart.splice(index, 1);
      renderCart();

      events.forEach(function (event, idx) {
        if (event.id.indexOf(crn)===0) {
          events.splice(idx, 1);
        }
      });
      renderCalendar();
    }
  });
}

// check if sections full

var events = [];

function renderCalendar() {
  $('#schedule').fullCalendar('removeEventSource', events);
  $('#schedule').fullCalendar('addEventSource', events);
}

// add logic to adjust mintime and maxtime
$('#schedule').fullCalendar({
  header: {
    left: '',
    center: '',
    right: ''
  },
  columnFormat: 'ddd',
  weekends: false,
  defaultView: 'agendaWeek',
  allDaySlot: false,
  minTime: "08:00:00",
  maxTime: "21:30:00",
  editable: false,
  events: events
});
