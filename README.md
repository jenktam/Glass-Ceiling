# The Glass Ceiling

This [website](https://glass-ceiling.herokuapp.com/) provides an analysis of the gender wage gap in Seattle by profession. It serves to provide factual data from the City of Seattle's API and answer whether the glass ceiling still exists and in which fields it is the most prevalent.

![Gender Gap](/public/img/gender-gap.jpg)

## Features

| Path        | Description           |
| ------------- |:-------------|
| Filtering      | <ul><li>Filter by job titles where men or women make more.</li><li>Filter by pay difference gap (in dollars and percentage)</li></ul>|
| Sorting      | <ul><li>Data is by default sorted alphabetically by job title</li><li>Data can also be sorted by any of the headers.</li></ul>|
| Pagination      | <ul><li>25 rows revealed per page by default.</li><li>Additional ability to view data by 5 - 100 rows at once.</li></ul>|

## Navigating Through The Table
### Filtering
* **General Filtering** - Type into input fields of desired column.
* **Filter by Job Titles** - Click on drop down of desired column "Gender Makes More". Choose "Women" or "Men" and see the table sort between the value selected. "Show All" will return the table to its original view, displaying all rows.
* **Filter by Pay Difference Gap** - In the input field of "Pay Difference Gap" by $ and by %, type value into input field and see only results greater than or equal to your desired value.

### Sorting
* Click on desired of the columns to sort in ascending or descending order.

### Pagination
* Go to bottom of the table and either type in the page number or select the number of desired rows you'd like to view per page through the dropdown. You can also navigate through the pages by clicking the next and previous buttons.

## File Structure
```
Glass Ceiling
├── browser
│   ├── Footer.js
│   ├── Header.js
│   ├── index.css
│   ├── index.html
│   ├── index.js
│   ├── Tips.js
│   ├── Utils.js
│   └── WagesTable.js
├── package.json
├── package-lock.json
├── public
│   ├── bundle.js
│   ├── bundle.js.map
│   └── favicon.ico
├── README.md
├── server
│   ├── index.js
│   └── routes
│       ├── index.js
│       └── wages.js
└── webpack.config.js
```

## Notes On Files:
| Path        | Description           |
| ------------- |:-------------|
| /browser      | Contains components rendered to the DOM |
| /browser/Utils.js      | Converts JSON data from the City of Seattle's API into a new consolidated list for use in the table|
| /browser/WagesTable.js      | Displays the wages table |
| /public      | Houses all static assets |
| /server/index.js      | Starting point of app     |
| /server/routes/wages.js      | Server setup and routes sent to frontend and web API     |

## Technologies
This app was built with the following:
* [The City of Seattle's Web API](https://data.seattle.gov/City-Business/City-of-Seattle-Wages-Comparison-by-Gender-All-Job/cf52-s8er)
* [React Table](https://github.com/react-tools/react-table)
* React.js
* Lodash
* Node.js
* Express
