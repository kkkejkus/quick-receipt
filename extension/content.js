function addParagonButtons() {
    const orderContainers = document.querySelectorAll('.msts_pt.mvrt_16.mvrt_24_l.mh36_16.mh36_24_l.a883q.a19yr.mj7a_16.mj7a_0_l.mj7a_16_x.mg9e_16.mg9e_0_l');
    orderContainers.forEach(orderContainer => {
        const buttonContainer = orderContainer.querySelector('.mr3m_1.mjyo_6x.gel0f.g1wmb._e4d85_SDggL.mpof_z0_p');
        if (buttonContainer && !buttonContainer.querySelector('.paragon-button')) {
            buttonContainer.className = 'mr3m_1 mjyo_6x gel0f g1s0i mpof_5r mpof_ki_x myre_zn mzmg_f9 desktop__actions';
            buttonContainer.style.marginLeft = '25%';
            const faktura = orderContainer.querySelector('span[style*="--url: url(\'https://a.allegroimg.com/original/34c135/a60e38624df9a3da055b3c2cbcbe/action-common-invoice-vat-add-global-178703910d\');"]');
            const notpaczkomat = orderContainer.querySelector('span.mgn2_14.mp0t_0a.mqu1_21.mgmw_wo.mli8_k4.delivery-name.m3h2_8').innerText.trim();
            const button = document.createElement('button');
            button.textContent = 'Przygotuj\nParagon';
            button.className = 'paragon-button mgn2_14 mp0t_0a m9qz_yr mp7g_oh mtsp_ib mli8_k4 mp4t_0 m3h2_0 mryx_0 munh_0 m911_5r mefy_5r mnyp_5r mdwl_5r msbw_rf mldj_rf mtag_rf mm2b_rf mqvr_2 mqen_m6 meqh_en m0qj_5r msts_n7 mh36_16 mvrt_16 mg9e_8 mj7a_8 mjir_sv m2ha_2 m8qd_vz mjt1_n2 m09p_40 b1enf mgmw_u5g mrmn_qo mrhf_u8 m31c_kb m0ux_fp b10t8';
            button.style.marginLeft = '50px';
            button.style.fontWeight = 'bold';
            button.style.textAlign = 'right';
            button.style.cursor = 'pointer';
            if (faktura) {
                button.textContent = 'Przygotuj\nFakturę';
                uwaga = document.createElement('span');
                uwaga.textContent = 'UWAGA FAKTURA !!!';
                uwaga.className = 'uwaga-button mgn2_14 mp0t_0a mqu1_21 mli8_k4 buyer-label mgmw_ag';
                uwaga.style.marginTop = '-10px';
                uwaga.style.marginRight = '18px';
                uwaga.style.fontSize = '12px';
                uwaga.style.color = 'rgb(255, 75, 75)';
                uwaga.style.fontWeight = 'bold';
                uwaga.style.cursor = 'default';
            }
            const button2 = document.createElement('button');
            button2.textContent = 'Sprawdź\ndostępność';
            button2.className = 'dostepnosc-button mgn2_14 mp0t_0a m9qz_yr mp7g_oh mtsp_ib mli8_k4 mp4t_0 m3h2_0 mryx_0 munh_0 m911_5r mefy_5r mnyp_5r mdwl_5r msbw_rf mldj_rf mtag_rf mm2b_rf mqvr_2 mqen_m6 meqh_en m0qj_5r msts_n7 mh36_16 mvrt_16 mg9e_8 mj7a_8 mjir_sv m2ha_2 m8qd_vz mjt1_n2 m09p_40 b1enf mgmw_u5g mrmn_qo mrhf_u8 m31c_kb m0ux_fp b10t8';
            button2.style.width = '150px';
            button2.style.marginLeft = '37px';
            button2.style.fontWeight = 'bold';
            button2.style.textAlign = 'right';
            button2.style.cursor = 'pointer';
            const button3 = document.createElement('button');
            button3.textContent = 'Przygotuj\nBLPaczkę';
            button3.className = 'nadaj-button mgn2_14 mp0t_0a m9qz_yr mp7g_oh mtsp_ib mli8_k4 mp4t_0 m3h2_0 mryx_0 munh_0 m911_5r mefy_5r mnyp_5r mdwl_5r msbw_rf mldj_rf mtag_rf mm2b_rf mqvr_2 mqen_m6 meqh_en m0qj_5r msts_n7 mh36_16 mvrt_16 mg9e_8 mj7a_8 mjir_sv m2ha_2 m8qd_vz mjt1_n2 m09p_40 b1enf mgmw_u5g mrmn_qo mrhf_u8 m31c_kb m0ux_fp b10t8';
            button3.style.marginLeft = '50px';
            button3.style.fontWeight = 'bold';
            button3.style.textAlign = 'right';
            button3.style.cursor = 'pointer';
            if (!notpaczkomat.includes("InPost")) {
                uwaga2 = document.createElement('span');
                uwaga2.textContent = 'TO NIE INPOST !!!';
                uwaga2.className = 'uwaga-button mgn2_14 mp0t_0a mqu1_21 mli8_k4 buyer-label mgmw_ag';
                uwaga2.style.marginTop = '-10px';
                uwaga2.style.marginLeft = '-31px';
                uwaga2.style.fontSize = '12px';
                uwaga2.style.width = '200px';
                uwaga2.style.color = 'orange';
                uwaga2.style.fontWeight = 'bold';
                uwaga2.style.cursor = 'default';
            }
            button.addEventListener('click', () => {
                if (faktura) {
                    const fakturaLink = orderContainer.querySelector('a[aria-label="Szczegóły zamówienia"]');
                    if (fakturaLink) {
                        const newTab = window.open(fakturaLink.href, '_blank');
                        if (newTab) {
                            const checkPageAndElement = () => {
                                const fakturaElement = newTab.document.querySelector('.mgn2_14.mp0t_0a.mqu1_21.mli8_k4.mp4t_0.m3h2_0.mryx_0.munh_0.mgmw_wo.invoice-content');
                                if (newTab.document.readyState === 'complete') {
                                    if (fakturaElement) {
                                        let fakturaData = fakturaElement?.innerHTML || '';
                                        fakturaData = fakturaData.replace(/<br\s*\/?>/gi, '\n').trim();   
                                        console.log('Pobrane dane faktury:\n', fakturaData);
                                        let lines = fakturaData.split('\n');
                                        // Przetwarzanie danych
                                        if (lines[0]) {
                                            // 1. Linia - każdy wyraz zaczyna się dużą literą, a litery po znakach interpunkcyjnych również
                                            lines[0] = (lines[0]).replace(/\s+/g, ' ').trim(); // Usuwamy nadmiarowe spacje
                                            lines[0] = lines[0]
                                                .split('')
                                                .map((char, index, array) => {
                                                    // Jeśli to pierwszy znak wyrazu (lub pierwszy w linii), duża litera
                                                    if (index === 0 || array[index - 1] === ' ') {
                                                        return char.toUpperCase();
                                                    }
                                                    // W przeciwnym razie zamieniamy na małą literę
                                                    return char.toLowerCase();
                                                })
                                                .join('');
                                                lines[0] = lines[0].replace(/(?:^|[ ,."'!?-])([a-z])/g, (match, letter) => {
                                                    // Jeśli litera występuje po znaku interpunkcyjnym, zamień na dużą
                                                    return match[0] + letter.toUpperCase();
                                                });
                                        }                                                
                                        if (lines[1]) {
                                            // 2. Linia - usuwamy 'ul', przecinki i rozdzielamy numer adresu na osobne linie
                                            lines[1] = (lines[1]).replace(/\s+/g, ' ').trim(); // Usuwamy nadmiarowe spacje
                                            lines[1] = (lines[1]).replace(/^(ul\.?|UL\.?|Ul\.?|uL\.?)\s*/, ''); // Usuwamy 'ul' na początku
                                            let words = lines[1].replace(/,/g, '').split(' '); // Usuwamy przecinki i rozdzielamy na wyrazy
                                            let addressPart = [];
                                            let numberPart = [];
                                            
                                            words.forEach(word => {
                                                if (/\d/.test(word)) {
                                                    // Jeżeli zawiera liczby, rozdzielamy adresy typu 25/12
                                                    const splitNumbers = word.split('/');
                                                    numberPart.push(...splitNumbers);
                                                } else {
                                                    // Inne słowa zostają w adresie
                                                    addressPart.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
                                                }
                                            });
                                        
                                            // Składamy całość: wyrazy w jednej linii, numery w osobnych liniach, dodajemy pustą linię, jeśli potrzeba
                                            lines[1] = addressPart.join(' ') + '\n' + numberPart.join('\n') + (numberPart.length === 1 ? '\n' : '');
                                        }
                                        if (lines[2]) {
                                            // 3. Linia - kod pocztowy pozostaje, reszta tekstu idzie do nowej linii, zaczynając się wielką literą
                                            const zipCode = lines[2].match(/\d{2}-\d{3}/); // Szuka kodu pocztowego w formacie XX-XXX
                                            if (zipCode) {
                                                lines[2] = zipCode[0] + '\n' + (lines[2].replace(zipCode[0], '').replace('PL', '').trim()).replace(/\s+/g, ' ').trim()
                                                    .split(' ')
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Wyrazy zaczynają się wielką literą
                                                    .join(' ');
                                            } else {
                                                lines[2] = (lines[2]).replace(/\s+/g, ' ').trim()
                                                    .split(' ')
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                    .join(' '); // Jeżeli nie ma kodu pocztowego, oczyszczamy tekst i formatujemy
                                            }
                                            lines[2] = lines[2].replace(/(?:^|[ ,."'!?-])([a-z])/g, (match, letter) => {
                                                // Jeśli litera występuje po znaku interpunkcyjnym, zamień na dużą
                                                return match[0] + letter.toUpperCase();
                                            });
                                        }
                                        if (lines[3]) {
                                            // 4. Linia - usuń pierwsze 5 znaków
                                            lines[3] = lines[3].slice(5);
                                        }
                                        const buyerDetails = newTab.document.querySelector('.buyer-details');
                                        if (buyerDetails) {
                                            const buyerDetailsText = buyerDetails.innerHTML.replace(/<br\s*\/?>/gi, '\n').trim();
                                            const phoneNumber = buyerDetailsText.split('\n').pop().trim(); // Ostatnia linia z numerem telefonu
                                            if (phoneNumber) {
                                                if (lines[3]) {
                                                    // Przenosimy 7. linię do nowej 8., jeśli istnieje
                                                    lines.splice(4, 0, lines[3]);
                                                }
                                                lines[3] = phoneNumber; // Zastępujemy 7. linię numerem telefonu
                                            }
                                        }
                                        let updatedFakturaData = lines.join('\n');
                                        console.log(updatedFakturaData);
                                        const blob2 = new Blob([updatedFakturaData], { type: 'text/plain' });
                                        const url2 = URL.createObjectURL(blob2);
                                        const downloadLink2 = document.createElement('a');
                                        downloadLink2.href = url2;
                                        downloadLink2.download = 'faktura.txt';
                                        downloadLink2.style.display = 'none';
                                        document.body.appendChild(downloadLink2);
                                        downloadLink2.click();
                                        document.body.removeChild(downloadLink2);
                                        URL.revokeObjectURL(url2);
                                        newTab.close();
                                        console.log('Karta została zamknięta.');
                                    } else {
                                        setTimeout(checkPageAndElement, 50); // Czekaj 0.05 sekundy i sprawdzaj ponownie
                                    }
                                } else {
                                    setTimeout(checkPageAndElement, 50); // Czekaj 0.05 sekundy i sprawdzaj ponownie
                                }
                            };
                            checkPageAndElement();
                        }
                    }
                }
                // Znajdujemy wszystkie przedmioty w zamówieniu
                const titleLinks = orderContainer.querySelectorAll('a.mgn2_14.mp0t_0a.mgmw_wo.mqu1_21.mli8_k4.mqen_m6.l1o8h.mj9z_5r.l5s4b');
                const prices = orderContainer.querySelectorAll('span.mli8_k4.msa3_z4.mqu1_1.mp0t_0a.mgmw_qw.mgn2_14');
                const quantities = orderContainer.querySelectorAll('span.mgn2_14.mp0t_0a.mqu1_21.mgmw_wo.mli8_k4.mzmg_f9.munh_8');
                // Pobranie kosztu wysyłki
                const shippingCostSpan = orderContainer.querySelector('p.mgn2_14.mp0t_0a.mqu1_21.mli8_k4.mp4t_0.m3h2_0.mryx_0.munh_0.mgmw_wo span.mli8_k4.msa3_z4.mqu1_1.mp0t_0a.mgmw_qw.mgn2_14');
                const shippingCost = shippingCostSpan?.textContent.trim().replace(/\s*zł$/, '') || 'Brak kosztu wysyłki';
                // Tworzymy listę przedmiotów z tytułem, ceną i ilością
                const items = Array.from(titleLinks).map((link, index) => {
                    const title = link.textContent.trim();
                    const price = prices[index]?.textContent.trim().replace(/\s*zł$/, '') || 'Brak ceny';
                    let quantity = quantities[index]?.textContent.trim() || 'Brak ilości';
                    quantity = quantity.split(' ')[0]; // Pobierz tylko pierwszą wartość ilości
                    quantity = quantity.substring(0, quantity.length - 1); // Usuwa 'x' na końcu
                    return `\n\t${index+1}. ${title}\n\t\tIlość: ${quantity}\n\t\tCena: ${price}`;
                });
                // Tworzymy dane do zapisania
                const data = items.length > 0 
                    ? `Zebrane dane z zamówienia: (Allegro)${items.join('')}\n\tKoszt wysyłki: ${shippingCost}\n`
                    : 'Brak sprzedanych przedmiotów w zamówieniu.\n\n';
                console.log(`${data}\n`);
                const blob1 = new Blob([data], { type: 'text/plain' });
                const url1 = URL.createObjectURL(blob1);
                const downloadLink1 = document.createElement('a');
                downloadLink1.href = url1;
                downloadLink1.download = 'paragon.txt';
                downloadLink1.style.display = 'none';
                document.body.appendChild(downloadLink1);
                downloadLink1.click();
                document.body.removeChild(downloadLink1);
                URL.revokeObjectURL(url1);
            });
            button2.addEventListener('click', () => {
                const itemTitles = [...orderContainer.querySelectorAll('a.mgn2_14.mp0t_0a.mgmw_wo.mqu1_21.mli8_k4.mqen_m6.l1o8h.mj9z_5r.l5s4b')]
                .map(item => item.innerText.trim());
                // Otwieranie nowej karty dla każdego tytułu
                itemTitles.forEach(title => {
                    const newTab2 = window.open('https://salescenter.allegro.com/my-assortment', '_blank');
                    if (newTab2) {
                        // Czekanie aż nowa karta się załaduje
                        const checkPageAndElement2 = () => {
                            if (newTab2.document.readyState === 'complete') {
                                const searchInput = newTab2.document.querySelector('input[placeholder="szukaj ofert"]');
                                if (searchInput) {
                                    searchInput.value = title; // Wpisanie tytułu do inputa
                                    searchInput.dispatchEvent(new Event('input', { bubbles: true })); // Symulacja wpisywania
                                    // Znajdowanie inputa z klasami i etykietą "zakończona"
                                    // Znajdowanie inputa z odpowiednim label
                                    const inputs = newTab2.document.querySelectorAll('input[type="checkbox"]');
                                    inputs.forEach(input => {
                                        const inputId = input.id;
                                        const label = newTab2.document.querySelector(`label[for="${inputId}"]`);
                                        if (label && label.textContent.trim().toLowerCase() === 'zakończona') {
                                            input.click(); // Kliknij checkbox
                                        }
                                    });
                                    // Znajdowanie i zmiana koloru spanów
                                    const spanInterval = setInterval(() => {
                                        const spans = newTab2.document.querySelectorAll('span.mgn2_14.mp0t_0a.mqu1_21.mgmw_wo.mli8_k4');
                                        spans.forEach(span => {
                                            const text = span.innerText.trim();
                                            if (text === "aktywna") {
                                                span.style.color = "green";
                                                span.style.fontWeight = "bold";
                                            } else if (text === "zakończona") {
                                                span.style.color = "red";
                                                span.style.textDecoration = "line-through";
                                            }
                                        });
                                        const rows = newTab2.document.querySelectorAll('tr');
                                        rows.forEach(row => {
                                            const spans = row.querySelectorAll('span');
                                            spans.forEach(span => {
                                                if (span.textContent.trim() === title) {
                                                    const tds = row.querySelectorAll('td');
                                                    tds.forEach(td => {
                                                        td.style.cssText += 'background-color: rgb(220, 255, 255) !important;';
                                                    });
                                                }
                                            });
                                        });
                                    }, 500); // Sprawdzanie co 0.5 sekundy
                                } else {
                                    setTimeout(checkPageAndElement2, 200); // Czekaj 0.2 sekundy i sprawdzaj ponownie
                                }
                            } else {
                                setTimeout(checkPageAndElement2, 200); // Czekaj 0.2 sekundy i sprawdzaj ponownie
                            }
                        };
                        checkPageAndElement2();
                    }
                });
            });
            button3.addEventListener('click', () => {
                if (confirm("Pobrano dane do wysyłki!\nChcesz otworzyć nową karte blpaczka.com ?")) window.open('https://blpaczka.com/panel', '_blank');
                const daneDoWysylkiElement = orderContainer.querySelector("p.mgn2_14.mp0t_0a.mqu1_21.mli8_k4.mp4t_0.m3h2_0.mryx_0.munh_0.mgmw_wo.delivery-address");
                let daneDoWysylki = daneDoWysylkiElement?.innerHTML || '';
                daneDoWysylki = daneDoWysylki.replace(/<br\s*\/?>/gi, '\n').trim();
                // Rozdzielenie danych na linie
                const linie = daneDoWysylki.split("\n").map(linia => linia.trim());
                // Sprawdzenie liczby linii
                let name = "";
                let company = "";
                let street = "";
                let street1 = "";
                let street2 = "";
                let postal = "";
                let city = "";
                let phone = "";
                let email = "";
                let paczkomat = "";
                const notpaczkomat = orderContainer.querySelector('span.mgn2_14.mp0t_0a.mqu1_21.mgmw_wo.mli8_k4.delivery-name.m3h2_8').innerText.trim();
                if (notpaczkomat.includes("InPost")) paczkomat = notpaczkomat.slice(-7, -1);
                // 1. Linia - każdy wyraz zaczyna się dużą literą, a litery po znakach interpunkcyjnych również
                linie[0] = (linie[0]).replace(/\s+/g, ' ').trim(); // Usuwamy nadmiarowe spacje
                name = linie[0]
                    .split('')
                    .map((char, index, array) => {
                        // Jeśli to pierwszy znak wyrazu (lub pierwszy w linii), duża litera
                        if (index === 0 || array[index - 1] === ' ') {
                            return char.toUpperCase();
                        }
                        // W przeciwnym razie zamieniamy na małą literę
                        return char.toLowerCase();
                    })
                    .join('');
                    linie[0] = linie[0].replace(/(?:^|[ ,."'!?-])([a-z])/g, (match, letter) => {
                        // Jeśli litera występuje po znaku interpunkcyjnym, zamień na dużą
                        return match[0] + letter.toUpperCase();
                    });
                if (linie.length === 5) {
                    company = linie[1];
                    linie.splice(1, 1);
                }
                linie[1] = (linie[1]).replace(/\s+/g, ' ').trim(); // Usuwamy nadmiarowe spacje
                linie[1] = (linie[1]).replace(/^(ul\.?|UL\.?|Ul\.?|uL\.?)\s*/, ''); // Usuwamy 'ul' na początku
                let words = linie[1].replace(/,/g, '').split(' '); // Usuwamy przecinki i rozdzielamy na wyrazy
                let addressPart = [];
                let numberPart = [];
                words.forEach(word => {
                    if (/\d/.test(word)) {
                        // Jeżeli zawiera liczby, rozdzielamy adresy typu 25/12
                        const splitNumbers = word.split('/');
                        numberPart.push(...splitNumbers);
                    } else {
                        // Inne słowa zostają w adresie
                        addressPart.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
                    }
                });
                street = addressPart.join(' '); // Cała część ulicy
                street1 = numberPart[0]; // Numer ulicy
                street2 = numberPart.length > 1 ? numberPart[1] : '';
                postal = linie[2].slice(0, 6); // Szuka kodu pocztowego w formacie XX-XXX
                city = (linie[2].replace(postal, '').replace('PL', '').trim()).replace(/\s+/g, ' ').trim()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Wyrazy zaczynają się wielką literą
                    .join(' ');
                linie[2] = linie[2].replace(/(?:^|[ ,."'!?-])([a-z])/g, (match, letter) => {
                    // Jeśli litera występuje po znaku interpunkcyjnym, zamień na dużą
                    city = match[0] + letter.toUpperCase();
                });
                phone = linie[3]; // Czwarta linia - numer telefonu
                // Usuń poprzednie wartości
                chrome.storage.local.remove(['name', 'company', 'street', 'street1', 'street2', 'postal', 'city', 'phone', 'email', 'paczkomat'], () => {
                    // Zapisz nowe wartości
                    chrome.storage.local.set({ name, company, street, street1, street2, postal, city, phone, email, paczkomat }, () => {
                        console.log("Dane zostały skopiowane do pamięci podręcznej:", { name, company, street, street1, street2, postal, city, phone, email, paczkomat });
                    });
                });
            });
            buttonContainer.appendChild(button);
            if (faktura) buttonContainer.appendChild(uwaga);
            buttonContainer.appendChild(button2);
            buttonContainer.appendChild(button3);
            if ((!notpaczkomat.includes("InPost"))) buttonContainer.appendChild(uwaga2);
        }
    });
    if (window.location.href.startsWith("https://salescenter.allegro.com/ship-with-allegro/swa/create-shipment/")) {
        const targetUl = document.querySelector('ul.mpof_ki.mwdn_1.mg9e_0.mvrt_0.mj7a_0.mh36_0.mp4t_0.m3h2_0.munh_0.mryx_16._beb7b_1ywII');
        if (targetUl && !targetUl.querySelector('.wprowadz-button')) {
            const button4 = document.createElement('button');
            button4.textContent = 'Wprowadź\nwymiary';
            button4.className = 'wprowadz-button mgn2_14 mp0t_0a m9qz_yr mp7g_oh mtsp_ib mli8_k4 mp4t_0 m3h2_0 mryx_0 munh_0 m911_5r mefy_5r mnyp_5r mdwl_5r msbw_rf mldj_rf mtag_rf mm2b_rf mqvr_2 mqen_m6 meqh_en m0qj_5r msts_n7 mh36_16 mvrt_16 mg9e_8 mj7a_8 mjir_sv m2ha_2 m8qd_vz mjt1_n2 m09p_40 b1enf mgmw_u5g mrmn_qo mrhf_u8 m31c_kb m0ux_fp b10t8';
            button4.style.width = '150px';
            button4.style.fontSize = '15px';
            button4.style.fontWeight = 'bold';
            button4.style.textAlign = 'left';
            button4.style.cursor = 'pointer';
            targetUl.appendChild(button4);
            button4.addEventListener('click', () => {
                const inputs = {
                    'P0-2': '43',
                    'P0-3': '35',
                    'P0-4': '7',
                    'P0-5': '1.5'
                };
                for (const [id, value] of Object.entries(inputs)) {
                    const input = document.getElementById(id);
                    if (input) {
                        input.value = value;
    
                        // opcjonalnie: wywołanie eventu input (jeśli strona reaguje na zmianę)
                        const event = new Event('input', { bubbles: true });
                        input.dispatchEvent(event);
                    }
                }
            });
        }
    }
    if (window.location.href === 'https://blpaczka.com/panel') {
        if (!document.querySelector('button.wczytajdane-button')) {
            const button4 = document.createElement('button');
            button4.className = 'wczytajdane-button form_title';
            button4.innerText = 'WCZYTAJ DANE Z ALLEGRO/WORDPRESS';
            button4.style.cssText = `
                margin-left: 180px;
                font-weight: bold;
                text-align: center;
                font-size: 25px;
                color: #f78d14;
                cursor: pointer;
                text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.15);
            `;
            document.querySelector('.form_container .form_card#przesylka .row.row--alignStart.row--baseline').appendChild(button4);
            const clonedButton = document.querySelector('.form_container .form_card#przesylka .row.row--alignStart.row--baseline button.wczytajdane-button').cloneNode(true);
            clonedButton.style.marginRight = "600px";
            document.querySelector('div#doreczenie .row').appendChild(clonedButton);
            function addEvents(button) {
                button.addEventListener('mouseenter', () => {
                    button.style.color = '#e08012';
                });
                button.addEventListener('mouseleave', () => {
                    button.style.color = '#f78d14';
                });
                button.addEventListener('click', () => {
                    document.querySelectorAll('[class^="form_inputContainer"]').forEach(container => {
                        const label = container.querySelector('label.form_label'); // Znajdź label w kontenerze
                        const input = container.querySelector('input'); // Znajdź input w tym divie
                        if (input && label) { // Sprawdź, czy label i input istnieją
                            chrome.storage.local.get(['name', 'company', 'street', 'street1', 'street2', 'postal', 'city', 'phone', 'email', 'paczkomat'], (result) => {
                                if (label.innerText.trim().includes('Długość')) {
                                    input.value = '36';
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Szerokość')) {
                                    input.value = '36';
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Wysokość')) {
                                    input.value = '8';
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Waga')) {
                                    input.value = '1.5';
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }/*
                                if (input.id === 'package_content') {
                                    input.classList.remove('form_inputTxt--withoutUnit');
                                    const parentDiv = input.closest('div');
                                    parentDiv.classList.remove('form_inputWithUnit--wrap', 'form_inputWithUnit--error');
                                    input.value = 'odzież';
                                }
                                if (label.innerText.trim().includes('Imię i nazwisko') && label.closest('.form_card#doreczenie')) {
                                    input.value = `${result.name}`;
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Nazwa firmy') && label.closest('.form_card#doreczenie')) {
                                    input.value = `${result.company}`;
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Ulica') && label.closest('.form_card#doreczenie')) {
                                    input.value = `${result.street}`;
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Numer budynku') && label.closest('.form_card#doreczenie')) {
                                    input.value = `${result.street1}`;
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Numer mieszkania') && label.closest('.form_card#doreczenie')) {
                                    input.value = `${result.street2}`;
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Kod pocztowy') && label.closest('.form_card#doreczenie')) {
                                    input.value = `${result.postal}`;
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Miasto') && label.closest('.form_card#doreczenie')) {
                                    input.value = `${result.city}`;
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Numer telefonu') && label.closest('.form_card#doreczenie')) {
                                    input.value = `${result.phone}`;
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                if (label.innerText.trim().includes('Adres e-mail') && label.closest('.form_card#doreczenie')) {
                                    input.value = `${result.email}`;
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }*/
                                if (!document.querySelector('.dane_odbiorcy-info')) {
                                    const tableData = [
                                        ["Imię i Nazwisko: ", `${result.name || '-'}`],
                                        ["Nazwa firmy: ", `${result.company || '-'}`],
                                        ["Ulica: ", `${result.street || '-'} ${result.street1 || '-'}/${result.street2 || '-'}`],
                                        ["Kod i Miasto: ", `${result.postal || '-'} ${result.city || '-'}`],
                                        ["E-mail: ", `${result.email || '-'}`],
                                        ["Telefon: ", `${result.phone || '-'}`]
                                    ];
                                    function createTable(data) {
                                        const table = document.createElement("table"); // Tworzymy element tabeli
                                        table.className = 'dane_odbiorcy-info';
                                        table.style.borderCollapse = "collapse";
                                        table.style.width = "500px";
                                        table.style.margin = "135px 0 0 650px";
                                        table.style.position = "absolute";
                                        table.style.border = "1px gray solid";
                                        table.style.textAlign = "left";
                                        table.style.padding = "8px";
                                        data.forEach(([key, value]) => {
                                            const tr = document.createElement("tr"); // Tworzymy nowy wiersz
                                            // Tworzymy komórkę dla klucza (nagłówka)
                                            const th = document.createElement("th");
                                            th.textContent = key;
                                            th.style.backgroundColor = "#f2f2f2";
                                            th.style.width = "30%";
                                            th.style.padding = "5px";
                                            th.style.border = "1px gray solid";
                                            tr.appendChild(th);
                                
                                            // Tworzymy komórkę dla wartości
                                            const td = document.createElement("td");
                                            td.textContent = value;
                                            td.style.padding = "5px"; // Dodanie odstępów wewnętrznych
                                            td.style.border = "1px gray solid";
                                            tr.appendChild(td);
                                
                                            table.appendChild(tr); // Dodajemy wiersz do tabeli
                                        });
                                        return table; // Zwracamy tabelę
                                    }
                                    document.querySelector('div#doreczenie div.row.row--orderForm').appendChild(createTable(tableData));
                                }
                                if (result.paczkomat != "" && !document.querySelector('.paczkomat-info')) {
                                    paczkomatinfo = document.createElement('span');
                                    paczkomatinfo.textContent = `PUNKT ODBIORU: ${result.paczkomat}`;
                                    paczkomatinfo.className = 'paczkomat-info';
                                    paczkomatinfo.style.cssText = `
                                        margin-top: -15px;
                                        font-weight: bold;
                                        font-size: 20px;
                                        color: #f78d14;
                                        cursor: text;
                                        text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.15);
                                    `;
                                    document.querySelector('div#doreczenie .row .orderForm_col1 .row.row--gap16.row--orderForm').appendChild(paczkomatinfo);
                                } else if (result.paczkomat != "" && document.querySelector('.paczkomat-info')) paczkomatinfo.textContent = `PUNKT ODBIORU: ${result.paczkomat}`;
                            });
                        }
                    });
                });
            }
            [button4, clonedButton].forEach(addEvents);
            // Funkcja do wypełniania formularza na podstawie wybranej opcji
            function fillForm(dimension) {
                const dimensions = {
                    "35x30x5 3kg": { length: '35', width: '30', height: '5', weight: '3' },
                    "35x40x15 4kg": { length: '35', width: '40', height: '15', weight: '4' }
                };

                if (dimensions[dimension]) {
                    const { length, width, height, weight } = dimensions[dimension];

                    document.querySelectorAll('[class^="form_inputContainer"]').forEach(container => {
                        const label = container.querySelector('label.form_label');
                        const input = container.querySelector('input');
                        if (input && label) {
                            if (label.innerText.trim().includes('Długość')) {
                                input.value = length;
                                input.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                            if (label.innerText.trim().includes('Szerokość')) {
                                input.value = width;
                                input.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                            if (label.innerText.trim().includes('Wysokość')) {
                                input.value = height;
                                input.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                            if (label.innerText.trim().includes('Waga')) {
                                input.value = weight;
                                input.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                        }
                    });
                }
            }

            // Tworzymy select z opcjami
            const select = document.createElement('select');
            select.className = 'dimensions-select';
            select.style.cssText = `
                margin: 0px 0 0 -45px;
                font-weight: bold;
                font-size: 18px;
                color: #f78d14;
                cursor: pointer;
                text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.15);
                text-align: center;
                height: 40px;
                width: 200px;
            `;

            // Dodajemy placeholder
            const placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.textContent = 'Wybierz wymiary ⤵︎';
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            placeholderOption.hidden = true;
            select.appendChild(placeholderOption);

            select.addEventListener('mouseenter', () => {
                select.style.color = '#e08012';
            });
            select.addEventListener('mouseleave', () => {
                select.style.color = '#f78d14';
            });

            // Dodajemy opcje do selecta
            const options = ["35x30x5 3kg", "35x40x15 4kg"];
            options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                opt.style.background = "#f2f2f2";
                select.appendChild(opt);
            });

            // Obsługa zmiany wartości w select
            select.addEventListener('change', (event) => {
                const selectedValue = event.target.value;
                select.selectedIndex = 0; // Zawsze wraca do placeholdera
                fillForm(selectedValue);
            });

            // Dodajemy select do odpowiedniego kontenera
            const targetContainer = document.querySelector('.form_container .form_card#przesylka .form_firstSection [style^="display: flex; flex-direction: column; width: 100%;"] .row.row--orderForm');
            if (targetContainer) {
                targetContainer.appendChild(select);
                //document.querySelector('.form_container .form_card#przesylka .row.row--alignStart.row--baseline').appendChild(select);
            }
        }
    }
    if (window.location.href.includes('https://outdoorowe.pl/wp-admin') || window.location.href.includes('https://sklepbastion.pl/wp-admin')) {
        const wp_paragon_button = document.createElement('button');
        wp_paragon_button.textContent = 'PRZYGOTUJ PARAGON';
        wp_paragon_button.className = 'paragon-button';
        wp_paragon_button.style.cssText = `
            font-size: 20px;
            color: #f78d14;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            background: transparent;
            border: 0px;
            text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
        `;
        const wp_nadaj_button = document.createElement('button');
        wp_nadaj_button.textContent = 'PRZYGOTUJ BL-PACZKĘ';
        wp_nadaj_button.className = 'nadaj-button';
        wp_nadaj_button.style.cssText = `
            font-size: 20px;
            color: #f78d14;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            background: transparent;
            border: 0px;
            text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
        `;
        const header = Array.from(document.querySelectorAll('div.order_data_column_container div.order_data_column h3')).find(h3 => h3.textContent.trim().includes('Wysyłka'));
        const thElement = Array.from(document.querySelectorAll('th.item.sortable')).find(th => th.textContent.trim() === 'Produkt');
        if (!document.querySelector('.nadaj-button' || '.paragon-button')) {
            setTimeout(() => {
                if (!document.querySelector('.nadaj-button')) header.insertBefore(wp_nadaj_button, header.querySelector('a.edit_address'));
                if (!document.querySelector('.paragon-button')) thElement.appendChild(wp_paragon_button);
            }, 500);
        }
        function addHover(button) {
            button.addEventListener('mouseenter', () => {
                button.style.color = '#e08012';
            });
            button.addEventListener('mouseleave', () => {
                button.style.color = '#f78d14';
            });
        }
        [wp_nadaj_button, wp_paragon_button].forEach(addHover);
        wp_nadaj_button.addEventListener('click', (event) => {
            event.preventDefault(); // Anuluj domyślne działanie
            event.stopPropagation(); // Zatrzymaj propagację zdarzenia
            if (confirm("Pobrano dane do wysyłki!\nChcesz otworzyć nową kartę blpaczka.com?")) {
                window.open('https://blpaczka.com/panel', '_blank'); // Otwórz nową kartę
            }
            const closestAddress = wp_nadaj_button.closest('.order_data_column')?.querySelector('div.address');
            // Pobierz wszystkie elementy <p> wewnątrz .address
            const paragraphs = closestAddress.querySelectorAll('p');
    
            // Połącz ich zawartość, zastępując <br> znakami nowej linii
            let daneDoWysylki = Array.from(paragraphs)
                .map(p => p.innerHTML.replace(/<br\s*\/?>/g, '\n')) // Zamień <br> na nową linię
                .join('\n'); // Połącz teksty wszystkich paragrafów
    
            // Manipulacja danymi
            const linie = daneDoWysylki.split('\n'); // Podziel na linie
    
            // Zapisz do zmiennych
            let name = linie[0]
                .split('')
                .map((char, index, array) => {
                    // Jeśli to pierwszy znak wyrazu (lub pierwszy w linii), duża litera
                    if (index === 0 || array[index - 1] === ' ') {
                        return char.toUpperCase();
                    }
                    // W przeciwnym razie zamieniamy na małą literę
                    return char.toLowerCase();
                })
                .join('');
                linie[0] = linie[0].replace(/(?:^|[ ,."'!?-])([a-z])/g, (match, letter) => {
                    // Jeśli litera występuje po znaku interpunkcyjnym, zamień na dużą
                    return match[0] + letter.toUpperCase();
                });
            if (linie.length === 4) {
                linie[1] = linie[1] + ' ' + linie[2];
                linie.splice(2, 1);
            }
            linie[1] = (linie[1]).replace(/\s+/g, ' ').trim(); // Usuwamy nadmiarowe spacje
            linie[1] = (linie[1]).replace(/^(ul\.?|UL\.?|Ul\.?|uL\.?)\s*/, ''); // Usuwamy 'ul' na początku
            let words = linie[1].replace(/,/g, '').split(' '); // Usuwamy przecinki i rozdzielamy na wyrazy
            let addressPart = [];
            let numberPart = [];
            words.forEach(word => {
                if (/\d/.test(word)) {
                    // Jeżeli zawiera liczby, rozdzielamy adresy typu 25/12
                    const splitNumbers = word.split('/');
                    numberPart.push(...splitNumbers);
                } else {
                    // Inne słowa zostają w adresie
                    addressPart.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
                }
            });
            let street = addressPart.join(' '); // Cała część ulicy
            let street1 = numberPart[0]; // Numer ulicy
            let street2 = numberPart.length > 1 ? numberPart[1] : '';
            let postal = linie[2].slice(0, 6); // Szuka kodu pocztowego w formacie XX-XXX
            let city = (linie[2].replace(postal, '').trim()).replace(/\s+/g, ' ').trim()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Wyrazy zaczynają się wielką literą
                .join(' ');
            linie[2] = linie[2].replace(/(?:^|[ ,."'!?-])([a-z])/g, (match, letter) => {
                // Jeśli litera występuje po znaku interpunkcyjnym, zamień na dużą
                city = match[0] + letter.toUpperCase();
            });
            let email = "";
            let phone = "";
            // Iteracja przez wszystkie elementy <strong>
            document.querySelectorAll('strong').forEach(strong => {
                // Sprawdź, czy element <strong> zawiera tekst "Adres e-mail:"
                if (strong.innerText.includes('Adres e-mail:')) {
                    const emailLink = strong.closest('p').querySelector('a'); // Wyszukaj <a> w tym samym <p>
                    if (emailLink) {
                        email = emailLink.innerText; // Zapisz tekst maila
                    }
                }
                // Sprawdź, czy element <strong> zawiera tekst "Numer telefonu:"
                if (strong.innerText.includes('Numer telefonu:')) {
                    const phoneLink = strong.closest('p').querySelector('a'); // Wyszukaj <a> w tym samym <p>
                    if (phoneLink) {
                        phone = phoneLink.innerText; // Zapisz numer telefonu
                    }
                }
            });
            let paczkomat = document.querySelector('#parcel_machine_id').value; // Zapisz wartość inputa
            let company = "";
            // Zapisz dane w chrome.storage.local
            chrome.storage.local.remove(['name', 'company', 'street', 'street1', 'street2', 'postal', 'city', 'phone', 'email', 'paczkomat'], () => {
                chrome.storage.local.set({ name, company, street, street1, street2, postal, city, phone, email, paczkomat }, () => {
                    console.log("Dane zostały skopiowane do pamięci podręcznej:", { name, company, street, street1, street2, postal, city, phone, email, paczkomat });
                });
            });
        });
        wp_paragon_button.addEventListener('click', (event) => {
            event.preventDefault(); // Anuluj domyślne działanie
            event.stopPropagation(); // Zatrzymaj propagację zdarzenia
            const titleLinks = document.querySelectorAll('.wc-order-item-name'); // Tytuły przedmiotów
            const prices = document.querySelectorAll('td.line_cost div.view span.woocommerce-Price-amount.amount bdi');
            const taxPrices = document.querySelectorAll('td.line_tax div.view span.woocommerce-Price-amount.amount bdi');
            const quantities = document.querySelectorAll('td.quantity div.view');
            
            // Pobranie kosztu wysyłki
            const shippingCostSpan = document.querySelectorAll('tr.shipping td.line_cost div.view span.woocommerce-Price-amount.amount');
            const shippingTaxSpan = document.querySelectorAll('tr.shipping td.line_tax div.view span.woocommerce-Price-amount.amount');
            
            // Funkcja obliczająca pełną cenę (cena + podatek)
            const getFullPrice = (priceSpan, taxSpan) => {
                const price = parseFloat(priceSpan.textContent.trim().replace('zł', '').replace(',', '.'));
                const tax = parseFloat(taxSpan?.textContent.trim().replace('zł', '').replace(',', '.') || '0');
                return price + tax;
            }
        
            // Pobranie pełnych cen przedmiotów
            const items = Array.from(titleLinks).map((link, index) => {
                const title = link.textContent.trim();
                const price = prices[index] && taxPrices[index] ? getFullPrice(prices[index], taxPrices[index]) : 0;
                const quantity = quantities[index]?.textContent.trim().replace(/^×\s*/, '') || '0';
                const formattedPrice = price.toFixed(2).replace('.', ','); // Zamiana kropki na przecinek
                return `\n\t${index + 1}. ${title}\n\t\tIlość: ${quantity}\n\t\tCena: ${formattedPrice}`;
            });
        
            // Pobranie pełnego kosztu wysyłki
            let shippingCost = '0,00'; 
            if (shippingCostSpan.length && shippingTaxSpan.length) {
                const shippingPrice = parseFloat(shippingCostSpan[0].textContent.trim().replace('zł', '').replace(',', '.'));
                const shippingTax = parseFloat(shippingTaxSpan[0].textContent.trim().replace('zł', '').replace(',', '.') || '0');
                if (shippingPrice !== 0) {
                    shippingCost = (shippingPrice + shippingTax).toFixed(2).replace('.', ',');
                }
            }
        
            // Tworzenie danych do zapisania
            const data = items.length > 0 
                ? `Zebrane dane z zamówienia: (WordPress)${items.join('')}\n\tKoszt wysyłki: ${shippingCost}\n`
                : 'Brak sprzedanych przedmiotów w zamówieniu.\n\n';
            
            console.log(`${data}\n`);
            
            // Tworzenie pliku i jego pobranie
            const blob1 = new Blob([data], { type: 'text/plain' });
            const url1 = URL.createObjectURL(blob1);
            const downloadLink1 = document.createElement('a');
            downloadLink1.href = url1;
            downloadLink1.download = 'paragon.txt';
            downloadLink1.style.display = 'none';
            document.body.appendChild(downloadLink1);
            downloadLink1.click();
            document.body.removeChild(downloadLink1);
            URL.revokeObjectURL(url1);
        });
    }
}

// Obserwator zmian DOM
const observer = new MutationObserver(addParagonButtons);
observer.observe(document.body, { childList: true, subtree: true });

// Pierwsze wywołanie funkcji, aby dodać przyciski do już załadowanych elementów
addParagonButtons();