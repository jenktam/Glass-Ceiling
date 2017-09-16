# The Glass Ceiling

This [website](https://glass-ceiling.herokuapp.com/) provides an analysis of the gender wage gap in Seattle by profession. It serves to provide factual data from the City of Seattle's API and answer whether the glass ceiling still exists and in which fields it is the most prevalent.

![Gender Gap](/public/img/gender-gap.jpg)

## Features
* Filtering Data
* Sorting Data
* Pagination

### Filtering
* Filter by job titles where men or women make more.
* Filter by pay difference gap (in dollars and percentage).

### Sorting
* Data is by default sorted alphabetically by job title
* Data can also be sorted by any of the headers.

### Pagination
* 25 rows revealed per page by default.
* Additional ability to view data by 5 - 100 rows at once.

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
