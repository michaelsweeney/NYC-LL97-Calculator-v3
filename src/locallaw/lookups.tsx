import {
  LL84QueryObjTypes,
  YearValueObj,
  NumberObjectType,
  PropertyTypeCoefficientsTypes,
  LL84QueryPropertyTypes,
  YearRangeTypes,
} from "types";

export const building_type_co2_coefficients: PropertyTypeCoefficientsTypes[] = [
  {
    building_type: "Adult Education",
    "2024-2029": 0.00758,
    "2030-2034": 0.003565528,
    "2035-2039": 0.002674146,
    "2040-2049": 0.001782764,
    "2050-": 0,
  },
  {
    building_type: "Ambulatory Surgical Center",
    "2024-2029": 0.01181,
    "2030-2034": 0.008980612,
    "2035-2039": 0.006735459,
    "2040-2049": 0.004490306,
    "2050-": 0,
  },
  {
    building_type: "Automobile Dealership",
    "2024-2029": 0.00675,
    "2030-2034": 0.002824097,
    "2035-2039": 0.002118072,
    "2040-2049": 0.001412048,
    "2050-": 0,
  },
  {
    building_type: "Bank Branch",
    "2024-2029": 0.00987,
    "2030-2034": 0.004036172,
    "2035-2039": 0.003027129,
    "2040-2049": 0.002018086,
    "2050-": 0,
  },
  {
    building_type: "Bowling Alley",
    "2024-2029": 0.00574,
    "2030-2034": 0.003103815,
    "2035-2039": 0.002327861,
    "2040-2049": 0.001551907,
    "2050-": 0,
  },
  {
    building_type: "College/University",
    "2024-2029": 0.00987,
    "2030-2034": 0.002099748,
    "2035-2039": 0.001236322,
    "2040-2049": 0.000180818,
    "2050-": 0,
  },
  {
    building_type: "Convenience Store without Gas Station",
    "2024-2029": 0.00675,
    "2030-2034": 0.003540032,
    "2035-2039": 0.002655024,
    "2040-2049": 0.001770016,
    "2050-": 0,
  },
  {
    building_type: "Courthouse",
    "2024-2029": 0.00426,
    "2030-2034": 0.001480533,
    "2035-2039": 0.0011104,
    "2040-2049": 0.000740266,
    "2050-": 0,
  },
  {
    building_type: "Data Center",
    "2024-2029": 0.02381,
    "2030-2034": 0.014791131,
    "2035-2039": 0.011093348,
    "2040-2049": 0.007395565,
    "2050-": 0,
  },
  {
    building_type: "Distribution Center",
    "2024-2029": 0.00574,
    "2030-2034": 0.0009916,
    "2035-2039": 0.000549637,
    "2040-2049": 0.000123568,
    "2050-": 0,
  },
  {
    building_type: "Enclosed Mall",
    "2024-2029": 0.01074,
    "2030-2034": 0.003983803,
    "2035-2039": 0.002987852,
    "2040-2049": 0.001991901,
    "2050-": 0,
  },
  {
    building_type: "Financial Office",
    "2024-2029": 0.00846,
    "2030-2034": 0.003697004,
    "2035-2039": 0.002772753,
    "2040-2049": 0.001848502,
    "2050-": 0,
  },
  {
    building_type: "Fitness Center/Health Club/Gym",
    "2024-2029": 0.00987,
    "2030-2034": 0.003946728,
    "2035-2039": 0.002960046,
    "2040-2049": 0.001973364,
    "2050-": 0,
  },
  {
    building_type: "Food Sales",
    "2024-2029": 0.01181,
    "2030-2034": 0.00520888,
    "2035-2039": 0.00390666,
    "2040-2049": 0.00260444,
    "2050-": 0,
  },
  {
    building_type: "Food Service",
    "2024-2029": 0.01181,
    "2030-2034": 0.007749414,
    "2035-2039": 0.00581206,
    "2040-2049": 0.003874707,
    "2050-": 0,
  },
  {
    building_type: "Hospital (General Medical & Surgical)",
    "2024-2029": 0.02381,
    "2030-2034": 0.007335204,
    "2035-2039": 0.004654044,
    "2040-2049": 0.002997851,
    "2050-": 0,
  },
  {
    building_type: "Hotel",
    "2024-2029": 0.00987,
    "2030-2034": 0.003850668,
    "2035-2039": 0.002640017,
    "2040-2049": 0.001465772,
    "2050-": 0,
  },
  {
    building_type: "K-12 School",
    "2024-2029": 0.00675,
    "2030-2034": 0.002230588,
    "2035-2039": 0.001488109,
    "2040-2049": 0.000809607,
    "2050-": 0,
  },
  {
    building_type: "Laboratory",
    "2024-2029": 0.02381,
    "2030-2034": 0.026029868,
    "2035-2039": 0.019522401,
    "2040-2049": 0.013014934,
    "2050-": 0,
  },
  {
    building_type: "Library",
    "2024-2029": 0.00675,
    "2030-2034": 0.002218412,
    "2035-2039": 0.001663809,
    "2040-2049": 0.001109206,
    "2050-": 0,
  },
  {
    building_type: "Lifestyle Center",
    "2024-2029": 0.00846,
    "2030-2034": 0.00470585,
    "2035-2039": 0.003529387,
    "2040-2049": 0.002352925,
    "2050-": 0,
  },
  {
    building_type: "Mailing Center/Post Office",
    "2024-2029": 0.00426,
    "2030-2034": 0.00198044,
    "2035-2039": 0.00148533,
    "2040-2049": 0.00099022,
    "2050-": 0,
  },
  {
    building_type: "Manufacturing/Industrial Plant",
    "2024-2029": 0.00758,
    "2030-2034": 0.00141703,
    "2035-2039": 0.000975993,
    "2040-2049": 0.000508346,
    "2050-": 0,
  },
  {
    building_type: "Medical Office",
    "2024-2029": 0.01074,
    "2030-2034": 0.002912778,
    "2035-2039": 0.001683565,
    "2040-2049": 0.000407851,
    "2050-": 0,
  },
  {
    building_type: "Movie Theater",
    "2024-2029": 0.01181,
    "2030-2034": 0.005395268,
    "2035-2039": 0.004046451,
    "2040-2049": 0.002697634,
    "2050-": 0,
  },
  {
    building_type: "Multifamily Housing",
    "2024-2029": 0.00675,
    "2030-2034": 0.00334664,
    "2035-2039": 0.002692183,
    "2040-2049": 0.002052731,
    "2050-": 0,
  },
  {
    building_type: "Museum",
    "2024-2029": 0.01181,
    "2030-2034": 0.0053958,
    "2035-2039": 0.00404685,
    "2040-2049": 0.0026979,
    "2050-": 0,
  },
  {
    building_type: "Non-Refrigerated Warehouse",
    "2024-2029": 0.00426,
    "2030-2034": 0.000883187,
    "2035-2039": 0.000568051,
    "2040-2049": 0.000163152,
    "2050-": 0,
  },
  {
    building_type: "Office",
    "2024-2029": 0.00758,
    "2030-2034": 0.002690852,
    "2035-2039": 0.00165234,
    "2040-2049": 0.000581893,
    "2050-": 0,
  },
  {
    building_type: "Other",
    "2024-2029": 0.00758,
    "2030-2034": 0.002690852,
    "2035-2039": 0.00165234,
    "2040-2049": 0.000581893,
    "2050-": 0,
  },
  {
    building_type: "Other - Education",
    "2024-2029": 0.00846,
    "2030-2034": 0.002934006,
    "2035-2039": 0.001867699,
    "2040-2049": 0.000839571,
    "2050-": 0,
  },
  {
    building_type: "Other - Entertainment/Public Assembly",
    "2024-2029": 0.00987,
    "2030-2034": 0.002956738,
    "2035-2039": 0.002250122,
    "2040-2049": 0.00135561,
    "2050-": 0,
  },
  {
    building_type: "Other - Lodging/Residential",
    "2024-2029": 0.00758,
    "2030-2034": 0.001901982,
    "2035-2039": 0.001329089,
    "2040-2049": 0.000762093,
    "2050-": 0,
  },
  {
    building_type: "Other - Mall",
    "2024-2029": 0.01074,
    "2030-2034": 0.001928226,
    "2035-2039": 0.001006426,
    "2040-2049": 0.000067983,
    "2050-": 0,
  },
  {
    building_type: "Other - Public Services",
    "2024-2029": 0.00758,
    "2030-2034": 0.003808033,
    "2035-2039": 0.002856025,
    "2040-2049": 0.001904017,
    "2050-": 0,
  },
  {
    building_type: "Other - Recreation",
    "2024-2029": 0.00987,
    "2030-2034": 0.00447957,
    "2035-2039": 0.003359678,
    "2040-2049": 0.002239785,
    "2050-": 0,
  },
  {
    building_type: "Other - Restaurant/Bar",
    "2024-2029": 0.02381,
    "2030-2034": 0.008505075,
    "2035-2039": 0.006378806,
    "2040-2049": 0.004252537,
    "2050-": 0,
  },
  {
    building_type: "Other - Services",
    "2024-2029": 0.01074,
    "2030-2034": 0.001823381,
    "2035-2039": 0.001367536,
    "2040-2049": 0.000911691,
    "2050-": 0,
  },
  {
    building_type: "Other - Specialty Hospital",
    "2024-2029": 0.02381,
    "2030-2034": 0.006321819,
    "2035-2039": 0.004741365,
    "2040-2049": 0.00316091,
    "2050-": 0,
  },
  {
    building_type: "Other - Technolog/Science",
    "2024-2029": 0.02381,
    "2030-2034": 0.010446456,
    "2035-2039": 0.007834842,
    "2040-2049": 0.005223228,
    "2050-": 0,
  },
  {
    building_type: "Outpatient Rehabilitation/Physical Therapy",
    "2024-2029": 0.01181,
    "2030-2034": 0.006018323,
    "2035-2039": 0.004513742,
    "2040-2049": 0.003009161,
    "2050-": 0,
  },
  {
    building_type: "Parking",
    "2024-2029": 0.00426,
    "2030-2034": 0.000214421,
    "2035-2039": 0.000104943,
    "2040-2049": 0.0,
    "2050-": 0,
  },
  {
    building_type: "Performing Arts",
    "2024-2029": 0.00846,
    "2030-2034": 0.002472539,
    "2035-2039": 0.001399345,
    "2040-2049": 0.0,
    "2050-": 0,
  },
  {
    building_type: "Personal Services (Health/Beauty, Dry Cleaning, etc.)",
    "2024-2029": 0.00574,
    "2030-2034": 0.004843037,
    "2035-2039": 0.003632278,
    "2040-2049": 0.002421519,
    "2050-": 0,
  },
  {
    building_type: "Pre-school/Daycare",
    "2024-2029": 0.00675,
    "2030-2034": 0.002362874,
    "2035-2039": 0.001772155,
    "2040-2049": 0.001181437,
    "2050-": 0,
  },
  {
    building_type: "Refrigerated Warehouse",
    "2024-2029": 0.00987,
    "2030-2034": 0.002852131,
    "2035-2039": 0.002139098,
    "2040-2049": 0.001426066,
    "2050-": 0,
  },
  {
    building_type: "Repair Services (Vehicle, Shoe, Locksmith, etc.)",
    "2024-2029": 0.00426,
    "2030-2034": 0.002210699,
    "2035-2039": 0.001658024,
    "2040-2049": 0.001105349,
    "2050-": 0,
  },
  {
    building_type: "Residence Hall/Dormitory",
    "2024-2029": 0.00758,
    "2030-2034": 0.002464089,
    "2035-2039": 0.001332459,
    "2040-2049": 0.000528616,
    "2050-": 0,
  },
  {
    building_type: "Residential Care Facility",
    "2024-2029": 0.01138,
    "2030-2034": 0.004893124,
    "2035-2039": 0.004027812,
    "2040-2049": 0.002272629,
    "2050-": 0,
  },
  {
    building_type: "Restaurant",
    "2024-2029": 0.01181,
    "2030-2034": 0.004038374,
    "2035-2039": 0.00302878,
    "2040-2049": 0.002019187,
    "2050-": 0,
  },
  {
    building_type: "Retail Store",
    "2024-2029": 0.00758,
    "2030-2034": 0.00210449,
    "2035-2039": 0.00121605,
    "2040-2049": 0.00017604,
    "2050-": 0,
  },
  {
    building_type: "Self-Storage Facility",
    "2024-2029": 0.00426,
    "2030-2034": 0.00061183,
    "2035-2039": 0.000404901,
    "2040-2049": 0.000132282,
    "2050-": 0,
  },
  {
    building_type: "Senior Care Community",
    "2024-2029": 0.01138,
    "2030-2034": 0.004410123,
    "2035-2039": 0.003336443,
    "2040-2049": 0.002277912,
    "2050-": 0,
  },
  {
    building_type: "Social/Meeting Hall",
    "2024-2029": 0.00987,
    "2030-2034": 0.003833108,
    "2035-2039": 0.002874831,
    "2040-2049": 0.001916554,
    "2050-": 0,
  },
  {
    building_type: "Strip Mall",
    "2024-2029": 0.01181,
    "2030-2034": 0.001361842,
    "2035-2039": 0.000600493,
    "2040-2049": 0.000038512,
    "2050-": 0,
  },
  {
    building_type: "Supermarket/Grocery Store",
    "2024-2029": 0.02381,
    "2030-2034": 0.00675519,
    "2035-2039": 0.004256103,
    "2040-2049": 0.002030027,
    "2050-": 0,
  },
  {
    building_type: "Transportation Terminal/Station",
    "2024-2029": 0.00426,
    "2030-2034": 0.000571669,
    "2035-2039": 0.000428752,
    "2040-2049": 0.000285834,
    "2050-": 0,
  },
  {
    building_type: "Urgent Care/Clinic/Other Outpatient",
    "2024-2029": 0.01181,
    "2030-2034": 0.005772375,
    "2035-2039": 0.004329281,
    "2040-2049": 0.002886187,
    "2050-": 0,
  },
  {
    building_type: "Vocational School",
    "2024-2029": 0.00574,
    "2030-2034": 0.004613122,
    "2035-2039": 0.003459842,
    "2040-2049": 0.002306561,
    "2050-": 0,
  },
  {
    building_type: "Wholesale Club/Supercenter",
    "2024-2029": 0.01138,
    "2030-2034": 0.004264962,
    "2035-2039": 0.003198721,
    "2040-2049": 0.002132481,
    "2050-": 0,
  },
  {
    building_type: "Worship Facility",
    "2024-2029": 0.00574,
    "2030-2034": 0.001230602,
    "2035-2039": 0.000866921,
    "2040-2049": 0.000549306,
    "2050-": 0,
  },
];

export const fuel_keys_to_labels = {
  elec: "Electricity (kWh)",
  steam: "Steam (mLbs)",
  fuel_two: "Fuel Oil #2 (gal)",
  fuel_four: "Fuel Oil #4 (gal)",
  gas: "Natural Gas (therms)",
};

export const bar_keys_to_labels = {
  elec: "Electricity",
  gas: "Gas",
  steam: "Steam",
  fuel_two: "Fuel Oil 2",
  fuel_four: "Fuel Oil 4",
  fine: "Fine",
  threshold_carbon: "Carbon Threshold",
  under_carbon: "Carbon Below Threshold",
  excess_carbon: "Carbon Over Threshold",
  total_carbon: "Total Carbon",
  total_cost: "Total Cost",
};

export const fuel_keys_to_rate_labels = {
  elec: "$/kWh",
  steam: "$/mlb",
  fuel_two: "$/gal",
  fuel_four: "$/gal",
  gas: "$/therm",
};

export const fine_per_ton_co2 = 268;

export const native_to_kbtu_factor = {
  elec: 3.412,
  gas: 100,
  steam: 1194,
  fuel_two: 138,
  fuel_four: 146,
};

export const kbtu_to_ton_carbon_factor = {
  elec: 0.000084689,
  gas: 0.00005311,
  steam: 0.00004493,
  fuel_two: 0.00007421,
  fuel_four: 0.00007529,
};

export const default_utility_rates = {
  elec: 0.22,
  gas: 0.997,
  steam: 35,
  fuel_two: 1.65,
  fuel_four: 1.65,
};

export const ll84_year_lookups: LL84QueryObjTypes[] = [
  {
    key: "ll84_2021_cal_2020",
    documentation:
      "https://dev.socrata.com/foundry/data.cityofnewyork.us/usc3-8zwd",
    endpoint: "https://data.cityofnewyork.us/resource/usc3-8zwd.json",
    label: "2021 (cal year 2020)",
    column_name_map: [
      ["property_name", "property_name"],
      ["property_id", "property_id"],
      ["address_1", "address_1"],
      ["nyc_bbl", "nyc_borough_block_and_lot_bbl"],
      ["nyc_bin", "nyc_building_identification_number_bin"],
      ["1st_property_use_type", "largest_property_use_type"],
      ["1st_property_use_sf", "largest_property_use_type_gross_floor_area_ft"],
      ["2nd_property_use_type", "_2nd_largest_property_use_type"],
      ["2nd_property_use_sf", "_2nd_largest_property_use_gross_floor_area_ft"],
      ["3rd_property_use_type", "_3rd_largest_property_use_type"],
      [
        "3rd_property_use_sf",
        "_3rd_largest_property_use_type_gross_floor_area_ft",
      ],
      ["fuel_oil_2_consumption_kbtu", "fuel_oil_2_use_kbtu"],
      ["fuel_oil_4_consumption_kbtu", "fuel_oil_4_use_kbtu"],
      ["district_steam_consumption_kbtu", "district_steam_use_kbtu"],
      ["natural_gas_consumption_kbtu", "natural_gas_use_kbtu"],
      [
        "electricity_consumption_kbtu",
        "electricity_use_grid_purchase_and_generated_from_onsite_renewable_systems_kbtu",
      ],
      [
        "electricity_onsite_generated_kbtu",
        "electricity_use_generated_from_onsite_renewable_systems_and_used_onsite_kbtu",
      ],
    ],
    query_columns: [
      "property_name",
      "nyc_borough_block_and_lot_bbl",
      "address_1",
      "nyc_building_identification_number_bin",
    ],
  },
  {
    key: "ll84_2020_cal_2019",
    endpoint: "https://data.cityofnewyork.us/resource/wcm8-aq5w.json",
    documentation:
      "https://dev.socrata.com/foundry/data.cityofnewyork.us/wcm8-aq5w",
    label: "2020 (cal year 2019)",
    column_name_map: [
      ["property_name", "property_name"],
      ["property_id", "property_id"],
      ["address_1", "address_1"],
      ["nyc_bbl", "nyc_borough_block_and_lot"],
      ["nyc_bin", "nyc_building_identification"],
      ["1st_property_use_type", "largest_property_use_type"],
      ["1st_property_use_sf", "largest_property_use_type_1"],
      ["2nd_property_use_type", "_2nd_largest_property_use"],
      ["2nd_property_use_sf", "_2nd_largest_property_use_1"],
      ["3rd_property_use_type", "_3rd_largest_property_use"],
      ["3rd_property_use_sf", "_3rd_largest_property_use_1"],
      ["fuel_oil_2_consumption_kbtu", "fuel_oil_2_use_kbtu"],
      ["fuel_oil_4_consumption_kbtu", "fuel_oil_4_use_kbtu"],
      ["district_steam_consumption_kbtu", "district_steam_use_kbtu"],
      ["natural_gas_consumption_kbtu", "natural_gas_use_kbtu"],
      ["electricity_consumption_kbtu", "electricity_use_grid_purchase_2"],
      ["electricity_onsite_generated_kbtu", "electricity_use_generated"],
    ],
    query_columns: [
      "property_name",
      "nyc_borough_block_and_lot",
      "address_1",
      "nyc_building_identification",
    ],
  },

  {
    key: "ll84_2019_cal_2018",
    endpoint: "https://data.cityofnewyork.us/resource/4tys-3tzj.json",
    documentation:
      "https://dev.socrata.com/foundry/data.cityofnewyork.us/4tys-3tzj",
    label: "2019 (cal year 2018)",
    column_name_map: [
      ["property_name", "property_name"],
      ["property_id", "property_id"],
      ["nyc_bbl", "nyc_borough_block_and_lot"],
      ["nyc_bin", "nyc_building_identification"],
      ["address_1", "address_1"],
      ["1st_property_use_type", "largest_property_use_type"],
      ["1st_property_use_sf", "largest_property_use_type_1"],
      ["2nd_property_use_type", "_2nd_largest_property_use"],
      ["2nd_property_use_sf", "_2nd_largest_property_use_1"],
      ["3rd_property_use_type", "_3rd_largest_property_use"],
      ["3rd_property_use_sf", "_3rd_largest_property_use_1"],
      ["fuel_oil_2_consumption_kbtu", "fuel_oil_2_use_kbtu"],
      ["fuel_oil_4_consumption_kbtu", "fuel_oil_4_use_kbtu"],
      ["district_steam_consumption_kbtu", "district_steam_use_kbtu"],
      ["natural_gas_consumption_kbtu", "natural_gas_use_kbtu"],
      ["electricity_consumption_kbtu", "electricity_use_grid_purchase_2"],
      ["electricity_onsite_generated_kbtu", "electricity_use_generated"],
    ],
    query_columns: [
      "property_name",
      "nyc_borough_block_and_lot",
      "address_1",
      "nyc_building_identification",
    ],
  },
  {
    key: "ll84_2018_cal_2017",
    endpoint: "https://data.cityofnewyork.us/resource/4t62-jm4m.json",
    documentation:
      "https://dev.socrata.com/foundry/data.cityofnewyork.us/4t62-jm4m",
    label: "2018 (cal year 2017)",
    column_name_map: [
      ["property_name", "property_name"],
      ["property_id", "property_id"],
      ["nyc_bbl", "nyc_borough_block_and_lot"],
      ["nyc_bin", "nyc_building_identification"],
      ["address_1", "address_1"],
      ["1st_property_use_type", "largest_property_use_type"],
      ["1st_property_use_sf", "largest_property_use_type_1"],
      ["2nd_property_use_type", "_2nd_largest_property_use"],
      ["2nd_property_use_sf", "_2nd_largest_property_use_1"],
      ["3rd_property_use_type", "_3rd_largest_property_use"],
      ["3rd_property_use_sf", "_3rd_largest_property_use_1"],
      ["fuel_oil_2_consumption_kbtu", "fuel_oil_2_use_kbtu"],
      ["fuel_oil_4_consumption_kbtu", "fuel_oil_4_use_kbtu"],
      ["district_steam_consumption_kbtu", "district_steam_use_kbtu"],
      ["natural_gas_consumption_kbtu", "natural_gas_use_kbtu"],
      ["electricity_consumption_kbtu", "electricity_use_grid_purchase_2"],
      ["electricity_onsite_generated_kbtu", "electricity_use_generated"],
    ],
    query_columns: [
      "property_name",
      "nyc_borough_block_and_lot",
      "address_1",
      "nyc_building_identification",
    ],
  },
];

export const non_electric_tons_per_kbtu_coefficients: NumberObjectType = {
  gas: 0.00005311,
  steam_2024_2029: 0.00004493,
  steam_2030_2050: 0.0000432,
  fuel_two: 0.00007421,
  fuel_four: 0.00007529,
};

export const cambium_elec_coefficients: YearValueObj[] = [
  { year: 2022, value: 0.0001165 },
  { year: 2023, value: 0.00011106 },
  { year: 2024, value: 0.00010563 },
  { year: 2025, value: 0.00009751 },
  { year: 2026, value: 0.00008939 },
  { year: 2027, value: 0.00007925 },
  { year: 2028, value: 0.00006911 },
  { year: 2029, value: 0.00006295 },
  { year: 2030, value: 0.0000568 },
  { year: 2031, value: 0.00005144 },
  { year: 2032, value: 0.00004607 },
  { year: 2033, value: 0.00004304 },
  { year: 2034, value: 0.00004001 },
  { year: 2035, value: 0.00003532 },
  { year: 2036, value: 0.00003063 },
  { year: 2037, value: 0.00002855 },
  { year: 2038, value: 0.00002647 },
  { year: 2039, value: 0.00002784 },
  { year: 2040, value: 0.00002922 },
  { year: 2041, value: 0.00003082 },
  { year: 2042, value: 0.00003242 },
  { year: 2043, value: 0.00003206 },
  { year: 2044, value: 0.00003171 },
  { year: 2045, value: 0.00002918 },
  { year: 2046, value: 0.00002664 },
  { year: 2047, value: 0.00002522 },
  { year: 2048, value: 0.0000238 },
  { year: 2049, value: 0.00002277 },
  { year: 2050, value: 0.00002175 },
];

export const ll97_current_elec_coefficients: YearValueObj[] = [
  { year: 2022, value: 0.00008469 },
  { year: 2023, value: 0.00008469 },
  { year: 2024, value: 0.00008469 },
  { year: 2025, value: 0.00008469 },
  { year: 2026, value: 0.00008469 },
  { year: 2027, value: 0.00008469 },
  { year: 2028, value: 0.00008469 },
  { year: 2029, value: 0.00008469 },
  { year: 2030, value: 0.0000425 },
  { year: 2031, value: 0.0000425 },
  { year: 2032, value: 0.0000425 },
  { year: 2033, value: 0.0000425 },
  { year: 2034, value: 0.0000425 },
  { year: 2035, value: 0.0000425 },
  { year: 2036, value: 0.0000425 },
  { year: 2037, value: 0.0000425 },
  { year: 2038, value: 0.0000425 },
  { year: 2039, value: 0.0000425 },
  { year: 2040, value: 0.0000425 },
  { year: 2041, value: 0.0000425 },
  { year: 2042, value: 0.0000425 },
  { year: 2043, value: 0.0000425 },
  { year: 2044, value: 0.0000425 },
  { year: 2045, value: 0.0000425 },
  { year: 2046, value: 0.0000425 },
  { year: 2047, value: 0.0000425 },
  { year: 2048, value: 0.0000425 },
  { year: 2049, value: 0.0000425 },
  { year: 2050, value: 0.0000425 },
];

export const year_range_to_year_array: { [key: string]: number[] } = {
  "2024-2029": [2024, 2025, 2026, 2027, 2028, 2029],
  "2030-2034": [2030, 2031, 2032, 2033, 2034],
  "2035-2039": [2035, 2036, 2037, 2038, 2039],
  "2040-2049": [2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049],
  "2050-": [2050],
};

export const yearToYearRangeString = (year: number) => {
  if (year < 2024) {
    return "2022-2024";
  } else if (year <= 2029) {
    return "2024-2029";
  } else if (year <= 2034) {
    return "2030-2034";
  } else if (year <= 2039) {
    return "2035-2039";
  } else if (year <= 2049) {
    return "2040-2049";
  } else {
    return "2050-";
  }
};

export const yearToYearArray = (year: number) => {
  if (year < 2024) {
    return [0];
  } else if (year <= 2029) {
    return year_range_to_year_array["2024-2029"];
  } else if (year <= 2034) {
    return year_range_to_year_array["2030-2034"];
  } else if (year <= 2039) {
    return year_range_to_year_array["2035-2039"];
  } else if (year <= 2049) {
    return year_range_to_year_array["2040-2049"];
  } else {
    return year_range_to_year_array["2050-"];
  }
};

export const sample_ll84_data: LL84QueryPropertyTypes = {
  property_name: "Sample Building",
  property_id: "1261446",
  address_1: "125 Broadway",
  nyc_bbl: "1-00072-7201",
  nyc_bin: "1001068",
  "1st_property_use_type": "Office",
  "1st_property_use_sf": "2281918",
  "2nd_property_use_type": "Social/Meeting Hall",
  "2nd_property_use_sf": "41501",
  "3rd_property_use_type": "Data Center",
  "3rd_property_use_sf": "18000",
  fuel_oil_2_consumption_kbtu: "Not Available",
  fuel_oil_4_consumption_kbtu: "Not Available",
  district_steam_consumption_kbtu: (70702 * 1194).toString(),
  natural_gas_consumption_kbtu: (18293 * 100).toString(),
  electricity_consumption_kbtu: (35678343 * 3.412).toString(),
  electricity_onsite_generated_kbtu: "Not Available",
};

export const range_year_lengths: { [key: string]: number } = {
  "2022-2024": 2,
  "2024-2029": 6,
  "2030-2034": 5,
  "2035-2039": 5,
  "2040-2049": 10,
  "2050-": 5,
};
