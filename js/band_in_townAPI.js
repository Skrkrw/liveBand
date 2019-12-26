function fetchBandInformation(event){

    const bitURL = "https://rest.bandsintown.com/artists";
    const bitAPI = "39605faedc3f5b56c8bd18919d8a9c2a";
    let artists = $("#artists").val();
    console.log(artists);
    console.log(bitAPI);

    $.getJSON(`${bitURL}/${artists}?app_id=${bitAPI}`,
    $.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`),
    /*$.getJSON(`${bitURL}/${artists}/events?app_id=${bitAPI}`),*/
     function (artistData, artistsEvent) {

        console.log(artistData);
        console.log(artistsEvent);
        var bitArtists = artistData;
        var bitEvents = artistsEvent;
        console.log(bitArtists);
        console.log(bitEvents);
        $("#artistsAlbum").attr("src", artistData.image_url);
        $("#name").html(artistData.name);

        $("#artistsTable").html(`
            table  
            <h2>${artistData.name}</h2>
            <p>${artistsEvent.country}
        `);
        
    });

}

   


$(document).ready(fetchBandInformation);
