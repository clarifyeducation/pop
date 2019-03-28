#!/bin/bash
set -e

cd /app/pop/www

export LIST_ITEMS=""

for file in $(ls -t data/*.js); do
    export SEMESTER_NAME=$(grep "var semesters = \[" $file | cut -d\" -f2)
    export SEMESTER_DATA=$file
    HTML_FILE=$(echo $SEMESTER_NAME | sed 's/ //g' | tr A-Z a-z).html
    cat semester.html.tpl | envsubst > $HTML_FILE
    LIST_ITEMS="$LIST_ITEMS <li><a href="$HTML_FILE">Search $SEMESTER_NAME Courses using Pop 1.0</a></li>"
done

cat index.html.tpl | envsubst > index.html

# Upload assets
s3cmd -c /app/.s3cfg put * s3://pop.weclarify.com -PMF --no-mime-magic --recursive
