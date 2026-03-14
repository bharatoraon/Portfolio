export const research = [
  {
    slug: "urban-governance-indian-cities",
    title: "Urban Governance in Indian Cities",
    subtitle: "Decentralisation, Institutional Fragmentation, and the 74th CAA",
    date: "2024-11-15",
    readTime: "12 min read",
    category: "Policy Essay",
    tags: ["Governance", "74th CAA", "Urban Local Bodies", "Decentralisation"],
    excerpt:
      "Three decades after the 74th Constitutional Amendment Act promised decentralisation, Indian urban local bodies remain structurally weak, fiscally constrained, and functionally fragmented. This essay examines why ULBs continue to struggle for meaningful autonomy and what institutional reforms are needed.",
    content: `
The 74th Constitutional Amendment Act (1992) was a watershed moment in India's urban governance history. It promised to transform Urban Local Bodies (ULBs) into self-governing institutions with defined functions, finances, and functionaries — the three F's of decentralisation. Three decades later, the promise remains largely unfulfilled.

## The Implementation Gap

State governments have been reluctant to devolve meaningful functions to ULBs. The 18 functions listed in the 12th Schedule — which includes urban planning, regulation of land use, and urban poverty alleviation — remain largely with state-level parastatals and development authorities.

Hyderabad's Outer Ring Road was planned by HMDA (Hyderabad Metropolitan Development Authority), not by the GHMC (Greater Hyderabad Municipal Corporation). Bengaluru's metro is run by BMRCL, a state-level body. In nearly every Indian city, the most consequential urban infrastructure decisions are made by agencies that bypass the elected ULB entirely.

## Fiscal Fragility

Indian ULBs are among the most fiscally dependent urban governments in the world. Own-source revenue averages just 40–50% of total expenditure for large corporations — and this drops dramatically for smaller ULBs. Property tax collection remains chronically below potential across most Indian cities.

The 15th Finance Commission did introduce a performance-based urban grant mechanism and mandated direct transfers to ULBs, but implementation has been uneven. Most ULBs lack the technical capacity to produce the audited financial statements required to access these grants.

## The Way Forward

Meaningful urban governance reform in India requires:

1. **Mandatory devolution** of planning functions to ULBs with clear exclusion of parastatals from core city functions
2. **Professionalisation** of municipal cadres through a dedicated Indian Urban Service
3. **Property tax reform** using GIS-based unit area value assessment systems
4. **Directly elected mayors** with executive powers and a longer tenure

Urban India needs cities that govern themselves. The 74th CAA gave Indian cities the constitutional mandate for self-governance; it is time to build the institutional architecture to make it real.
    `,
  },
  {
    slug: "street-design-public-space",
    title: "Improving Street Design and Public Space Systems",
    subtitle: "Lessons from Indian Cities for a Pedestrian-First Street Policy",
    date: "2024-08-20",
    readTime: "10 min read",
    category: "Planning Essay",
    tags: ["Street Design", "Public Space", "Pedestrian", "Urban Design"],
    excerpt:
      "Indian cities have been systematically designed for vehicles, not people. This essay argues for a fundamental shift in street design philosophy — towards complete streets that prioritize pedestrian movement, public life, and equitable access.",
    content: `
Walk through most Indian cities and you encounter the same hostile street environment: narrow or non-existent footpaths, encroached pedestrian space, chaotic intersections with no safe pedestrian crossings, and streets engineered almost entirely for vehicular throughput.

This is not an accident. It is the result of decades of transport planning that treated pedestrians as a residual category — something to be accommodated in whatever space vehicles did not need.

## The Pedestrian Crisis

In Indian cities, the pedestrian modal share is typically 30–40% of all trips — far higher than private vehicle trips in most cities. Yet the allocation of road space inverts this: vehicles command 80–90% of carriageway width, while pedestrian space is an afterthought.

The consequences are deadly. India accounts for a disproportionate share of road pedestrian fatalities. In cities like Vijayawada and Hyderabad, pedestrian fatalities constitute 40–50% of all road accident deaths.

## Complete Streets: A Framework

The Complete Streets approach, now adopted in many Indian Smart Cities, provides a design framework for streets that serve all users — pedestrians, cyclists, public transit users, and vehicles — equitably.

Key principles:
- Minimum 2.5m continuous footpaths on all arterial streets
- Tactile paving for visually impaired users
- Signalised pedestrian crossings at maximum 200m intervals on arterials
- Street furniture zones that do not encroach on walking paths
- Green infrastructure integration through urban tree canopy

## Implementation Challenges

The biggest barrier to complete streets adoption in India is institutional, not technical. Street design involves multiple agencies: municipality (footpaths), NHAI/PWD (carriageway), traffic police (signals), utility companies (underground infrastructure). Without a single nodal agency for street design, coordination failures are inevitable.

Chennai's Street Design Guidelines (2017) and Pune's Complete Streets Policy offer promising models of institutionalising pedestrian-first street design at the city level.
    `,
  },
  {
    slug: "spatial-data-infrastructure",
    title: "Spatial Data Infrastructure for Urban Planning",
    subtitle: "Building GIS Capacity for Indian Urban Local Bodies",
    date: "2024-05-10",
    readTime: "9 min read",
    category: "Technical Essay",
    tags: ["GIS", "Spatial Data", "Urban Planning", "Data Infrastructure"],
    excerpt:
      "Most Indian ULBs lack the spatial data infrastructure needed for evidence-based planning. This essay examines what a minimal viable spatial data stack looks like for a mid-size Indian city and how to build it.",
    content: `
Evidence-based urban planning requires spatial data — property boundaries, land use, infrastructure networks, demographic distributions, hazard zones. In most Indian cities, this data either does not exist in digital form, exists in silos across different departments, or is available but inaccessible due to institutional barriers.

## The Data Gap

India's urban data landscape is fragmented. The Census produces ward-level demographic data decennially. The Survey of India produces topographic maps at controlled scales. State government revenue departments hold property records (Record of Rights, Pahani) that are digitized only partially. Municipal corporations have property tax databases that rarely interoperate with physical survey data.

The result is that most Indian ULBs make planning decisions — zoning, infrastructure investment, development permissions — without access to integrated spatial datasets.

## A Minimal Viable Spatial Stack

For a mid-size Indian city (population 200,000–1,000,000), a minimal viable spatial data infrastructure includes:

**Core layers:**
- Municipal boundary and ward boundaries
- Road network with centerlines and attributes
- Property polygons with linkage to tax database
- Land use (existing and proposed/master plan)
- Infrastructure networks (water, sewer, power lines)

**Analysis-ready data:**
- Census data linked to ward polygons
- Land parcel data with development status
- Building footprints (from satellite imagery or survey)

**Platforms:**
- QGIS for analysis (free, open-source)
- PostGIS/PostgreSQL for spatial database
- GeoServer for web map serving
- OpenLayers or Leaflet for web visualization

## Building the Stack

The National Urban Digital Mission (NUDM) and Smart Cities Mission have both recognized this gap and are funding GIS capacity in Indian ULBs. However, technology procurement alone is not sufficient. Sustainable GIS capacity requires:

1. In-house GIS staff with planning domain knowledge
2. Data governance protocols for data collection and updation
3. Interoperability standards for data exchange between departments
4. Open data policies to share non-sensitive spatial data with researchers and the public

Several cities — Pune, Surat, Ahmedabad — offer models of sustained municipal GIS capacity worth studying.
    `,
  },
  {
    slug: "mobility-systems-indian-cities",
    title: "Mobility Systems in Emerging Indian Cities",
    subtitle: "From Street to Network: Rethinking Urban Transport Policy",
    date: "2024-02-28",
    readTime: "11 min read",
    category: "Policy Essay",
    tags: ["Mobility", "Public Transit", "Urban Transport", "Policy"],
    excerpt:
      "India's tier-2 and tier-3 cities face a mobility inflection point: they are large enough to suffer serious congestion but not yet committed to the auto-centric infrastructure patterns that have locked larger metros into car dependence. This window must be used wisely.",
    content: `
India's urban mobility crisis is well-documented in its large metropolitan cities — Mumbai's overcrowded suburban rail, Delhi's congested roads despite massive metro investment, Bengaluru's legendary traffic. But the more consequential mobility decisions are happening now in tier-2 and tier-3 cities that are growing rapidly and making infrastructure choices that will shape their transport systems for decades.

## The Mobility Inflection Point

Cities like Vijayawada, Coimbatore, Indore, and Nashik are crossing the 1–2 million population threshold — the point at which urban transport systems begin to face serious stress. Private vehicle ownership is growing rapidly. Trip lengths are increasing as cities sprawl outward. Road capacity is the standard planning response.

But road capacity expansion in dense Indian cities almost always induces demand rather than relieving congestion — a well-established phenomenon in transport planning. Building more roads will not solve mobility problems in tier-2 Indian cities.

## The Transit Opportunity

Tier-2 Indian cities still retain relatively compact urban forms, walkable neighborhood-scale street grids, and high pedestrian and cyclist modal shares. These characteristics create the foundation for transit-oriented mobility — if investments are made now, before sprawl and vehicle dependence become entrenched.

The key interventions:

**Bus Rapid Transit (BRT):** Properly designed BRT (segregated lanes, off-board ticketing, bus stations) can deliver metro-quality service at a fraction of the cost. Ahmedabad's Janmarg remains the best Indian example.

**Intermediate Public Transport (IPT):** Autorickshaws and share autos serve critical last-mile roles in Indian cities. Integrating IPT into formal transit systems — through app-based aggregation and coordinated routing — can dramatically extend the reach of formal transit.

**Non-Motorized Transport (NMT):** Cycling infrastructure investment in tier-2 cities can retain current cyclist modal share while improving safety. Pune's cycling lanes offer lessons in both design and political economy.

## Policy Framework

Tier-2 city mobility policy needs to operate at three levels simultaneously:
1. **Network level:** Designate public transit corridors and protect right-of-way
2. **Street level:** Implement complete streets standards on major corridors  
3. **Land use level:** Zone for transit-supportive densities along designated corridors

The National Urban Transport Policy (NUTP) provides the framework; the gap is at the city level, where integrated mobility planning capacity barely exists in most tier-2 ULBs.
    `,
  },
];
