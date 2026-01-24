/**
 * Massachusetts Snow Storm Explorer - Storm Database
 * Comprehensive data for all major snowstorms featured in the app
 */

const StormsDatabase = {
    storms: [
        {
            id: "great-snow-1717",
            name: "Great Snow of 1717",
            dateRange: "February 27 - March 7, 1717",
            year: 1717,
            bostonSnowfall: 60,
            bostonSnowfallDisplay: "60+ inches",
            nesis: null,
            nesisCategory: null,
            category: "historic",
            duration: "10 days (4 storms)",
            peakWinds: "Unknown",
            deaths: "Unknown",
            powerOutages: null,
            economicDamage: null,
            keyImpact: "90-95% deer mortality",
            shortDescription: "A series of four powerful storms that buried colonial New England under unprecedented snowfall.",
            fullDescription: `The Great Snow of 1717 remains one of the most legendary weather events in American history. Over a period of just ten days, four massive storms struck New England in rapid succession, depositing an estimated 60 inches or more of snow across Massachusetts and surrounding colonies.

The storms began on February 27th and continued through March 7th, with each successive storm adding to the already crushing snow burden. Colonists reported snowdrifts reaching 25 feet in height, completely burying homes and barns. Many structures collapsed under the weight.

The impact on wildlife was catastrophic. An estimated 90-95% of the deer population perished, and domestic livestock losses were severe. Some colonists were trapped in their homes for up to two weeks, surviving only by tunneling through the snow to reach their barns.

Cotton Mather, the famous Puritan minister, documented the event extensively, noting that "a snow which no living man can remember the like of" had fallen upon the land.`,
            meteorologicalAnalysis: `The Great Snow of 1717 was caused by a series of four nor'easters that tracked up the East Coast in rapid succession. The persistent cold pattern locked the region in a deep freeze, preventing any melting between storms.

Contemporary accounts suggest each storm deposited 12-20 inches of snow, with the cumulative total exceeding 60 inches in many locations. Wind-driven drifts created massive accumulations that persisted well into April.`,
            regionalSnowfall: {
                "Boston": "60+ inches",
                "Cambridge": "60+ inches",
                "Plymouth": "55+ inches",
                "Worcester": "65+ inches",
                "Connecticut Valley": "50+ inches"
            },
            humanImpact: {
                deaths: "Unknown (numerous)",
                injuries: "Unknown",
                buildingsDestroyed: "Numerous barns and homes collapsed",
                wildlifeImpact: "90-95% of deer population perished",
                economicImpact: "Devastating to colonial economy"
            },
            governmentResponse: "Colonial authorities organized relief efforts; ministers called for community mutual aid",
            personalStories: [
                {
                    author: "Cotton Mather",
                    quote: "A snow which no living man can remember the like of",
                    context: "Written in his diary during the storm series"
                }
            ],
            legacy: "The Great Snow of 1717 became a benchmark for severe winters in New England for over a century. It shaped colonial building practices and emergency preparedness."
        },
        {
            id: "blizzard-1888",
            name: "Great Blizzard of 1888",
            dateRange: "March 11-14, 1888",
            year: 1888,
            bostonSnowfall: 50,
            bostonSnowfallDisplay: "~50 inches",
            nesis: null,
            nesisCategory: "Cat 4 (estimated)",
            category: "cat4",
            duration: "4 days",
            peakWinds: "85 mph",
            deaths: "400+ nationally",
            powerOutages: null,
            economicDamage: null,
            keyImpact: "400+ deaths nationally",
            shortDescription: "The legendary blizzard that paralyzed the northeastern United States and killed over 400 people.",
            fullDescription: `The Great Blizzard of 1888, also known as the "Great White Hurricane," remains one of the most devastating snowstorms in American history. Striking from March 11-14, the storm buried New England and the Mid-Atlantic states under massive snowdrifts and brought all transportation to a complete halt.

In Massachusetts, the storm deposited approximately 50 inches of snow in Boston and surrounding areas. Winds gusted to 85 mph, creating drifts that reached 40-50 feet in height. Temperatures plummeted, and the wind chill made conditions life-threatening.

The storm killed over 400 people along the East Coast, with many succumbing to exposure or buried under collapsing structures. Hundreds of ships were wrecked, and the entire rail network was paralyzed for days.

The catastrophic impact of this storm led directly to the decision to bury utility lines and construct underground transit systems in major cities. New York City began planning its subway system as a direct result of this storm.`,
            meteorologicalAnalysis: `The blizzard formed when a powerful cold front from Canada collided with a moisture-laden low pressure system moving up the coast. This collision created explosive cyclogenesis, rapidly intensifying the storm.

The storm tracked directly over New England, bringing the worst conditions to a wide swath from New York to Maine. Sustained winds of 45-60 mph with gusts to 85 mph created extreme wind chills and life-threatening conditions.`,
            regionalSnowfall: {
                "Boston": "~50 inches",
                "Worcester": "45 inches",
                "New Haven": "45 inches",
                "New York City": "22 inches",
                "Connecticut": "50+ inches"
            },
            humanImpact: {
                deaths: "400+ nationally, dozens in Massachusetts",
                injuries: "Hundreds",
                buildingsDestroyed: "Numerous structures collapsed",
                shipsLost: "200+ vessels",
                economicImpact: "$25 million (1888 dollars)"
            },
            governmentResponse: "Emergency relief efforts organized; led to major infrastructure changes nationwide",
            personalStories: [
                {
                    author: "Roscoe Conkling",
                    quote: "I was out in that blizzard and it was something I never want to experience again",
                    context: "Former Senator who became famous for walking through the storm"
                }
            ],
            legacy: "The Blizzard of 1888 led to the burial of utility lines, construction of subway systems, and improved weather forecasting. It became the standard against which all subsequent storms were measured."
        },
        {
            id: "blizzard-1969",
            name: "Blizzard of 1969",
            dateRange: "February 25-28, 1969",
            year: 1969,
            bostonSnowfall: 26.3,
            bostonSnowfallDisplay: "26.3 inches",
            nesis: null,
            nesisCategory: null,
            category: "notable",
            duration: "100 hours",
            peakWinds: "60 mph",
            deaths: "100+ regionally",
            powerOutages: "Widespread",
            economicDamage: null,
            keyImpact: "100-hour storm duration",
            shortDescription: "A marathon four-day blizzard that set records for continuous snowfall.",
            fullDescription: `The Blizzard of 1969 was remarkable not for its intensity at any single moment, but for its extraordinary duration. The storm persisted for an incredible 100 hours, depositing snow continuously across Massachusetts from February 25th through February 28th.

Boston recorded 26.3 inches of snow during the event, but the prolonged nature of the storm made travel and daily activities impossible for nearly a week. The slow-moving system allowed for steady accumulation with minimal melting.

Wind gusts reached 60 mph, creating significant drifting despite the moderate snowfall rates. The persistent cold temperatures ensured that all precipitation fell as snow rather than rain.

The storm caused over 100 deaths across the region and brought commerce and transportation to a standstill. Schools were closed for the entire week, and many businesses remained shuttered until March.`,
            meteorologicalAnalysis: `The 1969 blizzard was caused by a slow-moving coastal low that stalled offshore before gradually moving northeast. The storm's unusually slow progression allowed for extended snowfall periods.

The atmospheric blocking pattern kept the storm in place for four days, an extremely rare occurrence. This made the total accumulation greater than what a faster-moving system with the same intensity would have produced.`,
            regionalSnowfall: {
                "Boston": "26.3 inches",
                "Worcester": "30+ inches",
                "Providence": "25 inches",
                "Cape Cod": "20 inches",
                "Western MA": "35+ inches"
            },
            humanImpact: {
                deaths: "100+ regionally",
                injuries: "Unknown",
                powerOutages: "Widespread, multiple days",
                travelDisruption: "Complete for 4+ days",
                economicImpact: "Significant business losses"
            },
            governmentResponse: "State of emergency declared; National Guard deployed",
            personalStories: [],
            legacy: "The 1969 blizzard demonstrated that storm duration can be as important as intensity. It influenced emergency management planning for extended events."
        },
        {
            id: "blizzard-1978",
            name: "Blizzard of 1978",
            dateRange: "February 6-7, 1978",
            year: 1978,
            bostonSnowfall: 27.1,
            bostonSnowfallDisplay: "27.1 inches",
            nesis: 5.78,
            nesisCategory: "Cat 5",
            category: "cat5",
            duration: "33 hours",
            peakWinds: "92 mph",
            deaths: "100+",
            powerOutages: "350,000 homes",
            economicDamage: "$1 billion",
            keyImpact: "100+ deaths, travel ban",
            shortDescription: "The benchmark New England blizzard that paralyzed the region for a week.",
            fullDescription: `The Blizzard of 1978 is the storm against which all subsequent New England winter storms are measured. Striking on February 6-7, this Category 5 nor'easter brought Boston to a complete standstill and remains seared in the memory of everyone who experienced it.

The storm dropped 27.1 inches of snow on Boston with peak wind gusts reaching 92 mph. The combination of heavy snow and hurricane-force winds created drifts exceeding 15 feet throughout the region. Route 128 became a parking lot of abandoned vehicles, with hundreds of motorists stranded on the highway.

Governor Michael Dukakis declared a state of emergency and issued an unprecedented driving ban that remained in effect for a week. The National Guard was mobilized, and the entire region essentially shut down.

The storm caused over 100 deaths and more than $1 billion in damage. Coastal flooding devastated communities from Hull to Scituate, with entire neighborhoods destroyed by the powerful storm surge.

The Blizzard of 1978 fundamentally changed emergency management in New England, leading to improved forecasting, earlier storm warnings, and more coordinated government response protocols.`,
            meteorologicalAnalysis: `The 1978 blizzard was a classic "bomb cyclone" that underwent rapid intensification as it tracked up the coast. The central pressure dropped dramatically, creating the intense pressure gradient responsible for the extreme winds.

The storm's track brought the center close enough to shore to maximize snowfall totals while also driving catastrophic coastal flooding. The combination of high astronomical tides and storm surge created water levels not seen in decades.`,
            regionalSnowfall: {
                "Boston": "27.1 inches",
                "Worcester": "32.5 inches",
                "Providence": "28.6 inches",
                "Hartford": "21 inches",
                "Blue Hill": "29.2 inches"
            },
            humanImpact: {
                deaths: "100+",
                injuries: "Unknown (significant)",
                powerOutages: "350,000 homes",
                strandedMotorists: "Thousands on Route 128",
                coastalDamage: "Hundreds of homes destroyed",
                economicImpact: "$1 billion+"
            },
            governmentResponse: "Week-long driving ban; National Guard mobilized; Federal disaster declaration",
            personalStories: [
                {
                    author: "Governor Michael Dukakis",
                    quote: "Stay off the roads. There is a driving ban in effect. This is not a request.",
                    context: "Television address during the storm"
                }
            ],
            legacy: "The Blizzard of 1978 became the defining winter weather event for a generation of New Englanders. It led to improved forecasting, earlier warnings, and coordinated emergency response systems."
        },
        {
            id: "superstorm-1993",
            name: "Superstorm of 1993",
            dateRange: "March 12-15, 1993",
            year: 1993,
            bostonSnowfall: 18,
            bostonSnowfallDisplay: "15-24 inches",
            nesis: 12.52,
            nesisCategory: "Cat 5",
            category: "cat5",
            duration: "3 days",
            peakWinds: "80 mph",
            deaths: "318 nationally",
            powerOutages: "10 million homes",
            economicDamage: "$9 billion",
            keyImpact: "$9B damage nationally",
            shortDescription: "The 'Storm of the Century' that affected the entire eastern United States.",
            fullDescription: `The Superstorm of 1993, often called the "Storm of the Century," was one of the most powerful and far-reaching winter storms in American history. While Massachusetts received significant snowfall, this storm's most remarkable feature was its enormous geographic scope.

The storm affected the entire eastern third of the United States, from Canada to Cuba. Boston received 15-24 inches of snow depending on location, with higher totals in western Massachusetts. But the storm's impact extended far beyond New England.

Nationally, the storm caused 318 deaths and $9 billion in damage. It spawned tornadoes in Florida, buried the Southeast under feet of snow, and caused record-low barometric pressure readings along the coast.

The combination of snow, wind, cold, and coastal flooding made this a true superstorm. Power outages affected 10 million homes across the eastern seaboard, and every major airport from Boston to Atlanta was closed.`,
            meteorologicalAnalysis: `The Superstorm of 1993 was a massive cyclonic system that developed in the Gulf of Mexico and intensified rapidly as it moved northeast. Its size was extraordinary, with impacts felt from Honduras to New Brunswick.

The storm achieved near-record low pressure readings, generating hurricane-force winds across a wide swath. The cold air intrusion behind the system was so severe that snow fell in Florida and along the Gulf Coast.`,
            regionalSnowfall: {
                "Boston": "15-24 inches",
                "Worcester": "26 inches",
                "Springfield": "18 inches",
                "Mt. Washington NH": "24 inches",
                "Syracuse NY": "43 inches"
            },
            humanImpact: {
                deaths: "318 nationally, 13 in Massachusetts",
                injuries: "Unknown (significant)",
                powerOutages: "10 million homes nationally",
                flightsCanceled: "Every eastern airport closed",
                economicImpact: "$9 billion nationally"
            },
            governmentResponse: "Federal disaster declaration for multiple states; Massive relief effort",
            personalStories: [],
            legacy: "The Superstorm of 1993 demonstrated that modern technology could still be overwhelmed by nature's fury. It led to improvements in multi-state coordination and long-range forecasting."
        },
        {
            id: "presidents-day-2003",
            name: "Presidents Day Storm 2003",
            dateRange: "February 15-18, 2003",
            year: 2003,
            bostonSnowfall: 27.5,
            bostonSnowfallDisplay: "27.5 inches",
            nesis: 7.50,
            nesisCategory: "Cat 4",
            category: "cat4",
            duration: "3 days",
            peakWinds: "45 mph",
            deaths: "44 nationally",
            powerOutages: "200,000 homes",
            economicDamage: "$200 million",
            keyImpact: "Boston record snowfall",
            shortDescription: "A Presidents Day weekend storm that set the all-time single-storm snowfall record for Boston.",
            fullDescription: `The Presidents Day Storm of 2003 holds a special place in Boston weather history: it produced 27.5 inches of snow, setting the all-time record for the greatest single-storm snowfall in the city's official weather records.

The storm arrived on Presidents Day weekend, dropping heavy snow from Saturday through Tuesday. Unlike the violent winds of 1978, this storm was characterized by moderate winds and heavy, consistent snowfall that accumulated steadily over 72 hours.

The holiday weekend timing minimized traffic impacts, as many offices were already closed on Monday. However, the sheer volume of snow presented significant challenges for removal crews, who worked around the clock for days.

Schools were closed for the entire week in many communities, and snow removal costs exceeded $200 million statewide. The storm demonstrated that even without extreme winds, massive snowfall totals can create significant disruption.`,
            meteorologicalAnalysis: `The 2003 Presidents Day storm was a slow-moving nor'easter that tracked directly along the coast, maintaining its position in the optimal snowfall zone for an extended period.

Unlike faster-moving systems, this storm allowed for 60+ hours of continuous moderate to heavy snowfall. The persistent onshore flow and ample moisture from the Atlantic combined to produce exceptional accumulations.`,
            regionalSnowfall: {
                "Boston": "27.5 inches",
                "Worcester": "24 inches",
                "Providence": "28.6 inches",
                "Hartford": "15 inches",
                "New York": "19.8 inches"
            },
            humanImpact: {
                deaths: "44 nationally",
                injuries: "Unknown",
                powerOutages: "200,000+ homes",
                schoolClosures: "Up to 1 week",
                economicImpact: "$200+ million statewide"
            },
            governmentResponse: "State of emergency; Snow emergency parking bans; Extended school closures",
            personalStories: [],
            legacy: "The 2003 storm set Boston's all-time single-storm snowfall record and demonstrated that duration can be as impactful as intensity."
        },
        {
            id: "blizzard-2013",
            name: "Blizzard of 2013 (Nemo)",
            dateRange: "February 8-9, 2013",
            year: 2013,
            bostonSnowfall: 24.9,
            bostonSnowfallDisplay: "24.9 inches",
            nesis: 4.35,
            nesisCategory: "Cat 3",
            category: "cat3",
            duration: "24 hours",
            peakWinds: "83 mph",
            deaths: "18 nationally",
            powerOutages: "700000",
            economicDamage: "$1 billion",
            keyImpact: "700K power outages",
            shortDescription: "A powerful nor'easter that brought near-record snowfall and widespread power outages.",
            fullDescription: `Winter Storm Nemo, also known as the Blizzard of 2013, was the first major storm to receive widespread attention through social media. The storm dropped 24.9 inches of snow on Boston and caused over 700,000 power outages across the region.

The storm was named "Nemo" by The Weather Channel as part of their then-new practice of naming winter storms. While controversial, the naming helped focus public attention on preparations.

Governor Deval Patrick ordered a driving ban beginning at 4 PM on February 8th, invoking memories of the 1978 blizzard. The ban was lifted the following afternoon after roads were cleared.

Wind gusts reached 83 mph on Cape Cod, and several communities in southeastern Massachusetts received over 30 inches of snow. The storm moved quickly, depositing most of its snow in an intense 12-18 hour period.

The rapid intensification and concentrated snowfall made this storm particularly challenging for forecasters, who initially predicted lower totals for the Boston area.`,
            meteorologicalAnalysis: `Nemo was created by the merger of two weather systems: a low pressure system from the Gulf of Mexico and an Arctic cold front from Canada. This combination led to rapid intensification off the New England coast.

The storm underwent explosive cyclogenesis, with central pressure dropping dramatically in just 24 hours. This "bombing" process generated the extreme winds and heavy snowfall rates that defined the event.`,
            regionalSnowfall: {
                "Boston": "24.9 inches",
                "Worcester": "28 inches",
                "Portland ME": "31.9 inches",
                "Hamden CT": "40 inches",
                "Milford CT": "38 inches"
            },
            humanImpact: {
                deaths: "18 nationally",
                injuries: "Unknown",
                powerOutages: "700,000+",
                strandedMotorists: "Minimal due to driving ban",
                economicImpact: "$1 billion+"
            },
            governmentResponse: "Statewide driving ban; State of emergency; Proactive utility response",
            personalStories: [],
            legacy: "Nemo was the first major social media winter storm, changing how the public receives and shares storm information. The driving ban was credited with saving lives."
        },
        {
            id: "blizzard-2015",
            name: "Blizzard of 2015 (Juno)",
            dateRange: "January 26-27, 2015",
            year: 2015,
            bostonSnowfall: 24.6,
            bostonSnowfallDisplay: "24.6 inches",
            nesis: 4.12,
            nesisCategory: "Cat 3",
            category: "cat3",
            duration: "24 hours",
            peakWinds: "78 mph",
            deaths: "30 nationally",
            powerOutages: "30000",
            economicDamage: "$1 billion",
            keyImpact: "Worcester record: 34.5\"",
            shortDescription: "A January blizzard that set the stage for Boston's snowiest winter on record.",
            fullDescription: `Winter Storm Juno, the Blizzard of 2015, was just the first punch in what would become the snowiest winter in Boston's recorded history. The storm dropped 24.6 inches on Boston, but Worcester received an incredible 34.5 inches, setting an all-time record.

The storm was predicted to be catastrophic for New York City, leading to subway shutdowns and widespread preparations. When the storm tracked further east than expected, New York received less snow than predicted while New England bore the brunt.

Wind gusts reached 78 mph on Cape Cod, and blizzard conditions persisted for over 12 hours across eastern Massachusetts. The storm's timing during Monday rush hour complicated travel, though early closures prevented major highway strandings.

Juno would prove to be just the beginning. Over the following weeks, storm after storm would strike New England, ultimately making the winter of 2015 the snowiest in Boston history.`,
            meteorologicalAnalysis: `Juno was a rapidly intensifying nor'easter that tracked along the 40/70 benchmark line that typically produces significant snowfall for Boston. The storm's slight eastward jog spared New York while maximizing impacts in New England.

The combination of abundant moisture, intense dynamics, and cold air produced snowfall rates exceeding 3 inches per hour at the storm's peak.`,
            regionalSnowfall: {
                "Boston": "24.6 inches",
                "Worcester": "34.5 inches",
                "Providence": "18 inches",
                "New York": "10 inches",
                "Cape Cod": "20 inches"
            },
            humanImpact: {
                deaths: "30 nationally",
                injuries: "Unknown",
                powerOutages: "30,000+",
                travelBan: "Statewide driving ban",
                economicImpact: "$1 billion+"
            },
            governmentResponse: "Statewide driving ban; Travel advisories; Early closures",
            personalStories: [],
            legacy: "Juno was the opening salvo in Boston's snowiest winter ever. It demonstrated improved forecasting and emergency response capabilities."
        },
        {
            id: "winter-2015",
            name: "Winter of 2015 Season",
            dateRange: "January-February 2015",
            year: 2015,
            bostonSnowfall: 110.6,
            bostonSnowfallDisplay: "110.6 inches",
            nesis: null,
            nesisCategory: "Multiple storms",
            category: "cat5",
            duration: "2 months",
            peakWinds: "Various",
            deaths: "Multiple",
            powerOutages: "Cumulative widespread",
            economicDamage: "$2 billion+",
            keyImpact: "Snowiest Boston winter",
            shortDescription: "The snowiest winter in Boston's recorded history, with 110.6 inches of total accumulation.",
            fullDescription: `The winter of 2015 was unlike anything Boston had ever experienced. Between January 24th and February 22nd, the city was struck by storm after storm in an unrelenting assault that would ultimately produce 110.6 inches of snow - the snowiest winter in Boston's weather records.

The siege began with Winter Storm Juno on January 26-27, which dropped 24.6 inches. But that was just the beginning. Over the following four weeks, major storms struck on February 2nd (16.2 inches), February 8-9 (15.7 inches), February 14-15 (14.8 inches), and February 21-22 (9.1 inches).

The cumulative effect was devastating. Public transit collapsed, with the MBTA suspending all service for extended periods. Roofs collapsed under the weight of snow. Frustration mounted as snow removal crews struggled to find places to put the endless accumulation.

By late February, snow piles throughout the city reached 10-15 feet high. The last of the winter's snow didn't fully melt until July 14, 2015, when the final pile in the Seaport District finally disappeared.`,
            meteorologicalAnalysis: `The winter of 2015 was driven by a persistent atmospheric pattern that repeatedly set up conditions favorable for nor'easters. A strong polar vortex delivered cold air, while a favorable jet stream configuration steered storm after storm up the coast.

The pattern was remarkably consistent, locking in place for nearly two months. Each storm followed a similar track, maximizing snowfall totals for eastern Massachusetts.`,
            regionalSnowfall: {
                "Boston": "110.6 inches (season)",
                "Worcester": "123.8 inches (season)",
                "Blue Hill": "108 inches (season)",
                "Providence": "85 inches (season)",
                "Portland ME": "90+ inches (season)"
            },
            humanImpact: {
                deaths: "Multiple (roof collapses, exposure)",
                injuries: "Hundreds",
                powerOutages: "Widespread, recurring",
                transitShutdown: "MBTA closed for extended periods",
                roofCollapses: "Numerous",
                economicImpact: "$2 billion+"
            },
            governmentResponse: "Multiple states of emergency; National Guard deployed; Transit crisis management",
            personalStories: [
                {
                    author: "Mayor Marty Walsh",
                    quote: "This is the winter that just won't quit",
                    context: "Press conference in February 2015"
                }
            ],
            legacy: "The Winter of 2015 exposed vulnerabilities in transportation infrastructure and led to major investments in MBTA improvements. It set records unlikely to be broken for generations."
        }
    ],

    // Photo gallery data
    photos: [
        {
            id: 1,
            url: null, // Placeholder - would be actual image URL
            title: "Beacon Street After the Blizzard",
            date: "February 1978",
            location: "Beacon Hill, Boston",
            credit: "Boston Globe Archives",
            stormId: "blizzard-1978",
            category: "aftermath",
            description: "Snow-covered Beacon Street shows the scale of accumulation from the Blizzard of 1978."
        },
        {
            id: 2,
            url: null,
            title: "Stranded Vehicles on Route 128",
            date: "February 6, 1978",
            location: "Route 128, Boston Area",
            credit: "Massachusetts State Archives",
            stormId: "blizzard-1978",
            category: "historic",
            description: "Hundreds of vehicles abandoned on Route 128 during the Blizzard of 1978."
        },
        {
            id: 3,
            url: null,
            title: "Coastal Flooding in Hull",
            date: "February 7, 1978",
            location: "Hull, Massachusetts",
            credit: "NOAA Archives",
            stormId: "blizzard-1978",
            category: "aftermath",
            description: "Storm surge devastated coastal communities during the 1978 blizzard."
        },
        {
            id: 4,
            url: null,
            title: "Downtown Boston Buried",
            date: "February 2013",
            location: "Downtown Boston",
            credit: "Boston Herald",
            stormId: "blizzard-2013",
            category: "modern",
            description: "Winter Storm Nemo blankets downtown Boston with over 2 feet of snow."
        },
        {
            id: 5,
            url: null,
            title: "MBTA Trains Stranded",
            date: "February 2015",
            location: "MBTA Rail Yard",
            credit: "MBTA Archives",
            stormId: "winter-2015",
            category: "modern",
            description: "Repeated storms paralyzed Boston's transit system in Winter 2015."
        },
        {
            id: 6,
            url: null,
            title: "Colonial Winter Scene",
            date: "1717 (artist rendering)",
            location: "Colonial New England",
            credit: "Library of Congress",
            stormId: "great-snow-1717",
            category: "historic",
            description: "Artist's depiction of the Great Snow of 1717 burying colonial settlements."
        },
        {
            id: 7,
            url: null,
            title: "Snow Mountains in Boston",
            date: "March 2015",
            location: "South Boston",
            credit: "Boston Magazine",
            stormId: "winter-2015",
            category: "aftermath",
            description: "Snow piles reached 75 feet high in some Boston parking lots in 2015."
        },
        {
            id: 8,
            url: null,
            title: "Historic Downtown Under Siege",
            date: "March 1888",
            location: "New York/New England",
            credit: "Library of Congress",
            stormId: "blizzard-1888",
            category: "historic",
            description: "The Great Blizzard of 1888 buried cities under massive drifts."
        },
        {
            id: 9,
            url: null,
            title: "Worcester Record Snowfall",
            date: "January 2015",
            location: "Worcester, MA",
            credit: "Worcester Telegram",
            stormId: "blizzard-2015",
            category: "modern",
            description: "Worcester received 34.5 inches from Winter Storm Juno, setting an all-time record."
        },
        {
            id: 10,
            url: null,
            title: "Superstorm of the Century",
            date: "March 1993",
            location: "Eastern United States",
            credit: "NOAA",
            stormId: "superstorm-1993",
            category: "modern",
            description: "Satellite imagery shows the massive extent of the 1993 Superstorm."
        },
        {
            id: 11,
            url: null,
            title: "Presidents Day Digging Out",
            date: "February 2003",
            location: "Boston Neighborhoods",
            credit: "Boston Globe",
            stormId: "presidents-day-2003",
            category: "aftermath",
            description: "Record 27.5 inches of snow required days of intensive removal."
        },
        {
            id: 12,
            url: null,
            title: "Cape Cod Storm Surge",
            date: "February 2013",
            location: "Cape Cod",
            credit: "Cape Cod Times",
            stormId: "blizzard-2013",
            category: "aftermath",
            description: "Coastal areas experienced significant flooding during Winter Storm Nemo."
        }
    ],

    // Educational content
    educationalContent: {
        noreaster: {
            title: "How Nor'easters Form",
            content: `<h3>What is a Nor'easter?</h3>
            <p>A nor'easter is a powerful storm that forms along the East Coast of North America, named for its strong northeast winds. These storms can bring heavy snow, rain, coastal flooding, and hurricane-force winds.</p>

            <h3>Formation Process</h3>
            <ol>
                <li><strong>Cold Air Mass:</strong> Arctic air pushes south from Canada, creating a sharp temperature contrast with warmer Atlantic waters.</li>
                <li><strong>Low Pressure Development:</strong> A low pressure system develops along this temperature boundary, typically near the Gulf Stream.</li>
                <li><strong>Cyclogenesis:</strong> The pressure drops rapidly as the storm intensifies, drawing in more moisture and energy from the ocean.</li>
                <li><strong>Northeast Movement:</strong> The storm typically tracks northeast along the coast, bringing impacts to the Mid-Atlantic and New England.</li>
            </ol>

            <h3>Why Massachusetts Gets Hit Hard</h3>
            <p>Massachusetts is perfectly positioned to receive the worst of nor'easters. The state sits at the intersection of cold Canadian air and warm Atlantic moisture, and the Cape Cod arm extends into the path of these storms.</p>

            <h3>The 40/70 Benchmark</h3>
            <p>Meteorologists use "40/70" to describe the sweet spot for New England snowstorms. When a storm's center passes near 40°N latitude and 70°W longitude (southeast of Cape Cod), Boston typically receives maximum snowfall.</p>`
        },
        blizzard: {
            title: "What Makes a Blizzard",
            content: `<h3>Official Blizzard Criteria</h3>
            <p>The National Weather Service has specific criteria for what qualifies as a blizzard. It's not just about snowfall - it's about sustained dangerous conditions.</p>

            <h3>Requirements for a Blizzard Warning</h3>
            <ul>
                <li><strong>Winds:</strong> Sustained 35 mph or frequent gusts to 35 mph</li>
                <li><strong>Visibility:</strong> Less than 1/4 mile for 3+ hours</li>
                <li><strong>Snow:</strong> Falling or blowing snow causing reduced visibility</li>
            </ul>

            <h3>Key Distinctions</h3>
            <p><strong>Winter Storm:</strong> Heavy snow without the wind criteria<br>
            <strong>Ground Blizzard:</strong> Blowing snow creates blizzard conditions without active snowfall<br>
            <strong>Blizzard:</strong> All criteria met with active snowfall</p>

            <h3>Dangers of Blizzards</h3>
            <ul>
                <li>Near-zero visibility makes travel impossible</li>
                <li>Wind chill can cause frostbite in minutes</li>
                <li>Power outages may last for days</li>
                <li>Rescue operations become extremely difficult</li>
            </ul>`
        },
        nesis: {
            title: "Understanding NESIS",
            content: `<h3>Northeast Snowfall Impact Scale</h3>
            <p>NESIS (Northeast Snowfall Impact Scale) was developed by Paul Kocin and Louis Uccellini to measure the societal impact of northeast snowstorms.</p>

            <h3>NESIS Categories</h3>
            <table style="width:100%; border-collapse: collapse;">
                <tr style="background: rgba(168,213,229,0.2);">
                    <th style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Category</th>
                    <th style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">NESIS Value</th>
                    <th style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Description</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">1</td>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">1.0 - 2.5</td>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Notable</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">2</td>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">2.5 - 4.0</td>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Significant</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">3</td>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">4.0 - 6.0</td>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Major</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">4</td>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">6.0 - 10.0</td>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Crippling</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">5</td>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">10.0+</td>
                    <td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Extreme</td>
                </tr>
            </table>

            <h3>How It's Calculated</h3>
            <p>NESIS considers:</p>
            <ul>
                <li>Geographic area of snowfall</li>
                <li>Snowfall amounts</li>
                <li>Population affected</li>
            </ul>
            <p>A storm that hits major cities scores higher than one that hits rural areas with the same snowfall.</p>`
        },
        geography: {
            title: "Massachusetts Geography",
            content: `<h3>Why Massachusetts Gets Major Snowstorms</h3>
            <p>Massachusetts occupies a unique geographic position that makes it particularly vulnerable to significant winter storms.</p>

            <h3>Key Geographic Factors</h3>

            <h4>1. Coastal Position</h4>
            <p>Massachusetts extends into the Atlantic Ocean, with Cape Cod jutting 65 miles into prime nor'easter territory. This places much of the state directly in the path of coastal storms.</p>

            <h4>2. Cold Air Access</h4>
            <p>The state has unobstructed access to Arctic air masses that sweep down from Canada. There are no major mountain barriers to block these cold intrusions.</p>

            <h4>3. Gulf Stream Proximity</h4>
            <p>The warm Gulf Stream flows relatively close to the New England coast. This provides enormous moisture and energy for developing storms.</p>

            <h4>4. Topographic Diversity</h4>
            <p>From sea level along the coast to the 3,491-foot summit of Mount Greylock, Massachusetts features significant elevation changes that enhance snowfall in certain areas.</p>

            <h3>Regional Variations</h3>
            <ul>
                <li><strong>Cape Cod:</strong> Often receives less snow but more wind and flooding</li>
                <li><strong>Worcester County:</strong> Higher elevation leads to enhanced snowfall totals</li>
                <li><strong>Pioneer Valley:</strong> Can see significant snow from certain storm tracks</li>
                <li><strong>Berkshires:</strong> Lake effect and elevation combine for heavy snow</li>
            </ul>`
        },
        safety: {
            title: "Storm Preparedness",
            content: `<h3>Winter Storm Preparedness Checklist</h3>

            <h4>Before the Storm</h4>
            <ul>
                <li>Stock emergency supplies for 3-7 days</li>
                <li>Charge all devices and backup batteries</li>
                <li>Fill prescriptions and have first aid supplies</li>
                <li>Fill vehicle gas tank and check antifreeze</li>
                <li>Know your zone for driving bans</li>
            </ul>

            <h4>Emergency Supply Kit</h4>
            <ul>
                <li>Water: 1 gallon per person per day</li>
                <li>Non-perishable food and manual can opener</li>
                <li>Flashlights and extra batteries</li>
                <li>Battery-powered or hand-crank radio</li>
                <li>First aid kit and medications</li>
                <li>Warm clothing and blankets</li>
                <li>Cell phone chargers and backup batteries</li>
            </ul>

            <h4>During the Storm</h4>
            <ul>
                <li>Stay indoors and off the roads</li>
                <li>Conserve heat by closing off unused rooms</li>
                <li>Check on elderly and vulnerable neighbors</li>
                <li>Avoid overexertion when shoveling</li>
                <li>Keep carbon monoxide detectors active</li>
            </ul>

            <h4>After the Storm</h4>
            <ul>
                <li>Wait for official all-clear before driving</li>
                <li>Clear snow from vents and exhausts</li>
                <li>Watch for downed power lines</li>
                <li>Report emergencies to 911</li>
                <li>Document any property damage for insurance</li>
            </ul>`
        },
        glossary: {
            title: "Weather Glossary",
            content: `<h3>Winter Weather Terms</h3>

            <dl>
                <dt><strong>Bomb Cyclone</strong></dt>
                <dd>A storm that undergoes rapid intensification, with central pressure dropping at least 24 millibars in 24 hours. Also called "bombogenesis."</dd>

                <dt><strong>Blizzard</strong></dt>
                <dd>Sustained winds of 35+ mph with snow reducing visibility to less than 1/4 mile for 3+ hours.</dd>

                <dt><strong>Nor'easter</strong></dt>
                <dd>A powerful storm along the East Coast featuring strong northeast winds.</dd>

                <dt><strong>Thundersnow</strong></dt>
                <dd>A rare phenomenon where thunder and lightning occur during a snowstorm, indicating extremely heavy snowfall rates.</dd>

                <dt><strong>Wind Chill</strong></dt>
                <dd>The perceived temperature accounting for wind's cooling effect on exposed skin.</dd>

                <dt><strong>Snow Squall</strong></dt>
                <dd>A brief, intense burst of heavy snow with gusty winds and rapid visibility reduction.</dd>

                <dt><strong>Lake Effect Snow</strong></dt>
                <dd>Snow produced when cold air moves over warmer lake water, picking up moisture.</dd>

                <dt><strong>Alberta Clipper</strong></dt>
                <dd>A fast-moving low pressure system from Alberta that brings light to moderate snow.</dd>

                <dt><strong>Snowfall Rate</strong></dt>
                <dd>The speed at which snow accumulates, measured in inches per hour. Rates over 2"/hour are considered heavy.</dd>

                <dt><strong>Storm Surge</strong></dt>
                <dd>Rising seawater pushed ashore by storm winds, causing coastal flooding.</dd>
            </dl>`
        }
    },

    // Regional snowfall data for maps
    mapData: {
        1978: {
            name: "Blizzard of 1978",
            stations: [
                { name: "Boston Logan", lat: 42.3656, lng: -71.0096, snowfall: 27.1 },
                { name: "Worcester", lat: 42.2626, lng: -71.8023, snowfall: 32.5 },
                { name: "Springfield", lat: 42.1015, lng: -72.5898, snowfall: 21.0 },
                { name: "Pittsfield", lat: 42.4501, lng: -73.2453, snowfall: 18.5 },
                { name: "New Bedford", lat: 41.6362, lng: -70.9342, snowfall: 25.0 },
                { name: "Lowell", lat: 42.6334, lng: -71.3162, snowfall: 28.0 },
                { name: "Cape Cod", lat: 41.6688, lng: -70.2962, snowfall: 22.0 },
                { name: "Blue Hill", lat: 42.2128, lng: -71.1143, snowfall: 29.2 },
                { name: "Taunton", lat: 41.9001, lng: -71.0898, snowfall: 26.5 },
                { name: "Fitchburg", lat: 42.5834, lng: -71.8023, snowfall: 30.0 }
            ]
        },
        2013: {
            name: "Blizzard of 2013 (Nemo)",
            stations: [
                { name: "Boston Logan", lat: 42.3656, lng: -71.0096, snowfall: 24.9 },
                { name: "Worcester", lat: 42.2626, lng: -71.8023, snowfall: 28.0 },
                { name: "Portland ME", lat: 43.6591, lng: -70.2568, snowfall: 31.9 },
                { name: "Springfield", lat: 42.1015, lng: -72.5898, snowfall: 18.0 },
                { name: "Providence", lat: 41.8240, lng: -71.4128, snowfall: 21.0 },
                { name: "New Bedford", lat: 41.6362, lng: -70.9342, snowfall: 26.0 },
                { name: "Cape Cod", lat: 41.6688, lng: -70.2962, snowfall: 22.5 },
                { name: "Lowell", lat: 42.6334, lng: -71.3162, snowfall: 25.0 }
            ]
        },
        2015: {
            name: "Blizzard of 2015 (Juno)",
            stations: [
                { name: "Boston Logan", lat: 42.3656, lng: -71.0096, snowfall: 24.6 },
                { name: "Worcester", lat: 42.2626, lng: -71.8023, snowfall: 34.5 },
                { name: "Springfield", lat: 42.1015, lng: -72.5898, snowfall: 15.0 },
                { name: "Providence", lat: 41.8240, lng: -71.4128, snowfall: 18.0 },
                { name: "Lowell", lat: 42.6334, lng: -71.3162, snowfall: 26.0 },
                { name: "Cape Cod", lat: 41.6688, lng: -70.2962, snowfall: 20.0 },
                { name: "Blue Hill", lat: 42.2128, lng: -71.1143, snowfall: 28.0 }
            ]
        },
        2003: {
            name: "Presidents Day 2003",
            stations: [
                { name: "Boston Logan", lat: 42.3656, lng: -71.0096, snowfall: 27.5 },
                { name: "Worcester", lat: 42.2626, lng: -71.8023, snowfall: 24.0 },
                { name: "Providence", lat: 41.8240, lng: -71.4128, snowfall: 28.6 },
                { name: "Springfield", lat: 42.1015, lng: -72.5898, snowfall: 18.0 },
                { name: "Lowell", lat: 42.6334, lng: -71.3162, snowfall: 26.0 }
            ]
        },
        1993: {
            name: "Superstorm 1993",
            stations: [
                { name: "Boston Logan", lat: 42.3656, lng: -71.0096, snowfall: 18.0 },
                { name: "Worcester", lat: 42.2626, lng: -71.8023, snowfall: 26.0 },
                { name: "Springfield", lat: 42.1015, lng: -72.5898, snowfall: 18.0 },
                { name: "Providence", lat: 41.8240, lng: -71.4128, snowfall: 15.0 },
                { name: "Mt. Washington NH", lat: 44.2706, lng: -71.3033, snowfall: 24.0 }
            ]
        }
    },

    // Helper methods
    getStormById(id) {
        return this.storms.find(storm => storm.id === id);
    },

    getStormsByCategory(category) {
        if (category === 'all') return this.storms;
        if (category === 'historic') return this.storms.filter(s => s.year < 1900);
        return this.storms.filter(s => s.category === category);
    },

    getPhotosByStorm(stormId) {
        return this.photos.filter(photo => photo.stormId === stormId);
    },

    getPhotosByCategory(category) {
        if (category === 'all') return this.photos;
        return this.photos.filter(photo => photo.category === category);
    },

    getSortedByYear() {
        return [...this.storms].sort((a, b) => a.year - b.year);
    },

    getSortedBySnowfall() {
        return [...this.storms].sort((a, b) => b.bostonSnowfall - a.bostonSnowfall);
    },

    getMapData(year) {
        return this.mapData[year] || null;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StormsDatabase;
}
