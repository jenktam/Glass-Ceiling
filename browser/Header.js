import React                        from "react";
import { getMenWithHigherSalary }   from "./Utils";
import "./index.css";

export const Header = () => (
  <div className = "header">

    <h1>Gender Wage Pay Gap in Seattle, WA</h1>
    <br />
    <p>This table exhibits the differences in wages between men and women in Seattle by all job classifications. The data contains weighted average hourly pay rates for women and men and the average of all employee wages in the class. It serves to provide factual data from the City of Seattle"s API and answer whether the glass ceiling still exists and in which fields is it the most prevalent.</p>

  </div>
);
