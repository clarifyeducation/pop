// load the list of courses

// search logic

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
