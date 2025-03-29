document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded. Initializing dashboard script."); // Log: Script start

    const interactionHub = document.getElementById('interaction-hub');
    const infoDisplay = document.getElementById('info-display');
    const searchInput = document.getElementById('search-input');
    const initialInfoPlaceholder = infoDisplay.innerHTML; // Store initial view

    // Select ALL buttons within the interaction hub initially
    const allNavButtons = interactionHub.querySelectorAll('button');

    // --- Rule Content Data (Keep the same large object as before) ---
    const rulesData = {
        helmet: {
            title: "Wearing a Helmet ⛑️",
            keywords: "helmet, headgear, safety, standard, mandatory, passenger, exemption, sikh",
            sections: [ { heading: "The Main Rule", content: "<p>You <strong>MUST</strong> wear an approved safety helmet, securely fastened, whenever riding a bicycle on a road.</p>" }, { heading: "Who does this apply to?", content: "<ul><li>✅ The cyclist riding the bike</li><li>✅ Any passenger being carried (e.g., in a child seat or on a trailer towed by the bike)</li></ul>" }, { heading: "Key Details", content: "<ul><li><strong>Approved Standards:</strong> Your helmet needs to meet specific safety standards (like <code>AS/NZS 2063</code>, <code>EN 1078</code> etc.). Check the sticker inside!</li><li><strong>Condition:</strong> Must be free from cracks, damage, or modifications.</li><li><strong>Fastened:</strong> The strap must be done up securely under your chin.</li></ul>" }, { heading: "Exceptions", content: "<ul><li>If you have an official exemption certificate from the Director of Land Transport (e.g., for medical/physical reasons).</li><li>If you are an adherent of the Sikh faith AND riding at a speed <strong>NOT</strong> exceeding 50 km/h.</li></ul>" } ],
            officialRule: "Clause 11.8"
         },
         lights: {
            title: "Lights & Visibility 💡",
            keywords: "lights, lighting, night, dark, visibility, reflectors, reflective, sunset, sunrise",
            sections: [ { heading: "When Lights are Required", content: "<p>You <strong>MUST</strong> use required lights and reflectors when riding:</p><ul><li>Between sunset and sunrise (at night).</li><li>At any other time when visibility is poor (e.g., heavy rain, fog) and you can't easily see a person or vehicle 100m away.</li></ul>" }, { heading: "Required Equipment", content: "<ul><li><strong>Front:</strong> One or two white or yellow headlamps (steady or flashing is okay).</li><li><strong>Rear:</strong> At least one red rear-facing light (steady or flashing is okay).</li><li><strong>Rear Reflector:</strong> At least one red rear reflector.</li><li><strong>Pedals:</strong> Yellow pedal reflectors on the front and back of each pedal, <strong>UNLESS</strong> you are wearing reflective material.</li></ul><p>Lights must be visible from 100m in normal conditions.</p>" }, { heading: "Reflective Material Option", content: "<p>If you don't have pedal reflectors, you <strong>MUST</strong> be wearing some form of reflective material (e.g., vest, stripes on clothing, ankle bands).</p>" } ],
            officialRule: "Clause 11.12"
        },
        footpath: {
             title: "Riding on Footpaths 🚶‍♀️🚲",
            keywords: "footpath, pavement, sidewalk, walking, pedestrians, riding, parking",
            sections: [ { heading: "General Rule", content: "<p>You <strong>MUST NOT</strong> ride a standard bicycle on a footpath.</p>" }, { heading: "Exception", content: "<ul><li>If you are delivering newspapers, mail, or similar printed material to letterboxes (Rule 11.11).</li></ul>" }, { heading: "Parking on Footpaths", content: "<p>Generally <strong>NO</strong>, unless signs, markings, or official bike racks allow it. However, you can park carefully if you don't unreasonably block pedestrians or mobility devices (Rule 6.14).</p>" }, { heading: "Important Distinction", content: "<p>This is different from 'Shared Paths' where cycling is usually permitted. Check local signs!</p>" } ],
            officialRule: "Clauses 11.11, 6.14"
        },
        cyclelanes: {
            title: "Using Cycle Lanes ↔️",
            keywords: "cycle lane, bike lane, road marking, roadway, motor vehicle, driving, parking",
            sections: [ { heading: "What is it?", content: "<p>A cycle lane is a part of the roadway marked with lines and symbols specifically for cyclists.</p>" }, { heading: "Using the Lane", content: "<p>If a cycle lane is provided, you should generally use it where practicable. Ride entirely within the lane markings.</p>" }, { heading: "Other Vehicles", content: "<p>Motor vehicles <strong>MUST NOT</strong> drive or park in a cycle lane, except for short distances (max 50m) when entering/leaving driveways, side roads, or parking spaces, AND only if they give way to cyclists (<code>Rule 2.3</code>).</p>" }, { heading: "Blocked Lanes at Intersections", content: "<p>Motor vehicles (other than cyclists) <strong>MUST NOT</strong> enter a cycle lane approaching an intersection if their path through or out of it is blocked by stationary traffic (<code>Rule 4.5(3)</code>).</p>" } ],
            officialRule: "Clauses 1.6 (Definitions), 2.3, 4.5"
        },
        sharedpath: {
            title: "Shared Paths 🌳",
            keywords: "shared path, cycle path, footpath, pedestrians, walking, riding, giving way, considerate",
            sections: [ { heading: "What are they?", content: "<p>Paths designated for use by multiple types of users at the same time (e.g., cyclists, pedestrians, mobility scooters). Can be cycle paths, footpaths, or other paths. Look for signs!</p>"}, { heading: "How to Use", content: "<ul><li>Ride carefully and be considerate of all other users.</li><li><strong>DO NOT</strong> operate your bike at a speed that is hazardous to others.</li><li><strong>DO NOT</strong> use it in a manner that is a hazard to others.</li></ul>"}, { heading: "Priority", content: "<p>Follow any signs or markings that indicate priority (e.g., 'Pedestrians have priority'). If priority is marked:</p><ul><li>Users without priority <strong>MUST</strong> give way.</li><li>Even with priority, <strong>DO NOT</strong> unduly impede other users.</li></ul>"}, ],
            officialRule: "Clause 11.1A"
        },
        intersections: {
             title: "Navigating Intersections 🚦",
            keywords: "intersection, junction, turning, turn right, turn left, hook turn, traffic lights, signals, giving way, roundabout, stop, give way",
            sections: [ { heading: "Turning Right (Standard)", content: "<p>Signal right, move towards the centre line (if safe, don't cross if solid yellow), give way to oncoming traffic (including those turning left), turn when clear. (<code>Rule 2.5</code>)</p>" }, { heading: "Turning Right (Hook Turn Option)", content: "<p>Alternatively, cyclists can make a 'hook turn': Stay far left through the intersection, stop on the far left corner of the destination road, turn bike to face new direction, wait for green signal / clear traffic on the road you originally came from, then proceed. (<code>Rule 2.5A</code>)</p>" }, { heading: "Turning Left", content: "<p>Signal left, stay near the left kerb, turn when safe. Give way to pedestrians crossing the road you are entering. (<code>Rule 2.5</code>)</p>" }, { heading: "Traffic Lights", content: "<p>Obey all signals (red, yellow, green discs or arrows, or cycle symbols). You may filter ahead of stopped traffic at a red light to wait behind the advanced cycle limit line (painted box) if one exists. <strong>DO NOT</strong> enter on yellow unless you are too close to stop safely. (<code>Part 3</code>)</p>" }, { heading: "Roundabouts", content: "<p>Give way to traffic already on the roundabout (approaching from your right). Use appropriate lanes if marked. Signal left when exiting if practicable (exception: impractical arm signals). (<code>Rule 4.6, 3.10</code>)</p>" }, { heading: "Giving Way (General)", content: "<p>Follow standard give way rules (give way to right at uncontrolled intersections, obey signs). (<code>Rule 4.1, 4.2</code>)</p>" }, { heading: "Blocked Intersections", content: "<p><strong>DO NOT</strong> enter an intersection or pedestrian crossing (even on green) if your path through or out of it is blocked by stationary traffic. (<code>Rule 4.5, 10.1</code>)</p>" } ],
            officialRule: "Clauses 2.5, 2.5A, Part 3, 4.1, 4.2, 4.5, 4.6, 10.1"
        },
        giveway: {
             title: "Giving Way Rules ✋",
            keywords: "give way, yield, priority, stop sign, give way sign, intersection, driveway, roundabout, pedestrian crossing, traffic lights, turning",
            sections: [ { heading: "Stop & Give Way Signs", content: "<p>At a <code>STOP</code> sign: Come to a <strong>complete stop</strong> behind the line, check, give way to conflicting traffic before proceeding. At a <code>GIVE WAY</code> sign: Slow down (stop if needed), check, give way to conflicting traffic before proceeding. (<code>Rule 4.1</code>)</p>" }, { heading: "Uncontrolled Intersections (No Signs/Signals)", content: "<p>Give way to all vehicles approaching from your <strong>right</strong>. (<code>Rule 4.2</code>)</p>" }, { heading: "Turning Traffic", content: "<p>When turning right, give way to oncoming vehicles going straight or turning left. When turning (left or right), give way to pedestrians crossing the road you are entering. (<code>Rule 4.2</code>)</p>" }, { heading: "Driveways", content: "<p>Entering/Exiting: Give way to pedestrians & vehicles on footpath/cycle path/shared path. Exiting: Also give way to vehicles on the roadway. (<code>Rule 4.4</code>)</p>" }, { heading: "Roundabouts", content: "<p>Give way to all vehicles already circulating (approaching from your right). (<code>Rule 4.6</code>)</p>" }, { heading: "Pedestrian Crossings", content: "<p>Give way to pedestrians on or clearly waiting to use a marked crossing. <strong>DO NOT</strong> overtake a vehicle stopped at a crossing. (<code>Rule 10.1</code>)</p>" }, { heading: "Emergency Vehicles", content: "<p>Make way (pull over/stop if necessary) for vehicles with flashing blue/red lights or sirens. (<code>Rule 3.11</code>)</p>" } ],
            officialRule: "Part 4, Clause 3.11, 10.1"
        },
        parking: {
            title: "Parking Your Bike 🅿️",
            keywords: "parking, park, stopping, stand, footpath, parallel, angle, pedestrian crossing, cycle lane",
            sections: [ { heading: "General Care", content: "<p>Park with care and consideration for other road users. <strong>DO NOT</strong> park where you obstruct traffic or pedestrians unreasonably. (<code>Rule 6.1</code>)</p>" }, { heading: "On Footpaths/Cycle Paths", content: "<p>Generally <strong>NO</strong>, unless signs/markings or official bike racks allow it. You can park carefully if not unreasonably blocking others. (<code>Rule 6.14</code>)</p>" }, { heading: "Near Pedestrian Crossings", content: "<p>Rules against parking close to pedestrian crossings generally <strong>DO NOT</strong> apply to bicycles, but still park considerately. (<code>Rule 6.5(3)</code>)</p>" }, { heading: "Parallel vs Angle", content: "<p>Rules requiring parallel parking or specific angle parking for motor vehicles generally <strong>DO NOT</strong> apply to bicycles. Park safely and appropriately for the space. (<code>Rule 6.12, 6.13</code>)</p>"}, { heading: "In Cycle Lanes", content: "<p>You <strong>MUST NOT</strong> park in a cycle lane (unless specific signs permit, which is rare). (<code>Rule 6.6 related</code>)</p>"} ],
            officialRule: "Part 6 (esp. 6.1, 6.5, 6.12, 6.13, 6.14)"
        },
        passengers: {
             title: "Carrying Passengers 🧑‍🤝‍🧑",
            keywords: "passenger, carrying, child seat, infant, pillion, trailer, helmet",
            sections: [ { heading: "General Rule", content: "<p>You can only carry a passenger on a cycle if specific conditions are met.</p>"}, { heading: "Requirements", content: "<ul><li>The passenger must be on a proper pillion seat designed for passengers, AND have dedicated footrests which they use, OR</li><li>If the passenger is an infant, they must be in an approved child seat/container that protects their legs from the wheels.</li></ul>"}, { heading: "Helmets Required", content: "<p>Any passenger you carry <strong>MUST</strong> also wear an approved, securely fastened helmet (same rules as the rider). (<code>Rule 11.8</code>)</p>"}, { heading: "Passengers on Trailers", content:"<p>If towing a trailer designed for people, any person carried in the trailer <strong>MUST</strong> also wear an approved, securely fastened helmet. (<code>Rule 11.8(5)</code>)</p>"} ],
            officialRule: "Clauses 11.7, 11.8"
        },
        towing: {
             title: "Towing Things 🔗",
             keywords: "towing, trailer, pulling",
             sections: [ { heading: "What Can You Tow?", content: "<p>You <strong>CAN</strong> tow a dedicated bicycle trailer.</p>" }, { heading: "What You CANNOT Tow", content: "<p>You <strong>MUST NOT</strong> tow any other type of vehicle (e.g., another bike, a skateboard). (<code>Rule 11.9(1)</code>)</p>" }, { heading: "Being Towed", content: "<p>You <strong>MUST NOT</strong> allow your bicycle to be towed by another vehicle (e.g., holding onto a car). (<code>Rule 11.9(2)</code>)</p>" }, { heading: "Passengers in Trailers", content:"<p>Remember: Passengers in towed trailers need approved helmets! (See 'Carrying Passengers' topic).</p>"} ],
             officialRule: "Clause 11.9, 11.8(5)"
         },
        definitions: {
             title: "Key Definitions 📜",
            keywords: "definition, meaning, glossary, cycle, power-assisted, cycle lane, cycle path, shared path, roadway, footpath, hook turn",
              sections: [ { heading: "Cycle", content: "<p>A vehicle with 2+ wheels, designed mainly to be propelled by human muscular energy. Includes 'power-assisted cycles'. (<code>Rule 1.6</code>)</p>" }, { heading: "Power-Assisted Cycle", content: "<p>A cycle with an auxiliary electric motor(s) having a combined maximum power output <strong>not exceeding 300 Watts</strong>. Treated as a 'cycle'. (<code>Rule 1.6</code>)</p>" }, { heading: "Cycle Lane", content: "<p>A marked lane on the roadway specifically for cycles. (<code>Rule 1.6</code>)</p>" }, { heading: "Cycle Path", content: "<p>A path intended for cyclists, physically separated from the roadway (can sometimes be used by pedestrians too). (<code>Rule 1.6</code>)</p>" }, { heading: "Shared Path", content: "<p>A path (could be cycle path, footpath etc.) designated for use by multiple user types (pedestrians, cyclists, mobility devices) at the same time. Check signs for specific rules. (<code>Rule 11.1A</code>)</p>" }, { heading: "Roadway", content: "<p>The part of the road used or reasonably usable by vehicles in general (excludes just footpaths/margins usually). (<code>Rule 1.6</code>)</p>" }, { heading: "Footpath", content: "<p>A path principally designed for pedestrians. (<code>Rule 1.6</code>)</p>" }, { heading: "Hook Turn", content: "<p>A specific two-stage right turn maneuver allowed for cyclists at intersections. (<code>Rule 2.5A</code>)</p>" } ],
              officialRule: "Clauses 1.6, 2.5A, 11.1A"
        }
    };

    // --- Function to Set Active Button ---
    function setActiveButton(activeButton) {
        // Deactivate all buttons first
        allNavButtons.forEach(btn => btn.classList.remove('active'));
        // Activate the specified button (if it exists)
        if (activeButton && interactionHub.contains(activeButton)) { // Check it's in the hub
             activeButton.classList.add('active');
        }
    }


    // --- Function to display rule info ---
    function displayRuleInfo(topic, clickedButton = null) {
        console.log(`Attempting to display info for topic: ${topic}`); // Log: Topic display attempt
        const ruleInfo = rulesData[topic];

        if (ruleInfo) {
            let htmlContent = `<h3>${ruleInfo.title}</h3>`;
            ruleInfo.sections.forEach(section => {
                htmlContent += `<div class="rule-section">`;
                if (section.heading) htmlContent += `<h4>${section.heading}</h4>`;
                htmlContent += section.content;
                htmlContent += `</div>`;
            });
            if (ruleInfo.officialRule) htmlContent += `<p class="official-rule">Reference: ${ruleInfo.officialRule}</p>`;
            infoDisplay.innerHTML = htmlContent;
            console.log(`Successfully displayed info for: ${topic}`); // Log: Success

            // If the function was called by clicking a button, set it active
            // Otherwise, find the button corresponding to the topic and set it active
            const buttonToActivate = clickedButton || interactionHub.querySelector(`button[data-topic="${topic}"]`);
            setActiveButton(buttonToActivate);

        } else {
            infoDisplay.innerHTML = `<div class="info-placeholder"><p>Information for '${topic}' could not be displayed.</p></div>`;
            setActiveButton(null); // No topic shown, no button active
            console.error(`Rule data not found for topic: ${topic}`); // Log: Error
        }
    }

    // --- Function to display search results ---
    function displaySearchResults(results) {
        setActiveButton(null); // Deactivate main nav buttons when showing results

        if (results.length === 0) {
            infoDisplay.innerHTML = `<div class="info-placeholder"><p>No rules found matching your search term.</p></div>`;
            return;
        }

        let htmlContent = `<div class="search-results-container"><h4>Search Results (click to view):</h4>`;
        results.forEach(topic => {
            htmlContent += `<button class="search-result-item" data-topic="${topic}">${rulesData[topic].title}</button>`;
        });
        htmlContent += `</div>`;
        infoDisplay.innerHTML = htmlContent;

        // Add event listeners specifically to THESE search result buttons
        infoDisplay.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', (event) => {
                console.log("Search result clicked:", event.target.dataset.topic); // Log: Search result click
                // When a search result is clicked, display its info
                displayRuleInfo(event.target.dataset.topic);
                // Clicking a search result *will* activate the corresponding main button now
            });
        });
    }

    // --- Function to reset view ---
    function showAllTopics() {
        console.log("Resetting view to initial state."); // Log: Reset
        infoDisplay.innerHTML = initialInfoPlaceholder;
        if(searchInput) searchInput.value = '';
        setActiveButton(null); // Ensure no button is active
    }


    // --- Attach Event Listeners to Main Navigation Buttons ---
    allNavButtons.forEach(button => {
        // Check if the button has the data-topic attribute
        if (button.dataset.topic) {
            button.addEventListener('click', (event) => {
                 // Prevent any default button behavior if necessary (though unlikely here)
                 // event.preventDefault();

                const topic = event.currentTarget.dataset.topic; // Use currentTarget
                console.log(`Nav button clicked: Topic = ${topic}`); // Log: Nav button click

                if (topic === 'all') {
                    showAllTopics();
                } else {
                    // Pass the clicked button itself to the display function
                    displayRuleInfo(topic, event.currentTarget);
                    // Clear search when a main topic is explicitly selected
                    if(searchInput) searchInput.value = '';
                }
            });
        } else {
            console.log("Button without data-topic found:", button); // Log: Button skipped
        }
    });


     // --- Event Listener for Search Input ---
     if (searchInput) {
         searchInput.addEventListener('input', () => {
             const searchTerm = searchInput.value.trim().toLowerCase();
             console.log(`Search term changed: "${searchTerm}"`); // Log: Search input

             if (searchTerm.length < 2) {
                  if (searchTerm.length === 0 && infoDisplay.querySelector('.search-results-container')) {
                      showAllTopics();
                  } else if (infoDisplay.querySelector('.search-results-container')) {
                       infoDisplay.innerHTML = `<div class="info-placeholder"><p>Enter at least 2 characters to search.</p></div>`;
                       setActiveButton(null);
                  }
                 return;
             }

             // --- Search Logic (same as before) ---
             const matchedTopics = [];
             for (const topic in rulesData) { /* ... search logic ... */
                 const data = rulesData[topic];
                 let found = false;
                 const contentText = data.sections.map(s => (s.heading || '') + ' ' + (s.content || '')).join(' ').toLowerCase().replace(/<[^>]*>/g, ' ');
                 if (data.title.toLowerCase().includes(searchTerm)) found = true;
                 if (!found && data.keywords && data.keywords.toLowerCase().includes(searchTerm)) found = true;
                 if (!found && contentText.includes(searchTerm)) found = true;
                 if (found) matchedTopics.push(topic);
             }
             console.log("Search matches:", matchedTopics); // Log: Search results
             displaySearchResults(matchedTopics);
         });
     } else {
         console.warn("Search input element with ID 'search-input' not found.");
     }

     // --- Initial State ---
     showAllTopics(); // Show placeholder initially
     console.log("Dashboard initialization complete."); // Log: Init complete

}); // End DOMContentLoaded