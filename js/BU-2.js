//import { request, response } from "express";

/*
function artistInfo(artist){

    $("#artists").autocomplete({
        source: function(){
            console.log("");
        }
        
    });
    
    /*
    $(".tableH").show();
    $("#name").html(`${artist.name}`);

    console.log(artist);
    $("#artistsAlbum").attr("src", `${artist.image_url}`);
  */
/*
 
}

function eventInfo(bandEvent){
/*  
$("#artistsShow").html(`
    <thead class="tableH">
            <tr class="headRow">
                <th> # </th>
                <th> Venue </th>
                <th> City </th>
                <th> Country </th>
                <th> Time </th>
                <th> Tickets </th>
            </tr>
        </thead>
`);
 
$(bandEvent).each(function(index){
    var venueName = bandEvent[index].venue.name;
    var venueCity = bandEvent[index].venue.city;
    var venueCountry = bandEvent[index].venue.country;
    var dateEvent =bandEvent[index].datetime;
    var urlEvent = bandEvent[index].url;
//        console.log((index + 1) + "\t" + venueName + "\t" + venueCity + "\t" + venueCountry + "\t" +dateEvent+ "\t" + urlEvent);

    return document.getElementById("artsitsShow").innerHTML += `
    <tbody id=showList>
        <tr>
            <td> ${ index+1} </td>
            <td> ${venueName} </td>
            <td> ${venueCity} </td>
            <td> ${venueCountry} </td>
            <td> ${dateEvent} </td>
            <td> <a href="${urlEvent}"> Get it!</a>  </td>
        </tr>
    </tbody>
`;
});*//*

} 

function fetchBandInformation(){
const bitURL = "https://rest.bandsintown.com/artists";
const bitAPI = "39605faedc3f5b56c8bd18919d8a9c2a";

let artists = $("#artists").val();
//console.log(`Let artist: ${artists}`);
 
$(".headRow").hide();
$(".tableH").hide();

$("#artists").autocomplete({
    source: function () {
        console.log();
        


    },
    minLength: 1,
    delay: 100
})

/*$.when(
    //$.getJSON(`${bitURL}/${artists}?app_id=${bitAPI}`),
    $.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`)
).then(
    $("#name").autocomplete({
        source: function (request, response) {
            console.log(`Request: ${request}`);
            console.log(`Response: ${response}`);
            

        },
        minLength: 1,
        delay: 100
    })
);

 
 
/*
$.when(
    $.getJSON(`${bitURL}/${artists}?app_id=${bitAPI}`),
    $.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`)
).then(
    function (artResp, eventResp) {

        
        var artist = artResp[0];
        var events = eventResp[0];
        
        console.log(artist.name);
        $("#name").autocomplete({
            source: function(request, response){
                artist,
            minLength: 2
        });
        //console.log(events);

       // artistInfo(artists);
       // eventInfo(events);

    },
/*        $("#name").keyup(function(){
        
        
            $("#artistsAlbum").attr("src", "");
            $("#showList").html("");
            $(".headRow").hide();
            $(".tableH").hide();
        
    }),
*//*
        function error(errorResponse) {
            if (errorResponse.status === 404) {
                $("#name").html("");
                $("#name").html("Artists not found");
                $("#artistsAlbum").attr("src", "")
                
                
            } else if (errorResponse.status === 403) {
                $("#name").html("");
                $("#name").html("Wait certain time: ");
                $("#showList").html("");
                $(".headRow").hide();
                $(".tableH").hide()
                
            } else if (errorResponse.status === 400 ) {
                $("#name").html("");
                $("#name").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                $("#showList").html("");
                $(".headRow").hide();
                $(".tableH").hide()
            }
        };

};
/*
<script>
    function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
    if (td) {
        txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
  }
}       
}
}*/
//oninput="fetchBandInformation()"
//<script async refer type="text/javascript" src="js/spotifyApp.js"></script>
/*
$(document).ready(fetchBandInformation);

/*"https://rest.bandsintown.com/artists"
$(document).ready(function(){
//    $("#artists").on("input", _.debounce(fetchArtistsName, 150));
    $("#artists").keyup(_.debounce(fetchBandInformation, 150) );
    
});*/
//https://rest.bandsintown.com/artists/events?app_id=39605faedc3f5b56c8bd18919d8a9c2a


/*
$("#artists").autocomplete({
        source: function(){
            var artistBand = $("#artists").val();
            console.log("");
            $.getJSON(`https://rest.bandsintown.com/artists/${artistBand}events?app_id=39605faedc3f5b56c8bd18919d8a9c2a`);

        }
    });
    */

$(document).ready(function () {
    /* $.ajax({
         url: "https://rest.bandsintown.com/artists/rammstein/events?app_id=39605faedc3f5b56c8bd18919d8a9c2a",
         dataType: "json"
         
     
     }); 
 */



    $(function () {
        function log(message) {
            $("<div>").text(message).prependTo("#log");
            $("#log").scrollTop(0);
        }

        var artist = $("#artists").val();
        $("#artists").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: `https://rest.bandsintown.com/artists/${artist}?app_id=39605faedc3f5b56c8bd18919d8a9c2a`,
                    dataType: "json",
                    data: {
                        term: request.name
                    },
                    success: function (data) {
                        response(data);
                    }
                });
            },
            minLength: 2/*,
         /*   select: function (event, ui) {
                log("Selected: " + ui.item.value + " aka " + ui.item.id);
            }*/
        });
    });
});


/****************************************
 * Version: 3
 * Nota: Mucho estres al no poder hacer funcionar las cosas como anteriormente estaban
 * 
 * //import { request, response } from "express";
function artistInfo(artist){
    //console.log(artist);
    $("#name").html(`${artist.name}`);
    $("#artistsAlbum").attr("src", `${artist.image_url}`);
    /*$("#artist").on("keydown", function(){

        var title = $("#name").html(`${artistName.name}`);
        var img = $("#artistsAlbum").attr("src", `${artistName.image_url}`);

        return `${title, img}`;
    });*/

    //console.log(artist);
     
    
}


/*************************************
* $(function() {
*    $.getJSON(`https://rest.bandsintown.com/artists${$("#artists").val()}39605faedc3f5b56c8bd18919d8a9c2a`, function(data) {
*        $("#autocomplete").autocomplete({
*        source: data,
*        select: function(event, ui) {
*            window.location.href = ui.title.rendered;
*        }
*        });
*    });
*    })
* 
* <input type="text" id="autocomplete" />
 *************************************/


function tableHeader() {
    var header = $("#tableH").html(`
        
            //import { request, response } from "express";

function artistInfo(artist){

      
    console.log(artist);
    
    $("#name").html(`${ artist.name }`);

    //console.log(artist);
    $("#artistsAlbum").attr("src", `${ artist.image_url }`);

 
}

function eventInfo(bandEvent){
  console.log(bandEvent);
    $("#artsitsShow").html(`
    < thead class= "tableH" >
    <tr class="headRow">
        <th> # </th>
        <th> Venue </th>
        <th> City </th>
        <th> Country </th>
        <th> Time </th>
        <th> Tickets </th>
    </tr>
            </thead >
        `);
    
    /*var contentTable = document.getElementById("showList").innerHTML += `
        < tr class="eventRow" >
            <td> ${index + 1} </td>
            <td> ${venueName} </td>
            <td> ${venueCity} </td>
            <td> ${venueCountry} </td>
            <td> ${dateEvent} </td>
            <td> <a href="${urlEvent}"> Get it!</a>  </td>
            </tr >

        `;*/
    $(bandEvent).each(function(index){
        var venueName = bandEvent[index].venue.name;
        var venueCity = bandEvent[index].venue.city;
        var venueCountry = bandEvent[index].venue.country;
        var dateEvent =bandEvent[index].datetime;
        var urlEvent = bandEvent[index].url;
            console.log((index + 1) + "\t" + venueName + "\t" + venueCity + "\t" + venueCountry + "\t" +dateEvent+ "\t" + "urlEvent");
        
        
       /* console.log(contentTable);
        contentTable;*/
        
        
        $("#showList").html(`
        < tr >
        <td> ${index + 1} </td> <td> ${venueName} </td> <td> ${venueCity} </td>
        <td> ${venueCountry} </td> <td> ${dateEvent} </td> <td> <a href="${urlEvent}"> Get it!</a>  </td>
            </tr >
        `);
    });
   // */    
   };


function fetchBandInformation(){
const bitURL = "https://rest.bandsintown.com/artists";
const bitAPI = "39605faedc3f5b56c8bd18919d8a9c2a";

let artists = $("#artists").val();
//console.log(`Let artist: ${ artists } `);
 
//$(".headRow").hide();
//$(".tableH").hide();
 
$.when(
    $.getJSON(`${ bitURL } /${artists}?app_id=${bitAPI}`),
    $.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`)
).then(
        function (artResp, eventResp) {


            var artist = artResp[0];
            var events = eventResp[0];

            console.log(artResp[2].status);

            //console.log(events);

            artistInfo(artist);
            eventInfo(events);

        },

        function error(errorResponse) {
            if (errorResponse.status === 404) {
                $("#name").html("");
                $("#name").html("Artists not found");
                //$("#showList").remove(".eventList");



            } else if (errorResponse.status === 403) {
                $("#name").html("");
                $("#name").html("Wait certain time: ");


            } else if (errorResponse.status === 400) {
                $("#name").html("");
                $("#name").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);

            }
        });

};

//https://rest.bandsintown.com/artists/events?app_id=39605faedc3f5b56c8bd18919d8a9c2a
$(document).ready(fetchBandInformation);



            
    `);
    return header;
}
/*$.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`)*/

function eventInfo(artResp) {
    // console.log(bandEvent);
    tableHeader();

    var bandEvent = $.getJSON(`https://rest.bandsintown.com/artists/${artResp}/events?app_id=39605faedc3f5b56c8bd18919d8a9c2a`);
    $(bandEvent).each(function (index) {
        //console.log(index+1, bandEvent.venue, index);
        var venueName = bandEvent[index].venue.name;
        var venueCity = bandEvent[index].venue.city;
        var venueCountry = bandEvent[index].venue.country;
        var dateEvent = bandEvent[index].datetime;
        var urlEvent = bandEvent[index].url;
        //console.log(bandEvent);
        //console.log(venueName);
        //        console.log((index + 1) + "\t" + venueName + "\t" + venueCity + "\t" + venueCountry + "\t" +dateEvent+ "\t" + urlEvent);
        function creatInfo() {
            document.getElementById("showList").innerHTML += `
                
                    <tr class="info">
                        <td> ${ index + 1} </td>
                        <td> ${venueName} </td>
                        <td> ${venueCity} </td>
                        <td> ${venueCountry} </td>
                        <td> ${dateEvent} </td>
                        <td> <a href="${urlEvent}"> Get it!</a>  </td>
                    </tr>
                
            `;
        }

        return creatInfo()
    });

}

function fetchBandInformation() {
    const bitURL = "https://rest.bandsintown.com/artists";
    const bitAPI = "39605faedc3f5b56c8bd18919d8a9c2a";

    let artists = $("#artists").val();

    /*$(".headRow").remove();
    $(".tableH").remove(); 
*/
    $.when(
        $.getJSON(`${bitURL}/${artists}?app_id=${bitAPI}`)

        /*            $("#artists").autocomplete({
                source: data,
                select: function(event, ui){
                    window.location.href = ui.title.rendered;
                }
            });
        }*/
    ).then(
        function (artResp/*, eventResp*/) {


            var artist = artResp;
            //var events = eventResp[0];

            //console.log(artist);
            //console.log(artist.name)
            ///            console.log(events);/*/
            //console.log(events);

            artistInfo(artResp);
            eventInfo(artResp);

        },

        function error(errorResponse) {
            if (errorResponse.status === 404) {
                $("#name").html("");
                /*$("#name").html("Artists not found");
                $("#artistsAlbum").attr("src", "https://s3.amazonaws.com/bit-photos/artistThumb.jpg");*/



            } else if (errorResponse.status === 403) {
                $("#name").html("");
                $("#name").html("Wait certain time: ");
                //$("#artistsAlbum").attr("src", "https://s3.amazonaws.com/bit-photos/artistThumb.jpg");


            } else if (errorResponse.status === 400) {
                $("#name").html("");
                $("#name").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                //$("#artistsAlbum").attr("src", "https://s3.amazonaws.com/bit-photos/artistThumb.jpg");

            };
        }

    )
};

$(document).ready();

 */

 /*****************************************************************************
  * Version 4 y Sigue sin funcionar como antes
  * He ecnontrado una tab con el JS original
  * Deseenme buena suerte!
  * ...
  */

//import { request, response } from "express";

function artistInfo(artist) {


    console.log(artist);

    $("#name").html(`${artist.name}`);

    //console.log(artist);
    $("#artistsAlbum").attr("src", `${artist.image_url}`);


}

function eventInfo(bandEvent) {
    console.log(bandEvent);
    $("#artsitsShow").html(`
        <thead class="tableH">
                <tr class="headRow">
                    <th> # </th>
                    <th> Venue </th>
                    <th> City </th>
                    <th> Country </th>
                    <th> Time </th>
                    <th> Tickets </th>
                </tr>
            </thead>
    `);

    /*var contentTable = document.getElementById("showList").innerHTML += `
            <tr class="eventRow">
                <td> ${ index + 1} </td>
                <td> ${venueName} </td>
                <td> ${venueCity} </td>
                <td> ${venueCountry} </td>
                <td> ${dateEvent} </td>
                <td> <a href="${urlEvent}"> Get it!</a>  </td>
            </tr>
            
        `;*/
    $(bandEvent).each(function (index) {
        var venueName = bandEvent[index].venue.name;
        var venueCity = bandEvent[index].venue.city;
        var venueCountry = bandEvent[index].venue.country;
        var dateEvent = bandEvent[index].datetime;
        var urlEvent = bandEvent[index].url;
        console.log((index + 1) + "\t" + venueName + "\t" + venueCity + "\t" + venueCountry + "\t" + dateEvent + "\t" + "urlEvent");


        /* console.log(contentTable);
         contentTable;*/


        $("#showList").html(`
            <tr>
                <td> ${index + 1} </td> <td> ${venueName} </td> <td> ${venueCity} </td> 
                <td> ${venueCountry} </td> <td> ${dateEvent} </td> <td> <a href="${urlEvent}"> Get it!</a>  </td>
            </tr>  
        `);
    });
    // */    
};


function fetchBandInformation() {
    const bitURL = "https://rest.bandsintown.com/artists";
    const bitAPI = "39605faedc3f5b56c8bd18919d8a9c2a";

    let artists = $("#artists").val();
    //console.log(`Let artist: ${artists}`);

    //$(".headRow").hide();
    //$(".tableH").hide();

    $.when(
        $.getJSON(`${bitURL}/${artists}?app_id=${bitAPI}`),
        $.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`)
    ).then(
        function (artResp, eventResp) {


            var artist = artResp[0];
            var events = eventResp[0];

            console.log(artResp[2].status);

            //console.log(events);

            artistInfo(artist);
            eventInfo(events);

        },

        function error(errorResponse) {
            if (errorResponse.status === 404) {
                $("#name").html("");
                $("#name").html("Artists not found");
                //$("#showList").remove(".eventList");



            } else if (errorResponse.status === 403) {
                $("#name").html("");
                $("#name").html("Wait certain time: ");


            } else if (errorResponse.status === 400) {
                $("#name").html("");
                $("#name").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);

            }
        });

};

//https://rest.bandsintown.com/artists/events?app_id=39605faedc3f5b56c8bd18919d8a9c2a
$(document).ready(fetchBandInformation);


