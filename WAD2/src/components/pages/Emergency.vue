<template>
    <div>
      <h1>Emergency Clinics Nearby</h1>
      
      <!-- Loop through clinics and display ClinicMap component for each -->
      <div class="clinics">
        <div class="card-container">
          <ul class="cards">
            <li v-for="clinic in clinics"  class="card">
              <!-- Clinic Card Start -->
              <div class="card-body">
                <h3 class="card-title"><b>{{ clinic.NAME }}</b></h3>
                <p class="card-text">&#128205; {{ clinic.distance ? clinic.distance : 'Fetching distance...' }} km away</p>    
                <h4 class="card-text">{{ clinic.TYPE }}</h4>          
            </div>
              <div class="card-body">
                <div class="buttons">
                  <button class="call">Call</button>
                  <a :href="getDirectionsUrl(clinic)" target="_blank" class="directions-link">
                  Directions
                </a>
                  <button class="send">Send pet details</button>
                </div>
              </div>
              <!-- Clinic Card End -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
// Import geolocation functionality to calculate distance
export default {
  name: 'Emergency',
  data() {
    return {
      userLocation: { lat: null, lon: null },
      clinics: [
        {"NAME":"BEECROFT ANIMAL SPECIALIST & EMERGENCY HOSPITAL","TYPE":"HOSPITAL","ADDRESS":"991E ALEXANDRA ROAD","TEL-OFFICE":69961812, "lon": null, "lat":null},
{"NAME":"SINGAPORE TURF CLUB EQUINE HOSPITAL","TYPE":"HOSPITAL","ADDRESS":"1 TURF CLUB AVENUE, #01-01, S(738078)","TEL-OFFICE":68791000, "lon": null, "lat":null},
{"NAME":"VES HOSPITAL (VETERINARY EMERGENCY & SPECIALTY HOSPITAL)","TYPE":"HOSPITAL","ADDRESS":"2 ROCHDALE ROAD, #01-01, S(535815)","TEL-OFFICE":65817028, "lon": null, "lat":null},
{"NAME":"AAVC - ANIMAL & AVIAN VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"716 YISHUN STREET 71, #01-254, S(760716)","TEL-OFFICE":68539397, "lon": null, "lat":null},
{"NAME":"ACACIA VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"338 ANG MO KIO AVENUE 1, #01-1671, S(560338)","TEL-OFFICE":64816889, "lon": null, "lat":null},
{"NAME":"ADVANCED VETCARE @ BALESTIER","TYPE":"CLINIC","ADDRESS":"564A BALESTIER ROAD,S(329880)","TEL-OFFICE":65651788, "lon": null, "lat":null},
{"NAME":"ADVANCED VET CARE & PET EMERGENCY","TYPE":"CLINIC","ADDRESS":"18 JALAN PARI BURONG, #01-01, S(488684)","TEL-OFFICE":66361788, "lon": null, "lat":null},
{"NAME":"ALLPETS & AQUALIFE VETS PTE LTD","TYPE":"CLINIC","ADDRESS":"24 JALAN KELULUT, #01-01, S(809041)","TEL-OFFICE":64813700, "lon": null, "lat":null},
{"NAME":"AMBER CAT VET PTE LTD","TYPE":"CLINIC","ADDRESS":"48 BURNFOOT TERRACE, #01-01, S(459836)","TEL-OFFICE":62455543, "lon": null, "lat":null},
{"NAME":"AMBER VETERINARY PRACTICE PTE LTD","TYPE":"CLINIC","ADDRESS":"50 BURNFOOT TERRACE, #01-01, S(459837)","TEL-OFFICE":62455543, "lon": null, "lat":null},
{"NAME":"ANIMAL ARK VETERINARY GROUP (ANIMAL ARK BINJAI)","TYPE":"CLINIC","ADDRESS":"11 BINJAI PARK BINJAI PARK, S(589823)","TEL-OFFICE":61006000, "lon": null, "lat":null},
{"NAME":"ANIMAL ARK VETERINARY GROUP (ANIMAL ARK TAMPINES)","TYPE":"CLINIC","ADDRESS":"139 TAMPINES STREET 11, #01-42, S(521139)","TEL-OFFICE":65871797, "lon": null, "lat":null},
{"NAME":"ANIMAL INFIRMARY","TYPE":"CLINIC","ADDRESS":"112 LAVENDER STREET #01-01, S(338728)","TEL-OFFICE":63582663, "lon": null, "lat":null},
{"NAME":"ANIMAL MEDICAL CENTRE (VET@RV) PTE LTD","TYPE":"CLINIC","ADDRESS":"78 INDUS ROAD, #01-487, S(161078)","TEL-OFFICE":62710665, "lon": null, "lat":null},
{"NAME":"ANIMAL RECOVERY VETERINARY CENTRE","TYPE":"CLINIC","ADDRESS":"482 SERANGOON ROAD #01-01, S(218149)","TEL-OFFICE":62522623, "lon": null, "lat":null},
{"NAME":"ANIMAL WELLNESS CENTRE PTE LTD","TYPE":"CLINIC","ADDRESS":"1 VISTA EXCHANGE GREEN, #01-15 THE STAR, S(138617)","TEL-OFFICE":66946383, "lon": null, "lat":null},
{"NAME":"ANIMAL WORLD VETERINARY CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"16 YIO CHU KANG ROAD, #01-01, S(545527)","TEL-OFFICE":62860929, "lon": null, "lat":null},
{"NAME":"APEX VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"462 RIVER VALLEY ROAD-462, S(248347)","TEL-OFFICE":67673369, "lon": null, "lat":null},
{"NAME":"BARKWAY PET HEALTH PTE. LTD.","TYPE":"CLINIC","ADDRESS":"169 MACPHERSON ROAD, #01-00, S(348535)","TEL-OFFICE":69044300, "lon": null, "lat":null},
{"NAME":"BEECROFT BIRD & EXOTICS VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"59 UPPER EAST COAST ROAD, S(455217)","TEL-OFFICE":68038344, "lon": null, "lat":null},
{"NAME":"BRIGHTON VET CARE (BUKIT TIMAH) PTE LTD","TYPE":"CLINIC","ADDRESS":"611 BUKIT TIMAH ROAD, S(269712)","TEL-OFFICE":62352250, "lon": null, "lat":null},
{"NAME":"BRIGHTON VET CARE PTE LTD","TYPE":"CLINIC","ADDRESS":"74 SERANGOON GARDEN WAY, #01-01, S(555970)","TEL-OFFICE":62822484, "lon": null, "lat":null},
{"NAME":"CARE VETERINARY CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"124 LORONG 1 TOA PAYOH, #01-473, S(310124)","TEL-OFFICE":62500535, "lon": null, "lat":null},
{"NAME":"CLINIC FOR PETS","TYPE":"CLINIC","ADDRESS":"1015 GEYLANG EAST AVENUE 3, #01-141, S(389730)","TEL-OFFICE":67451337, "lon": null, "lat":null},
{"NAME":"COMPANION ANIMAL SURGERY PTE LTD","TYPE":"CLINIC","ADDRESS":"12 BOON TECK ROAD, #01-05, S(329586)","TEL-OFFICE":62557950, "lon": null, "lat":null},
{"NAME":"DEFU VETERINARY CLINIC PTE. LTD","TYPE":"CLINIC","ADDRESS":"37 DEFU LANE 10,#01-79 DEFU INDUSTRIAL ESTATES(539214)","TEL-OFFICE":62848411, "lon": null, "lat":null},
{"NAME":"EDMOND TAN VETERINARY SURGERY","TYPE":"CLINIC","ADDRESS":"151 SERANGOON NORTH AVENUE 2, #01-65, S(550151)","TEL-OFFICE":62821581, "lon": null, "lat":null},
{"NAME":"FRANKEL VETERINARY CENTRE","TYPE":"CLINIC","ADDRESS":"101 FRANKEL AVENUE, #01-01, S(458224)","TEL-OFFICE":68761212, "lon": null, "lat":null},
{"NAME":"FURIENDS VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"211B PUNGGOL WALK, #01-627 PUNGGOL RIPPLES, S(822211)","TEL-OFFICE":62442112, "lon": null, "lat":null},
{"NAME":"FURRYTAILS VETERINARY CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"2 JALAN LOKAM KENSINGTON SQUARE, S(537846)","TEL-OFFICE":62149092, "lon": null, "lat":null},
{"NAME":"GAIA VETERINARY CENTRE","TYPE":"CLINIC","ADDRESS":"5 OPAL CRESCENT, S(328400)","TEL-OFFICE":69504533, "lon": null, "lat":null},
{"NAME":"GENESIS VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"935 YISHUN CENTRAL 1, #01-43, S(760935)","TEL-OFFICE":62570682, "lon": null, "lat":null},
{"NAME":"GENTLE OAK VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"21 GHIM MOH ROAD, #01-225, S(270021)","TEL-OFFICE":62508001, "lon": null, "lat":null},
{"NAME":"HILLSIDE VETERINARY SURGERY PTE LTD","TYPE":"CLINIC","ADDRESS":"787A UPPER SERANGOON ROAD, S(534655)","TEL-OFFICE":69095338, "lon": null, "lat":null},
{"NAME":"HOPE VETERINARY CARE","TYPE":"CLINIC","ADDRESS":"1017 UPPER SERANGOON ROAD, S(534755)","TEL-OFFICE":65189116, "lon": null, "lat":null},
{"NAME":"ISLAND VETERINARY CLINIC (NORTHEAST) PTE LTD","TYPE":"CLINIC","ADDRESS":"123 BEDOK NORTH STREET 2, #01-154, S(460123)","TEL-OFFICE":65605991, "lon": null, "lat":null},
{"NAME":"ISLAND VETERINARY CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"114 JURONG EAST STREET 13, #01-404, S(600114)","TEL-OFFICE":65605991, "lon": null, "lat":null},
{"NAME":"JAMES TAN VETERINARY CENTRE PTE LTD","TYPE":"CLINIC","ADDRESS":"230 WHITLEY ROAD, #01-01, S(297823)","TEL-OFFICE":62531122, "lon": null, "lat":null},
{"NAME":"JIREH VETERINARY CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"530 BALESTIER ROAD, #01-04, S(329857)","TEL-OFFICE":62669566, "lon": null, "lat":null},
{"NAME":"LANDON VETERINARY SPECIALISTS","TYPE":"CLINIC","ADDRESS":"41 ENG KONG TERRACE, #01-01, S(599013)","TEL-OFFICE":64637228, "lon": null, "lat":null},
{"NAME":"LIGHT OF LIFE VETERINARY CLINIC & SERVICES LLP","TYPE":"CLINIC","ADDRESS":"703 BEDOK RESERVOIR ROAD, #01-3508, S(470703)","TEL-OFFICE":62433282, "lon": null, "lat":null},
{"NAME":"MARANATHA VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"77 TELOK BLANGAH DRIVE, #01-234, S(100077)","TEL-OFFICE":62730100, "lon": null, "lat":null},
{"NAME":"MONSTER PET VET","TYPE":"CLINIC","ADDRESS":"6 EVERTON PARK, #01-16, S(080006)","TEL-OFFICE":63279148, "lon": null, "lat":null},
{"NAME":"MOUNT PLEASANT ANIMAL MEDICAL CENTRE (2004) PTE LTD","TYPE":"CLINIC","ADDRESS":"105 CLEMENTI STREET 12, #01-18, S(120105)","TEL-OFFICE":67768858, "lon": null, "lat":null},
{"NAME":"MOUNT PLEASANT ANIMAL MEDICAL CENTRE (BEDOK) PTE LTD","TYPE":"CLINIC","ADDRESS":"158 BEDOK SOUTH AVENUE 3, #01-577, S(460158)","TEL-OFFICE":64443561, "lon": null, "lat":null},
{"NAME":"MOUNT PLEASANT ANIMAL MEDICAL CENTRE (FARRER) PTE LTD","TYPE":"CLINIC","ADDRESS":"3 QUEEN'S ROAD, #02-141, S(260003)","TEL-OFFICE":62711132, "lon": null, "lat":null},
{"NAME":"MOUNT PLEASANT VETERINARY CENTRE (2008) PTE LTD","TYPE":"CLINIC","ADDRESS":"2 JALAN GELENGGANG, #01-01, S(578187)","TEL-OFFICE":62517666, "lon": null, "lat":null},
{"NAME":"MOUNT PLEASANT VETERINARY CENTRE (CHANGI) PTE LTD","TYPE":"CLINIC","ADDRESS":"848 SIMS AVENUE, #01-738, S(400848)","TEL-OFFICE":65460166, "lon": null, "lat":null},
{"NAME":"MOUNT PLEASANT VETERINARY CENTRE (EAST) PTE.LTD.","TYPE":"CLINIC","ADDRESS":"152 EAST COAST ROAD, S(428855)","TEL-OFFICE":63486110, "lon": null, "lat":null},
{"NAME":"MOUNT PLEASANT VETERINARY CENTRE (MANDAI) PTE. LTD.","TYPE":"CLINIC","ADDRESS":"236 YISHUN RING ROAD #01-1010, S(760236)","TEL-OFFICE":64515242, "lon": null, "lat":null},
{"NAME":"MOUNT PLEASANT VETERINARY CENTRE (NORTH) PTE LTD","TYPE":"CLINIC","ADDRESS":"151 SERANGOON NORTH AVENUE 2, #01-59, S(550151)","TEL-OFFICE":62871190, "lon": null, "lat":null},
{"NAME":"MY FAMILY VET CLINIC AND SURGERY PTE LTD","TYPE":"CLINIC","ADDRESS":"265 BUKIT BATOK EAST AVENUE 4, #01-403, S(650265)","TEL-OFFICE":65660448, "lon": null, "lat":null},
{"NAME":"NAM SANG VETERINARY CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"2 BALESTIER ROAD, #01-697, S(320002)","TEL-OFFICE":62548138, "lon": null, "lat":null},
{"NAME":"NAMLY ANIMAL CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"74 NAMLY PLACE, #01-01, S(267223)","TEL-OFFICE":64694744, "lon": null, "lat":null},
{"NAME":"OASIS VET","TYPE":"CLINIC","ADDRESS":"15 VENUS ROAD WINDSOR PARK, S(574302)","TEL-OFFICE":62562693, "lon": null, "lat":null},
{"NAME":"OHANA VETCARE","TYPE":"CLINIC","ADDRESS":"258 PASIR RIS STREET 21, #04-01, S(510258)","TEL-OFFICE":62829070, "lon": null, "lat":null},
{"NAME":"PAWS N CLAWS VETERINARY SURGERY PTE. LTD","TYPE":"CLINIC","ADDRESS":"6 SIN MING ROAD,#01-04 SIN MING PLAZA S(575585)","TEL-OFFICE":88914417, "lon": null, "lat":null},
{"NAME":"P.A.W. (PEOPLE ANIMAL WELLNESS) VETERINARY CENTRE PTE LTD","TYPE":"CLINIC","ADDRESS":"112 BUKIT PURMEI ROAD, #01-207, S(090112)","TEL-OFFICE":62737573, "lon": null, "lat":null},
{"NAME":"PASSION VETERINARY CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"111 WOODLANDS STREET 13, #01-86, S(730111)","TEL-OFFICE":66358725, "lon": null, "lat":null},
{"NAME":"PERROVETS","TYPE":"CLINIC","ADDRESS":"416 ANG MO KIO AVENUE 10  #01-973, S(560416)","TEL-OFFICE":65130683, "lon": null, "lat":null},
{"NAME":"PET CARE CENTRE & CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"4 WARINGIN PARK, #01-01, S(416318)","TEL-OFFICE":64485835, "lon": null, "lat":null},
{"NAME":"PET CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"211 SERANGOON AVENUE 4, #01-12, S(550211)","TEL-OFFICE":62885565, "lon": null, "lat":null},
{"NAME":"PETS AVENUE VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"8 EMPRESS ROAD, #01-11, S(260008)","TEL-OFFICE":64710111, "lon": null, "lat":null},
{"NAME":"PETS AVENUE VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"50 JALAN JURONG KECHIL JK BUILDING, S(598578)","TEL-OFFICE":63630333, "lon": null, "lat":null},
{"NAME":"PETS AVENUE VETERINARY CLINIC","TYPE":"CLINIC","ADDRESS":"193 UPPER THOMSON ROAD, S(574338)","TEL-OFFICE":62590555, "lon": null, "lat":null},
{"NAME":"POINT VETERINARY SURGERY","TYPE":"CLINIC","ADDRESS":"541 JURONG WEST AVENUE 1, #01-1044, S(640541)","TEL-OFFICE":64256772, "lon": null, "lat":null},
{"NAME":"POINT VETERINARY SURGERY (TELOK BLANGAH)","TYPE":"CLINIC","ADDRESS":"38 TELOK BLANGAH RISE, #01-339, S(090038)","TEL-OFFICE":64256772, "lon": null, "lat":null},
{"NAME":"QUEEN'S VET","TYPE":"CLINIC","ADDRESS":"3 QUEEN'S ROAD, #02-155 FARRER GARDENS, S(260003)","TEL-OFFICE":64750038, "lon": null, "lat":null},
{"NAME":"REHABVET","TYPE":"CLINIC","ADDRESS":"513 SERANGOON ROAD, #01-01, S(218154)","TEL-OFFICE":62916881, "lon": null, "lat":null},
{"NAME":"SINGAPORE VETERINARY ANIMAL CLINIC","TYPE":"CLINIC","ADDRESS":"768 WOODLANDS AVENUE 6, #01-11, S(730768)","TEL-OFFICE":63650308, "lon": null, "lat":null},
{"NAME":"SPCA","TYPE":"CLINIC","ADDRESS":"50 SUNGEI TENGAH ROAD, #01-01, S(699012)","TEL-OFFICE":62875355, "lon": null, "lat":null},
{"NAME":"SPRING VETERINARY CARE","TYPE":"CLINIC","ADDRESS":"123 HOUGANG AVENUE 1, #01-1412, S(530123)","TEL-OFFICE":62863313, "lon": null, "lat":null},
{"NAME":"SPRING VETERINARY CARE @ PUNGGOL","TYPE":"CLINIC","ADDRESS":"681 PUNGGOL DRIVE, #01-16A OASIS TERRACES, S(820681)","TEL-OFFICE":62441469, "lon": null, "lat":null},
{"NAME":"STARS VETERINARY CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"211 HOUGANG STREET 21, #01-301, S(530211)","TEL-OFFICE":64524576, "lon": null, "lat":null},
{"NAME":"SUNSHINE VET CARE PTE. LTD","TYPE":"CLINIC","ADDRESS":"681 HOUGANG AVENUE 8, #01-841, S(530681)","TEL-OFFICE":66904045, "lon": null, "lat":null},
{"NAME":"THE ANIMAL CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"109 CLEMENTI STREET 11, #01-19, S(120109)","TEL-OFFICE":64404767, "lon": null, "lat":null},
{"NAME":"THE ANIMAL CLINIC PTE LTD (KATONG)","TYPE":"CLINIC","ADDRESS":"55 LORONG L, TELOK KURAU, #01-63, S(425500)","TEL-OFFICE":64404767, "lon": null, "lat":null},
{"NAME":"THE ANIMAL DOCTORS (TIONG BAHRU) PTE LTD","TYPE":"CLINIC","ADDRESS":"11A BOON TIONG ROAD, #02-07, S(161011)","TEL-OFFICE":62533023, "lon": null, "lat":null},
{"NAME":"THE ANIMAL DOCTORS PTE LTD","TYPE":"CLINIC","ADDRESS":"108 ANG MO KIO AVENUE 4, #01-94, S(560108)","TEL-OFFICE":64514531, "lon": null, "lat":null},
{"NAME":"THE CAT CLINIC","TYPE":"CLINIC","ADDRESS":"109 CLEMENTI STREET 11, #01-33, S(120109)","TEL-OFFICE":67763450, "lon": null, "lat":null},
{"NAME":"THE CAT VET","TYPE":"CLINIC","ADDRESS":"2 Pandan Valley #B1-204D, S(597626)","TEL-OFFICE":63632272, "lon": null, "lat":null},
{"NAME":"THE JOYOUS VET PTE LTD","TYPE":"CLINIC","ADDRESS":"475 CHOA CHU KANG AVE 3, #01-30A, S(680475)","TEL-OFFICE":67670304, "lon": null, "lat":null},
{"NAME":"THE JOYOUS VET PTE LTD","TYPE":"CLINIC","ADDRESS":"1 YUAN CHING ROAD, #03-03, S(618640)","TEL-OFFICE":67670304, "lon": null, "lat":null},
{"NAME":"THE PET DOCTORS VETERINARY CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"3 PANDAN VALLEY, #01-311, S(597627)","TEL-OFFICE":64750056, "lon": null, "lat":null},
{"NAME":"THE VETERINARY CLINIC @ TAMPINES PTE LTD","TYPE":"CLINIC","ADDRESS":"476 TAMPINES STREET 44, #01-201, S(520476)","TEL-OFFICE":67842048, "lon": null, "lat":null},
{"NAME":"THE VETERINARY CLINIC PTE LTD (HOLLAND VILLAGE)","TYPE":"CLINIC","ADDRESS":"31 LORONG LIPUT, #01-01, S(277742)","TEL-OFFICE":64686312, "lon": null, "lat":null},
{"NAME":"THE VISITING VETS CLINIC","TYPE":"","ADDRESS":"9 TAMAN SERASI, #01-09, S(257720)","TEL-OFFICE":64753405, "lon": null, "lat":null},
{"NAME":"TOA PAYOH VETS PTE. LTD.","TYPE":"CLINIC","ADDRESS":"1002 TOA PAYOH INDUSTRIAL PARK, #01-1477 TOA PAYOH INDUSTRIAL PARK, S(319074)","TEL-OFFICE":62543326, "lon": null, "lat":null},
{"NAME":"TOWN VETS ANIMAL CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"22 HAVELOCK ROAD, #01-687, S(160022)","TEL-OFFICE":62767026, "lon": null, "lat":null},
{"NAME":"TP ANIMAL CLINIC","TYPE":"CLINIC","ADDRESS":"21 TAMPINES AVENUE 1, #01-00 TEMASEK POLYTECHNIC, S(529757)","TEL-OFFICE":67806228, "lon": null, "lat":null},
{"NAME":"UNITED VETERINARY CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"107 ANG MO KIO AVENUE 4, #01-148 KEBUN BARU HEIGHTS, S(560107)","TEL-OFFICE":64556880, "lon": null, "lat":null},
{"NAME":"VET AFFINITY PTE LTD","TYPE":"CLINIC","ADDRESS":"151 BUKIT BATOK STREET 11,#01-248, S(650151)","TEL-OFFICE":69707505, "lon": null, "lat":null},
{"NAME":"VET CENTRAL PTE LTD","TYPE":"CLINIC","ADDRESS":"69 LORONG 4 TOA PAYOH, #01-357, S(310069)","TEL-OFFICE":66358646, "lon": null, "lat":null},
{"NAME":"VET PRACTICE PTE LTD","TYPE":"CLINIC","ADDRESS":"21 LORONG KILAT, #01-04, S(598123)","TEL-OFFICE":64621757, "lon": null, "lat":null},
{"NAME":"VET PRACTICE PTE LTD (HOLLAND BRANCH)","TYPE":"CLINIC","ADDRESS":"31 HOLLAND CLOSE, #01-219, S(270031)","TEL-OFFICE":64621757, "lon": null, "lat":null},
{"NAME":"VETERINARY REHABILITATION AND HYDROTHERAPY CENTRE","TYPE":"CLINIC","ADDRESS":"631 BALESTIER ROAD, S(329918)","TEL-OFFICE":66101366, "lon": null, "lat":null},
{"NAME":"VETS FOR LIFE ANIMAL CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"330B TANJONG KATONG ROAD, #01-01, S(437106)","TEL-OFFICE":63488346, "lon": null, "lat":null},
{"NAME":"VETS FOR LIFE ANIMAL CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"491 RIVER VALLEY ROAD, #01-05, S(248371)","TEL-OFFICE":67320273, "lon": null, "lat":null},
{"NAME":"VETS FOR LIFE ANIMAL CLINIC PTE LTD","TYPE":"CLINIC","ADDRESS":"182 JALAN JURONG KECHIL, #01-60 THE HILLFORD, S(596152)","TEL-OFFICE":69707070, "lon": null, "lat":null},
{"NAME":"VETS FOR PETS","TYPE":"CLINIC","ADDRESS":"519 JURONG WEST STREET 52, #01-157, S(640519)","TEL-OFFICE":65691627, "lon": null, "lat":null},
{"NAME":"VETS FOR PETS (LENGKOK BAHRU)","TYPE":"CLINIC","ADDRESS":"57 LENGKOK BAHRU #01-475, S(151057)","TEL-OFFICE":62556064, "lon": null, "lat":null},
{"NAME":"WEST COAST VETCARE PTE LTD","TYPE":"CLINIC","ADDRESS":"612 CLEMENTI WEST STREET 1, #01-300, S(120612)","TEL-OFFICE":67777423, "lon": null, "lat":null},
{"NAME":"WHITLEY ANIMAL MEDICAL CENTRE PTE LTD","TYPE":"CLINIC","ADDRESS":"232 WHITLEY ROAD MOUNT PLEASANT ANIMAL HOSPITAL, S(297824)","TEL-OFFICE":62508333, "lon": null, "lat":null},
{"NAME":"WOODGROVE VETERINARY SERVICES PTE. LTD.","TYPE":"CLINIC","ADDRESS":"30 WOODLANDS AVENUE 1, #02-06, S(739065)","TEL-OFFICE":69090624, "lon": null, "lat":null},
        ]
      
    };
  },
  async created() {
    await this.getUserLocation();
    await this.getClinicsCoordinates();  // Ensure clinics coordinates are fetched before calculating distance
  },
  methods: {
    async getClinicsCoordinates() {
  const geocodeUrl = 'http://localhost:3000/api/geocode';
  const fetchCoordinatesPromises = this.clinics.map(async (clinic) => {
    try {
      const response = await axios.get(geocodeUrl, {
        params: { searchVal: clinic.ADDRESS }
      });
      if (response.data.results && response.data.results[0]) {
        clinic.lat = parseFloat(response.data.results[0]["LATITUDE"]);
        clinic.lon = parseFloat(response.data.results[0]["LONGITUDE"]);
      }
    } catch (error) {
      console.error(`Error fetching geolocation for clinic: ${clinic.NAME}`, error);
    }
  });
  await Promise.all(fetchCoordinatesPromises);
  this.calculateDistances();
},


    getUserLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.userLocation.lat = position.coords.latitude;
              this.userLocation.lon = position.coords.longitude;
              console.log(`User Location: lat=${this.userLocation.lat}, lon=${this.userLocation.lon}`);
              resolve();
            },
            (error) => {
              alert("Error fetching location: " + error.message);
              reject(error);
            }
          );
        } else {
          alert("Geolocation is not supported by this browser.");
          reject(new Error("Geolocation not supported"));
        }
      });
    },

    calculateDistances() {
      // Calculate the distance from the user's location to each clinic
      this.clinics.forEach(clinic => {
        if (this.userLocation.lat && this.userLocation.lon && clinic.lat && clinic.lon) {
          const distance = this.calculateDistance(
            this.userLocation.lat,
            this.userLocation.lon,
            clinic.lat,
            clinic.lon
          );
          clinic.distance = (distance / 1000).toFixed(1); // Convert meters to kilometers
        } else {
          console.warn(`Missing coordinates for clinic: ${clinic.NAME}`);
        }
        this.clinics.sort((a, b) => a.distance - b.distance);
      });
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371000; // Earth radius in meters
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // returns the distance in meters
    },
    getDirectionsUrl(clinic) {
      if (this.userLocation.lat && this.userLocation.lon && clinic.lat && clinic.lon) {
        return `https://www.google.com/maps/dir/?api=1&origin=${this.userLocation.lat},${this.userLocation.lon}&destination=${clinic.lat},${clinic.lon}&travelmode=driving`;
      }
      return '#'; // Fallback link in case coordinates are missing
    }
  }
}
</script>

  
  <style>
  h1 {
    margin-left: 1vw;
  }
  .clinics {
    margin: auto 0;
    text-align: center;
  }
  
  .card-container {
    margin: 1%;
    max-width: 98vw;
    overflow-x: hidden;
    text-align: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
  }
  .cards {
    align-items: center;
    text-align: center;
    margin: auto 0;
  }
  button {
    display: block;
  }
  .call,
  .directions,
  .send {
    background-color: #3C3D37;
    margin: 5px;
    border-radius: 15px;
    color: #ecdfcc;
    align-items: center;
  }
  .card{
    height: 60vh;
  }
  button,
a.directions-link {
  display: block;
  background-color: #3C3D37;
  margin: 5px;
  padding: 10px;
  border-radius: 15px;
  color: #ecdfcc;
  text-align: center;
  text-decoration: none; /* Remove underline from links */
  border: none;
  cursor: pointer;
  align-items: center;
}
  .buttons {
    display: grid;
    align-items: center;
    text-align: center;
  }
  .card-title{
    color:#ecdfcc !important;
  }
  </style>
  