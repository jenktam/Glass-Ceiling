import React, { Component }                   from "react";
import axios                                  from "axios";
import ReactTable                             from "react-table";
import matchSorter                            from "match-sorter";
import "react-table/react-table.css";
import "./index.css";

import { Header }                             from "./Header";
import { Tips }                               from "./Tips";
import { Footer }                             from "./Footer";
import { getColumnFieldNames, getDataValues } from "./Utils";

class WagesTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      columnFields: []
    };
  }

  componentDidMount() {
    //Calls server endpoint which called Seattle web API and gathers job data
    axios
      .get("/api/wages")
      .then(res => {
        this.setState({
          data: getDataValues(res.data),
          columnFields: getColumnFieldNames(res.data)
        });
      })
      .catch(console.error.bind(console));
  }

  render() {
    const { data, columnFields } = this.state;
    return (
      <div>

        <Header />

        <ReactTable
          data={data}
          noDataText="Data loading..."
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}

          columns=
          {
            [
              {
                columns: [
                  {
                    Header: "Jobtitle",
                    accessor: d => d["Jobtitle"],
                    id: "Jobtitle",
                    filterMethod: (filter, rows) => {
                      return matchSorter(rows, filter.value, {
                        keys: ["Jobtitle"]
                      });
                    },
                    filterAll: true,
                    minWidth: 200,
                  },
                ]
              },

              // Custom Filer: Women Make More
              {
                Header: "Average Wages ($/hour)",
                columns: [
                  {
                    Header: "Women",
                    accessor: "Female Avg Hrly Rate",
                    id: "Female Avg Hrly Rate",
                    filterMethod: (filter, rows) => {
                      return matchSorter(rows, filter.value, {
                        keys: ["Female Avg Hrly Rate"]
                      });
                    },
                    filterAll: true,
                  },
                  {
                    Header: "Men",
                    accessor: "Male Avg Hrly Rate",
                    id: "Male Avg Hrly Rate",
                    filterMethod: (filter, rows) => {
                      return matchSorter(rows, filter.value, {
                        keys: ["Male Avg Hrly Rate"]
                      });
                    },
                    filterAll: true,
                  },
                  {
                    Header: "Total",
                    accessor: "Total Avg Hrly Rate",
                    filterMethod: (filter, rows) => {
                      return matchSorter(rows, filter.value, {
                        keys: ["Total Avg Hrly Rate"]
                      });
                    },
                    filterAll: true,
                  },
                  {
                    Header: "Gender Makes More",
                    minWidth: 150,
                    accessors: ["Female Avg Hrly Rate", "Male Avg Hrly Rate"],
                    id: "Women Make More",
                    Cell: ({ value, row }) => {
                      let womenValue = row["Female Avg Hrly Rate"];
                      let menValue = row["Male Avg Hrly Rate"];
                      return (
                        // filters based on whever women make more
                        womenValue >= menValue
                        || menValue === null
                        && womenValue !== null
                        ? "Women"
                        : "Men"
                      );
                    },
                    filterMethod: (filter, row) => {
                      const femaleWages = row["Female Avg Hrly Rate"];
                      const maleWages = row["Male Avg Hrly Rate"];

                      // show all jobs
                      if (filter.value === "all") {
                        return true;
                      }
                      // show female wages that are greater than male wages
                      if (filter.value === "true") {
                        return (
                          femaleWages >= maleWages
                          && femaleWages !== "N/A" //don't care about N/A data
                          && maleWages !== "N/A"
                        );
                      }
                      // show male wages that are greater than female wages
                      return (
                        maleWages > femaleWages
                        && maleWages !== "N/A"
                        && femaleWages !== "N/A"
                      );
                    },
                    Filter: ({ filter, onChange }) => {
                      return (
                        <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : "all"}
                        >
                          <option value="all">Show All</option>
                          <option value="true">Women</option>
                          <option value="false">Men</option>
                        </select>
                      );
                    },
                  }
                ]
              },

              // Custom Filter: Pay Difference By $ and %
              {
                Header: "Pay Difference Gap",
                minWidth: 400,
                columns: [
                  // Show only jobs where pay wage difference >= custom number user inputs
                  {
                    Header: "By $",
                    accessor: d => {
                      // calculated difference between numbers but typeof payDifference is a string
                      let payDifference = Math.abs(d["Male Avg Hrly Rate"] - d["Female Avg Hrly Rate"]).toFixed(2);
                      payDifference = parseFloat(payDifference);
                      return payDifference;
                    },
                    id: "Pay Difference by $",
                    filterMethod: (filter, row) => {
                      return row[filter.id] >= filter.value;
                    },
                    Filter: ({ filter, onChange }) => {
                      return (
                      <input
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : ""}
                      />
                    );},
                  },
                  {
                    Header: "By %",
                    accessor: d => {
                      let  payDifference;
                      if (d["Male Avg Hrly Rate"] > d["Female Avg Hrly Rate"]) {
                        payDifference = Math.abs(d["Male Avg Hrly Rate"] - d["Female Avg Hrly Rate"]) / d["Male Avg Hrly Rate"];
                      }
                      else {
                        payDifference = Math.abs(d["Female Avg Hrly Rate"] - d["Male Avg Hrly Rate"]) / d["Female Avg Hrly Rate"];
                      }
                      payDifference = parseFloat(payDifference * 100).toFixed(2);
                      return payDifference;
                    },
                    id: "Pay Difference by %",
                    filterMethod: (filter, row) => {
                      return parseFloat(row[filter.id]) >= parseFloat(filter.value)
                              && parseFloat(row[filter.id]) !== 100.00;
                    },
                    Filter: ({ filter, onChange }) => {
                      return (
                        <input
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : ""}
                        />
                      );
                    },
                  },
                ]
              },

              {
                Header: "Number of Employees By Gender",
                minWidth: 400,
                columns: [
                  // Show only jobs where pay wage difference >= custom number user inputs
                  {
                    Header: "Women",
                    accessor: d => d["No. Female Empl"],
                    id: "No. Female Empl"
                  },
                  {
                    Header: "Men",
                    accessor: d => d["No. Male Empl"],
                    id: "No. Male Empl",
                  },
                  {
                    Header: "Total",
                    accessor: d => d["Total No. Empl"],
                    id: "Total No. Empl",
                  }

                ]
              },

              {
                Header: "Average Months Longevity In Current Classification",
                minWidth: 400,
                columns: [
                  {
                    Header: "Women",
                    accessor: d => d["Average Of Female Months Longevity In Current Classification"],
                    id: "Average Of Female Months Longevity In Current Classification",
                    filterMethod: (filter, rows) => {
                      return matchSorter(rows, filter.value, {
                        keys: ["Average Of Female Months Longevity In Current Classification"]
                      });
                    },
                    filterAll: true,
                  },
                  {
                    Header: "Men",
                    accessor: d => d["Average Of Male Months Longevity In Current Classification"],
                    id: "Average Of Male Months Longevity In Current Classification",
                    filterMethod: (filter, rows) => {
                      return matchSorter(rows, filter.value, {
                        keys: ["Average Of Male Months Longevity In Current Classification"],
                      });
                    },
                    filterAll: true,
                  },
                  {
                    Header: "Total",
                    accessor: d => d["Total Average Of Months Longevity In Current Classification"],
                    id: "Total Average Of Months Longevity In Current Classification",
                    filterMethod: (filter, rows) => {
                      return matchSorter(rows, filter.value, {
                        keys: ["Total Average Of Months Longevity In Current Classification"],
                      });
                    },
                    filterAll: true,
                  }

                ]
              },

              {
                columns: [
                  {
                    Header: "Ratio Of Women's Hourly Rate To Men's (%)",
                    minWidth: 300,
                    accessor: d => d["Ratio Of Women's Hourly Rate To Men's Hourly Rate - Percentage"],
                    id: "Ratio Of Women's Hourly Rate To Men's Hourly Rate - Percentage",
                    filterMethod: (filter, rows) => {
                      return matchSorter(rows, filter.value, {
                        keys: ["Ratio Of Women's Hourly Rate To Men's Hourly Rate - Percentage"]
                      });
                    },
                    filterAll: true,
                  },
                  {
                    Header: "Notes",
                    accessor: d => d["Notes"],
                    id: "Notes",
                    minWidth: 150,
                    filterMethod: (filter, rows) => {
                      return matchSorter(rows, filter.value, {
                        keys: ["Notes"]
                      });
                    },
                    filterAll: true,
                  },

                ]
              },
            ]
          }

          defaultSorted={[
            {
              id: "Jobtitle",
              desc: false,
              filterMethod: (filter, rows) => {
                return matchSorter(rows, filter.value, {
                  keys: ["Female Avg Hrly Rate"]
                });
              },
              filterAll: true,
              minWidth: 100,
            }
          ]}
          defaultPageSize={25}
          style={{
            height: "700px"
          }}
          className="reactTable -striped -highlight"

        />

        <br />

        <Tips />
        <Footer />
      </div>
    );
  }
}

module.exports = WagesTable;
