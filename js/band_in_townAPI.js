function artistInfo(artist){
    $("#name").html(`${artist.name}`);
    $("#artistsAlbum").attr("src", `${artist.image_url}`);
    console.log(artist.name);
    $(".headRow").show();
    
}



function fetchBandInformation(event){

    const bitURL = "https://rest.bandsintown.com/artists";
    const bitAPI = "39605faedc3f5b56c8bd18919d8a9c2a";
    let artists = $("#artists").val();

    $(".headRow").hide();

    $.when(
        $.getJSON(`${bitURL}/${artists}?app_id=${bitAPI}`),
        $.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`)
    ).then(
        function (artResp, eventResp) {

            var artists = artResp[0];
            var events = eventResp[0];
            
            console.dir(artists);
            console.dir(events);
            
            $("#artist-info").html(artistInfo(artists));
            //$("#eventRepo").html(eventInfo(events));


        },
        function error(errorResponse) {
            if (errorResponse.status === 404) {
                $("#name").html("");
                $("#name").html("Artists not found");
                $("#artistsAlbum").arrt("src", "")
                
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



$(document).ready(fetchBandInformation);