document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded. Initializing dashboard script."); // Log: Script start

    const interactionHub = document.getElementById('interaction-hub');
    const infoDisplay = document.getElementById('info-display');
    const searchInput = document.getElementById('search-input');
    // *** Diagnostic Check 1: Make sure elements are found ***
    if (!interactionHub) console.error("ERROR: interaction-hub not found!");
    if (!infoDisplay) console.error("ERROR: info-display not found!");
    if (!searchInput) console.warn("Warning: search-input not found (Search inactive)."); // Changed to warn

    const initialInfoPlaceholder = infoDisplay ? infoDisplay.innerHTML : '<p>Error: Info display area not found.</p>'; // Store initial view safely

    // Select ALL buttons within the interaction hub initially
    const allNavButtons = interactionHub ? interactionHub.querySelectorAll('button') : [];
    // *** Diagnostic Check 2: See if buttons are selected ***
    console.log(`Found ${allNavButtons.length} buttons in interaction hub.`);

    // --- Rule Content Data ---
    const rulesData = {
        // --- BIKE RULES ---
        helmet: { title: "Wearing a Helmet ⛑️", keywords: "helmet, headgear, safety, standard, mandatory, passenger, exemption, sikh", sections: [ { heading: "The Main Rule", content: "<p>You <strong>MUST</strong> wear an approved safety helmet, securely fastened, whenever riding a bicycle on a road.</p>" }, { heading: "Who does this apply to?", content: "<ul><li>✅ The cyclist riding the bike</li><li>✅ Any passenger being carried (e.g., in a child seat or on a trailer towed by the bike)</li></ul>" }, { heading: "Key Details", content: "<ul><li><strong>Approved Standards:</strong> Your helmet needs to meet specific safety standards (like <code>AS/NZS 2063</code>, <code>EN 1078</code> etc.). Check the sticker inside!</li><li><strong>Condition:</strong> Must be free from cracks, damage, or modifications.</li><li><strong>Fastened:</strong> The strap must be done up securely under your chin.</li></ul>" }, { heading: "Exceptions", content: "<ul><li>If you have an official exemption certificate from the Director of Land Transport (e.g., for medical/physical reasons).</li><li>If you are an adherent of the Sikh faith AND riding at a speed <strong>NOT</strong> exceeding 50 km/h.</li></ul>" } ], officialRule: "Clause 11.8" },
        lights: { title: "Lights & Visibility 💡", keywords: "lights, lighting, night, dark, visibility, reflectors, reflective, sunset, sunrise", sections: [ { heading: "When Lights are Required", content: "<p>You <strong>MUST</strong> use required lights and reflectors when riding:</p><ul><li>Between sunset and sunrise (at night).</li><li>At any other time when visibility is poor (e.g., heavy rain, fog) and you can't easily see a person or vehicle 100m away.</li></ul>" }, { heading: "Required Equipment", content: "<ul><li><strong>Front:</strong> One or two white or yellow headlamps (steady or flashing is okay).</li><li><strong>Rear:</strong> At least one red rear-facing light (steady or flashing is okay).</li><li><strong>Rear Reflector:</strong> At least one red rear reflector.</li><li><strong>Pedals:</strong> Yellow pedal reflectors on the front and back of each pedal, <strong>UNLESS</strong> you are wearing reflective material.</li></ul><p>Lights must be visible from 100m in normal conditions.</p>" }, { heading: "Reflective Material Option", content: "<p>If you don't have pedal reflectors, you <strong>MUST</strong> be wearing some form of reflective material (e.g., vest, stripes on clothing, ankle bands).</p>" } ], officialRule: "Clause 11.12" },
        footpath: { title: "Riding on Footpaths 🚶‍♀️🚲", keywords: "footpath, pavement, sidewalk, walking, pedestrians, riding, parking", sections: [ { heading: "General Rule", content: "<p>You <strong>MUST NOT</strong> ride a standard bicycle on a footpath.</p>" }, { heading: "Exception", content: "<ul><li>If you are delivering newspapers, mail, or similar printed material to letterboxes (Rule 11.11).</li></ul>" }, { heading: "Parking on Footpaths", content: "<p>Generally <strong>NO</strong>, unless signs, markings, or official bike racks allow it. However, you can park carefully if you don't unreasonably block pedestrians or mobility devices (Rule 6.14).</p>" }, { heading: "Important Distinction", content: "<p>This is different from 'Shared Paths' where cycling is usually permitted. Check local signs!</p>" } ], officialRule: "Clauses 11.11, 6.14" },
        cyclelanes: { title: "Using Cycle Lanes ↔️", keywords: "cycle lane, bike lane, road marking, roadway, motor vehicle, driving, parking", sections: [ { heading: "What is it?", content: "<p>A cycle lane is a part of the roadway marked with lines and symbols specifically for cyclists.</p>" }, { heading: "Using the Lane", content: "<p>If a cycle lane is provided, you should generally use it where practicable. Ride entirely within the lane markings.</p>" }, { heading: "Other Vehicles", content: "<p>Motor vehicles <strong>MUST NOT</strong> drive or park in a cycle lane, except for short distances (max 50m) when entering/leaving driveways, side roads, or parking spaces, AND only if they give way to cyclists (<code>Rule 2.3</code>).</p>" }, { heading: "Blocked Lanes at Intersections", content: "<p>Motor vehicles (other than cyclists) <strong>MUST NOT</strong> enter a cycle lane approaching an intersection if their path through or out of it is blocked by stationary traffic (<code>Rule 4.5(3)</code>).</p>" } ], officialRule: "Clauses 1.6 (Definitions), 2.3, 4.5" },
        sharedpath: { title: "Shared Paths 🌳", keywords: "shared path, cycle path, footpath, pedestrians, walking, riding, giving way, considerate", sections: [ { heading: "What are they?", content: "<p>Paths designated for use by multiple types of users at the same time (e.g., cyclists, pedestrians, mobility scooters). Can be cycle paths, footpaths, or other paths. Look for signs!</p>"}, { heading: "How to Use", content: "<ul><li>Ride carefully and be considerate of all other users.</li><li><strong>DO NOT</strong> operate your bike at a speed that is hazardous to others.</li><li><strong>DO NOT</strong> use it in a manner that is a hazard to others.</li></ul>"}, { heading: "Priority", content: "<p>Follow any signs or markings that indicate priority (e.g., 'Pedestrians have priority'). If priority is marked:</p><ul><li>Users without priority <strong>MUST</strong> give way.</li><li>Even with priority, <strong>DO NOT</strong> unduly impede other users.</li></ul>"}, ], officialRule: "Clause 11.1A" },
        intersections: { title: "Navigating Intersections 🚦", keywords: "intersection, junction, turning, turn right, turn left, hook turn, traffic lights, signals, giving way, roundabout, stop, give way", sections: [ { heading: "Turning Right (Standard)", content: "<p>Signal right, move towards the centre line (if safe, don't cross if solid yellow), give way to oncoming traffic (including those turning left), turn when clear. (<code>Rule 2.5</code>)</p>" }, { heading: "Turning Right (Hook Turn Option)", content: "<p>Alternatively, cyclists can make a 'hook turn': Stay far left through the intersection, stop on the far left corner of the destination road, turn bike to face new direction, wait for green signal / clear traffic on the road you originally came from, then proceed. (<code>Rule 2.5A</code>)</p>" }, { heading: "Turning Left", content: "<p>Signal left, stay near the left kerb, turn when safe. Give way to pedestrians crossing the road you are entering. (<code>Rule 2.5</code>)</p>" }, { heading: "Traffic Lights", content: "<p>Obey all signals (red, yellow, green discs or arrows, or cycle symbols). You may filter ahead of stopped traffic at a red light to wait behind the advanced cycle limit line (painted box) if one exists. <strong>DO NOT</strong> enter on yellow unless you are too close to stop safely. (<code>Part 3</code>)</p>" }, { heading: "Roundabouts", content: "<p>Give way to traffic already on the roundabout (approaching from your right). Use appropriate lanes if marked. Signal left when exiting if practicable (exception: impractical arm signals). (<code>Rule 4.6, 3.10</code>)</p>" }, { heading: "Giving Way (General)", content: "<p>Follow standard give way rules (give way to right at uncontrolled intersections, obey signs). (<code>Rule 4.1, 4.2</code>)</p>" }, { heading: "Blocked Intersections", content: "<p><strong>DO NOT</strong> enter an intersection or pedestrian crossing (even on green) if your path through or out of it is blocked by stationary traffic. (<code>Rule 4.5, 10.1</code>)</p>" } ], officialRule: "Clauses 2.5, 2.5A, Part 3, 4.1, 4.2, 4.5, 4.6, 10.1" },
        giveway: { title: "Giving Way Rules ✋", keywords: "give way, yield, priority, stop sign, give way sign, intersection, driveway, roundabout, pedestrian crossing, traffic lights, turning", sections: [ { heading: "Stop & Give Way Signs", content: "<p>At a <code>STOP</code> sign: Come to a <strong>complete stop</strong> behind the line, check, give way to conflicting traffic before proceeding. At a <code>GIVE WAY</code> sign: Slow down (stop if needed), check, give way to conflicting traffic before proceeding. (<code>Rule 4.1</code>)</p>" }, { heading: "Uncontrolled Intersections (No Signs/Signals)", content: "<p>Give way to all vehicles approaching from your <strong>right</strong>. (<code>Rule 4.2</code>)</p>" }, { heading: "Turning Traffic", content: "<p>When turning right, give way to oncoming vehicles going straight or turning left. When turning (left or right), give way to pedestrians crossing the road you are entering. (<code>Rule 4.2</code>)</p>" }, { heading: "Driveways", content: "<p>Entering/Exiting: Give way to pedestrians & vehicles on footpath/cycle path/shared path. Exiting: Also give way to vehicles on the roadway. (<code>Rule 4.4</code>)</p>" }, { heading: "Roundabouts", content: "<p>Give way to all vehicles already circulating (approaching from your right). (<code>Rule 4.6</code>)</p>" }, { heading: "Pedestrian Crossings", content: "<p>Give way to pedestrians on or clearly waiting to use a marked crossing. <strong>DO NOT</strong> overtake a vehicle stopped at a crossing. (<code>Rule 10.1</code>)</p>" }, { heading: "Emergency Vehicles", content: "<p>Make way (pull over/stop if necessary) for vehicles with flashing blue/red lights or sirens. (<code>Rule 3.11</code>)</p>" } ], officialRule: "Part 4, Clause 3.11, 10.1" },
        parking: { title: "Parking Your Bike 🅿️", keywords: "parking, park, stopping, stand, footpath, parallel, angle, pedestrian crossing, cycle lane", sections: [ { heading: "General Care", content: "<p>Park with care and consideration for other road users. <strong>DO NOT</strong> park where you obstruct traffic or pedestrians unreasonably. (<code>Rule 6.1</code>)</p>" }, { heading: "On Footpaths/Cycle Paths", content: "<p>Generally <strong>NO</strong>, unless signs/markings or official bike racks allow it. You can park carefully if not unreasonably blocking others. (<code>Rule 6.14</code>)</p>" }, { heading: "Near Pedestrian Crossings", content: "<p>Rules against parking close to pedestrian crossings generally <strong>DO NOT</strong> apply to bicycles, but still park considerately. (<code>Rule 6.5(3)</code>)</p>" }, { heading: "Parallel vs Angle", content: "<p>Rules requiring parallel parking or specific angle parking for motor vehicles generally <strong>DO NOT</strong> apply to bicycles. Park safely and appropriately for the space. (<code>Rule 6.12, 6.13</code>)</p>"}, { heading: "In Cycle Lanes", content: "<p>You <strong>MUST NOT</strong> park in a cycle lane (unless specific signs permit, which is rare). (<code>Rule 6.6 related</code>)</p>"} ], officialRule: "Part 6 (esp. 6.1, 6.5, 6.12, 6.13, 6.14)" },
        passengers: { title: "Carrying Passengers 🧑‍🤝‍🧑", keywords: "passenger, carrying, child seat, infant, pillion, trailer, helmet", sections: [ { heading: "General Rule", content: "<p>You can only carry a passenger on a cycle if specific conditions are met.</p>"}, { heading: "Requirements", content: "<ul><li>The passenger must be on a proper pillion seat designed for passengers, AND have dedicated footrests which they use, OR</li><li>If the passenger is an infant, they must be in an approved child seat/container that protects their legs from the wheels.</li></ul>"}, { heading: "Helmets Required", content: "<p>Any passenger you carry <strong>MUST</strong> also wear an approved, securely fastened helmet (same rules as the rider). (<code>Rule 11.8</code>)</p>"}, { heading: "Passengers on Trailers", content:"<p>If towing a trailer designed for people, any person carried in the trailer <strong>MUST</strong> also wear an approved, securely fastened helmet. (<code>Rule 11.8(5)</code>)</p>"} ], officialRule: "Clauses 11.7, 11.8" },
        towing: { title: "Towing Things 🔗", keywords: "towing, trailer, pulling", sections: [ { heading: "What Can You Tow?", content: "<p>You <strong>CAN</strong> tow a dedicated bicycle trailer.</p>" }, { heading: "What You CANNOT Tow", content: "<p>You <strong>MUST NOT</strong> tow any other type of vehicle (e.g., another bike, a skateboard). (<code>Rule 11.9(1)</code>)</p>" }, { heading: "Being Towed", content: "<p>You <strong>MUST NOT</strong> allow your bicycle to be towed by another vehicle (e.g., holding onto a car). (<code>Rule 11.9(2)</code>)</p>" }, { heading: "Passengers in Trailers", content:"<p>Remember: Passengers in towed trailers need approved helmets! (See 'Carrying Passengers' topic).</p>"} ], officialRule: "Clause 11.9, 11.8(5)" },
        definitions: { title: "Key Definitions 📜", keywords: "definition, meaning, glossary, cycle, power-assisted, cycle lane, cycle path, shared path, roadway, footpath, hook turn", sections: [ { heading: "Cycle", content: "<p>A vehicle with 2+ wheels, designed mainly to be propelled by human muscular energy. Includes 'power-assisted cycles'. (<code>Rule 1.6</code>)</p>" }, { heading: "Power-Assisted Cycle", content: "<p>A cycle with an auxiliary electric motor(s) having a combined maximum power output <strong>not exceeding 300 Watts</strong>. Treated as a 'cycle'. (<code>Rule 1.6</code>)</p>" }, { heading: "Cycle Lane", content: "<p>A marked lane on the roadway specifically for cycles. (<code>Rule 1.6</code>)</p>" }, { heading: "Cycle Path", content: "<p>A path intended for cyclists, physically separated from the roadway (can sometimes be used by pedestrians too). (<code>Rule 1.6</code>)</p>" }, { heading: "Shared Path", content: "<p>A path (could be cycle path, footpath etc.) designated for use by multiple user types (pedestrians, cyclists, mobility devices) at the same time. Check signs for specific rules. (<code>Rule 11.1A</code>)</p>" }, { heading: "Roadway", content: "<p>The part of the road used or reasonably usable by vehicles in general (excludes just footpaths/margins usually). (<code>Rule 1.6</code>)</p>" }, { heading: "Footpath", content: "<p>A path principally designed for pedestrians. (<code>Rule 1.6</code>)</p>" }, { heading: "Hook Turn", content: "<p>A specific two-stage right turn maneuver allowed for cyclists at intersections. (<code>Rule 2.5A</code>)</p>" } ], officialRule: "Clauses 1.6, 2.5A, 11.1A" },

        // --- OTHER ---
        buyersguide: { title: "Bike Buyer's Guide 🛒", keywords: "buy, buyer, guide, new, used, second-hand, bike, bicycle, size, check, safety, inspect, frame, drivetrain, checklist, price, shop, market, online", sections: [ { heading: "Why Cycle?", content: "<p>Cycling in NZ is Faster, keeps you Fitter, is Cleaner for the environment, often Cheaper, and Fun!</p>" }, { heading: "1. Choosing the Right Type", content: "<ul><li><strong>Consider:</strong> Where will you ride (road, trail, commute)? How often? Any health factors?</li><li><strong>Need Help?</strong> Visit a local bike shop for expert advice.</li></ul>" }, { heading: "2. Getting the Right Size", content: "<ul><li><strong>Why it Matters:</strong> Comfort equals enjoyment and safety.</li><li><strong>Factors:</strong> Frame size, seat height, handlebars, wheel size.</li><li><strong>Need Help?</strong> A bike shop can ensure a perfect fit and setup.</li></ul>" }, { heading: "3. Buying Used - Safely", content: "<ul><li><strong>Where to Look:</strong> Markets, pawnshops, garage sales, police auctions, online (e.g., Trade Me for research).</li><li><strong>Price Check:</strong> Compare the model, age, and condition to similar bikes. Factor in potential repair costs.</li></ul>" }, { heading: "4. Checking a Used Bike (Key Safety Steps)", content: "<ul><li><strong>Expert Opinion:</strong> If unsure, take it to a bike shop <strong>before</strong> buying.</li><li><strong>Frame:</strong> Check for cracks (esp. welds) or major dents. Avoid! Check fork for wobbles.</li><li><strong>Drivetrain (Gears/Chain):</strong> Wiggle pedals side-to-side (no play). Spin pedals (no clunks/grinding). Shift gears (smooth?). Check derailleur hanger (no bends/cracks).</li><li><strong>Use a Checklist:</strong> Systematically inspect Handlebars, Pedals, Chain Set, Wheels/Tyres, Chain, Gears, Seat, and critically, <strong>Brakes</strong> (must stop instantly!). Refer to resources like the BIANZ checklist in the full guide.</li></ul>" }, { heading: "5. Bike Parts", content: "<p>Knowing basic parts (Seat, Wheels, Brakes, Gears, Frame etc.) helps with buying and maintenance.</p>" } ], officialRule: "Source: Based on NZ Transport Agency (Waka Kotahi) Bike Buyer's Guide" },
        cyclingcode: { title: "NZ Code for Cycling (External Link) 📜", keywords: "code, road code, official guide, pdf, rules, learn, new zealand, nzta", url: "https://nzta.govt.nz/assets/Road-code/Cycle-code/Cycling-code-2020.pdf", sections: [ { heading: "Official NZTA Resource", content: "<p>This link directs you to the official 'New Zealand Code for Cyclists' provided by Waka Kotahi NZ Transport Agency. It's a comprehensive guide covering rules, safety tips, and best practices.</p>" + "<p><a href='https://nzta.govt.nz/assets/Road-code/Cycle-code/Cycling-code-2020.pdf' target='_blank' rel='noopener noreferrer'><strong>Open the NZ Code for Cycling (PDF) <span class='external-link-icon'>↗</span></strong></a></p>" + "<p><em>(This link will open in a new browser tab.)</em></p>" } ], officialRule: "Source: Waka Kotahi NZ Transport Agency" },
        safetystandard: { title: "Bike Safety Standards (New Bikes) 🛡️", keywords: "standard, safety, new, pedal, bike, bicycle, AS/NZS, 1927, commerce commission, requirement, label, manual, seller, fair trading act, regulation", url: "https://comcom.govt.nz/__data/assets/pdf_file/0020/59402/Product-safety-standards-Pedal-bicycles-Fact-sheet-August-2019.pdf", sections: [ { heading: "Purpose", content: "<p>Official safety standards exist to prevent injuries from unsafe <strong>NEW</strong> pedal bicycles sold in NZ. Selling non-compliant new bikes is illegal under the Fair Trading Act.</p>" }, { heading: "What's Covered?", content: "<ul><li>Most <strong>NEW</strong> pedal bikes (human effort only).</li><li>Includes most kids' bikes (wheelbase 640mm+).</li><li>Partially assembled bikes ('bike in a box').</li></ul>" }, { heading: "What's NOT Covered?", content: "<ul><li>❌ Electric bikes (e-bikes)</li><li>❌ Second-hand bikes</li><li>❌ Small kids' bikes (wheelbase < 640mm)</li><li>❌ Custom-made / Competition / Recumbent bikes</li></ul>" }, { heading: "Key Requirements for New Bikes", content: "<ul><li>Based on standard <code>AS/NZS 1927:1998</code>.</li><li><strong>Safe Design:</strong> No sharp edges, secure parts.</li><li><strong>Performance:</strong> Good brakes (front & back), stable steering, required reflectors.</li><li><strong>Labels:</strong> Supplier info on frame, warnings for partial assembly or stunt 'look-alikes'.</li><li><strong>Manual:</strong> Must include an owner's manual (assembly, use, maintenance).</li></ul>" }, { heading: "Seller Responsibility", content: "<p>Retailers (shops, online sellers) are also responsible for ensuring the new bikes they sell meet the standard.</p>" }, { heading: "Second-Hand Bikes Advice", content: "<p>While the standard doesn't legally apply to used bikes, it's <strong>highly recommended</strong> to get them safety-checked by a qualified mechanic before selling or buying.</p>" }, { heading: "More Information", content: "<p>This information is based on the Commerce Commission Fact Sheet.</p>" + "<p><a href='https://comcom.govt.nz/__data/assets/pdf_file/0020/59402/Product-safety-standards-Pedal-bicycles-Fact-sheet-August-2019.pdf' target='_blank' rel='noopener noreferrer'><strong>View the Full Fact Sheet (PDF) <span class='external-link-icon'>↗</span></strong></a></p>" + "<p><em>(This link will open in a new browser tab.)</em></p>" } ], officialRule: "Source: Commerce Commission NZ Fact Sheet (Aug 2019)" }
     };

    // --- Function to Set Active Button ---
    function setActiveButton(activeButton) {
        // *** Diagnostic Log ***
        // console.log("setActiveButton called with:", activeButton);
        // Deactivate all buttons first
        allNavButtons.forEach(btn => btn.classList.remove('active'));
        // Activate the specified button (if it exists and is in the hub)
        if (activeButton && interactionHub && interactionHub.contains(activeButton)) {
             activeButton.classList.add('active');
             // console.log("Activated button:", activeButton);
        } else {
             // console.log("No button activated or button not in hub.");
        }
    }


    // --- Function to display rule info ---
    function displayRuleInfo(topic, clickedButton = null) {
        // *** Diagnostic Log ***
        console.log(`>>> displayRuleInfo called for topic: ${topic}, clickedButton:`, clickedButton);

        if (!infoDisplay) {
            console.error("ERROR: infoDisplay element not found in displayRuleInfo.");
            return;
        }

        const ruleInfo = rulesData[topic];

        if (ruleInfo) {
            // *** Diagnostic Log ***
            console.log(`   Found rule data for ${topic}:`, ruleInfo);
            let htmlContent = `<h3>${ruleInfo.title}</h3>`;
            ruleInfo.sections.forEach(section => {
                htmlContent += `<div class="rule-section">`;
                if (section.heading) htmlContent += `<h4>${section.heading}</h4>`;
                htmlContent += section.content;
                htmlContent += `</div>`;
            });
            // Display the official rule or source note
            if (ruleInfo.officialRule) {
                 if(ruleInfo.officialRule.startsWith("Source:")) {
                     htmlContent += `<p class="official-rule">${ruleInfo.officialRule}</p>`;
                 } else {
                     htmlContent += `<p class="official-rule">Reference: Land Transport (Road User) Rule 2004 - ${ruleInfo.officialRule}</p>`;
                 }
            }
            // *** Diagnostic Log ***
            // console.log("   Generated HTML:", htmlContent);
            infoDisplay.innerHTML = htmlContent;
            console.log(`   Successfully displayed info for: ${topic}`); // Log: Success

            // Find the button to activate
            const buttonToActivate = clickedButton || (interactionHub ? interactionHub.querySelector(`button[data-topic="${topic}"]`) : null);
             // *** Diagnostic Log ***
            // console.log("   Attempting to activate button:", buttonToActivate);
            setActiveButton(buttonToActivate);

        } else {
            infoDisplay.innerHTML = `<div class="info-placeholder"><p>Information for '${topic}' could not be displayed. Data missing.</p></div>`;
            setActiveButton(null); // No topic shown, no button active
            console.error(`   Rule data NOT FOUND for topic: ${topic}`); // Log: Error
        }
    }

    // --- Function to display search results ---
    function displaySearchResults(results) {
         // *** Diagnostic Log ***
         console.log(">>> displaySearchResults called with results:", results);
         if (!infoDisplay) { console.error("ERROR: infoDisplay element not found in displaySearchResults."); return; }

         setActiveButton(null); // Deactivate main nav buttons when showing results

         if (results.length === 0) {
             infoDisplay.innerHTML = `<div class="info-placeholder"><p>No rules or guides found matching your search term.</p></div>`;
             return;
         }

         let htmlContent = `<div class="search-results-container"><h4>Search Results (click to view):</h4>`;
         results.forEach(topic => {
             if (rulesData[topic]) {
                 const iconHtml = (topic === 'cyclingcode' || topic === 'safetystandard') ? ' <span class="external-link-icon">↗</span>' : '';
                 htmlContent += `<button class="search-result-item" data-topic="${topic}">${rulesData[topic].title}${iconHtml}</button>`;
             } else {
                 console.warn(`   Search result topic "${topic}" not found in rulesData during display.`);
             }
         });
         htmlContent += `</div>`;
         infoDisplay.innerHTML = htmlContent;

         // Add event listeners specifically to THESE search result buttons
         infoDisplay.querySelectorAll('.search-result-item').forEach(item => {
             item.addEventListener('click', (event) => {
                 const buttonElement = event.target.closest('button');
                 if (buttonElement) {
                    const topic = buttonElement.dataset.topic;
                    // *** Diagnostic Log ***
                    console.log("   Search result button clicked:", topic);
                    // When a search result is clicked, display its info
                    // Pass null for clickedButton so it finds the main nav button
                    displayRuleInfo(topic, null);
                 }
             });
         });
     }


    // --- Function to reset view ---
    function showAllTopics() {
        // *** Diagnostic Log ***
        console.log(">>> showAllTopics called.");
        if (infoDisplay) {
             infoDisplay.innerHTML = initialInfoPlaceholder;
        } else {
             console.error("ERROR: infoDisplay element not found in showAllTopics.");
        }
        if(searchInput) searchInput.value = '';
        setActiveButton(null); // Ensure no button is active
    }


    // --- Attach Event Listeners to Main Navigation Buttons ---
    // *** Diagnostic Check 3: Check if loop runs and attaches listeners ***
    console.log("Attaching main navigation button listeners...");
    if(allNavButtons.length > 0){
        allNavButtons.forEach(button => {
            if (button.dataset.topic) {
                 // *** Diagnostic Log ***
                 // console.log(`   Attaching listener to button with topic: ${button.dataset.topic}`);
                 button.addEventListener('click', (event) => {
                     const targetButton = event.currentTarget; // Use currentTarget is safer
                     const topic = targetButton.dataset.topic;
                     // *** Diagnostic Log ***
                     console.log(`>>> Nav button CLICKED! Topic: ${topic}`);

                     if (topic === 'all') {
                         showAllTopics();
                     } else {
                         // Pass the clicked button itself to the display function
                         displayRuleInfo(topic, targetButton);
                         // Clear search when a main topic is explicitly selected
                         if(searchInput) searchInput.value = '';
                     }
                 });
            } else {
                // console.log("   Skipping button without data-topic:", button); // Log: Button skipped
            }
        });
         console.log("Finished attaching main navigation button listeners.");
    } else {
         console.warn("No navigation buttons found to attach listeners to.");
    }


     // --- Event Listener for Search Input ---
     if (searchInput) {
         // *** Diagnostic Log ***
         console.log("Attaching search input listener...");
         searchInput.addEventListener('input', () => {
             const searchTerm = searchInput.value.trim().toLowerCase();
             // console.log(`Search term changed: "${searchTerm}"`); // Log: Search input

             if (searchTerm.length < 2) {
                  if (searchTerm.length === 0 && infoDisplay && (infoDisplay.querySelector('.search-results-container') || !infoDisplay.querySelector('.info-placeholder'))) {
                      showAllTopics();
                      setActiveButton(null);
                  } else if (infoDisplay && infoDisplay.querySelector('.search-results-container')) {
                       infoDisplay.innerHTML = `<div class="info-placeholder"><p>Enter at least 2 characters to search.</p></div>`;
                       setActiveButton(null);
                  }
                 return;
             }

             // --- Search Logic ---
             const matchedTopics = [];
             for (const topic in rulesData) {
                 if (rulesData.hasOwnProperty(topic)) {
                     const data = rulesData[topic];
                     let found = false;
                     const contentText = data.sections.map(s => (s.heading || '') + ' ' + (s.content || '')).join(' ').toLowerCase().replace(/<[^>]*>/g, ' ');

                     if (data.title.toLowerCase().includes(searchTerm)) found = true;
                     if (!found && data.keywords && data.keywords.toLowerCase().includes(searchTerm)) found = true;
                     if (!found && contentText.includes(searchTerm)) found = true;

                     if (found) matchedTopics.push(topic);
                 }
             }
             // console.log("Search matches:", matchedTopics); // Log: Search results
             displaySearchResults(matchedTopics);
         });
          console.log("Search input listener attached.");
     } else {
          console.warn("Search input element not found, listener not attached.");
     }

     // --- Initial State ---
     console.log("Setting initial state...");
     showAllTopics(); // Show placeholder initially
     console.log("Dashboard initialization complete."); // Log: Init complete

}); // End DOMContentLoaded
