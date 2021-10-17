let bandVenueList;
let errorMessageContainer;
let bandVenueListContainer;
let artistsContent;
let selectedOption = "upcoming";
let artist = "";

//Bandsintown API endpoint
const API_ENDPOINT = 'https://api.songkick.com/api/3.0';

//Bandsintown API key
const API_KEY = 'dogx6hGvck79iv5H';

// Creates your own Google Maps Plataform API Key and replace this one.
const GMP_API_KEY = 'AIzaSyD50Cf8z1w1f_pxvRR1vr-_EPc3yP0Qpnc';

const artistInfoTpl = Handlebars.compile(
    `
    <div class="card" style="width: 250px;">
        <img id="artistsAlbum" class="card-img-top" src="{{artistsInfo.thumb_url}}" alt="" width="250px">
        <div class="card-body">
            <h2 id="name" class="name">{{artistsInfo.name}}</h2>
        </div>
    </div>
    `);

/**
 * Event handler to manipulate on KeyUp event
 * @param {jQuery.event} event 
 */
function fetchBandInformationOnKeyUp(event) {
    artist = event.target.value;
    fetchBandInformation(artist, selectedOption);
}

/**
 * Event handler to manipulate Select on Change event
 * @param {jQuery.event} event
 */
function fetchBandInformationOnChange(event) {
    selectedOption = event.target.value;
    fetchBandInformation(artist, selectedOption);
}

/**
 * @param {String} artist the name of the artist to be search
 * @param {String} filter the data range set used to filter the result
 */
function fetchBandInformation(artist, filter) {
    // Reset errors or info messages
    errorMessageContainer.innerHTML = '';
    $.when(
        $.getJSON(`${API_ENDPOINT}/search/artists.json?apikey=${API_KEY}&query=${artist}`),
        $.getJSON(`${API_ENDPOINT}/${artist}/events?app_id=${API_KEY}&date=${filter}`)
    ).then((artistsResponse, eventsResponse) => {
        // Retrieve the artist value from the first item in the list of venues
        var artistsInfo = artistsResponse[0];
        console.log("AI: " + artistsResponse[0] )
        var artistsEvents = eventsResponse[0];

        artistsContent.innerHTML = renderArtistInfo(artistsInfo);
        bandVenueList.innerHTML = renderBandEvents(artistsEvents);
        $(artistsContent).show();

        if (!eventsResponse[0].length) {
            bandVenueListContainer.hide();
            $("#errorMsg").show();
            errorMessageContainer.innerHTML = renderError(`There's no upcoming shows`);
            return;
        } else {
            bandVenueListContainer.show();      
        }
    },
        (errorResponse) => {
            bandVenueListContainer.hide();
            if (errorResponse.status === 404) {
                $("#artistsContent").hide();
                errorMessageContainer.innerHTML = renderError('No artist found with that name');
                $("#errorMsg").show();
            } else if (errorResponse.status === 403) {
                errorMessageContainer.innerHTML = renderError('No authentication has been provided by the application');
                $("#errorMsg").show();
            } else {
                errorMessageContainer.innerHTML = renderError(errorResponse.responseJSON.message);
                $("#errorMsg").show();
            }
        });
};

/***********************************************************/
function init() {
    // Retrieve the table body element in order to speed up the information
    // rendering process within the fetchBandInformation function.
    bandVenueList = document.getElementById('bandVenueList');
    artistsContent = document.getElementById('artistsContent');
    errorMessageContainer = document.getElementById('errorMsg');
    bandVenueListContainer = $('#bandVenueList');

    // Add an event to the input#artists in order to handle entered values in the
    // input element. The handler uses a debounce funcition with a delay of 150ms
    // in order to avoid repeadly execution of the handler.
    $('#artists').on('keyup', _.debounce(fetchBandInformationOnKeyUp, 150));
    
    //Add and event to the select#filterBand to handle the changes form the set range of values
    //All, upcming or past
    $('#filterBand').change(fetchBandInformationOnChange);
}

/**
 * Returns the string representation of the HTML markup related to the band
 * venue information.
 * @param {Array} bandEvents 
 */
function renderBandEvents(bandEvents) {
    let rows = '';
    let tableHead = `
        <thead id="tableHeader" class="tableHeader" textCenter " >
            <tr id="headerRow" class="pacifico">
                <th class="tableHeaders tNumber">#</th>
                <th class="tableHeaders tVenue">Venue</th>
                <th class="tableHeaders tCity">City</th>
                <th class="tableHeaders tCountry">Country</th>
                <th class="tableHeaders tLocation">Location</th>
                <th class="tableHeaders tDateTime">Date & Time</th>
                <th class="tableHeaders tTicket">Tickets</th>
            </tr>        
        </thead>
        `;

    bandEvents.forEach((bandEvent, index) => {
        const venue = bandEvent.venue;
        const eventDate = bandEvent.datetime;
        const eventUrl = bandEvent.url;

        rows += `
            <tr id="bandInfoRow" class="source"     >
                <td class="tNumber">${index + 1}</td>
                <td class="tVenue">${venue.name}</td>
                <td class="tCity">${venue.city}</td>
                <td class="tCountry">${venue.country}</td>
                <td class="tLocation">${renderGoogleMapLink(venue)}</td>
                <td class="tDateTime">${eventDate}</td>
                <td class="contentimg tTicket">
                    <a href="${eventUrl}" target="_blank">
                        <img src="https://img.icons8.com/wired/64/000000/starred-ticket.png" width="32px">
                    </a>
                </td>
            </tr>
        `;
    });
    
    $("#errorMsg").hide();
    return tableHead + rows;
}

/**
 * Renders the artist information.
 * @param {Object} artist 
 */
function renderArtistInfo(artistsInfo) {
    return artistInfoTpl({ artistsInfo });
}

/**
 * Handler used on the onclick event for A element used in the location of the
 * venue.
 * @param {DOMElement} element 
 */
function showMapPopUp(element) {
    const thisPopup = $(element);
    thisPopup.colorbox({
        opacity: 0.7,
        html: `
      <iframe width="600" height="550" frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?key=${GMP_API_KEY}&q=${thisPopup.data('venueLatitude')},${thisPopup.data('venueLongitude')}&zoom=12"
          allowfullscreen>
      </iframe>`
    });

    // Returning "false" is important as stop propagation and prevent defaults for
    // the event.
    return false;
}

/**
 * Return the HTML representation of the link used to render the venue location.
 * @param {Object} venue 
 */
function renderGoogleMapLink(venue) {
    return `<a onclick="showMapPopUp(this)" data-venue-latitude="${venue.latitude}" data-venue-longitude="${venue.longitude}" class="googleMapPopUp" rel="nofollow" href="#">
                <img src="https://img.icons8.com/wired/64/000000/worldwide-location.png" width="32px">
            </a>`;
}

function renderError(message) {
    return `<h4>${message}</h4>`;
}

$(document).ready(init, function () { });
