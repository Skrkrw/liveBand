
    
function fetchBandInTownInformation(event){
    $("#band").html("");
    $("#location").html("");

   $.getJSON(`https://rest.bandsintown.com/artists/${artist}?app_id=39605faedc3f5b56c8bd18919d8a9c2a`)



} 