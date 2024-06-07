
export default async function handler() {
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belgium",
    "Belize", "Benin", "Bhutan", "Belarus", "Burma", "Bolivia", "Bosnia and Herzegovina", "Botswana",
    "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Chile", "China", "Cyprus", "Colombia", "Comoros", "Congo-Brazzaville", "Congo-Kinshasa", "North Korea",
    "South Korea", "Costa Rica", "Ivory Coast", "Croatia", "Cuba", "Denmark", "Djibouti", "Dominica",
    "Egypt", "United Arab Emirates", "Ecuador", "Eritrea", "Spain", "Estonia", "Eswatini", "United States",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Ghana", "Greece", "Grenada",
    "Guatemala", "Guinea", "Guinea-Bissau", "Equatorial Guinea", "Guyana", "Haiti", "Honduras", "Hungary",
    "India", "Indonesia", "Iraq", "Iran", "Ireland", "Iceland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kyrgyzstan", "Kiribati", "Kosovo", "Kuwait", "Laos", "Lesotho",
    "Latvia", "Lebanon", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "North Macedonia",
    "Madagascar", "Malaysia", "Malawi", "Maldives", "Mali", "Malta", "Morocco", "Marshall Islands", "Mauritius",
    "Mauritania", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Mozambique",
    "Namibia", "Nauru", "Nepal", "Nicaragua", "Niger", "Nigeria", "Norway", "New Zealand", "Oman",
    "Uganda", "Uzbekistan", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay",
    "Netherlands", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Central African Republic",
    "Dominican Republic", "Czech Republic", "Romania", "United Kingdom", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "San Marino", "Saint Vincent and the Grenadines", "Saint Lucia", "Solomon Islands", "El Salvador", "Samoa", "Sao Tome and Principe",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "Sudan",
    "South Sudan", "Sri Lanka", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand",
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
    "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * countries.length);

    const response = await fetch('https://countryapi.io/name/${countries[randomIndex]}?apikey=rnEEyVMkwk8sAR5CZ7gbTY8mT6T8OCnE1KBjdCqd');
    console.log('Random country:', response);
    return response;
  }
  