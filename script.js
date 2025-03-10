let input = document.getElementById('input');
let country_info;
let bordering_countries;

let submitContent = () => {

    document.getElementById('country-info').innerHTML = '';
    document.getElementById('bordering-countries').innerHTML = '';

    fetch(`https://restcountries.com/v3.1/name/${input.value}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Country not found enter correct name');
            }
            return res.json();
        })
        .then((data) => {

            let country = data[0];  

            country_info = `
                <ul>
                    <li>Capital: ${country.capital[0]} </li>
                    <li>Region: ${country.region}</li>
                    <li>Population: ${country.population}</li>
                    <li>Flag: </li>
                    <img src="${country.flags.png}"></img>
                </ul>
            `;

            document.getElementById('country-info').innerHTML = country_info;

            let borderCountryCodes = country.borders;

            document.getElementById('bordering-countries').innerHTML = '';

            for (let i = 0; i < borderCountryCodes.length; i++) {
                let code = borderCountryCodes[i];

                fetch(`https://restcountries.com/v3.1/alpha/${code}`)
                    .then((res) => res.json())
                    .then((data) => {

                        let boarderCountry = data[0];
                        console.log(boarderCountry.name.common);

                        bordering_countries = ` 
                            <p>${boarderCountry.name.common}</p>
                            <img src="${boarderCountry.flags.png}"></img>
                        `;

                        document.getElementById('bordering-countries').innerHTML += bordering_countries;
                    })
                    .catch((err) => {
                        console.error('Error fetching bordering country data:', err);
                    });
            }

        })
        .catch((err) => {
            console.error('Error fetching country data:', err);
            document.getElementById('country-info').innerHTML = 
                '<p style="color:red;">Country not found. Please check the spelling or enter a valid country name.</p>';
        });
}
