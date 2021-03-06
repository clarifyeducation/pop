<!DOCTYPE html>
<html><head>
  <title>Pop</title>
  <meta name="description" content="The fastest course browser at Illinois Tech" />
  <meta name="viewport" content="width=750" />
  <meta property="og:title" content="Pop Course Search" />
  <meta property="og:description" content="The fastest course browser at Illinois Tech" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://pop.weclarify.com/pop-v1.0.png" />
  <meta property="og:locale" content="en_US" />
  <link rel="stylesheet" type="text/css" href="style.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="jquery.color.js"></script>
</head><body>
  <div id="background"><div></div></div>

  <div id="topbar"><div id="bar">
    <div id="tri-line"></div>
    <div id="tri-fill"></div>
    <table><tr>
      <td><div id="prompt">Search&nbsp;for&nbsp;</div></td>
      <td width="100%"><input type="text" id="search" /></td>
    </tr></table>
    <a id="options-button">Options</a>
  </div><div id="options"><div>
    <a id="options-close">Close</a>
    <table><tr>
      <td>
        <b>Search in:</b>
        <br><input type="checkbox" checked="true" id="search-desc" /> <label for="search-desc">Course descriptions</label>
        <br><input type="checkbox" checked="true" id="search-sect" /> <label for="search-sect">Section descriptions</label>
      </td>
      <td class="spacer"></td>
      <td>
        <b>Result format:</b>
        <br><input type="radio" name="result-format" id="result-sm" /> <label for="result-sm">Just title</label>
        <br><input type="radio" name="result-format" id="result-med" /> <label for="result-med">Title and description</label>
        <br><input type="radio" name="result-format" checked="true" id="result-big" /> <label for="result-big">Everything</label>
      </td>
      <td class="spacer"></td>
      <td>
        <b>Other:</b>
        <br><input type="checkbox" id="show-links" checked="true" /> <label for="show-links">Show links (like to course catalog)</label>
        <br><input type="checkbox" checked="true" id="collapse-sim" /> <label for="collapse-sim">Collapse five or more similar sections</label>
        <br><input type="checkbox" checked="true" id="hide-no-sections" /> <label for="hide-no-sections">Hide courses without sections</label>
      </td>
    </tr></table>
  </div></div></div>

  <div id="sidebar"><div>
    <div id="register-section">Ready to register? <a href="javascript:cart.checkCRNs()">Check if these sections are full</a></div>
    <div id="cart-section"><div id="cart"></div></div>
    <div id="schedule-section"><div id="hours"></div><div id="schedule"></div></div>
    <div id="semesters"></div>
  </div></div>

  <div id="options-spacer"></div>

  <div id="content">
    <div id="defaultcontent">
      <h1>Pop</h1>
      <p id="tagline">A course browser for Illinois Tech</p>
      <h3 id="mobilenote">Hey! We're not yet optimized for smartphones. For the best experience view the site on a laptop or desktop. Thanks!</h3>
      <noscript><h3>Pop needs JavaScript to work. Please enable JavaScript and click refresh.</h3></noscript>
      <p>Pop replaces Banner's complex interface with one simple search box, except there's no search button because searching is instant. It searches all courses available for the $SEMESTER_NAME semester, just type something in the orange bar to get started! You can type pretty much anything, including:</p>
      <ul>
        <li>CRNs: <a class="example" href="javascript:search.go('20013')">20013</a></li>
        <li>Places: <a class="example" href="javascript:search.go('siegel')">siegel</a></li>
        <li>Professors: <a class="example" href="javascript:search.go('twombly')">twombly</a></li>
        <li>Semesters: <a class="example" href="javascript:search.go('spring')">spring</a></li>
        <li>Departments: <a class="example" href="javascript:search.go('itm')">itm</a></li>
        <li>Course titles: <a class="example" href="javascript:search.go('comp graphics')">comp graphics</a></li>
        <li>Days of the week: <a class="example" href="javascript:search.go('mwf')">mwf</a></li>
        <li>Course descriptions: <a class="example" href="javascript:search.go('leadership')">leadership</a></li>
        <li>Course abbreviations: <a class="example" href="javascript:search.go('econ211')">econ211</a></li>
      </ul>
      <ul>
        <li>Any combination of the above: <a class="example" href="javascript:search.go('hist comp mw')">hist comp mw</a></li>
      </ul>
      <p>Pop runs best in Chrome and Safari (but also works in Firefox). The original interface, called "Soda", was made by <a href="http://madebyevan.com/">Evan Wallace</a> at Brown University in 2010; <a href="https://tendian.io/">Eric Tendian</a> adapted the website for the Illinois Institute of Technology in 2015.</p>
    </div>
    <div id="dynamiccontent"></div>
  </div>

  <script type="text/javascript" src="$SEMESTER_DATA"></script>
  <script type="text/javascript" src="soda.js"></script>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-58509817-3', 'auto');
    ga('send', 'pageview');

  </script>
</body></html>
