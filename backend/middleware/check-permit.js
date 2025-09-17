function calculatePermissibleBuilding(req, res) {
    const data = req.body;
  
    const plotArea = parseFloat(data.plot.area);        // e.g., 874.72
    const roadWidth = parseFloat(data.road.width);      // e.g., 9
    const buildingArea = parseFloat(data.building.area); // e.g., 299.50
  
    // Step 1: Determine FSI based on road width
    let applicableFSI = 1.1; // default
    for (const rule of FSI_BY_ROAD_WIDTH) {
      if (roadWidth <= rule.maxWidth) {
        applicableFSI = rule.fsi;
        break;
      }
    }
  
    // Step 2: Calculate permissible built-up area
    const permissibleBuiltupArea = plotArea * applicableFSI;
  
    // Step 3: Calculate max building height
    const maxBuildingHeight = roadWidth * HEIGHT_FACTOR;
  
    // Step 4: Estimate permissible floors
    const maxFloors = Math.floor(maxBuildingHeight / FLOOR_HEIGHT);
  
    // Step 5: Estimate max building footprint
    const permissibleFootprint = plotArea * COVERAGE_RATIO;
  
    // Construct Response
    const result = {
      "permissible_fsi": applicableFSI,
      "plot_area_sqm": plotArea.toFixed(2),
      "max_builtup_area_sqm": permissibleBuiltupArea.toFixed(2),
      "max_building_height_m": maxBuildingHeight.toFixed(2),
      "max_floors": maxFloors,
      "permissible_footprint_sqm": permissibleFootprint.toFixed(2)
    };
  
    return res.json(result);
  }

  
  