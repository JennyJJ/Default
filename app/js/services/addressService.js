four51.app.factory('AddressService', function($resource, $location, $route, $api, $451){
    var service = $resource($451.api('address/:id'), { id: '@id' });

    return {
        get: function(param) {
            return $api.resource(service).options({ persists: true, key: 'Address.' + param.id}).get(param);
        },
        save: function(address, callback) {
            service.save(address, function(response) {
                $451.clear('Address.' + address.InteropID);
                callback();
            });
        },
        delete: function(address) {
            service.delete(address, function(response) {
                $451.clear('Addresses');
                $route.reload();
            });
        }
    };
});

four51.app.factory('AddressListService', function($resource, $451, $api) {
    var resource = $resource($451.api('address'), {}, {
        'query': { method: 'GET', isArray: true },
        'delete': { method: 'DELETE' }
    });

    return {
        query: function() {
            return $api.resource(resource).
                options({ persists: true, key: 'Addresses'}).query();
        },
        delete: function(a) {
            angular.forEach(a, function(add) {
               if (add.Selected) {
                   resource.delete(add, function() {
                       $451.slice(a, add);
                       $451.clear('Addresses');
                   })
               }
            });
            return a;
        }
    }
});

four51.app.factory('ResourcesService', function() {
    var countries = [
       { "label": "United States of America", "value": "US"},
       { "label": "Afghanistan", "value": "AF"},
       { "label": "Åland Islands", "value": "AX"},
       { "label": "Albania", "value": "AL"},
       { "label": "Algeria", "value": "DZ"},
       { "label": "American Samoa", "value": "AS"},
       { "label": "Andorra", "value": "AD"},
       { "label": "Angola", "value": "AO"},
       { "label": "Anguilla", "value": "AI"},
       { "label": "Antarctica", "value": "AQ"},
       { "label": "Antigua and Barbuda", "value": "AG"},
       { "label": "Argentina", "value": "AR"},
       { "label": "Armenia", "value": "AM"},
       { "label": "Aruba", "value": "AW"},
       { "label": "Australia", "value": "AU"},
       { "label": "Austria", "value": "AT"},
       { "label": "Azerbaijan", "value": "AZ"},
       { "label": "Bahamas", "value": "BS"},
       { "label": "Bahrain", "value": "BH"},
       { "label": "Bangladesh", "value": "BD"},
       { "label": "Barbados", "value": "BB"},
       { "label": "Belarus", "value": "BY"},
       { "label": "Belgium", "value": "BE"},
       { "label": "Belize", "value": "BZ"},
       { "label": "Benin", "value": "BJ"},
       { "label": "Bermuda", "value": "BM"},
       { "label": "Bhutan", "value": "BT"},
       { "label": "Bolivia", "value": "BO"},
       { "label": "Bosnia and Herzegovina", "value": "BA"},
       { "label": "Botswana", "value": "BW"},
       { "label": "Bouvet Island", "value": "BV"},
       { "label": "Brazil", "value": "BR"},
       { "label": "British Indian Ocean Territory", "value": "IO"},
       { "label": "Brunei Darussalam", "value": "BN"},
       { "label": "Bulgaria", "value": "BG"},
       { "label": "Burkina Faso", "value": "BF"},
       { "label": "Burundi", "value": "BI"},
       { "label": "Cambodia", "value": "KH"},
       { "label": "Cameroon", "value": "CM"},
       { "label": "Canada", "value": "CA"},
       { "label": "Cape Verde", "value": "CV"},
       { "label": "Cayman Islands", "value": "KY"},
       { "label": "Central African Republic", "value": "CF"},
       { "label": "Chad", "value": "TD"},
       { "label": "Chile", "value": "CL"},
       { "label": "China", "value": "CN"},
       { "label": "Christmas Island Australia", "value": "CX"},
       { "label": "Cocos Keeling Islands", "value": "CC"},
       { "label": "Colombia", "value": "CO"},
       { "label": "Comoros", "value": "KM"},
       { "label": "Congo", "value": "CG"},
       { "label": "Congo, D.R.", "value": "CD"},
       { "label": "Cook Islands", "value": "CK"},
       { "label": "Costa Rica", "value": "CR"},
       { "label": "Cote D'Ivoire Ivory Coast", "value": "CI"},
       { "label": "Croatia Hrvatska", "value": "HR"},
       { "label": "Cuba", "value": "CU"},
       { "label": "Cyprus", "value": "CY"},
       { "label": "Czech Republic", "value": "CZ"},
       { "label": "Denmark", "value": "DK"},
       { "label": "Djibouti", "value": "DJ"},
       { "label": "Dominica", "value": "DM"},
       { "label": "Dominican Republic", "value": "DO"},
       { "label": "Ecuador", "value": "EC"},
       { "label": "Egypt", "value": "EG"},
       { "label": "El Salvador", "value": "SV"},
       { "label": "Equatorial Guinea", "value": "GQ"},
       { "label": "Eritrea", "value": "ER"},
       { "label": "Estonia", "value": "EE"},
       { "label": "Ethiopia", "value": "ET"},
       { "label": "Faeroe Islands", "value": "FO"},
       { "label": "Falkland Islands Malvinas", "value": "FK"},
       { "label": "Fiji", "value": "FJ"},
       { "label": "Finland", "value": "FI"},
       { "label": "France", "value": "FR"},
       { "label": "France, Metropolitan", "value": "FX"},
       { "label": "French Guiana", "value": "GF"},
       { "label": "French Polynesia", "value": "PF"},
       { "label": "French Southern Territories", "value": "TF"},
       { "label": "Gabon", "value": "GA"},
       { "label": "Gambia", "value": "GM"},
       { "label": "Georgia", "value": "GE"},
       { "label": "Germany", "value": "DE"},
       { "label": "Ghana", "value": "GH"},
       { "label": "Gibraltar", "value": "GI"},
       { "label": "Greece", "value": "GR"},
       { "label": "Greenland", "value": "GL"},
       { "label": "Grenada", "value": "GD"},
       { "label": "Guadeloupe", "value": "GP"},
       { "label": "Guam", "value": "GU"},
       { "label": "Guatemala", "value": "GT"},
       { "label": "Guinea", "value": "GN"},
       { "label": "Guinea Bissau", "value": "GW"},
       { "label": "Guyana", "value": "GY"},
       { "label": "Haiti", "value": "HT"},
       { "label": "Heard and McDonald Is.", "value": "HM"},
       { "label": "Honduras", "value": "HN"},
       { "label": "Hong Kong", "value": "HK"},
       { "label": "Hungary", "value": "HU"},
       { "label": "Iceland", "value": "IS"},
       { "label": "India", "value": "IN"},
       { "label": "Indonesia", "value": "ID"},
       { "label": "Iran", "value": "IR"},
       { "label": "Iraq", "value": "IQ"},
       { "label": "Isle of Man", "value": "IM"},
       { "label": "Ireland", "value": "IE"},
       { "label": "Israel", "value": "IL"},
       { "label": "Italy", "value": "IT"},
       { "label": "Jamaica", "value": "JM"},
       { "label": "Japan", "value": "JP"},
       { "label": "Jersey", "value": "JE"},
       { "label": "Jordan", "value": "JO"},
       { "label": "Kazakhstan", "value": "KZ"},
       { "label": "Kenya", "value": "KE"},
       { "label": "Kiribati", "value": "KI"},
       { "label": "Korea North", "value": "KP"},
       { "label": "Korea South", "value": "KR"},
       { "label": "Kuwait", "value": "KW"},
       { "label": "Kyrgyzstan", "value": "KG"},
       { "label": "Lao P.Dem.R.", "value": "LA"},
       { "label": "Latvia", "value": "LV"},
       { "label": "Lebanon", "value": "LB"},
       { "label": "Lesotho", "value": "LS"},
       { "label": "Liberia", "value": "LR"},
       { "label": "Libyan Arab Jamahiriya", "value": "LY"},
       { "label": "Liechtenstein", "value": "LI"},
       { "label": "Lithuania", "value": "LT"},
       { "label": "Luxembourg", "value": "LU"},
       { "label": "Macau", "value": "MO"},
       { "label": "Macedonia", "value": "MK"},
       { "label": "Madagascar", "value": "MG"},
       { "label": "Malawi", "value": "MW"},
       { "label": "Malaysia", "value": "MY"},
       { "label": "Maldives", "value": "MV"},
       { "label": "Mali", "value": "ML"},
       { "label": "Malta", "value": "MT"},
       { "label": "Marshall Islands", "value": "MH"},
       { "label": "Martinique", "value": "MQ"},
       { "label": "Mauritania", "value": "MR"},
       { "label": "Mauritius", "value": "MU"},
       { "label": "Mayotte", "value": "YT"},
       { "label": "Mexico", "value": "MX"},
       { "label": "Micronesia", "value": "FM"},
       { "label": "Moldova", "value": "MD"},
       { "label": "Monaco", "value": "MC"},
       { "label": "Mongolia", "value": "MN"},
       { "label": "Montenegro", "value":     "ME"},
       { "label": "Montserrat", "value": "MS"},
       { "label": "Morocco", "value": "MA"},
       { "label": "Mozambique", "value": "MZ"},
       { "label": "Myanmar", "value": "MM"},
       { "label": "Namibia", "value": "NA"},
       { "label": "Nauru", "value": "NR"},
       { "label": "Nepal", "value": "NP"},
       { "label": "Netherlands", "value": "NL"},
       { "label": "Netherlands Antilles", "value": "AN"},
       { "label": "New Caledonia", "value": "NC"},
       { "label": "New Zealand", "value": "NZ"},
       { "label": "Nicaragua", "value": "NI"},
       { "label": "Niger", "value": "NE"},
       { "label": "Nigeria", "value": "NG"},
       { "label": "Niue", "value": "NU"},
       { "label": "Norfolk Island", "value": "NF"},
       { "label": "Northern Mariana Islands", "value": "MP"},
       { "label": "Norway", "value": "NO"},
       { "label": "Oman", "value": "OM"},
       { "label": "Pakistan", "value": "PK"},
       { "label": "Palau", "value": "PW"},
       { "label": "Palestinian Territory, Occupied", "value": "PS"},
       { "label": "Panama", "value": "PA"},
       { "label": "Papua New Guinea", "value": "PG"},
       { "label": "Paraguay", "value": "PY"},
       { "label": "Peru", "value": "PE"},
       { "label": "Philippines", "value": "PH"},
       { "label": "Pitcairn", "value": "PN"},
       { "label": "Poland", "value": "PL"},
       { "label": "Portugal", "value": "PT"},
       { "label": "Puerto Rico", "value": "PR"},
       { "label": "Qatar", "value": "QA"},
       { "label": "Reunion", "value": "RE"},
       { "label": "Romania", "value": "RO"},
       { "label": "Russian Federation", "value": "RU"},
       { "label": "Rwanda", "value": "RW"},
       { "label": "Saint Helena", "value": "SH"},
       { "label": "Saint Kitts and Nevis", "value": "KN"},
       { "label": "Saint Lucia", "value": "LC"},
       { "label": "Saint Pierre and Miquelon", "value": "PM"},
       { "label": "Saint Vincent and the Grenadines", "value": "VC"},
       { "label": "Samoa", "value": "WS"},
       { "label": "San Marino", "value": "SM"},
       { "label": "Sao Tome and Principe", "value": "ST"},
       { "label": "Saudi Arabia", "value": "SA"},
       { "label": "Senegal", "value": "SN"},
       { "label": "Serbia", "value":     "RS"},
       { "label": "Seychelles", "value": "SC"},
       { "label": "Sierra Leone", "value": "SL"},
       { "label": "Singapore", "value": "SG"},
       { "label": "Slovakia", "value": "SK"},
       { "label": "Slovenia", "value": "SI"},
       { "label": "Solomon Islands", "value": "SB"},
       { "label": "Somalia", "value": "SO"},
       { "label": "South Africa", "value": "ZA"},
       { "label": "S. Georgia &amp; S. Sandwich Is.", "value": "GS"},
       { "label": "Spain", "value": "ES"},
       { "label": "Sri Lanka", "value": "LK"},
       { "label": "Sudan", "value": "SD"},
       { "label": "Suriname", "value": "SR"},
       { "label": "Svalbard &amp; Jan Mayen Is.", "value": "SJ"},
       { "label": "Swaziland", "value": "SZ"},
       { "label": "Sweden", "value": "SE"},
       { "label": "Switzerland", "value": "CH"},
       { "label": "Syrian Arab Rep.", "value": "SY"},
       { "label": "Taiwan", "value": "TW"},
       { "label": "Tajikistan", "value": "TJ"},
       { "label": "Tanzania", "value": "TZ"},
       { "label": "Thailand", "value": "TH"},
       { "label": "Timor-Leste", "value": "TG"},
       { "label": "Togo", "value": "TG"},
       { "label": "Tokelau", "value": "TK"},
       { "label": "Tonga", "value": "TO"},
       { "label": "Trinidad and Tobago", "value": "TT"},
       { "label": "Tunisia", "value": "TN"},
       { "label": "Turkey", "value": "TR"},
       { "label": "Turkmenistan", "value": "TM"},
       { "label": "Turks and Caicos Islands", "value": "TC"},
       { "label": "Tuvalu", "value": "TU"},
       { "label": "Uganda", "value": "UG"},
       { "label": "Ukraine", "value": "UA"},
       { "label": "United Kingdom", "value": "GB"},
       { "label": "United Arab Emirates", "value": "AE"},
       { "label": "US Minor Outlying Is.", "value": "UM"},
       { "label": "Uruguay", "value": "UY"},
       { "label": "Uzbekistan", "value": "UZ"},
       { "label": "Vanuatu", "value": "VU"},
       { "label": "Vatican City State", "value": "VC"},
       { "label": "Venezuela", "value": "VE"},
       { "label": "Viet Nam", "value": "VN"},
       { "label": "Virgin Islands British", "value": "VG"},
       { "label": "Virgin Islands US", "value": "VI"},
       { "label": "Wallis and Futuna Islnds", "value": "WF"},
       { "label": "Western Sahara", "value": "EH"},
       { "label": "Yemen", "value": "YE"},
       { "label": "Yugoslavia", "value": "YU"},
       { "label": "Zambia", "value": "ZM"},
       { "label": "Zimbabwe", "value": "ZW"}
   ];
    var states = [
        { "label": "Alabama", "value": "AL", "country": "US" },
        { "label": "Alaska", "value": "AK", "country": "US" },
        { "label": "Arizona", "value": "AZ", "country": "US" },
        { "label": "Arkansas", "value": "AR", "country": "US" },
        { "label": "California", "value": "CA", "country": "US" },
        { "label": "Colorado", "value": "CO", "country": "US" },
        { "label": "Connecticut", "value": "CT", "country": "US" },
        { "label": "Delaware", "value": "DE", "country": "US" },
        { "label": "District of Columbia", "value": "DC", "country": "US" },
        { "label": "Florida", "value": "FL", "country": "US" },
        { "label": "Georgia", "value": "GA", "country": "US" },
        { "label": "Hawaii", "value": "HI", "country": "US" },
        { "label": "Idaho", "value": "ID", "country": "US" },
        { "label": "Illinois", "value": "IL", "country": "US" },
        { "label": "Indiana", "value": "IN", "country": "US" },
        { "label": "Iowa", "value": "IA", "country": "US" },
        { "label": "Kansas", "value": "KS", "country": "US" },
        { "label": "Kentucky", "value": "KY", "country": "US" },
        { "label": "Louisiana", "value": "LA", "country": "US" },
        { "label": "Maine", "value": "ME", "country": "US" },
        { "label": "Maryland", "value": "MD", "country": "US" },
        { "label": "Massachusetts", "value": "MA", "country": "US" },
        { "label": "Michigan", "value": "MI", "country": "US" },
        { "label": "Minnesota", "value": "MN", "country": "US" },
        { "label": "Mississippi", "value": "MS", "country": "US" },
        { "label": "Missouri", "value": "MO", "country": "US" },
        { "label": "Montana", "value": "MT", "country": "US" },
        { "label": "Nebraska", "value": "NE", "country": "US" },
        { "label": "Nevada", "value": "NV", "country": "US" },
        { "label": "New Hampshire", "value": "NH", "country": "US" },
        { "label": "New Jersey", "value": "NJ", "country": "US" },
        { "label": "New Mexico", "value": "NM", "country": "US" },
        { "label": "New York", "value": "NY", "country": "US" },
        { "label": "North Carolina", "value": "NC", "country": "US" },
        { "label": "North Dakota", "value": "ND", "country": "US" },
        { "label": "Ohio", "value": "OH", "country": "US" },
        { "label": "Oklahoma", "value": "OK", "country": "US" },
        { "label": "Oregon", "value": "OR", "country": "US" },
        { "label": "Pennsylvania", "value": "PA", "country": "US" },
        { "label": "Rhode Island", "value": "RI", "country": "US" },
        { "label": "South Carolina", "value": "SC", "country": "US" },
        { "label": "South Dakota", "value": "SD", "country": "US" },
        { "label": "Tennessee", "value": "TN", "country": "US" },
        { "label": "Texas", "value": "TX", "country": "US" },
        { "label": "Utah", "value": "UT", "country": "US" },
        { "label": "Vermont", "value": "VT", "country": "US" },
        { "label": "Virginia", "value": "VA", "country": "US" },
        { "label": "Washington", "value": "WA", "country": "US" },
        { "label": "West Virginia", "value": "WV", "country": "US" },
        { "label": "Wisconsin", "value": "WI", "country": "US" },
        { "label": "Wyoming", "value": "WY", "country": "US" },
        { "label": "Armed Forces Americas (AA)", "value": "AA", "country": "US" },
        { "label": "Armed Forces Africa/Canada/Europe/Middle East (AE)", "value": "AE", "country": "US" },
        { "label": "Armed Forces Pacific (AP)", "value": "AP", "country": "US" },
        { "label": "American Samoa", "value": "AS", "country": "US" },
        { "label": "Federated States of Micronesia", "value": "FM", "country": "US" },
        { "label": "Guam", "value": "GU", "country": "US" },
        { "label": "Marshall Islands", "value": "MH", "country": "US" },
        { "label": "Northern Mariana Islands", "value": "MP", "country": "US" },
        { "label": "Palau", "value": "PW", "country": "US" },
        { "label": "Puerto Rico", "value": "PR", "country": "US" },
        { "label": "Virgin Islands", "value": "VI", "country": "US" },
        { "label": "Drenthe", "value": "Drenthe", "country": "NL" },
        { "label": "Flevoland", "value": "Flevoland", "country": "NL" },
        { "label": "Friesland", "value": "Friesland", "country": "NL" },
        { "label": "Gelderland", "value": "Gelderland", "country": "NL" },
        { "label": "Groningen", "value": "Groningen", "country": "NL" },
        { "label": "Limburg", "value": "Limburg", "country": "NL" },
        { "label": "Noord-Brabant", "value": "Noord-Brabant", "country": "NL" },
        { "label": "Noord-Holland", "value": "Noord-Holland", "country": "NL" },
        { "label": "Overijssel", "value": "Overijssel", "country": "NL" },
        { "label": "Utrecht", "value": "Utrecht", "country": "NL" },
        { "label": "Zeeland", "value": "Zeeland", "country": "NL" },
        { "label": "Zuid-Holland", "value": "Zuid-Holland", "country": "NL" },
        { "label": "Alberta", "value": "AB", "country": "CA" },
        { "label": "British Columbia", "value": "BC", "country": "CA" },
        { "label": "Manitoba", "value": "MB", "country": "CA" },
        { "label": "New Brunswick", "value": "NB", "country": "CA" },
        { "label": "Newfoundland and Labrador", "value": "NL", "country": "CA" },
        { "label": "Northwest Territories", "value": "NT", "country": "CA" },
        { "label": "Nova Scotia", "value": "NS", "country": "CA" },
        { "label": "Nunavut", "value": "NU", "country": "CA" },
        { "label": "Ontario", "value": "ON", "country": "CA" },
        { "label": "Prince Edward Island", "value": "PE", "country": "CA" },
        { "label": "Quebec", "value": "QC", "country": "CA" },
        { "label": "Saskatchewan", "value": "SK", "country": "CA" },
        { "label": "Yukon", "value": "YT", "country": "CA" }
    ];

    return {
        "countries":  countries,
        "states": states
    };
});