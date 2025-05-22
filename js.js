import { services } from "./services.js";

document.addEventListener('DOMContentLoaded', function () {
    

    // get prayer time
    const prayerTable = document.getElementById('prayer-table-container')
    let iqamahtime = {};


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

                    prayerTableContent +=`<tr><td class='left'>${key}</td><td class='right'>${iqamahtime[key]}</td></tr>`;
                });
                prayerTableContent += '</tbody></table>';

                prayerTable.innerHTML = prayerTableContent;
              
        });
    }; 
    
    getiqamahtime();



    // getservices
    const servicesDiv = document.getElementById('services-container');
    let servicesDivContent = '<div id="service-list">';

    services.forEach(object => {
        servicesDivContent += '<div class="service-card">';
        servicesDivContent += `<img src="${object['icon']}" alt="${object['title']} icon">`;
        servicesDivContent += `<h3>${object['title']}</h3>`;
        servicesDivContent += `<p>${object['description']}</p>`;
        servicesDivContent += '</div>';
    });
    servicesDivContent += '</div>';
    servicesDiv.innerHTML = servicesDivContent;

    

    //Mobile menu

    const menuDiv = document.getElementsByClassName('nav-links');
    const menuBtn = document.getElementById('mobile-menu-icon');
    const closeMenuBtn = document.getElementById('close-menu-icon');
    menuBtn.addEventListener('click', (e)=>{
        if(e.target.textContent == '\u2630'){
            menuDiv[0].style.display = 'flex';
            e.target.textContent = '\u00D7';
        }else{
            menuDiv[0].style.display = 'none';
            e.target.textContent = '\u2630';
        }
    });

});