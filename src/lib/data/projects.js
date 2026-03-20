export const projects = [
  {
    slug: "urban-equitability-index-hyderabad",
    title: "Urban Equitability Index — Hyderabad",
    city: "Hyderabad, Telangana",
    type: "GIS / Data Platform",
    year: "2024",
    thumbnail: "/thumbnails/hyderabad-equity.jpg",
    liveUrl: "https://hyderabad-equity.vercel.app/",
    mapCenter: { lat: 17.385, lng: 78.4867, zoom: 11 },
    mapEmbeds: [
      { label: "UEI Interactive Map", file: "/maps/hyderabad-equity.html" },
    ],
    shortDescription:
      "A full-stack spatial platform that scores and visualizes equity across all GHMC wards in Hyderabad — measuring access to schools, healthcare, and transit alongside opportunity, environment, and governance indicators into a single composite UEI score.",
    context:
      "Hyderabad's GHMC wards vary enormously in access to government schools, hospitals, bus stops, metro stations, and green space — but no unified, ward-level framework existed to compare and rank these disparities. Evidence-based prioritization requires a composite index that is reproducible and spatially explicit.",
    problem:
      "Which GHMC wards are the most and least equitable across access, opportunity, environment, and governance dimensions? How can indicator data from disparate GeoJSON sources be standardized, weighted without subjective bias, and presented in an interactive dashboard for planners?",
    methodology:
      "Point-in-polygon counts computed for each GHMC ward across 4 domains: ACCESS (affordable schools, government hospitals + PHCs, bus stops + metro + MMTS stations), OPPORTUNITY (commercial density, Fair Price Shops), ENVIRONMENT (parks, noise pollution), GOVERNANCE (Area Sabhas, Ward Committees). Indicators normalized using Min-Max scaling per ward area. Entropy weighting applied within each domain to derive objective, data-driven weights. Domain scores aggregated into a composite UEI as a simple average.",
    analysis:
      "Data engine built in Python (GeoPandas, Pandas, NumPy, Shapely). Spatial analytics: Global Moran's I for spatial autocorrelation, Z-score hotspot/coldspot detection, PCA dimensionality reduction + K-Means clustering to classify wards into 4 typologies (A–D). Backend: FastAPI + PostgreSQL/PostGIS serving ward scores via REST API. Frontend: Next.js + Mapbox GL JS for ward-level choropleth and Recharts for domain breakdowns. Fully Dockerized with docker-compose.",
    insights:
      "Entropy weighting revealed transit access as the highest-variance indicator, dominating ACCESS domain scores. Ward typology clustering identified four distinct groups: high-equity central wards (Type A), transit-rich but green-poor inner wards (Type B), opportunity-poor peripheral wards (Type C), and compound-disadvantage outer wards (Type D). Governance indicators (Area Sabha density) showed the weakest spatial clustering, suggesting more uniform distribution than service access.",
    outcome:
      "Deployed full-stack platform with interactive ward-level UEI dashboard, hotspot/coldspot maps, typology clustering visualization, and GeoJSON/CSV export. Data engine is modular — each indicator is a separate computation step that can be updated independently as new data becomes available.",
    tags: ["Spatial Equity", "GHMC", "FastAPI", "Next.js", "Mapbox GL JS", "Entropy Weighting"],
    featured: true,
  },
  {
    slug: "equicity-ai-infrastructure-risk",
    title: "Equicity AI — Urban Infrastructure Risk Assessment",
    city: "Vijayawada, Andhra Pradesh",
    type: "GeoAI / Machine Learning",
    year: "2024",
    thumbnail: "/thumbnails/equicity-risk.jpg",
    liveUrl: "https://equicity.netlify.app/",
    mapCenter: { lat: 16.5025, lng: 80.6484, zoom: 12 },
    mapEmbeds: [
      { label: "Infrastructure Risk Map", file: "/maps/equicity-risk.html" },
    ],
    shortDescription:
      "A GeoAI platform leveraging Google Earth Engine and machine learning to assess risk across urban infrastructure assets, with an interactive web interface for spatial risk visualization.",
    context:
      "Urban utilities and infrastructure assets face increasing climate and operational risks, yet most cities lack spatially explicit risk assessment tools. Integrating satellite data with ground-truth asset information can enable proactive risk management.",
    problem:
      "How can satellite imagery and geospatial machine learning be combined to produce asset-level risk scores for urban infrastructure, and how can this be made accessible through a user-friendly interface?",
    methodology:
      "Google Earth Engine API integration for satellite imagery retrieval and processing. Geospatial machine learning models built with Scikit-learn. Risk scoring pipeline applied to transformer and utility asset datasets. Results rendered as interactive choropleth maps.",
    analysis:
      "Backend developed in FastAPI with geemap and Earth Engine Python API. Frontend built in Next.js 16 with React-Leaflet for interactive risk map rendering. Jupyter notebook documents the full GeoAI analysis pipeline.",
    insights:
      "Transformer assets in low-lying, high-density zones show elevated composite risk scores. The GeoAI pipeline demonstrates how Earth Engine-derived indices (NDVI, NDWI, built-up density) can augment ground-level asset data for risk classification.",
    outcome:
      "Deployed interactive risk map (transformer_risk_map.html) and full-stack web application. Reusable GeoAI pipeline documented in GeoAI_Equicity.ipynb for extension to other asset classes and cities.",
    tags: ["GeoAI", "Google Earth Engine", "FastAPI", "Next.js", "Risk Modeling", "Scikit-learn"],
    featured: true,
  },
  {
    slug: "chennai-transfer-friction-thesis",
    title: "Chennai Transfer Friction Index — Thesis Maps",
    city: "Chennai, Tamil Nadu",
    type: "GIS / Research",
    year: "2025",
    thumbnail: "/thumbnails/chennai-thesis.jpg",
    mapCenter: { lat: 13.0827, lng: 80.2707, zoom: 11 },
    mapEmbeds: [
      { label: "Thesis Overview", file: "/maps/chennai-thesis.html" },
      { label: "Study Area", file: "/maps/chennai-study-area.html" },
      { label: "TFI Hotspots", file: "/maps/chennai-tfi-hotspots.html" },
    ],
    shortDescription:
      "A thesis-driven spatial analysis of transfer friction across Chennai's multimodal transit network — mapping interchange points, quantifying Transfer Friction Index (TFI) scores, and identifying hotspots of poor connectivity.",
    context:
      "Chennai's public transit network integrates suburban rail, MRT, MRTS, and bus services at interchange nodes. Transfer quality at these nodes is poorly measured and rarely visualized, despite being a key determinant of overall network performance and ridership.",
    problem:
      "How can transfer friction — the combined cost of walking, waiting, and navigating between modes — be quantified and mapped across Chennai's multimodal transit network? Which interchange nodes have the highest TFI scores, and where should improvement efforts be concentrated?",
    methodology:
      "Transfer Friction Index (TFI) computed from weighted components: pedestrian transfer distance, level changes, signage quality, waiting environment, and modal connectivity. Interchange nodes classified and ranked by TFI score. Spatial hotspot detection applied to identify priority intervention zones.",
    analysis:
      "Three interactive maps produced: Study Area map showing the multimodal network extent and zone classifications, TFI Hotspot map showing friction scores and ranked interchange nodes, and the composite Chennai Transfer Friction map with full legend and analysis overlay. Built with Leaflet.js.",
    insights:
      "High-TFI hotspots cluster at outer rail-bus interchange nodes where infrastructure investment has lagged. Central interchanges (Chennai Central, Egmore) show lower friction due to recent upgrades. The TFI distribution is spatially unequal, with peripheral communities facing the highest transfer penalties.",
    outcome:
      "Three production-quality interactive maps (Study Area, TFI Hotspots, Composite Thesis Map) with ranked interchange analysis, spatial hotspot detection, and an evidence base for targeted interchange improvement investments.",
    tags: ["Transfer Friction", "Multimodal", "Leaflet", "Thesis", "Transit", "Chennai"],
    featured: true,
  },
  {
    slug: "transitdata-hub-chennai",
    title: "TransitData Hub — Chennai MTC Network",
    city: "Chennai, Tamil Nadu",
    type: "Transit / Data Visualization",
    year: "2025",
    thumbnail: "/thumbnails/transitdata-hub.jpg",
    mapCenter: { lat: 13.0827, lng: 80.2707, zoom: 11 },
    mapEmbeds: [
      { label: "MTC Fleet GPS Tracks", file: "/maps/transitdata-hub.html" },
    ],
    shortDescription:
      "A modern transit data aggregation and visualization platform for Chennai's MTC bus network, serving standardized GeoJSON transit data through a performant API with an animated, interactive frontend.",
    context:
      "Chennai's MTC operates one of India's largest urban bus networks, but transit data is fragmented and inaccessible for analysis and public visualization. A centralized data hub can enable better planning tools and public transparency.",
    problem:
      "How can Chennai's MTC transit network data be standardized, served efficiently, and visualized interactively in a way that supports both planning analysis and public engagement?",
    methodology:
      "Backend designed as a GeoJSON API serving MTC master table data with PostGIS spatial queries and node-cache for performance. Frontend built for animated route visualization with spatial analysis capabilities.",
    analysis:
      "Backend: Node.js + Express 5 + PostgreSQL/PostGIS with compression middleware and caching. Frontend: React 19 + Vite + MapLibre GL 5 for route rendering, D3.js for data visualization, Turf.js for spatial analysis, Framer Motion for UI animations. ESM-only architecture throughout.",
    insights:
      "Standardizing MTC data as GeoJSON FeatureCollections reveals network gaps in peripheral zones. Route density analysis shows significant clustering in the city core, with low coverage in northern and southern suburban areas.",
    outcome:
      "Live transit data hub with GeoJSON API, interactive route map with MapLibre GL, animated network visualization, and spatial analysis tools. Platform designed for extension to GTFS and real-time data feeds.",
    tags: ["Transit", "MapLibre", "React", "GeoJSON", "MTC", "PostGIS"],
    featured: true,
  },
  {
    slug: "cmarks-road-cut-management-chennai",
    title: "C-MARKS — Road Cut Management System",
    city: "Chennai, Tamil Nadu",
    type: "Civic Tech / Web Platform",
    year: "2025",
    thumbnail: "/thumbnails/cmarks-roads.jpg",
    liveUrl: "https://roadcutting.vercel.app/",
    mapCenter: { lat: 13.0827, lng: 80.2384, zoom: 12 },
    mapEmbeds: [
      { label: "Road Network & Cut Applications", file: "/maps/cmarks-roads.html" },
    ],
    shortDescription:
      "A full-stack civic technology platform for managing road cutting permissions and Right-of-Way (RoW) in Chennai, featuring interactive mapping, admin approval workflows, and virtual street inspection.",
    context:
      "Road cutting for utility works in Chennai follows a fragmented, paper-based process leading to delays, uncoordinated excavations, and poor road quality. A digital platform can streamline permissions, improve oversight, and reduce road damage.",
    problem:
      "How can road cut permission workflows be digitized end-to-end, with spatial tracking of cut locations, admin oversight, and virtual inspection capabilities, to reduce processing time and improve road quality outcomes?",
    methodology:
      "Designed full-stack application with spatial database (PostGIS) for road network and cut location tracking. JWT-based authentication for multi-role access (applicant, admin, inspector). Integrated Google Street View API for virtual inspection without field visits.",
    analysis:
      "Backend built with Node.js + Express 5 + PostgreSQL/PostGIS. Frontend built in React 19 + Vite with Mapbox GL JS 3 for road network visualization. Dark/light theming with glassmorphism UI. Email notification system via Nodemailer.",
    insights:
      "Spatial clustering of cut applications reveals utility coordination opportunities — multiple applicants targeting the same road corridor within 6 months could be batched to minimize disruption and restoration costs.",
    outcome:
      "Fully functional platform with CRUD workflows for road cut applications, admin dashboard for approval/rejection, interactive map with PostGIS spatial queries, and virtual inspection via Street View integration.",
    tags: ["Civic Tech", "Node.js", "React", "PostGIS", "Mapbox", "Express"],
    featured: false,
  },
  {
    slug: "karur-logistics-suitability-dashboard",
    title: "Karur Logistics Suitability Dashboard",
    city: "Karur, Tamil Nadu",
    type: "GIS / Spatial Analysis",
    year: "2024",
    thumbnail: "/thumbnails/karur-logistics.jpg",
    liveUrl: "https://geoai-logistics.streamlit.app/",
    mapCenter: { lat: 10.9416, lng: 78.0188, zoom: 11 },
    mapEmbeds: [
      { label: "Suitability Dashboard", file: "/maps/karur-logistics.html" },
    ],
    shortDescription:
      "An interactive spatial dashboard mapping logistics hub suitability across Karur district using multi-criteria composite scoring — integrating freight corridors, road proximity, depot access, and industrial density.",
    context:
      "Karur district in Tamil Nadu is a growing industrial hub, particularly in textiles and engineering goods. Identifying optimal logistics infrastructure locations requires understanding the district's road network, freight corridors, and existing depot infrastructure.",
    problem:
      "Which zones in Karur district have the highest composite suitability for logistics hub development? How do freight corridor access, road density, and depot proximity combine to shape the spatial distribution of logistics potential?",
    methodology:
      "Multi-criteria composite suitability model applied at municipality level across Karur district. Scoring criteria: freight corridor presence, national highway proximity, route density, road km, depot proximity, industrial density, and habitat density. Results normalized and classified into suitability tiers.",
    analysis:
      "Built in Python (Folium, GeoPandas, Pandas). Spatial data sourced from OpenStreetMap and district-level GIS layers. Interactive choropleth map with popup details for each municipality polygon showing composite score and component breakdown.",
    insights:
      "Suitability concentrates along the NH-544 corridor and intersections with state highways near Karur town. Peripheral taluks with low road density and no freight corridor presence score consistently low despite available land.",
    outcome:
      "Interactive HTML dashboard with choropleth suitability map, municipality-level popups showing composite and component scores, and a ranked spatial analysis of logistics potential across Karur district.",
    tags: ["Logistics", "Karur", "Folium", "Suitability Modeling", "Tamil Nadu", "GIS"],
    featured: false,
  },
  {
    slug: "italy-retail-demographic-intelligence",
    title: "Retail & Demographic Intelligence — Italy",
    city: "Italy",
    type: "GeoAI / Spatial Analysis",
    year: "2024",
    thumbnail: "/thumbnails/italy-dashboard.jpg",
    mapCenter: { lat: 41.8719, lng: 12.5674, zoom: 6 },
    mapEmbeds: [
      { label: "Italy Data Explorer", file: "/maps/italy-dashboard.html" },
    ],
    shortDescription:
      "A geospatial intelligence platform for Italy integrating ISTAT statistical data, OpenStreetMap networks, and drive-time isochrone analysis to assess retail chain coverage and demographic reach.",
    context:
      "Retail location decisions in Italy require understanding drive-time accessibility, population demographics by municipality, and competitor presence. Open data from ISTAT provides rich statistical context that, when combined with spatial analysis, enables data-driven site selection.",
    problem:
      "What is the demographic reach of retail chain locations across Italian municipalities? Where are coverage gaps, and how do drive-time isochrones intersect with population and demographic distributions from ISTAT?",
    methodology:
      "Retail chain extraction using Google Places API across a grid-based spatial search covering Italy. Isochrone generation for drive-time zones. Weighted demographic calculations using ISTAT SDMX API data. R-tree spatial indexing for performance optimization.",
    analysis:
      "Python pipeline (GeoPandas, Shapely, Pyproj, Rtree, Requests). ISTAT data retrieval via SDMX API across 75+ statistical datasets. Interactive web applications (Map_V3.html, Map_V4_Google.html) for multi-level demographic exploration from region to municipality.",
    insights:
      "Drive-time catchment areas reveal significant demographic variation even within short distances in mountainous regions. Northern Italian municipalities show higher retail density; southern regions have larger underserved catchment zones per capita.",
    outcome:
      "Full geospatial intelligence pipeline with retail chain database, isochrone-population overlay tools, ISTAT data explorer web app, and batch processing utilities. Documented in Chains_Italy.ipynb with methodology report.",
    tags: ["ISTAT", "Isochrone", "Retail Analytics", "Python", "GeoPandas", "Italy"],
    featured: false,
  },
  {
    slug: "cumta-gps-trajectory-analysis-chennai",
    title: "CUMTA GPS Trajectory Analysis — Chennai Transit",
    city: "Chennai, Tamil Nadu",
    type: "Transit / Data Analysis",
    year: "2025",
    thumbnail: "/thumbnails/cumta-routes.jpg",
    mapCenter: { lat: 13.0827, lng: 80.2707, zoom: 11 },
    mapEmbeds: [
      { label: "GPS Route Map", file: "/maps/cumta-routes.html" },
      { label: "Density Hexbin", file: "/maps/cumta-hexbin.html" },
    ],
    shortDescription:
      "Analysis and visualization of GPS trajectory data from Chennai's public transit fleet, producing animated route maps, hexagonal density analysis, and fleet performance dashboards.",
    context:
      "GPS data from public transit vehicles contains rich operational intelligence — route adherence, coverage patterns, frequency distribution, and fleet utilization — that is rarely extracted and visualized in a usable form for planners.",
    problem:
      "What do raw GPS trajectories from Chennai's MTC fleet reveal about actual service patterns, route coverage, and operational performance when cleaned, processed, and visualized spatially?",
    methodology:
      "GPS data cleaning and validation pipeline. Trajectory mapping with road network alignment. Hexagonal density binning for coverage analysis. Fleet status aggregation for dashboard metrics. Animated visualizations for temporal pattern analysis.",
    analysis:
      "Python-based pipeline (GeoPandas, Pandas, Shapely, NumPy, Folium). Multiple visualization types generated: animated trajectories, hexbin density maps, road-aligned animations, vector field visualizations, and MTC fleet dashboard. CMA (Chennai Metropolitan Area) boundary integration for spatial context.",
    insights:
      "GPS data reveals significant deviation from scheduled routes in peak hours. Hexbin density maps show coverage concentration in north-south corridors with sparse east-west connectivity. Fleet status data indicates utilization imbalances across depots.",
    outcome:
      "Suite of interactive HTML visualizations (animated maps, density heatmaps, fleet dashboard), cleaned GPS dataset, and reusable Python analysis scripts. Analysis feeds into the broader TransitData Hub platform for Chennai.",
    tags: ["GPS", "Transit", "Folium", "Python", "MTC", "Trajectory Analysis"],
    featured: false,
  },
];
