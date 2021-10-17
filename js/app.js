const tableHeader = document.getElementById("tableHeader");
const bandVenueList = document.getElementById("bandVenueList");
let artistsContent = document.getElementById("artistsContent");
let artistCard = "";

const API_ENDPNT = 'https://api.songkick.com/api/3.0';
const APIKEY = 'dogx6hGvck79iv5H';
const skartist = "";


function fetchBandInformation ( artist ) {
    $.when(
        $.getJSON(`${API_ENDPNT}/search/artists.json?apikey=${APIKEY}&query=${artist}`
    ).then( ( data ) => {
        
            results = data.resultsPage;
            
            const resArtist = results.results.artist[0];
            const { id, displayName, uri, identifier, onTourUntil } = resArtist;

            console.log(id, displayName, uri, identifier, onTourUntil);
            
            const eventsLinks = identifier[0].eventsHref;
            //console.log("eventsLinks: " + eventsLinks + " " + identifier[0].eventsHref);
            
            artistCard = `
                <div class="card" style="width: 250px;">
                    <a href="${uri}" target="_blank">
                        <img id="artistsAlbum" class="card-img-top" 
                            src="//images.sk-static.com/images/media/profile_images/artists/${id}/huge_avatar" 
                        alt="" width="250px">
                        <div class="card-body">
                            <h2 id="name" class="name">
                                ${displayName}
                            </h2>
                        </div>
                    </a>
                </div>
                `;

            
            artistsContent.innerHTML = artistCard;

            $.getJSON( `${API_ENDPNT}/artists/${id}/calendar.json?apikey=${APIKEY}`,
                ( data ) => {
                    //console.log( data );
                    resultsEvents = data.resultsPage.results.event;
                    console.log(resultsEvents.length)
                // console.log("RESULTS: " + resultsEvents );
                
                

                let rowEvent = '';

                resultsEvents.forEach( (events, index) => {
                    const { id, type, uri, location, performance, venue, start  } = events;
                    //console.log(events);

                    rowEvent += `
                        <tr id="bandInfoRow" class="source">
                            <td class="tNumber">${index + 1}</td>
                            <td class="tLocation">${location.city}</td>
                            <td class="tVenue">${venue.displayName}</td>
                            <td class="tDateTime">${start.date}</td>
                            <td class="contentimg tTicket">
                                <a href="${uri}" target="_blank">
                                    <img src="https://img.icons8.com/wired/64/000000/starred-ticket.png" width="32px">
                                </a>
                            </td>
                        </tr>
                    `;
                });

               let tableHead = "";
               console.log(tableHead)
                if ( resultsEvents.length != 0 ){
                    /*tableHeader.classList.add("show");*/
                    tableHeader.classList.remove("hide")
                    
                    tableHead = `
                        
                        <tr id="headerRow" class="pacifico">
                            <th class="tableHeaders tNumber ">#</th>
                            <th class="tableHeaders tCity">City - Country</th>
                            <th class="tableHeaders tVenue">Venue</th>
                            <th class="tableHeaders tDateTime">Date & Time</th>
                            <th class="tableHeaders tTicket">Tickets</th>
                        </tr>
                    `;

                } else {
                    tableHeader.classList.add("hide");
                    tableHeader.classList.remove("show")
                }
                console.log(tableHead);
                tableHeader.innerHTML = tableHead;
                /*console.log(tableHeader)*/
                bandVenueList.innerHTML = rowEvent;
            });
                
        }
    ));
}

function fetchBandInformationOnKeyUp(event) {
    //console.log(event)
    artist = event.target.value;
    fetchBandInformation(artist);
};

function init () {
    $('#artists').on('keyup', _.debounce(fetchBandInformationOnKeyUp, 150));
};

$(document).ready(init, function () { });