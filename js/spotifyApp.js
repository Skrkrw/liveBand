 //Client Secret: 761153c311694f92aca526a239dfece5;
/*const spotifyAPI = "https://api.spotify.com/v1/";
const spotifyID = "6a3c296f20584ac6a930f655fd01ce76";//"43ZHCT0cAZBISjO8DG9PnE";//0TnOYISbd1XYRBk9myaseg
const spotifyOAT = "BQDH76hRalNAvKGTbOF_wl4YVR5xmP0xQVomNMmaZgsJiy_LQadVol5Mb4iBwtdRr_KAnJ1SIKwiwFkQ5";
*/

/*
<script src="https://sdk.scdn.co/spotify-player.js"></script>
<script>
window.onSpotifyWebPlaybackSDKReady = () => {
  const userAccessToken = "[access token]";
  const webPlayback = new Spotify.Player({
    name: "Spotify Web Playback SDK",
    getOAuthToken: callback => { callback(token)}
  });
  webPlayback.connect();
};
</script>
*/
/*
$.getJSON(`https://accounts.spotify.com/authorize?client_id=6a3c296f20584ac6a930f655fd01ce76`),
    console.log($.getJSON(`${spotifyAPI}/${artists}/${spotifyID}`)),
    console.log($.getJSON(`https://accounts.spotify.com/authorize?client_id=${sporifyID}&response_type=code&redirect_url`));

fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${userAccessToken}`
    }
})
    .then(response => response.json())
    .then(({ beats })) => {
    beats.forEach((beat, index) => {
        console.log(`Beat ${index} starts at ${beat.start}`);
    })
}*/

function fetchArtistsName(){
    var artists = $("#name").val();
    console.log(artists);
}

fetchArtistsName();