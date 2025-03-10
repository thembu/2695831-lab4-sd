let input = document.getElementById('input');
let country_info;
let bordering_countries;

let submitContent = () => {

    document.getElementById('country-info').innerHTML = '';
    document.getElementById('bordering-countries').innerHTML = '';

    
	fetch(`https://restcountries.com/v3.1/name/${input.value}`)
		.then((res) => res.json())
		.then((data) => {

            let country = data[0];  

			country_info =
            
            `
                <ul>
                <li>capital : ${country.capital[0]} </li>
                <li>Region : ${country.region}</li>
                <li>Population : ${country.population}</li>
                <li> Flag : </li>
                <img src="${country.flags.png}"></img>
            </ul>
    </section>
            
            `

            document.getElementById('country-info').innerHTML = country_info;

            let  borderCountryCodes = country.borders; 



            for (let i = 0; i < borderCountryCodes.length; i++) {
                
                let code = borderCountryCodes[i];


                fetch(`https://restcountries.com/v3.1/alpha/${code}`)
                .then((res) => res.json())
                .then((data) => {


                    let boarderCountry = data[0];
                    console.log(boarderCountry.name.common)

                    bordering_countries = ` 

                    <p>
                    ${boarderCountry.name.common}
                    </p>

                    <img src="${boarderCountry.flags.png}"></img>
                
                `

                console.log(bordering_countries)

                document.getElementById('bordering-countries').innerHTML += bordering_countries;
            }).catch((err) => {
                console.error('Error fetching country data:', error);
                document.getElementById('country-info').innerHTML = 
                    '<p>Country not found. Please try again.</p>';
            
            })
        
        
        }



        })}