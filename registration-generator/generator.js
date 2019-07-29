const __registration = document.getElementById('registration')
const __country = document.getElementById('country')
const __aircraftType = document.getElementById('aircraftType')

const registrationPatterns = {
  dk: {
    name: 'Denmark',
    prefix: 'OY',
    suffix: 'xx',
    types: {
      Any: ['B', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L', 'M', 'N', 'Q', 'R', 'S', 'T', 'U']
    }
  },
  fr: {
    name: 'France',
    prefix: 'F',
    suffix: 'xxxx',
    types: {
      Any: ['B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Q', 'R', 'S', 'T', 'U']
    }
  },
  fi: {
    name: 'Finland',
    prefix: 'OH',
    suffix: 'xx',
    types: {
      Any: ['B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Q', 'R', 'S', 'T', 'U']
    }
  },
  is: {
    name: 'Iceland',
    prefix: 'TF',
    suffix: 'xx',
    types: {
      Any: ['B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Q', 'R', 'S', 'T', 'U']
    }
  },
  no: {
    name: 'Norway',
    prefix: 'LN',
    suffix: 'xx',
    types: {
      Any: ['A', 'B', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Q', 'R', 'S', 'T', 'U']
    }
  },
  pt: {
    name: 'Portugal',
    prefix: 'CS',
    suffix: 'xx',
    types: {
      Airliner: ['T'],
      Any: ['A', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'Q', 'R', 'S']
    }
  },
  se: {
    name: 'Sweden',
    prefix: 'SE',
    suffix: 'xx',
    types: {
      Jet: ['D', 'R'],
      Prop: ['A', 'B', 'C', 'E', 'F', 'G', 'I', 'K', 'L', 'M']
    }
  },
  es: {
    name: 'Spain',
    prefix: 'EC',
    suffix: 'xx',
    types: {
      Any: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
    }
  },
}

/*
* Main loop
* Generates a new registration every two seconds
*/

console.clear()
const keys = Object.keys(registrationPatterns)
for (let i = 0; i < keys.length; i++) {
  let option = '<option value="%key%">%name%</option>'
  option = option
    .replace('%key%', keys[i])
    .replace('%name%', registrationPatterns[keys[i]].name)
  __country.innerHTML += option
}

countryChange()
generateRegistration()

setInterval(() => {
  generateRegistration()
}, 2000)

/*
 * Events
 */

function countryChange() {
  __aircraftType.innerHTML = ''
  const country = __country[__country.selectedIndex].value

  const types = Object.keys(registrationPatterns[country].types)
  for (let i = 0; i < types.length; i++) {
    __aircraftType.innerHTML += '<option value="%id%">%type%</option>'
      .replace('%id%', types[i])
      .replace('%type%', types[i])
  }

  generateRegistration()
}

/*
* Helpers
*/

function generateRegistration() {
  const type = __aircraftType[__aircraftType.selectedIndex].value
  const country = __country[__country.selectedIndex].value
  const prefixes = registrationPatterns[country].types[type]

  let countryPrefix, typePrefix, registration

  countryPrefix = registrationPatterns[country].prefix
  typePrefix = prefixes[Math.floor(Math.random() * prefixes.length)]

  registration = countryPrefix + '-' + typePrefix + registrationPatterns[country].suffix

  registration = registration.replace(/[x]/g, function (c) {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26)).toUpperCase()
  })

  __registration.value = registration
}

function copyToClipboard() {
  __registration.select()
  document.execCommand('copy')
}
