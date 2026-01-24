/**
 * Massachusetts Snow Storm Explorer - Storm Database
 * Comprehensive data with extensive imagery for all major snowstorms
 */

const StormsDatabase = {
    // Hero images for main sections
    heroImages: {
        home: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920&q=80",
        gallery: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1920&q=80",
        timeline: "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1920&q=80"
    },

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
            heroImage: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80",
            cardImage: "https://images.unsplash.com/photo-1610973482880-44945c7cc929?w=600&q=80",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80",
                    caption: "Deep snow drifts similar to colonial accounts",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1610973482880-44945c7cc929?w=1200&q=80",
                    caption: "Historic colonial-era buildings in winter",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1548777123-e216912df7d8?w=1200&q=80",
                    caption: "Buried structures recall the Great Snow",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=1200&q=80",
                    caption: "Wildlife struggled in deep snow",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1609667083964-f3dbecb7e7a5?w=1200&q=80",
                    caption: "New England winter landscape",
                    credit: "Unsplash"
                }
            ],
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
            heroImage: "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=1200&q=80",
            cardImage: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=600&q=80",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=1200&q=80",
                    caption: "Massive snow drifts engulfed city streets",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&q=80",
                    caption: "Historic buildings buried in snow",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=1200&q=80",
                    caption: "Blizzard conditions reduced visibility",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1518826778770-a729fb53327c?w=1200&q=80",
                    caption: "Telegraph lines collapsed under ice",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?w=1200&q=80",
                    caption: "Victorian-era streets impassable",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1200&q=80",
                    caption: "The storm led to buried power lines",
                    credit: "Unsplash"
                }
            ],
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
            heroImage: "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=1200&q=80",
            cardImage: "https://images.unsplash.com/photo-1485594050903-8e8ee7b071a8?w=600&q=80",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=1200&q=80",
                    caption: "Snow fell continuously for 100 hours",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1485594050903-8e8ee7b071a8?w=1200&q=80",
                    caption: "Streets became impassable",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=1200&q=80",
                    caption: "Cars buried under accumulating snow",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&q=80",
                    caption: "Residents struggled to keep up with shoveling",
                    credit: "Unsplash"
                }
            ],
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
            heroImage: "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1200&q=80",
            cardImage: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=600&q=80",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1200&q=80",
                    caption: "The defining New England blizzard",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&q=80",
                    caption: "Hurricane-force winds created massive drifts",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=1200&q=80",
                    caption: "Stranded vehicles lined Route 128",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1518826778770-a729fb53327c?w=1200&q=80",
                    caption: "Power lines collapsed across the region",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1200&q=80",
                    caption: "Coastal flooding devastated shoreline communities",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=1200&q=80",
                    caption: "Near-zero visibility during the height of the storm",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=1200&q=80",
                    caption: "Snow removal took weeks",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1610973482880-44945c7cc929?w=1200&q=80",
                    caption: "Historic neighborhoods buried",
                    credit: "Unsplash"
                }
            ],
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
            heroImage: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&q=80",
            cardImage: "https://images.unsplash.com/photo-1542601098-8fc114e148e2?w=600&q=80",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&q=80",
                    caption: "The Storm of the Century's massive scope",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1542601098-8fc114e148e2?w=1200&q=80",
                    caption: "Satellite-like view of storm coverage",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&q=80",
                    caption: "Unprecedented snow across the East Coast",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80",
                    caption: "Deep accumulations paralyzed cities",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1610972449466-88df003e4819?w=1200&q=80",
                    caption: "Every eastern airport closed",
                    credit: "Unsplash"
                }
            ],
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
            heroImage: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&q=80",
            cardImage: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=600&q=80",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&q=80",
                    caption: "Record-breaking 27.5 inches in Boston",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1200&q=80",
                    caption: "Steady snowfall over 72 hours",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=1200&q=80",
                    caption: "Cars disappeared under snow",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1610972449466-88df003e4819?w=1200&q=80",
                    caption: "Snow removal crews worked around the clock",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=1200&q=80",
                    caption: "Residential streets buried",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=1200&q=80",
                    caption: "Days of intensive digging out",
                    credit: "Unsplash"
                }
            ],
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
            heroImage: "https://images.unsplash.com/photo-1514632595-4944383f2737?w=1200&q=80",
            cardImage: "https://images.unsplash.com/photo-1486923432690-5c0297ea90e1?w=600&q=80",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1514632595-4944383f2737?w=1200&q=80",
                    caption: "The first major social media blizzard",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1486923432690-5c0297ea90e1?w=1200&q=80",
                    caption: "Downtown Boston blanketed",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=1200&q=80",
                    caption: "Blizzard conditions persisted for hours",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1200&q=80",
                    caption: "Coastal areas experienced surge flooding",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=1200&q=80",
                    caption: "Driving ban kept roads clear",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1518826778770-a729fb53327c?w=1200&q=80",
                    caption: "700,000 without power",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1610973482880-44945c7cc929?w=1200&q=80",
                    caption: "Historic neighborhoods under siege",
                    credit: "Unsplash"
                }
            ],
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
            heroImage: "https://images.unsplash.com/photo-1519944518895-f5c4e9f8b6f8?w=1200&q=80",
            cardImage: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1519944518895-f5c4e9f8b6f8?w=1200&q=80",
                    caption: "The opening storm of a record winter",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80",
                    caption: "Worcester set an all-time record",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&q=80",
                    caption: "Wind-driven snow created massive drifts",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1200&q=80",
                    caption: "Relentless accumulation",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&q=80",
                    caption: "Just the beginning of an epic winter",
                    credit: "Unsplash"
                }
            ],
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
            heroImage: "https://images.unsplash.com/photo-1548777123-e216912df7d8?w=1200&q=80",
            cardImage: "https://images.unsplash.com/photo-1610972449466-88df003e4819?w=600&q=80",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1548777123-e216912df7d8?w=1200&q=80",
                    caption: "The snowiest winter in Boston history",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1610972449466-88df003e4819?w=1200&q=80",
                    caption: "Snow piles reached incredible heights",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1485594050903-8e8ee7b071a8?w=1200&q=80",
                    caption: "Nowhere left to put the snow",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=1200&q=80",
                    caption: "MBTA service suspended repeatedly",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=1200&q=80",
                    caption: "Cars buried for weeks",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=1200&q=80",
                    caption: "Residents exhausted from constant shoveling",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=1200&q=80",
                    caption: "Storm after storm struck",
                    credit: "Unsplash"
                },
                {
                    url: "https://images.unsplash.com/photo-1609667083964-f3dbecb7e7a5?w=1200&q=80",
                    caption: "Snow didn't fully melt until July",
                    credit: "Unsplash"
                }
            ],
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

    // Extensive photo gallery with real images
    photos: [
        // Blizzard of 1978
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1200&q=80",
            title: "The Benchmark Blizzard",
            date: "February 1978",
            location: "Greater Boston",
            credit: "Unsplash",
            stormId: "blizzard-1978",
            category: "historic"
        },
        {
            id: 2,
            url: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&q=80",
            title: "Hurricane-Force Winds",
            date: "February 6, 1978",
            location: "Massachusetts Coast",
            credit: "Unsplash",
            stormId: "blizzard-1978",
            category: "historic"
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1200&q=80",
            title: "Coastal Devastation",
            date: "February 7, 1978",
            location: "Hull, Massachusetts",
            credit: "Unsplash",
            stormId: "blizzard-1978",
            category: "aftermath"
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=1200&q=80",
            title: "Stranded on Route 128",
            date: "February 6, 1978",
            location: "Route 128",
            credit: "Unsplash",
            stormId: "blizzard-1978",
            category: "historic"
        },
        // Blizzard of 2013
        {
            id: 5,
            url: "https://images.unsplash.com/photo-1514632595-4944383f2737?w=1200&q=80",
            title: "Nemo Arrives",
            date: "February 2013",
            location: "Boston",
            credit: "Unsplash",
            stormId: "blizzard-2013",
            category: "modern"
        },
        {
            id: 6,
            url: "https://images.unsplash.com/photo-1486923432690-5c0297ea90e1?w=1200&q=80",
            title: "Downtown Under Snow",
            date: "February 9, 2013",
            location: "Downtown Boston",
            credit: "Unsplash",
            stormId: "blizzard-2013",
            category: "modern"
        },
        {
            id: 7,
            url: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=1200&q=80",
            title: "Near-Zero Visibility",
            date: "February 8, 2013",
            location: "Eastern Massachusetts",
            credit: "Unsplash",
            stormId: "blizzard-2013",
            category: "modern"
        },
        // Winter 2015
        {
            id: 8,
            url: "https://images.unsplash.com/photo-1548777123-e216912df7d8?w=1200&q=80",
            title: "Snowiest Winter Ever",
            date: "February 2015",
            location: "Boston",
            credit: "Unsplash",
            stormId: "winter-2015",
            category: "modern"
        },
        {
            id: 9,
            url: "https://images.unsplash.com/photo-1610972449466-88df003e4819?w=1200&q=80",
            title: "Mountains of Snow",
            date: "February 2015",
            location: "South Boston",
            credit: "Unsplash",
            stormId: "winter-2015",
            category: "aftermath"
        },
        {
            id: 10,
            url: "https://images.unsplash.com/photo-1485594050903-8e8ee7b071a8?w=1200&q=80",
            title: "Nowhere Left to Put It",
            date: "February 2015",
            location: "Boston Neighborhoods",
            credit: "Unsplash",
            stormId: "winter-2015",
            category: "aftermath"
        },
        // Historic Storms
        {
            id: 11,
            url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80",
            title: "Colonial Winter",
            date: "Artistic Representation",
            location: "Colonial New England",
            credit: "Unsplash",
            stormId: "great-snow-1717",
            category: "historic"
        },
        {
            id: 12,
            url: "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=1200&q=80",
            title: "Great Blizzard Drifts",
            date: "March 1888",
            location: "New England",
            credit: "Unsplash",
            stormId: "blizzard-1888",
            category: "historic"
        },
        // General winter/storm photos
        {
            id: 13,
            url: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&q=80",
            title: "New England Winter",
            date: "Winter Scene",
            location: "Massachusetts",
            credit: "Unsplash",
            stormId: null,
            category: "modern"
        },
        {
            id: 14,
            url: "https://images.unsplash.com/photo-1518826778770-a729fb53327c?w=1200&q=80",
            title: "Power Lines in Storm",
            date: "Winter Storm",
            location: "New England",
            credit: "Unsplash",
            stormId: null,
            category: "modern"
        },
        {
            id: 15,
            url: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&q=80",
            title: "Digging Out",
            date: "After the Storm",
            location: "Massachusetts",
            credit: "Unsplash",
            stormId: null,
            category: "aftermath"
        },
        {
            id: 16,
            url: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=1200&q=80",
            title: "Buried Cars",
            date: "Major Storm Aftermath",
            location: "Boston Area",
            credit: "Unsplash",
            stormId: null,
            category: "aftermath"
        },
        {
            id: 17,
            url: "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=1200&q=80",
            title: "Snowy Streets",
            date: "Winter Storm",
            location: "New England",
            credit: "Unsplash",
            stormId: null,
            category: "modern"
        },
        {
            id: 18,
            url: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1200&q=80",
            title: "Heavy Snowfall",
            date: "Nor'easter",
            location: "Massachusetts",
            credit: "Unsplash",
            stormId: null,
            category: "modern"
        },
        {
            id: 19,
            url: "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=1200&q=80",
            title: "Blizzard Conditions",
            date: "Major Storm",
            location: "New England",
            credit: "Unsplash",
            stormId: null,
            category: "modern"
        },
        {
            id: 20,
            url: "https://images.unsplash.com/photo-1609667083964-f3dbecb7e7a5?w=1200&q=80",
            title: "Winter Landscape",
            date: "Post-Storm",
            location: "Massachusetts",
            credit: "Unsplash",
            stormId: null,
            category: "aftermath"
        },
        {
            id: 21,
            url: "https://images.unsplash.com/photo-1610973482880-44945c7cc929?w=1200&q=80",
            title: "Historic Boston in Snow",
            date: "Winter Scene",
            location: "Boston",
            credit: "Unsplash",
            stormId: null,
            category: "modern"
        },
        {
            id: 22,
            url: "https://images.unsplash.com/photo-1542601098-8fc114e148e2?w=1200&q=80",
            title: "Storm from Above",
            date: "Satellite View",
            location: "East Coast",
            credit: "Unsplash",
            stormId: "superstorm-1993",
            category: "modern"
        },
        {
            id: 23,
            url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&q=80",
            title: "Massive Storm System",
            date: "Superstorm",
            location: "Eastern US",
            credit: "Unsplash",
            stormId: "superstorm-1993",
            category: "modern"
        },
        {
            id: 24,
            url: "https://images.unsplash.com/photo-1519944518895-f5c4e9f8b6f8?w=1200&q=80",
            title: "Juno's Fury",
            date: "January 2015",
            location: "Massachusetts",
            credit: "Unsplash",
            stormId: "blizzard-2015",
            category: "modern"
        }
    ],

    // Educational content (unchanged)
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
                <tr><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">1</td><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">1.0 - 2.5</td><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Notable</td></tr>
                <tr><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">2</td><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">2.5 - 4.0</td><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Significant</td></tr>
                <tr><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">3</td><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">4.0 - 6.0</td><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Major</td></tr>
                <tr><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">4</td><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">6.0 - 10.0</td><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Crippling</td></tr>
                <tr><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">5</td><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">10.0+</td><td style="padding: 10px; border: 1px solid rgba(168,213,229,0.3);">Extreme</td></tr>
            </table>`
        },
        geography: {
            title: "Massachusetts Geography",
            content: `<h3>Why Massachusetts Gets Major Snowstorms</h3>
            <p>Massachusetts occupies a unique geographic position that makes it particularly vulnerable to significant winter storms.</p>

            <h3>Key Geographic Factors</h3>
            <h4>1. Coastal Position</h4>
            <p>Massachusetts extends into the Atlantic Ocean, with Cape Cod jutting 65 miles into prime nor'easter territory.</p>
            <h4>2. Cold Air Access</h4>
            <p>The state has unobstructed access to Arctic air masses from Canada.</p>
            <h4>3. Gulf Stream Proximity</h4>
            <p>The warm Gulf Stream provides enormous moisture and energy for developing storms.</p>`
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
            </ul>
            <h4>Emergency Supply Kit</h4>
            <ul>
                <li>Water: 1 gallon per person per day</li>
                <li>Non-perishable food and manual can opener</li>
                <li>Flashlights and extra batteries</li>
                <li>First aid kit and medications</li>
            </ul>`
        },
        glossary: {
            title: "Weather Glossary",
            content: `<h3>Winter Weather Terms</h3>
            <dl>
                <dt><strong>Bomb Cyclone</strong></dt>
                <dd>A storm with pressure dropping at least 24 millibars in 24 hours.</dd>
                <dt><strong>Blizzard</strong></dt>
                <dd>Sustained winds of 35+ mph with visibility less than 1/4 mile for 3+ hours.</dd>
                <dt><strong>Nor'easter</strong></dt>
                <dd>A powerful storm along the East Coast featuring strong northeast winds.</dd>
                <dt><strong>Thundersnow</strong></dt>
                <dd>Thunder and lightning during a snowstorm, indicating heavy snowfall rates.</dd>
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

    getAllStormImages() {
        let allImages = [];
        this.storms.forEach(storm => {
            if (storm.images) {
                storm.images.forEach(img => {
                    allImages.push({
                        ...img,
                        stormId: storm.id,
                        stormName: storm.name
                    });
                });
            }
        });
        return allImages;
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
