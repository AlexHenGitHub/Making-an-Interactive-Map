//FourSquareAPI key
const apiKey = 'fsq37F/gFT2XmHPH0uMELJCGLL2vVGZJbr59YwN6Fgl2IcE='

//leaftlet map creation
var map = L.map('map').setView([40, 12], 13);
var leafLetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


//sumbit button controls
async function onClick()
{
        leafLetMap

        //dropdown values 
        let choice = document.getElementById("Choices").value;

        const searchParams = new URLSearchParams({ query: choice });

        let searchUrl = `https://api.foursquare.com/v3/places/search?${searchParams}&limit=5`
        
        let options = 
        {
            method: 'GET',
            headers: 
            {
            accept: 'application/json', 
            Authorization: apiKey
            }
        }
        let res = await fetch(searchUrl, options);
        let {results} = await res.json();
        console.log(results);

        //finds and adds markers to the 5 closest choices
        let top_five = results.forEach(({categories, geocodes, name}) => {
            let {latitude, longitude} = geocodes.main
            let marker = L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup(name)
                .openPopup();  
        });   

}





