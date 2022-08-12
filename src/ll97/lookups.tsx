export const ll84_building_type_lookups = {
  Office: "B (Business)",
  "K-12 School": "E (Educational)",
  Hotel: "R-1 (Residential)",
  "Worship Facility": "A (Assembly)",
  "Other - Lodging/Residential": "R-1 (Residential)",
  "Distribution Center": "S (Storage)",
  "Non-Refrigerated Warehouse": "S (Storage)",
  "Refrigerated Warehouse": "S (Storage)",
  "Manufacturing/Industrial Plant": "F (Factory/Industrial)",
  "Multifamily Housing": "R-2 (Residential)",
  "Hospital (General Medical & Surgical)*": "I-2 (Institutional)",
  Other: "A (Assembly)",
  "Other - Education": "A (Assembly)",
  Museum: "A (Assembly)",
  "Other - Entertainment/Public Assembly": "A (Assembly)",
  "Retail Store": "M (Mercantile)",
  "College/University": "E (Educational)",
  "Food Service": "F (Factory/Industrial)",
  "Residence Hall/Dormitory": "R-1 (Residential)",
  Laboratory: "I-2 (Institutional)",
  "Medical Office": "B (Business)",
  "Urgent Care/Clinic/Other Outpatient": "B (Healthcare)",
  "Hospital (General Medical & Surgical)": "B (Healthcare)",
  "Ambulatory Surgical Center": "B (Healthcare)",
  "Other - Specialty Hospital": "I-2 (Institutional)",
  "Other - Mall": "B (Business)",
  "Senior Care Community": "I-1 (Institutional)",
  "Pre-school/Daycare": "E (Educational)",
  "Social/Meeting Hall": "A (Assembly)",
  "Performing Arts": "A (Assembly)",
  Parking: "U (Utility/Misc)",
  "Adult Education": "E (Educational)",
  "Self-Storage Facility": "U (Utility/Misc)",
  "Financial Office": "B (Business)",
  "Strip Mall": "M (Mercantile)",
  "Prison/Incarceration": "I-3 (Institutional)",
  "Fitness Center/Health Club/Gym": "B (Business)",
  "Bank Branch": "B (Business)",
  "Wholesale Club/Supercenter": "M (Mercantile)",
  "Data Center": "B (Business)",
  "Other - Services": "U (Utility/Misc)",
  "Outpatient Rehabilitation/Physical Therapy": "B (Business)",
  Library: "A (Assembly)",
  "Other - Recreation": "A (Assembly)",
  "Supermarket/Grocery Store": "M (Mercantile)",
  "Convenience Store without Gas Station": "M (Mercantile)",
  "Residential Care Facility": "I-1 (Institutional)",
  "Movie Theater": "A (Assembly)",
  "Enclosed Mall": "A (Assembly)",
  "Automobile Dealership": "B (Business)",
  "Mailing Center/Post Office": "B (Business)",
  "Personal Services (Health/Beauty, Dry Cleaning, etc)": "B (Business)",
  Courthouse: "A (Assembly)",
  "Other - Technology/Science": "B (Business)",
  "Other - Public Services": "B (Business)",
  "Repair Services (Vehicle, Shoe, Locksmith, etc)": "B (Business)",
  "Fire Station": "B (Business)",
  "Police Station": "B (Business)",
  "Wastewater Treatment Plant": "F (Factory/Industrial)",
  "Veterinary Office": "B (Business)",
  "Ice/Curling Rink": "A (Assembly)",
  Zoo: "A (Assembly)",
  "Transportation Terminal/Station": "A (Assembly)",
  "Stadium (Open)": "A (Assembly)",
  Restaurant: "A (Assembly)",
  "Vocational School": "E (Educational)",
  "Other - Restaurant/Bar": "B (Business)",
  "Fast Food Restaurant": "A (Assembly)",
  "Swimming Pool": "A (Assembly)",
  "Bar/Nightclub": "A (Assembly)",
  "Food Sales": "M (Mercantile)",
  "Other - Utility": "U (Utility/Misc)",
  "Bowling Alley": "A (Assembly)",
  "Single Family Home": "A (Assembly)",
  "Convention Center": "A (Assembly)",
};

export const building_type_abbreviation_array = [
  ["A (Assembly)", "A"],
  ["B (Business)", "B_norm"],
  ["B (Healthcare)", "B_health"],
  ["E (Educational)", "E"],
  ["F (Factory/Industrial)", "F"],
  ["H (High Hazard)", "H"],
  ["I-1 (Institutional)", "I1"],
  ["I-2 (Institutional)", "I2"],
  ["I-3 (Institutional)", "I3"],
  ["I-4 (Institutional)", "I4"],
  ["M (Mercantile)", "M"],
  ["R-1 (Residential)", "R1"],
  ["R-2 (Residential)", "R2"],
  ["S (Storage)", "S"],
  ["U (Utility/Misc)", "U"],
];

export const building_type_tags = building_type_abbreviation_array.map(
  (d) => d[1]
);
export const building_type_labels = building_type_abbreviation_array.map(
  (d) => d[0]
);

export const fuel_keys_to_labels = {
  elec: "Electricity (kWh)",
  steam: "Steam (mLbs)",
  fuel_two: "Fuel Oil #2 (gal)",
  fuel_four: "Fuel Oil #4 (gal)",
  gas: "Natural Gas (therms)",
};

export const fuel_keys_to_rate_labels = {
  elec: "$/kWh",
  steam: "$/mlb",
  fuel_two: "$/gal",
  fuel_four: "$/gal",
  gas: "$/therm",
};

export const co2_limits_by_building_type = {
  A: [0.01074, 0.0042, 0.0014],
  B_health: [0.02381, 0.0133, 0.0014],
  B_norm: [0.00846, 0.00453, 0.0014],
  E: [0.00758, 0.00344, 0.0014],
  F: [0.00574, 0.00167, 0.0014],
  H: [0.02381, 0.0133, 0.0014],
  I1: [0.01138, 0.00598, 0.0014],
  I2: [0.02381, 0.0133, 0.0014],
  I3: [0.02381, 0.0133, 0.0014],
  I4: [0.00758, 0.00344, 0.0014],
  M: [0.01181, 0.00403, 0.0014],
  R1: [0.00987, 0.00526, 0.0014],
  R2: [0.00675, 0.00407, 0.0014],
  S: [0.00426, 0.0011, 0.0014],
  U: [0.00426, 0.0011, 0.0014],
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
