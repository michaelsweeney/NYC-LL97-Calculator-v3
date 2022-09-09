import { ll84_building_type_lookups } from "./lookups";
import { ll84_year_lookups } from "./lookups";
import {
  LL84QueryObjTypes,
  LL84QueryProperties,
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
  return sanitized_obj as LL84QueryProperties;
};

const handleLL84QueryResponse = (
  val: string,
  year: string,
  callback: (e: LL84QueryProperties[]) => void
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

      let sanitized_array: LL84QueryProperties[] = [];

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

// const parseResponse = (response) => {
//   let bldg = {
//     types: {},
//     utilities: {
//       elec: {
//         cons: 0,
//         rate: 0,
//       },
//       gas: {
//         cons: 0,
//         rate: 0,
//       },
//       steam: {
//         cons: 0,
//         rate: 0,
//       },
//       fuel_two: {
//         cons: 0,
//         rate: 0,
//       },
//       fuel_four: {
//         cons: 0,
//         rate: 0,
//       },
//     },
//   };

//   const roundNum = (n) => {
//     return Math.round(+n);
//   };

//   let steam_kbtu = response["district_steam_use_kbtu"];
//   let gas_kbtu = response["natural_gas_use_kbtu"];
//   let fuel_two_kbtu = response["fuel_oil_2_use_kbtu"];
//   let fuel_four_kbtu = response["fuel_oil_4_use_kbtu"];
//   let elec_kbtu = response["electricity_use_grid_purchase"];

//   let elec = roundNum(elec_kbtu / 3.412);
//   let steam = roundNum(steam_kbtu / 1194);
//   let gas = roundNum(gas_kbtu / 100);
//   let fuel_two = roundNum(fuel_two_kbtu / 138);
//   let fuel_four = roundNum(fuel_four_kbtu / 146);

//   bldg.utilities.elec = { cons: +elec || 0, rate: 0 };
//   bldg.utilities.steam = { cons: +steam || 0, rate: 0 };
//   bldg.utilities.gas = { cons: +gas || 0, rate: 0 };
//   bldg.utilities.fuel_two = { cons: +fuel_two || 0, rate: 0 };
//   bldg.utilities.fuel_four = { cons: +fuel_four || 0, rate: 0 };

//   let bldg_type_one = response["largest_property_use_type"];
//   let bldg_type_one_area = response["largest_property_use_type_1"];
//   let bldg_type_two = response["_2nd_largest_property_use"];
//   let bldg_type_two_area = response["_2nd_largest_property_use_1"];
//   let bldg_type_three = response["_3rd_largest_property_use"];
//   let bldg_type_three_area = response["_3rd_largest_property_use_1"];

//   bldg.types = {
//     1: {
//       type: translateBuildingType(bldg_type_one).ll97_short,
//       area: roundNum(bldg_type_one_area),
//       id: 1,
//     },
//     2: {
//       type: translateBuildingType(bldg_type_two).ll97_short,
//       area: roundNum(bldg_type_two_area),
//       id: 2,
//     },
//     3: {
//       type: translateBuildingType(bldg_type_three).ll97_short,
//       area: roundNum(bldg_type_three_area),
//       id: 3,
//     },
//   };

//   if (
//     bldg_type_one === "Not Available" ||
//     !bldg_type_one_area ||
//     bldg_type_one_area == 0
//   ) {
//     delete bldg.types[1];
//   }
//   if (
//     bldg_type_two === "Not Available" ||
//     !bldg_type_two_area ||
//     bldg_type_two_area == 0
//   ) {
//     delete bldg.types[2];
//   }
//   if (
//     bldg_type_three === "Not Available" ||
//     !bldg_type_three_area ||
//     bldg_type_three_area == 0
//   ) {
//     delete bldg.types[3];
//   }

//   return bldg;
// };

// export { handleResponse, parseResponse };
