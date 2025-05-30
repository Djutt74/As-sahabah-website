import { services } from "./services.js";
import { news_and_events } from "./news_and_events.js";


document.addEventListener('DOMContentLoaded', function () {
    

    // get prayer time
    const prayerTable = document.getElementById('prayer-table-container')
    let iqamahtime = {};
    let formattedSunset;


    function getiqamahtime(){
        const apiKey = 'AIzaSyDEKhf2Wc0yiSplG-XufkfWmj2DLmqXAok';
        const spreadsheetId = '1fJaP5X9EnZKp0-8FDUl2UcGhLlYbeVyGwpUMry6xMC8';
        const sheetName = 'prayerTime';
        const url = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetId + "/values/" + sheetName + "?key=" + apiKey;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                iqamahtime = {};
                
                for (let i = 0; i < data.values[0].length-1; i++) {
                    iqamahtime[data.values[0][i]] = data.values[1][i];
                }
                const hijridateadjust = data.values[1][data.values[1].length-1];

                let prayerTableContent;
                prayerTableContent = '<table><tbody>';

                Object.keys(iqamahtime).forEach(function(key){
                    if(key == 'Maghrib'){
                        prayerTableContent +=`<tr><td class='left'>${key}</td><td class='right'>${formattedSunset}</td></tr>`;
                    }else{
                        prayerTableContent +=`<tr><td class='left'>${key}</td><td class='right'>${iqamahtime[key]}</td></tr>`;
                    }
                });
                prayerTableContent += '</tbody></table>';

                prayerTable.innerHTML = prayerTableContent;
              
        });
    }; 


    function maghribTime(){
        const url = `https://api.sunrise-sunset.org/json?lat=35.9&lng=-79.9&formatted=0`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
        const sunsetTime = data.results.sunset;
        formattedSunset = new Date(sunsetTime).toLocaleTimeString();
        formattedSunset = formattedSunset.slice(0,4) + formattedSunset.slice(-3);
        iqamahtime.Maghrib = formattedSunset
        
        })
        .catch(error => console.log('Error fetching data:', error));
    }

    maghribTime();
    setTimeout(getiqamahtime,500)



    // getservices
    const servicesDiv = document.getElementById('services-container');
    let servicesDivContent = '<h1 class="container-headings">Services</h1><div id="service-list">';

    services.forEach(object => {
        servicesDivContent += '<div class="service-card">';
        servicesDivContent += `<img src="${object['icon']}" alt="${object['title']} icon">`;
        servicesDivContent += `<h3>${object['title']}</h3>`;
        servicesDivContent += `<p>${object['description']}</p>`;
        servicesDivContent += '</div>';
    });
    servicesDivContent += '</div>';
    servicesDiv.innerHTML = servicesDivContent;


    // getevents_and_news
    const eventListDiv = document.getElementById('event-container');
    let eventListDivContent = '<h2 class="container-headings">News and Upcoming Events</h2><div id="event-list">';

    news_and_events.forEach(object => {
        
        if(object['type']== 'news'){
            eventListDivContent += '<div class="news-card">';
            eventListDivContent += `<img src="${object['image']}" alt="${object['title']} icon"><h3>${object['title']}</h3>`;
        }
        if(object['type']== 'event'){
            eventListDivContent += '<div class="event-card">';
            eventListDivContent += `<div class="card_heading_and_img"><h1 style="display:inline-block">${object['date']}</h1><h2 style="display:inline-block">${object['title']}</h2></div>`;
        }

        eventListDivContent += `<p>${object['description']}</p>`;
        eventListDivContent += '</div>';
    });
    eventListDivContent += '</div>';
    eventListDiv.innerHTML = eventListDivContent;

    

    //Mobile menu

    const menuDiv = document.getElementsByClassName('nav-links');
    const menuBtn = document.getElementById('mobile-menu-icon');

    menuBtn.addEventListener('click', (e)=>{
        if(e.target.textContent == '\u2630'){
            menuDiv[0].style.display = 'flex';
            e.target.textContent = '\u00D7';
        }else{
            menuDiv[0].style.display = 'none';
            e.target.textContent = '\u2630';
        }
    });

    function updateBoxStyle() {
        const width = window.innerWidth;

        if (width > 768 && menuDiv[0].style.display == 'none') {
            menuDiv[0].style.display = 'flex';
        }
        if (width < 768 && menuDiv[0].style.display == 'flex') {
            menuDiv[0].style.display = 'none';
            if(menuBtn.textContent == '\u00D7'){
                menuBtn.textContent = '\u2630'
            }
        }
    }

    window.addEventListener("load", updateBoxStyle);

    window.addEventListener("resize", updateBoxStyle);


    //PopUp
    const popUpBtn = document.getElementById('learn-more-btn');
    const popUpDiv = document.getElementById('popUp');
    const popUpCloseBtn =  document.getElementById('popup-close-btn');
    popUpBtn.addEventListener('click', ()=>{
        popUpDiv.style.display = 'block';
        document.body.style.overflow = 'hidden';
    })
    popUpCloseBtn.addEventListener('click', ()=>{
        popUpDiv.style.display = 'none';
        document.body.style.overflow = '';
    })


    
});