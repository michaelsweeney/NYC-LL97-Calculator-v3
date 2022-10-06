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
