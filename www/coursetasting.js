$('form#importcourses').submit(function(event) {
  event.preventDefault();

  try {

    var $html = $('<div/>').html($('form#importcourses textarea#regSource').val()).contents();

    var classes = [];
    var headersText = [];
    var $headers = $html.find("table.datadisplaytable th");

    // Loop through grabbing everything
    var $rows = $html.find("table.datadisplaytable tbody tr").each(function(index) {
      $cells = $(this).find("td");
      classes[index] = {};

      $cells.each(function(cellIndex) {
        // Set the header text
        if(headersText[cellIndex] === undefined) {
          headersText[cellIndex] = $($headers[cellIndex]).text();
        }
        // Update the row object with the header/cell combo
        classes[index][headersText[cellIndex]] = $(this).text();
      });
    });

    var classlist = '';

    classes.forEach(function (row) {
        if (row.Status)
            classlist += row.CRN + "\n";
    });

    if (classlist.length) {
      alert('Import successful. Click OK to be redirected to Step 2 of the process.');
      window.location = 'https://docs.google.com/forms/d/11jB8wPlOvAy5LqhgmW6-yLUDufOciI0odF4txVTwEq0/viewform?entry.968979753=' + encodeURIComponent(classlist.trim());
    } else {
      alert("Did you forget to paste in the source code? We couldn't find any courses from whatever was in the text box. Please double-check your input and try again.");
    }

  } catch (e) {
    alert("Woah, something went wrong. We aren't sure what the problem is, so take a screenshot of the following error and send it to Eric Tendian at etendian[at]hawk.iit.edu.\n" + e)
  }
});
