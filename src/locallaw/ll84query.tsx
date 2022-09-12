import { ll84_year_lookups } from "./lookups";
import {
  LL84QueryObjTypes,
  LL84QueryPropertyTypes,
  StringObjectType,
  ColumnNameMapType,
} from "types";

const sanitizeLL84QueryResultsObject = (
  pobj: StringObjectType,
  colnamemap: ColumnNameMapType
) => {
  let sanitized_columns_string = colnamemap.map((d) => d[0]);
  let pobj_length = Object.keys(pobj).length;
  let sanitized_obj: StringObjectType = {};

  Object.keys(pobj).forEach((pobj_key, i) => {
    let pobj_val = pobj[pobj_key];
    let sanitized_key = sanitized_columns_string[i];
    sanitized_obj[sanitized_key] = pobj_val;
  });
  let sanitized_obj_length = Object.keys(sanitized_obj).length;

  if (pobj_length !== sanitized_obj_length) {
    console.error(pobj);
    console.error(sanitized_obj);
    let err = new Error(
      "Parsing Error. Requested LL84 data not able to be relabeled / sanitized"
    );
    throw err;
  }
  return sanitized_obj as LL84QueryPropertyTypes;
};

const handleLL84QueryResponse = (
  val: string,
  year: string,
  callback: (e: LL84QueryPropertyTypes[]) => void
) => {
  if (val === "") {
    return;
  }

  let ll84_year_obj = ll84_year_lookups.find(
    (e) => e.key === year
  ) as LL84QueryObjTypes;

  let { endpoint, column_name_map, query_columns } = ll84_year_obj;

  let all_columns_string = column_name_map.map((d) => d[1]);

  let column_query_string = query_columns
    .map(
      (c, i) =>
        `${c} LIKE '%25${val}%25' ${
          i + 1 === query_columns.length ? "" : "OR "
        }`
    )
    .join("");
  let query = `${endpoint}?$query=SELECT ${all_columns_string} WHERE ${column_query_string} LIMIT 8
    `;

  let xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", query, true);

  xmlhttp.onreadystatechange = (d) => {
    let res = xmlhttp.response;

    if (res === "") {
      callback([]);
    } else {
      let parsed: StringObjectType[];
      try {
        parsed = JSON.parse(res);
      } catch {
        parsed = JSON.parse(`"${res}"`);
      }

      let sanitized_array: LL84QueryPropertyTypes[] = [];

      parsed.forEach((pobj) => {
        let sanitized_object = sanitizeLL84QueryResultsObject(
          pobj,
          column_name_map
        );
        sanitized_array.push(sanitized_object);
      });

      callback(sanitized_array);
    }
  };
  xmlhttp.send();
};

export { handleLL84QueryResponse };
