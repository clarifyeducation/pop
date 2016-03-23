// start up the elasticsearch client
var client = new $.es.Client({
  hosts: 'localhost:9200'
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
$('#search').keyup(searchCourses);
$('input[type="checkbox"]').click(searchCourses);

function searchCourses() {
  var keyword = $('#search').val();
  $('#results').empty();
  if (keyword.length > 2) {
    client.search({
      q: keyword.replace(/([\!\*\+\&\|\(\)\[\]\{\}\^\~\?\:\"\/])/g, "\\$1")
    }).then(function (body) {
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
}

// add to cart
function addToCart(crn) {
  removeFromCart(crn);
  client.search({
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


    } catch (e) {
      alert('Sorry, we were unable to add that course to your cart. Please try again.');
      console.trace(e);
    }
  }, function (error) {
    console.trace(error.message);
  });
}

// remove from cart
function removeFromCart(crn) {
  cart.forEach(function (course, index) {
    if (crn === course.section.crn) {
      cart.splice(index, 1);
      renderCart();
    }
  });
}

// check if sections full

var events = [];

function renderCalendar() {
  // add logic to adjust mintime and maxtime
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
    events: events
  });
}

// {
//   id: 999,
//   title: 'Repeating Event',
//   start: '2016-03-23T10:30:00',
//   end:   '2016-03-23T12:30:00'
// }
