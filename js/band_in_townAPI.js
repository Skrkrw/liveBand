function artistInfo(artist){
    $("#name").html(`${artist.name}`);
    $("#artistsAlbum").attr("src", `${artist.image_url}`);
    $(".headRow").show();
    
}

function eventInfo(bandEvent){
    $(bandEvent).each(function(index){
        var venueName = bandEvent[index].venue.name;
        var venueCity = bandEvent[index].venue.city;
        var venueCountry = bandEvent[index].venue.country;
        var dateEvent =bandEvent[index].datetime;
        var urlEvent = bandEvent[index].url;
//        console.log((index + 1) + "\t" + venueName + "\t" + venueCity + "\t" + venueCountry + "\t" +dateEvent+ "\t" + urlEvent);

        return document.getElementById("showList").innerHTML += `
        <tr>
            <td> ${ index+1} </td>
            <td> ${venueName} </td>
            <td> ${venueCity} </td>
            <td> ${venueCountry} </td>
            <td> ${dateEvent} </td>
            <td> <a href="${urlEvent}"> Get it!</a>  </td>
        </tr>
    `;
    });

}

function fetchBandInformation(event){

    const bitURL = "https://rest.bandsintown.com/artists";
    const bitAPI = "39605faedc3f5b56c8bd18919d8a9c2a";

    //Client Secret: 761153c311694f92aca526a239dfece5;
    /*const spotifyAPI = "https://api.spotify.com/v1/";
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
                $("#name").html("");
                $("#name").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                
            }
        }
    );

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

$(document).ready(function(){
//    $("#artists").on("input", _.debounce(fetchArtistsName, 150));
    $("#artists").keyup(_.debounce(fetchBandInformation, 150) );
});