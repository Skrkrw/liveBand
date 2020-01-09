function artistInfo(artist) {
    $("#name").html(`${artist.name}`);
    $("#artistsAlbum").attr("src", `${artist.image_url}`);
    $(".headRow").show();

}

function eventInfo(bandEvent) {
    $(bandEvent).each(function (index) {
        var venueName = bandEvent[index].venue.name;
        var venueCity = bandEvent[index].venue.city;
        var venueCountry = bandEvent[index].venue.country;
        var dateEvent = bandEvent[index].datetime;
        var urlEvent = bandEvent[index].url;

        var lat = bandEvent[index].venue.latitude;
        var long = bandEvent[index].venue.longitude;

        
        var options = {
            zoom: 10,
            center: {
                lat: bandEvent[index].venue.latitude,
                long: bandEvent[index].venue.longitude
                }
            };
//        console.log((index + 1) + "\t" + venueName + "\t" + venueCity + "\t" + venueCountry + "\t" +dateEvent+ "\t" + urlEvent);
        //var APIKey = "AIzaSyD50Cf8z1w1f_pxvRR1vr-_EPc3yP0Qpnc";

        var map;
    /*    
        map = new google.maps.Map(document.getElementById("map"), options);
        function rederMap() {
            var options = {
                zoom: 10,
                center: {
                    lat: 40.785091, 
                    long: -73.968285
                }
            };
        };
*/
        

           /* var labels = "ABCDEFGHIJKLMNÑOPQRSTUVXYZ";

            var locations = [
                { lat: 40.785091, lng: -73.968285 },
                { lat: 41.084045, lng: -73.874245 },
                { lat: 40.754932, lng: -73.984016 }
            ];

            /*map its a JS method and can take up to three arguments and work similar to a for each( ) function*/
            /*arguments = location is the current value where we are in the array and the "i" is the index number*/
         /*   var markers = locations.map(function (location, i) {
                return new google.maps.Marker({*//*Get one of the strings out of the labels we created*/
                   /* position: location,
                    label: labels[i % labels.length]
                  */  /*The reason for using the %operator is so that if we have more than 26 locations, then it will loop around to the start of our string again and go from Z back to A, instead of throwing an error.*/
                /*});
            });*//*

        /*    // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers,
                { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

        } */   
        
        return document.getElementById("showList").innerHTML += `
        <tr id="bandInfoRow">
            <td> ${ index + 1} </td>
            <td> ${venueName} </td>
            <td> ${venueCity} </td>
            <td> ${venueCountry} </td>
            <td id="map" class="location"> <a href="${}"></a> </td>
            <td> ${dateEvent} </td>
            <td> <a href="${urlEvent}"> Get it!</a>  </td>
            
        </tr>
    `;
    });

}

function fetchBandInformation(event) {

    const bitURL = "https://rest.bandsintown.com/artists";
    const bitAPI = "39605faedc3f5b56c8bd18919d8a9c2a";

/*    //Client Secret: 761153c311694f92aca526a239dfece5;
    const spotifyAPI = "https://api.spotify.com/v1/";
    const spotifyID = "6a3c296f20584ac6a930f655fd01ce76";//"43ZHCT0cAZBISjO8DG9PnE";//0TnOYISbd1XYRBk9myaseg
    const spotifyOAT = "BQDH76hRalNAvKGTbOF_wl4YVR5xmP0xQVomNMmaZgsJiy_LQadVol5Mb4iBwtdRr_KAnJ1SIKwiwFkQ5";
*/
    let artists = $("#artists").val();

    $(".headRow").hide();

    $.when(
        $.getJSON(`${bitURL}/${artists}?app_id=${bitAPI}`),
        $.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`)
    ).then(
        function (artResp, eventResp) {

            console.log(eventResp);

            $("#artists2").autocomplete({
                source: eventResp[0].name
                
            });
            var artists2 = $("#artists2").val();
            console.log(artists2);

            var artists = artResp[0];
            var events = eventResp[0];

            artistInfo(artists);
            eventInfo(events);

        },
        function error(errorResponse) {
            if (errorResponse.status === 404) {
                $("#name").html("");
                $("#name").html("Artists not found");
                $("#artistsAlbum").attr("src", "")
                $("#showList").html("");

            } else if (errorResponse.status === 403) {
                $("#name").html("");
                $("#name").html("Wait certain time: ");
            } else {
                /*$("#name").html("");
                $("#name").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
*/
            }
        }
    );

};

$(document).ready(fetchBandInformation);
    
  /*  , function(){
    $("#artists2").autocomplete({
        source: `https://rest.bandsintown.com/artists/${$("artists2").val()}?app_id=39605faedc3f5b56c8bd18919d8a9c2a`
    })
});
    
*/

function renderGoogleMapLink(venue){
    return 
    `
    <a class="googleMapPopUp" rel="nofollow" href="https://maps.google.com.au/maps?q=south+australia" target="_blank">View location map </a>
    `
}
