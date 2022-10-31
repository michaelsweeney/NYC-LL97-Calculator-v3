import * as d3 from "d3";

export const bindD3Element = (
  parent: any,
  childtype: any,
  classname: string
) => {
  let selection;

  if (typeof parent.querySelectorAll === "function") {
    selection = d3.select(parent);
  } else {
    selection = parent;
  }
  return selection
    .selectAll(`.${classname}`)
    .data([0])
    .join(childtype)
    .attr("class", classname);
};

export const formatNumber = (val: number, decimals = 0) =>
  d3.format(`,.${decimals}f`)(val);

export const formatCurrency = (val: number, decimals = 0) =>
  d3.format(`$,.${decimals}f`)(val);

export const getMinValFromStack = (data: any) => {
  let min_val = 9e9;
  data.forEach((e: any) => {
    min_val = d3.min([min_val, d3.min([e[0], e[1]])]);
  });
  return min_val;
};

export const getMaxValFromStack = (data: any) => {
  let max_val = 0;
  data.forEach((p: any) => {
    p.forEach((e: any) => {
      max_val = d3.max([max_val, d3.max([e[0], e[1]])]);
    });
  });
  return max_val;
};
