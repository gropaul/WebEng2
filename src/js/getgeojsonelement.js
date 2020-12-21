// Function to decide which json element is available from geo2location
// the higher the level the less details you'll get for your location
// Could be one Array, but this would be overkill and not clearly arranged

var adressDetailLevel0 = ["emergency", "historic", "military", "natural", "landuse", "place", "railway", "man_made", 
                "aerialway", "boundary", "amenity", "aeroway", "club", "craft", "leisure", "office",
                "mountain_pass", "shop", "tourism", "bridge", "tunnel", "waterway", "house_name"];

var adressDetailLevel1 = ["city_block", "residental", "farm", "farmyard", "industrial", "commercial", "retail"];

var adressDetailLevel2 = ["hamlet", "croft", "isolated_dwelling"];

var adressDetailLevel3 = ["city_district", "district", "borough", "suburb", "subdivision"];

var adressDetailLevel4 = ["municipality", "city", "town", "village"];

var adressDetailLevel5 = ["region", "state", "state_district", "county"];

var adressDetailLevel6 = ["continent", "country"];

var locationDataSpotted = false; 

export function getGeoJsonElement(locationData){
    var specificLocationData;
    
    // Check, if the json element contains one of the detail level 0 elements
    // if so, break out of the loop, set locationDataSpotted = true, to signal
    // the other loops, they aren't neccessary anymore
    for(let i in adressDetailLevel0){
        if(locationData[adressDetailLevel0[i]]){
            specificLocationData = locationData[adressDetailLevel0[i]];
            locationDataSpotted = true;
            break;
        }
    }

    // Check, if a element has been found yet, if not,
    // check if the json element contains one of the detail level 1 elements
    // if so, break out of the loop, set locationDataSpotted = true, to signal
    // the other loops, they aren't neccessary anymore
    if(locationDataSpotted === false){
        for(let i in adressDetailLevel1){
            if(locationData[adressDetailLevel1[i]]){
                specificLocationData = locationData[adressDetailLevel1[i]];
                locationDataSpotted = true;
                break;
            }
        }
    }

    // Check, if a element has been found yet, if not,
    // check if the json element contains one of the detail level 2 elements
    // if so, break out of the loop, set locationDataSpotted = true, to signal
    // the other loops, they aren't neccessary anymore
    if(locationDataSpotted === false){
        for(let i in adressDetailLevel2){
            if(locationData[adressDetailLevel2[i]]){
                specificLocationData = locationData[adressDetailLevel2[i]];
                locationDataSpotted = true;
                break;
            }
        }
    }

    // Check, if a element has been found yet, if not,
    // check if the json element contains one of the detail level 3 elements
    // if so, break out of the loop, set locationDataSpotted = true, to signal
    // the other loops, they aren't neccessary anymore
    if(locationDataSpotted === false){
        for(let i in adressDetailLevel3){
            if(locationData[adressDetailLevel3[i]]){
                specificLocationData = locationData[adressDetailLevel3[i]];
                locationDataSpotted = true;
                break;
            }
        }
    }

    // Check, if a element has been found yet, if not,
    // check if the json element contains one of the detail level 4 elements
    // if so, break out of the loop, set locationDataSpotted = true, to signal
    // the other loops, they aren't neccessary anymore
    if(locationDataSpotted === false){
        for(let i in adressDetailLevel4){
            if(locationData[adressDetailLevel4[i]]){
                specificLocationData = locationData[adressDetailLevel4[i]];
                locationDataSpotted = true;
                break;
            }
        }
    }

    // Check, if a element has been found yet, if not,
    // check if the json element contains one of the detail level 5 elements
    // if so, break out of the loop, set locationDataSpotted = true, to signal
    // the other loops, they aren't neccessary anymore
    if(locationDataSpotted === false){
        for(let i in adressDetailLevel5){
            if(locationData[adressDetailLevel5[i]]){
                specificLocationData = locationData[adressDetailLevel5[i]];
                locationDataSpotted = true;
                break;
            }
        }
    }

    // Check, if a element has been found yet, if not,
    // check if the json element contains one of the detail level 6 elements
    // if so, break out of the loop, set locationDataSpotted = true, to signal
    // the other loops, they aren't neccessary anymore
    if(locationDataSpotted === false){
        for(let i in adressDetailLevel6){
            if(locationData[adressDetailLevel6[i]]){
                specificLocationData = locationData[adressDetailLevel6[i]];
                locationDataSpotted = true;
                break;
            }
        }
    }
    
    locationDataSpotted = false;
    
    return specificLocationData;
  }