/*function artistDisplay() {
    "use strict";
    $("#artistsAlbum").attr("src", artistData.image_url);
    $("#name").html(artistData.name);
    $("#lineup").html(artistData.lineup);

    $("#artistsTable").html(`<caption>${artistData.name}</caption>
                             <p>${artistsEvent.lineup}</p>`);
}

function eventsDisplay(events) {
    if (events.leng){

    }
}
*/
function fetchBandInformation(event) {

    const bitURL = "https://rest.bandsintown.com/artists";
    const bitAPI = "39605faedc3f5b56c8bd18919d8a9c2a";
    let artists = $("#artists").val();

    if (!artists) {
        $("#artistAlbum").attr("src", ``);
        $("#name").html("");
        $("#artistsShow").html(``);
    }
    // console.log(artists);


    $.when(
        $.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`)
    ).then(
        function (artistResponse) {
            //console.log(artist.artist.name);


            //console.log(artistResponse);
            //console.dir(artistResponse);
            var artist = artistResponse;
            //console.log(artist);
            //console.dir(artist[0]);
            //console.dir(artist[1]);
            $("#artistsShow").html(`<thead>
                                    <tr>
                                        <th> # </th>
                                        <th> Venue </th>
                                        <th> City </th>
                                        <th> Country </th>
                                        <th> Time </th>
                                    </tr>
                                    </thead>`

            );
            $(artist).each(function (indexID, elementID) {
                var venue = elementID.venue;
                var time = elementID.datetime
                var urlEvent = elementID.url;
                //console.dir(indexID);

                //console.log(elementID);
                //console.log(elementID);
                //console.log(elementID.artist);
                console.dir(elementID);
                if (indexID == 0) {
                    console.log(elementID.artist.name);
                    $("#name").html(`${elementID.artist.name}`);
                    $("#artistsAlbum").attr("src", `${elementID.artist.image_url}`);
                    //var lineUp = elementID.artist.lineup.toString();
                    //$("#lineup").html( `${lineUp}`);//array
                }
                //console.log(indexID+1);
                //$format.time(new Date(), "dd/mm/yyyy, hh:MM:ss TT");

                $("").html(`<td>${indexID + 1}</td>
                                    <td>${venue.name}</td>
                                    <td>${venue.city}</td>
                                    <td>${venue.country}</td>
                                    <td>${time}</td>
                                    <td><a href="${urlEvent}" target="_blank">Buy tickets</td>`
                );
            });
        },

        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#name").html("Artists not found");
            } else if (errorResponse.status === 403) {
                $("#name").html("Wait certain time: ");
            } else {
                $("#name").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        }


        /*
            $.when(
                $.getJSON(`${bitURL}/${artists}?app_id=${bitAPI}`),
                $.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`)
            ).then(
                function (artistData, artistsEvent) {
        
                    var bitArtistsId = artistData[0].id;
                    var bitArtists = artistData[0];
                    var bitEvents = artistsEvent;
                    var bitEvent = artistsEvent[0][1];
                    
                    //.venue.country + city + name
                    //.datetime: date and time
                    //.artist.name + id + image_url
                    //.lineup
        
        //            console.log(bitArtistsId);
        //            console.log(bitArtists);
        //            console.log(bitEvents);
                    console.dir(bitEvents);
                    console.log(bitEvent.venue.country);
                    console.log(bitArtists.upcoming_event_count);
                    $("#name").html(`${bitArtists.name}`);
                    $("#artistsAlbum").attr("src", `${bitArtists.image_url}`);
                    $("#lineup").html(`${bitArtists.upcoming_event_count}`);
                    $("#showList").html(bitEvents.each(function(item){
                                        `<td></td>
                                        <td>${bitEvents.venue.country}</td>
                                        <td>${bitEvent.venue.city}</td>
                                        <td>${bitEvent.venue.name}</td>`
                                        }));
                    
                    
        
        
                }, 
                 function(errorResponse){
                    if (errorResponse.status === 404){
                        $("#name").html("Artists not found");
                    } else if (errorResponse.status === 403) {
                        $("#name").html("Wait certain time: ");
                    } else {
                        $("#name").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                    }
                });
            
        }
        
        /*
        var xhr = new HTMLHttpRequest();
        
        xhr.open("GET", "https://rest.bandsintown.com/app_id=39605faedc3f5b56c8bd18919d8a9c2a");
        xhr.send();
        
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                
            }
            */
    )
};



$(document).ready(fetchBandInformation);


/************************************************************
 * BIT 2.0
 ***********************************************************/

if ($("#artists").val() === $("#name").html("Artists not found")) {
    $("#artistAlbum").attr("src", ``);
    $("#artistsShow").html(``);


}

var artist = artistResponse;
console.log(artist.length);
console.dir(artist);





$(artist).each(function (indexID, elementID) {
    var venue = elementID.venue;
    var time = elementID.datetime
    var urlEvent = elementID.url;


    console.dir(elementID);
    if (indexID == 0) {
        console.log(elementID.artist.name);
        $("#name").html(`${elementID.artist.name}`);
        $("#artistsAlbum").attr("src", `${elementID.artist.image_url}`);
        document.getElementById("lineup");



                /*    document.getElementById("artsitsShow").innerHTML =
                        `<thead>
                            <tr>
                                <th> # </th>
                                <th> Venue </th>
                                <th> City </th>
                                <th> Country </th>
                                <th> Time </th>
                            </tr>
                            </thead>`
                    ;
                */}

    document.getElementById("showList").innerHTML +=
        `<tr id="showListRow">
                        <th>${indexID + 1}</th>
                        <td>${venue.name}</td>
                        <td>${venue.city}</td>
                        <td>${venue.country}</td>
                        <td>${time}</td>
                        <td><a href="${urlEvent}" target="_blank">Buy tickets</td>
                    </tr>`
        ;

    $("#showlist").html(
        `<thead class="tableH">
            <tr>
                <th> # </th>
                <th> Venue </th>
                <th> City </th>
                <th> Country </th>
                <th> Time </th>
                <th> Tickets </th>
            </tr>
        </thead>
        `
    );