let bandVenueList;
let errorMessageContainer;
let bandVenueListContainer;
let artistsContent;
let tableHead;
const API_ENDPOINT = 'https://rest.bandsintown.com/artists';
const API_KEY = '39605faedc3f5b56c8bd18919d8a9c2a';
// Creates your own Google Maps Plataform API Key and replace this one.
const GMP_API_KEY = 'AIzaSyD50Cf8z1w1f_pxvRR1vr-_EPc3yP0Qpnc';

const artistInfoTpl = Handlebars.compile(
    `
    <div class="card" style="width: 250px;">
        <img id="artistsAlbum" class="card-img-top" src="{{artist.thumb_url}}" alt="" width="250px">
        <div class="card-body">
            <h2 id="name" class="name">{{artist.name}}</h2>
        </div>
    </div>
    `);

/*** @param {DOM} event ***/
function fetchBandInformation(event) {
    console.log(event);
    // Reset errors or info messages
    errorMessageContainer.innerHTML = '';

    // Check if the event is null or if the target value is empty
    if (!event || event.target.value === '') {
        artistsContent.innerHTML = '';
        tableHead.hide()
        bandVenueListContainer.hide();
        return;
    }

    // If the target value is not empty then we get the value for target in this
    // case the input element.
    let artists = event.target.value;

    $.when(
        // $.getJSON(`${bitURL}/${artists}?app_id=${bitAPI}`),
        $.getJSON(`${API_ENDPOINT}/${artists}/events?app_id=${API_KEY}`)
    ).then((/*artResp,*/ eventsResponse) => {
        console.log(eventsResponse);

        if (!eventsResponse.length) {
            artistsContent.innerHTML = '';
            bandVenueListContainer.hide();
            errorMessageContainer.innerHTML = renderError('No artist found with that name');
            return;
        }

        // Retrieve the artist value from the first item in the list of venues
        var artists = eventsResponse[0].artist;
        //tableHead.show();
        bandVenueListContainer.show();
        artistsContent.innerHTML = renderArtistInfo(artists);
        bandVenueList.innerHTML = renderBandEvents(eventsResponse);
    },
        (errorResponse) => {
            bandVenueListContainer.hide();
            if (errorResponse.status === 404) {
                //tableHead.hide();
                errorMessageContainer.innerHTML = renderError('No artist found with that name');
            } else if (errorResponse.status === 403) {
                errorMessageContainer.innerHTML = renderError('No authentication has been provided by the application');
            } else {
                errorMessageContainer.innerHTML = renderError(errorResponse.responseJSON.message);
            }
        });
};


/*****
 * 
 *****/
function init() {
    // Retrieve the table body element in order to speed up the information
    // rendering process within the fetchBandInformation function.
    bandVenueList = document.getElementById('bandVenueList');
    artistsContent = document.getElementById('artistsContent');

    errorMessageContainer = document.getElementById('errorMsg');
    bandVenueListContainer = $('#bandVenueListContainer');

    // Add an event to the input#artists in order to handle entered values in the
    // input element. The handler uses a debounce funcition with a delay of 150ms
    // in order to avoid repeadly execution of the handler.
     $('#artists').on('keyup', _.debounce(fetchBandInformation, 150)); //<-- only 
}


/**
 * Returns the string representation of the HTML markup related to the band
 * venue information.
 * @param {Array} bandEvents 
 */
function renderBandEvents(bandEvents) {
    tableHead = `
        <thead id="tableHeader"" class="tableHeader" textCenter ">
            <tr class="pacifico">
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

    let rows = '';
    bandEvents.forEach((bandEvent, index) => {
        const venue = bandEvent.venue;
        const eventDate = bandEvent.datetime;
        const eventUrl = bandEvent.url;
        rows += `
            <tr id="bandInfoRow" class="source">
                <td class="tNumber">${index + 1}</td>
                <td class="tVenue">${venue.name}</td>
                <td class="tCity">${venue.city}</td>
                <td class="tCountry">${venue.country}</td>
                <td class="tLocation">${renderGoogleMapLink(venue)}</td>
                <td class="tDateTime">${eventDate}</td>
                <td class="contentimg tTicket">
                    <a href="${eventUrl}">
                        <img src="https://img.icons8.com/wired/64/000000/starred-ticket.png" width="32px">
                    </a>
                </td>
            </tr>
        `;
    });
    return tableHead + rows;
}

/**
 * Renders the artist information.
 * @param {Object} artist 
 */
function renderArtistInfo(artist) {
    return artistInfoTpl({artist});
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

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.collapsible');
   // var instances = M.Collapsible.init(elems, options);
});

$(document).ready(init, function(){
    $('.collapsible').collapsible()
    //M.updateTextFields();
});
