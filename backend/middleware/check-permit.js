// check-permit.js
function calculatePermissibleBuilding(data) {
  const plotArea = parseFloat(data.plot.area);
  const roadWidth = parseFloat(data.road.width);

  // Add basic validation
  if (!plotArea || !roadWidth) {
    throw new Error("Invalid plot or road data.");
  }

  let applicableFSI = 1.1;
  for (const rule of FSI_BY_ROAD_WIDTH) {
    if (roadWidth <= rule.maxWidth) {
      applicableFSI = rule.fsi;
      break;
    }
  }

  const permissibleBuiltupArea = plotArea * applicableFSI;
  const maxBuildingHeight = roadWidth * HEIGHT_FACTOR;
  const maxFloors = Math.floor(maxBuildingHeight / FLOOR_HEIGHT);
  const permissibleFootprint = plotArea * COVERAGE_RATIO;

  return {
    permissible_fsi: applicableFSI,
    plot_area_sqm: plotArea.toFixed(2),
    max_builtup_area_sqm: permissibleBuiltupArea.toFixed(2),
    max_building_height_m: maxBuildingHeight.toFixed(2),
    max_floors: maxFloors,
    permissible_footprint_sqm: permissibleFootprint.toFixed(2)
  };
}

module.exports = { calculatePermissibleBuilding };
