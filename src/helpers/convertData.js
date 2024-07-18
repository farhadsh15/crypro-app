const convertData = (data, type) => {
  const convertedData = data[type].map((item) => {
    let data;
    type === "market_caps" || type=== "total_volumes" ? data = item[1]/10000000 : data = item[1]
    return {
      data: item[0],
      // [type]: data,
      [type]: item[1],
    };
  });
  return convertedData;
};

export { convertData };
