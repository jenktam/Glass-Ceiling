import _ from "lodash";

export function getColumnFieldNames(data) {
  const columnFields = data.meta.view.columns;
  const fieldNames = [];

  _.forEach(columnFields, function(value, key) {
    let fieldName = value.name;
    fieldName = prettifyString(fieldName);
    fieldNames.push(fieldName);
  });

  return fieldNames;
}

export function prettifyString(string) {
  string = string.trim();

  return string.split(" ")
  .map(word => {
    if(word.length > 0) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
  })
  .join(" ");
}

// Collects data from Seattle.gov"s API and transforms each row into an object with the column field as the property key and data value as the property value.
export function getDataValues(data) {
  const columnFields = getColumnFieldNames(data);
  const dataValues = data.data;
  const allData = [];

  for(let i = 0; i  < dataValues.length; i ++) {
    let jobObj = _.zipObject(columnFields, dataValues[i]);
    allData.push(jobObj);
  }
  return allData;
}





