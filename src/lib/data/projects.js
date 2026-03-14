export const projects = [
  {
    slug: "transit-accessibility-hyderabad",
    title: "Transit Accessibility Analysis — Hyderabad",
    city: "Hyderabad, Telangana",
    type: "GIS / Spatial Analysis",
    year: "2024",
    thumbnail: null,
    shortDescription:
      "A spatial analysis of public transit accessibility across Hyderabad's metropolitan region, examining MMTS and TSRTC bus network coverage zones and equity of access.",
    context:
      "Hyderabad's rapid urban expansion has outpaced its public transit infrastructure. Large peripheral zones remain underserved, creating significant accessibility gaps for low-income populations who depend on public transit for daily commuting.",
    problem:
      "How equitable is public transit accessibility across different zones of the Hyderabad metropolitan region? Which areas suffer the worst connectivity deficits, and how do these correlate with population density and income levels?",
    methodology:
      "Network analysis using OSRM and GTFS data from TSRTC. Isochrone mapping for 15-minute and 30-minute walking catchment areas around transit stops. Overlay with ward-level population and income data from Census 2011.",
    analysis:
      "GIS layers were built using QGIS and Python (GeoPandas). Transit stop locations were sourced from OpenStreetMap and official TSRTC schedules. Walk-time isochrones were generated for all 1,240 bus stops across the metropolitan region.",
    insights:
      "Only 38% of the metropolitan area falls within a 15-minute walk of a transit stop. Peripheral zones in Medchal-Malkajgiri and Rangareddy districts show severe deficits. Informal settlements in Outer Ring Road zones are most underserved.",
    outcome:
      "Recommendations for 14 new high-priority transit corridors to improve access in underserved zones. Findings shared with Hyderabad Metropolitan Development Authority (HMDA) as planning input.",
    tags: ["Transit", "Accessibility", "QGIS", "Python", "Hyderabad"],
    featured: true,
  },
  {
    slug: "urban-heat-island-vijayawada",
    title: "Urban Heat Island Mapping — Vijayawada",
    city: "Vijayawada, Andhra Pradesh",
    type: "GIS / Remote Sensing",
    year: "2024",
    thumbnail: null,
    shortDescription:
      "Remote sensing analysis of land surface temperature patterns across Vijayawada, identifying urban heat islands and their relationship with impervious surface cover.",
    context:
      "Vijayawada records some of the highest temperatures in India during summer months. Rapid urbanization has replaced green cover with concrete and asphalt, intensifying heat stress in dense urban core areas.",
    problem:
      "Where are the urban heat island hotspots in Vijayawada, and what land-use and built environment factors drive elevated land surface temperatures?",
    methodology:
      "Landsat 8 OLI/TIRS imagery for summer months (2019–2024). Land Surface Temperature (LST) retrieval using mono-window algorithm. NDVI and NDBI calculation for vegetation and built-up indices. Correlation with land-use data from VMRDA master plan.",
    analysis:
      "Multi-temporal LST analysis over five years. Hotspot analysis using Getis-Ord Gi* statistic in QGIS. Regression between LST, NDVI, and building density by ward.",
    insights:
      "Urban core wards show LST up to 8°C higher than peri-urban zones. Industrial areas near Kondapalli show the highest heat stress. Green spaces and water bodies along Krishna River provide measurable cooling effects.",
    outcome:
      "Identified 23 priority intervention zones for urban greening and cool surface materials. Proposed a green infrastructure masterplan with ward-level targets for tree canopy coverage.",
    tags: ["Remote Sensing", "Heat Island", "Landsat", "NDVI", "Vijayawada"],
    featured: true,
  },
  {
    slug: "street-network-walkability",
    title: "Street Network and Walkability Assessment",
    city: "Vijayawada, Andhra Pradesh",
    type: "GIS / Urban Design",
    year: "2023",
    thumbnail: null,
    shortDescription:
      "Analysis of street network connectivity and pedestrian infrastructure quality across Vijayawada's planning zones using graph-based metrics and field surveys.",
    context:
      "Indian cities have prioritized vehicular traffic over pedestrian movement in street design standards for decades. This has resulted in fragmented pedestrian networks, missing footpaths, and hostile walking environments in most urban zones.",
    problem:
      "How walkable is Vijayawada's street network? Where are the critical missing links in pedestrian infrastructure, and which neighborhoods suffer the most from poor walkability scores?",
    methodology:
      "OSMnx Python library for street network extraction and graph analysis. Walkability scoring based on connectivity (intersection density, street connectivity ratio), pedestrian infrastructure (footpath availability from field surveys), and proximity to services.",
    analysis:
      "Graph-theoretic metrics for 14 planning zones. Field survey of 200+ road segments for footpath quality assessment. Composite walkability index mapped at block level.",
    insights:
      "Central business district (CBD) shows highest connectivity but poor pedestrian infrastructure quality. Residential colonies in Patamata and Moghalrajpuram show good pedestrian environments but low connectivity. New residential areas show grid layouts but lack pedestrian amenities.",
    outcome:
      "Street improvement proposals for 18 priority corridors. Recommendations adopted in Vijayawada Smart City project for street redesign pilot zones.",
    tags: ["Walkability", "Street Network", "OSMnx", "Urban Design", "Smart City"],
    featured: true,
  },
  {
    slug: "land-use-change-detection",
    title: "Land Use Change Detection — Periurban Fringe",
    city: "Vijayawada Region, AP",
    type: "GIS / Remote Sensing",
    year: "2023",
    thumbnail: null,
    shortDescription:
      "Multi-temporal land use / land cover change detection along Vijayawada's periurban fringe using Sentinel-2 imagery and supervised classification.",
    context:
      "Vijayawada's periurban belt has undergone rapid transformation since the Amaravati capital city announcement in 2015. Agricultural land conversion, informal settlement growth, and real estate speculation have reshaped the periurban landscape significantly.",
    problem:
      "How has land use changed in Vijayawada's periurban fringe between 2015 and 2023? What is the rate and pattern of agricultural land conversion to urban uses?",
    methodology:
      "Sentinel-2 multi-spectral imagery for 2015, 2018, 2021, and 2023. Supervised classification using Random Forest classifier in Google Earth Engine. Accuracy assessment using stratified random sampling with ground truth points.",
    analysis:
      "Change detection matrix between classification periods. Hotspot analysis for land conversion patterns. Spatial correlation with Amaravati capital region boundary and road infrastructure.",
    insights:
      "37% of agricultural land within 10km of city boundary converted between 2015–2023. Conversion accelerated post-2019 CRDA dissolution. Highway corridors show highest conversion intensity.",
    outcome:
      "Evidence base for periurban planning policy reform. Analysis contributed to academic paper on periurban transformation in post-capital Indian cities.",
    tags: ["Land Use", "Change Detection", "Sentinel-2", "Google Earth Engine", "Periurban"],
    featured: false,
  },
];
