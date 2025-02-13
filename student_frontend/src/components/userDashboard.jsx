import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { TypeAnimation } from "react-type-animation";



const places = [
  {
    id: 1,
    name: "Aberdare National Park",
    county: "Nyeri",
    budget: "5,000 - 10,000",
    accessibility: "family-friendly",
    image: "/images/aberdare.jpeg",
    description: "A park known for its rich wildlife and dramatic landscapes, with waterfalls and dense forests.",
    activities: ["wildlife-safari", "bird-watching", "hiking"],
    tips: ["Wear comfortable shoes for hiking, as the park features rugged terrains.", "Make sure to carry insect repellent when going on safari to avoid insect bites."]
  },
  {
    id: 2,
    name: "Nairobi National Park",
    county: "Nairobi",
    budget: "3,000 - 5,000",
    accessibility: "family-friendly",
    image: "/images/nairobi park.jpeg",
    description: "A safari experience just outside Nairobi.",
    activities: ["wildlife-safari", "wildlife-photography", "picnicks"]
  },
  {
    id: 3,
    name: "Mount Kenya",
    county: "Kirinyaga",
    budget: "5,000 - 10,000",
    accessibility: "family-friendly",
    image: "/images/mt.kenya.jpeg",
    description: "A hiking destination with stunning views.",
    activities: ["hiking",  "scenic-views"]
  },
  {
    id: 4,
    name: "Ol Pejeta Conservancy",
    tcounty: "Laikipia",
    budget: "15,000 - 20,000",
    accessibility: "wheelchair-accessible",
    image: "/images/ol pejeta.jpeg",
    description: "A conservancy offering incredible wildlife experiences, including rhino protection and safari drives.",
    activities: ["wildlife-safari", "wildlife-photography"]
  },
  {
    id: 5,
    name: "Lake Naivasha",
    county: "Nakuru",
    budget: "3,000 - 5,000",
    accessibility: "family-friendly",
    image: "/images/naivasha.jpeg",
    description: "A serene lake surrounded by lush greenery and wildlife.",
    activities: ["boat-rides", "fishing", "bird-watching"]
  },
  {
    id: 6,
    name: "Ngare Ndare Forest Reserve",
    county: "Laikipia",
    budget: "1,000 - 3,000",
    accessibility: "family-friendly",
    image: "/images/ngare ndare.jpeg",
    description: "A beautiful forest reserve located near Mount Kenya, perfect for hiking and wildlife spotting.",
    activities: ["hiking", "scenic-views"]
  },
  {
    id: 7,
    name: "Karura Forest",
    county: "Nairobi",
    budget: "500 - 1,000",
    accessibility: "family-friendly",
    image: "/images/karura.jpeg",
    description: "A peaceful urban forest in Nairobi offering walking, cycling, and nature trails.",
    activities: ["cycling", "nature-walks", "picnicks"]
  },
  {
    id: 8,
    name: "Gikuyu Cultural Village",
    county: "Kiambu",
    budget: "1,000 - 3,000",
    accessibility: "family-friendly",
    image: "/images/gikuyu.jpeg",
    description: "An immersive cultural experience where you can learn about the traditions of the Gikuyu people.",
    activities: "cultural-visits"
  },
  {
    id: 9,
    name: "Thika Falls",
    county: "Kiambu",
    budget: "500 - 1,000",
    accessibility: "family-friendly",
    image: "/images/thika falls.jpeg",
    description: "A picturesque waterfall near Thika, ideal for a day trip surrounded by nature.",
    activities: ["nature-walks", "photography", "swimming"]
  },
  {
    id: 10,
    name: "Gatamaiyu Forest",
    county: "Kiambu",
    budget: "1,000 - 3,000",
    accessibility: "family-friendly",
    image: "/images/gatamaiyu.jpeg",
    description: "A lush forest perfect for nature walks and birdwatching.",
    activities: ["bird-watching", "nature-walks", "photography"]
  },
  {
    id: 11,
    name: "Chogoria Town",
    county: "Meru",
    budget: "1,000 - 3,000",
    accessibility: "family-friendly",
    image: "/images/chagoria.jpeg",
    description: "A gateway to the Mount Kenya National Park.",
    activities: [
      "hiking",
      
      "Cultural-visits"
    ]
},
{
    id: 12,
    name: "Nakuru National Park",
    county: "Nakuru",
    budget: "3,000 - 5,000",
    accessibility: "family-friendly",
    image: "/images/nakuru.jpeg",
    description: "Famous for its flamingos and rhino population.",
    activities: [
      "bird-watching",
      "wildlife-safari",
      "nature-walks"
    ]
},
{
    id: 13,
    name: "Solio Game Reserve",
    county: "Nyeri",
    budget: "5,000 - 10,000",
    accessibility: "family-friendly",
    image: "images/solio.jpeg",
    description: "A private game reserve with abundant wildlife, including a significant population of rhinos.",
    activities: [
      "wildlife-afari",
      "wildlife-photography",
      "picnicks"
    ]
},
{
    id: 14,
    name: "Kariandusi Prehistoric Site",
    county: "Nakuru",
    budget: "- 500",
    accessibility: "family-friendly",
    image: "/images/kariadusi.jpeg",
    description: "A historical site with evidence of early human life, offering a unique insight into Kenya's ancient past.",
    activities: 
      "archaeological-tours",
      
},
{
    id: 15,
    name: "Nyangores Waterfalls",
    county: "Bomet",
    budget: "1,000 - 3,000",
    accessibility: "family-friendly",
    image: "images/nyangores.jpeg",
    description: "A hidden gem offering breathtaking views and tranquility.",
    activities: [
      "hiking",
      "swimming",
      "picnicks"
    ]
},
// {
//     id: 16,
//     name: "Kiambethu Tea Farm",
//     type: "cultural",
//     budget: "Approx. KSh 1,000 - 3,000",
//     accessibility: "family-friendly",
//     image: "https://example.com/kiambethu-tea.jpg",
//     description: "A scenic tea farm offering guided tours and tea tastings.",
//     activities: [
//       "Tea farm tours",
//       "Tea tasting sessions",
//       "Learning about tea production"
//     ]
// },
{
    id: 17,
    name: "Nyahururu Falls (Thomson Falls)",
    county: "Laikipia",
    budget: "500 - 1,000",
    accessibility: "family-friendly",
    image: "/images/thompson.jpg",
    description: "A stunning waterfall in Nyahururu, perfect for sightseeing and photography.",
    activities: [
      "photographyp",
      "picnicks",
      "nature-walks"
    ]
},
{
    id: 18,
    name: "Mount Longonot",
    county: "Nakuru",
    budget: "1,000 - 3,000",
    accessibility: "family-friendly",
    image: "images/longonot.jpeg",
    description: "A dormant volcano offering an exciting hike and panoramic views.",
    activities: [
      "hiking",
      "photography",
      "bird-watching"
    ]
},
{
    id: 19,
    name: "Chinga Dam",
    county: "Nyeri",
    budget: "- 500",
    accessibility: "family-friendly",
    image: "/images/chinga.jpeg",
    description: "A beautiful dam in Nyeri, ideal for picnics, boat rides, and nature walks.",
    activities: [
      "boat-rides",
      "nature-walks",
      "picnicks"
    ]
},
{
    id: 20,
    name: "The Aberdare Country Club",
    county: "Nyeri",
    budget: "5,000 - 10,000",
    accessibility: "family-friendly",
    image: "/images/aberdare counry.jpeg",
    description: "A country club with breathtaking views, a golf course, and nature walks.",
    activities: [
      "golfing",
      "nature-walks",
      "luxury-stay"
    ]
},
{
    id: 21,
    name: "Mwea National Reserve",
    county: "Kirinyaga",
    budget: "3,000 - 5,000",
    accessibility: "family-friendly",
    image: "/images/mwea.jpeg",
    description: "A scenic reserve with wildlife, perfect for safaris and birdwatching.",
    activities: [
      "wildlife-safari",
      "bird-watching",
      "wildlife-photography"
    ]
},
{
    id: 22,
    name: "Nakuru Lake Resort",
    county: "Nakuru",
    budget: "5,000 - 10,000",
    accessibility: "family-friendly",
    image: "/images/nakuru lake resort.jpeg",
    description: "A lakeside retreat offering peaceful views and a relaxing atmosphere.",
    activities: [
      "boat-rides",
      "fishing",
      "luxury-stay"
    ]
},
{
    id: 23,
    name: "Zaina Falls",
    county: "Nyeri",
    budget: "- 500",
    accessibility: "family-friendly",
    image: "/images/zania.jpeg",
    description: "A hidden gem in the Aberdare Mountains with beautiful waterfalls and lush surroundings.",
    activities: [
      "hiking",
      "photography",
      "swimming"
    ]
},
// {
//     id: 24,
//     name: "Ol Pejeta Conservancy",
//     type: "wildlife",
//     budget: "15,000 - 20,000",
//     accessibility: "wheelchair-accessible",
//     image: "/images/ol pejeta.jpeg",
//     description: "A conservation area that is home to endangered species like the northern white rhino.",
//     activities: 
//       "wildlife-photography"
    
// },
{
    id: 25,
    name: "Taita Hills Wildlife Sanctuary",
    county: "Taita Taveta",
    budget: "5,000 - 10,000",
    accessibility: "family-friendly",
    image: "/images/taita hills.jpeg",
    description: "A sanctuary offering safari experiences with diverse wildlife.",
    activities: [
      "wildlife-safari",
      "bird-watching",
      "cultural-visits"
    ]
},
{
    id: 26,
    name: "Lake Magadi",
    county: "Kajiado",
    budget: "1,000 - 3,000",
    accessibility: "family-friendly",
    image: "/images/lake magadi.jpeg",
    description: "A soda lake with flamingos and a unique environment.",
    activities: [
      "bird-watching",
      "wildlife-photography",
      "boat-rides"
    ]
},
{
    id: 27,
    name: "The Treetops Hotel",
    county: "Nyeri",
    budget: "20,000 - 30,000",
    accessibility: "4x4-vehicle-required",
    image: "/images/tree.jpg",
    description: "A unique hotel with treehouse accommodations, offering incredible views of the Aberdare Forest.",
    activities: [
      "luxury-stay",
      "wildlife-safari",
      "nature-walks"
    ]
},
{
    id: 28,
    name: "Mara River",
    county: "Narok",
    budget: "10,000 - 15,000",
    accessibility: "family-friendly",
    image: "/images/mara river.jpeg",
    description: "The famous river where the Great Migration happens.",
    activities: [
      "wildlife-safari",
     
      "fishing"
    ]
},
{
    id: 29,
    name: "Cedar Hotel Restaurant",
    county: "Nyeri",
    budget: "3,000 - 5,000",
    accessibility: "family-friendly",
    image: "/images/cedar.jpeg",
    description: "A restaurant in Nyeri offering local and continental dishes, surrounded by scenic views.",
    activities: [
      
      "scenic-views",
      "luxury-stay"
    ]
},
{
    id: 30,
    name: "Mbita Point",
    county: "Homa Bay",
    budget: "3,000 - 5,000",
    accessibility: "family-friendly",
    image: "/images/mbita.jpeg",
    description: "A quiet lakeside destination known for fishing and scenic views.",
    activities: [
      "fishing",
      "photography",
      "boat-rides"
    ]
},
{
    id: 31,
    name: "Muthaiga Country Club",
    county: "Nairobi",
    budget: "5,000 - 10,000",
    accessibility: "family-friendly",
    image: "/images/muthaiga.jpeg",
    description: "A prestigious club offering a peaceful environment and beautiful views of the Nairobi skyline.",
    activities: [
      "golfing",
      "luxury-stay",
      "scenic-views"
    ]
},
{
    id: 32,
    name: "Karimenu Waterfalls",
    county: "Kiambu",
    budget: "- 500",
    accessibility: "family-friendly",
    image: "images/karimenu.jpeg",
    description: "A beautiful waterfall located in Kiambu, perfect for nature lovers and picnics.",
    activities: [
      "hiking",
      "picnicks",
      "photography"
    ]
},
{
    id: 33,
    name: "Ol Donyo Sabuk National Park",
    county: "Kiambu",
    budget: "3,000 - 5,000",
    accessibility: "family-friendly",
    image: "/images/ol donyo sabuk.jpeg",
    description: "A park located near Machakos, known for its scenic hiking trails and stunning views.",
    activities: [
      "hiking",
      "scenic-views",
      "wildlife-photography"
    ]
},

  {
    id: 34,
    name: "Laikipia Plateau",
    county: "Laikipia",
    image: "/images/laikipia plateu.jpeg",
    description: "A plateau with stunning views and wildlife safaris.",
    activities: ["wildlife-safari", "bird-watching", "nature-walks"],
    accessibility: "4x4-vehicle-required",
    budget: "5,000 - 10,000 "
  },
  {
    id: 35,
    name: "Nairobi Railway Museum",
    image: "/images/nairobi railway.jpeg",
    description: "A museum showcasing Kenya's railway history and vintage locomotives.",
    activities: ["archaeological-tours", "photography"],
    accessibility: "public-transport",
    budget: "500 - 1,000",
    county: "Nairobi",
  },
  {
    id: 36,
    name: "Imenti Forest",
    image: "/images/imenti forest.jpeg",
    county: "Meru",
    description: "A beautiful forest reserve near Meru, known for its lush green landscapes and diverse wildlife.",
    activities: ["nature-walks", "bird-watching", "wildlife-photography"],
    accessibility: "4x4-vehicle-required",
    budget: "1,000 - 3,000"
  },
  {
    id: 37,
    name: "Shamata Forest",
    county: "Nyeri",
    image: "/images/shamata.jpeg",
    description: "A serene forest located in Nyeri, perfect for nature walks and relaxation.",
    activities: ["nature-walks", "picnicks", "photography"],
    accessibility: ["public-transport","4x4-vehicle-required"],
    budget: "1,000 - 3,000"
  },
  {
    id: 38,
    name: "Lukenya Hills",
    county: "Machakos",
    image: "/images/lukenya.jpeg",
    description: "A beautiful hill offering panoramic views of the surrounding area, perfect for a peaceful getaway.",
    activities: ["hiking", "photography", "scenic-views"],
    accessibility: "4x4-vehicle-required",
    budget: "3,000 - 5,000"
  },
  {
    id: 39,
    name: "Gatanga Falls",
    county: "Murang'a",
    image: "/images/gatanga.jpeg",
    description: "A beautiful waterfall in Gatanga, perfect for picnics and scenic views.",
    activities: ["picnicks", "photography", "nature-walks"],
    accessibility: ["public-transport","4x4-vehicle-required"],
    budget: "1,000 - 3,000"
  },
  {
    id: 40,
    name: "Mount Aberdare",
    county: "Nyandarua",
    image: "/images/mt.aberdare.jpeg",
    description: "A scenic mountain offering hiking opportunities with stunning views of the surrounding park.",
    activities: ["hiking", "bird-watching", "photography"],
    accessibility: ["public-transport","4x4-vehicle-required"],
    budget: "3,000 - 5,000"
  },
  {
    id: 41,
    name: "Lake Baringo",
    county: "Baringo",
    image: "/images/baringo.jpeg",
    description: "A beautiful lake with birdlife and opportunities for boat rides.",
    activities: ["boat-rides", "bird-watching", "fishing"],
    accessibility:["public-transport","4x4-vehicle-required"],
    budget: "3,000 - 5,000"
  },
  {
    id: 42,
    name: "Samburu Hills",
    county: "Samburu",
    image: "/images/samburu hills.jpeg",
    description: "A peaceful and remote destination offering stunning desert landscapes.",
    activities: ["photography", "cultural-visits"],
    accessibility: "4x4-vehicle-required",
    budget: "10,000 - 15,000 "
  },
  {
    id: 43,
    name: "Meru National Park",
    county: "Meru",
    image: "/images/meru park.jpeg",
    description: "A national park with diverse landscapes and abundant wildlife.",
    activities: ["wildlife-safari", "bird-watching", "photography"],
    accessibility: "4x4-vehicle-required",
    budget: "3,000 - 5,000"
  },
  {
    id: 44,
    name: "Naro Moru",
    county: "Nyeri",
    image: "/images/naro moru.jpeg",
    description: "A base for hikers heading to Mount Kenya, known for its cool climate.",
    activities: "Hiking",
    accessibility: "4x4-vehicle-required",
    budget: "5,000 - 10,000"
  },
  {
    id: 45,
    name: "Kereita Forest",
    county: "Kiambu",
    image: "/images/kerita.jpeg",
    description: "A beautiful forest with canopy walks and scenic nature trails.",
    activities: ["nature-walks", "photography"],
    accessibility: ["public-transport","4x4-vehicle-required"],
    budget: "1,000 - 3,000"
  },
  {
    id: 46,
    name: "Rift Valley View Point",
    county: "Nakuru",
    image: "/images/rift valley.jpeg",
    description: "An incredible viewpoint offering panoramic views of the Rift Valley.",
    activities: "luxury-stay",
    accessibility: ["public-transport","4x4-vehicle-required"],
    budget: "500 - 1,000 "
  },
  {
    id: 47,
    name: "Chaka Ranch",
    image: "/images/chaka.jpeg",
    county: "Nyeri",
    description: "A ranch offering activities like horseback riding and farm tours.",
    activities: "Picnicks",
    accessibility: ["public-transport","4x4-vehicle-required"],
    budget: "3,000 - 5,000 "
  },
  {
    id: 48,
    name: "Nyeri Golf Club",
    image: "/images/golf.jpeg",
    county: "Nyeri",
    description: "A beautiful golf course located in Nyeri, surrounded by stunning views of Mount Kenya.",
    activities: ["golfing", "photography"],
    accessibility: ["public-transport","4x4-vehicle-required"],
    budget: "1,000 - 3,000 "
  },
  {
    id: 49,
    name: "Loisaba Conservancy",
    image: "/images/loisaba.jpeg",
    county: "Laikipia",
    description: "A private conservancy offering luxurious safari experiences.",
    activities: ["wildlife-safari", "luxury-stay"],
    accessibility: "4x4-vehicle-required",
    budget: "15,000 - 20,000"
  },
  {
    id: 50,
    name: "Wajee Nature Park",
    image: "/images/wanjee.jpeg",
    county: "Laikipia",
    description: "A peaceful nature park in Nanyuki, ideal for birdwatching and relaxation.",
    activities: ["bird-watching", "nature-walks", "photography"],
    accessibility: ["public-transport","4x4-vehicle-required"],
    budget: "1,000 - 3,000 "
  }
];

const UserDashboard = () => {
  
  const [filteredPlaces, setFilteredPlaces] = useState(places);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(places);

  const handleFilter = (event) => {
    event.preventDefault();
    const form = event.target;
    const county = form.county.value;
    const budget = form.budget.value;
    const accessibility = form.accessibility.value;
    const activities = form.activities.value;

    const filtered = places.filter((place) => {
        return (
        (county === "all" || place.county === county) &&
        (budget === "all" || 
          (budget === "- 500" && place.budget === "- 500") ||
          (budget === "500 - 1,000" && place.budget === "500 - 1,000") ||
          (budget === "1,000 - 3,000" && place.budget === "1,000 - 3,000") ||
          (budget === "3,000 - 5,000" && place.budget === "3,000 - 5,000") ||
          (budget === "5,000 - 10,000" && place.budget === "5,000 - 10,000") ||
          (budget === "10,000 - 15,000" && place.budget === "10,000 - 15,000") ||
          (budget === "15,000 - 20,000" && place.budget === "15,000 - 20,000") ||
          (budget === "20,000 - 30,000" && place.budget === "20,000 - 30,000")
        ) &&
        (accessibility === "all" || (place.accessibility && place.accessibility.includes(accessibility))) &&

        (activities === "all" || (place.activities && place.activities.includes(activities)))
       
      );
    });

    setFilteredPlaces(filtered);
  };

  const resetFilter = () => {
    setFilteredPlaces(places); 
    setSearchResults(places);
    setSearchTerm("");
  };
  
  const handleSearch = (event) => {
    event.preventDefault();
    
    const results = places.filter((place) => {
      return (
        (place.name && place.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (place.county && place.county.toLowerCase().includes(searchTerm.toLowerCase()))
        
      );
    });

    setSearchResults(results);
  };
  
  return (
    <>
<div className="container mx-auto p-4">

<form onSubmit={handleSearch} className="mb-4">
        <div className="bg-white flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
          <input
            type="text"
            placeholder="Search by name or county"
            className="bw-full outline-none bg-white pl-4 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5 ml-40"
          >
            Search
          </button>
          
        </div>
        
      </form>


      <p className="text-5xl text-center mb-12 font-bold">
      <TypeAnimation
          sequence={[
            'Welcome to the user dashboard.', 
            1000, 
            'Explore amazing vacation destinations!',
            2000,
            'Let’s get started!',
            3000,
          ]}
          wrapper="span"
          speed={50}
          cursor={true}
          
          repeat={Infinity}
      />
      </p>
    
 <div className="flex gap-6">     
       {/* Filter Form */}
       <div className=" lg:w-2/12 fixed top-44 left-4 p-4 md ">
        <form onSubmit={handleFilter} className="mb-4 space-y-4">
          
          <div>
            <label htmlFor="county">Name of County</label>
            <select name="county" id="county" className="ml-2 border p-1">
              <option value="all">All</option>
              <option value="Nyeri">Nyeri</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Kirinyaga">Kirinyaga</option>
              <option value="Laikipia">Laikipia</option>
              <option value="Nakuru">Nakuru</option>
              <option value="Kiambu">Kiambu</option>
              <option value="Meru">Meru</option>
              <option value="Bomet">Bomet</option>
              <option value="Taita Taveta">Taita Taveta</option>
              <option value="Kajiado">Kajiado</option>
              <option value="Narok">Narok</option>
              <option value="Homa Bay">Homa Bay</option>
              <option value="Machakos">Machakos</option>
              <option value="Murang'a">Murang'a</option>
              <option value="Nyandarua">Nyandarua</option>
              <option value="Baringo">Baringo</option>
              <option value="Samburu">Samburu</option>
              
            </select>
          </div>

          
          <div>
            <label htmlFor="budget">Budget Range:</label>
            <select name="budget" id="budget" className="ml-2 border p-1 w-28">
              <option value="all">All</option>
              <option value="- 500">KES - 500</option>
              <option value="500 - 1,000">KES 500 - 1,000</option>
              <option value="1,000 - 3,000">KES 1,000 - 3,000</option>
              <option value="3,000 - 5,000">KES 3,000 - 5,000</option>
              <option value="5,000 - 10,000">KES 5,000 - 10,000</option>
              <option value="10,000 - 15,000">KES 10,000 - 15,000</option>
              <option value="15,000 - 20,000">KES 15,000 - 20,000</option>
              <option value="20,000 - 30,000">KES 20,000 - 30,000+</option>
            </select>
          </div>

          
          <div>
            <label htmlFor="accessibility">Accessibility:</label>
            <select name="accessibility" id="accessibility" className="ml-2 border p-1 w-28">
              <option value="all">All</option>
              <option value="family-friendly">Family-Friendly</option>
              <option value="wheelchair-accessible">Wheelchair Accessible</option>
              <option value="4x4-vehicle-required">4x4 Vehicle Required</option>
              <option value="public-transport">Public Transport Accessible</option>
            </select>
          </div>

          
          <div>
            <label htmlFor="activities">Activities:</label>
            <select name="activities" id="activities" className="ml-2 border p-1 w-32">
              <option value="all">All</option>
              <option value="wildlife-safari">Wildlife Safari</option>
              <option value="hiking">Hiking</option>
              <option value="nature-walks">Nature Walks</option>
              <option value="boat-rides">Boat Rides</option>
              <option value="cultural-visits">Cultural Visits</option>
              <option value="luxury-stay">Luxury Stay</option>
              <option value="archaeological-tours">Archaeological Tours</option>
              <option value="bird-watching">Bird-Watching</option>
              <option value="picnicks">Picnics</option>
              <option value="wildlife-photography">wildlife-photography</option>
              <option value="scenic-views">Scenic View</option>
              <option value="fishing">Fishing</option>
              <option value="cycling">Cycling</option>
              <option value="nature-walks">Nature walks</option>
              <option value="photography">Photography</option>
              <option value="swimming">Swimming</option>
              <option value="golfing">Golfing</option>
            </select>
          </div>

          
          <div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Filter</button>
            <button type="button" onClick={resetFilter} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">All</button>
          </div>
        </form>
      </div>


      <div className="w-full lg:w-5/6 ml-36  pl-4 " style={{ maxHeight: 'calc(100vh - 150px)' }}>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {(searchTerm ? searchResults : filteredPlaces).length === 0 ? (
                <p className="text-center text-xl text-gray-500 ">No areas found</p>
              ) : (   
              (searchTerm ? searchResults : filteredPlaces).map((place) => (
                <div key={place.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"style={{ boxShadow: '0 4px 6px rgba(137, 207, 240)' }}>
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
                    <p className="text-gray-700 mb-4">{place.description}</p>
                    <Link
                      to={`/place-details/${place.id}`} 
                      className="text-blue-600 hover:underline"
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              ))
            )}
            </div>
          </div>
       </div>
      

    </div>
    
    </>
  );
};

export default UserDashboard;

