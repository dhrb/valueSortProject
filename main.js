
const nameValue = [];
let dbArray = [];

const input = document.querySelector('#inputField');
const output = document.querySelector('#output');
const addBtn = document.querySelector('#addBtn');
const sortByNameBtn = document.querySelector('#sortByNameBtn');
const sortByValueBtn = document.querySelector('#sortByValueBtn');
const generateXml = document.querySelector('#showXmlBtn');
const deleteBtn = document.querySelector('#deleteBtn');


addBtn.addEventListener('click', (event) => {
  if (input.value) {
  event.preventDefault();
  nameValue.push(input.value);
  output.value = arrToLine(nameValue);
  const [key, value] = splitKeyValue(input.value);
  const newObject = 
    `{"key" : "${key}",
    "value" : "${value}"}`;
  dbArray.push(JSON.parse(newObject))
  } else {
    console.log('cannot pass undefined value')
  }
  input.value = '';
});

function arrToLine(array) {
  let temp = '';
  array.forEach(element => {
    temp += element + '\n';
  });
  return temp;
}


//sorting by name
sortByNameBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let temp = sortByName(dbArray);
  dbArray = temp;
  output.value = arrayToOutput(dbArray);
})

function sortByName(array) {
  array.sort( (a, b) => {
    if (a["key"] > b["key"]) return 1;
    if (a["key"] < b["key"]) return -1;
    return 0;
  })
  return(array) 
}

sortByValueBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let temp = sortByValue(dbArray);
  dbArray = temp;
  output.value = arrayToOutput(dbArray);
})

function sortByValue(array) {
  array.sort( (a, b) => {
    if (b["value"] > a["value"]) return -1;
    if (b["value"] < a["value"]) return 1;
    return 0;
  })
  return(array)
}

// function for break input text to key = value
function splitKeyValue(str) {
  return str.split('=')
}

function arrayToOutput(array) {
  let temp = ''
  array.forEach( (e) => {
    temp += `${e.key}=${e.value}\n`;
  })
  return temp;
}

function convertToXml(array) {
  let temp = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n'
  array.forEach( (e) => {
    temp += `\t<element>\n\t\t<key>${e.key}</key>\n\t\t<value>${e.value}</value>\n\t</element>\n`;
  })
  temp += `</root>`;
  return temp;
}

generateXml.addEventListener ('click', (event) => {
  output.value = convertToXml(dbArray);
  event.preventDefault();
})

deleteBtn.addEventListener('click', (event) => {
  event.preventDefault();
  output.value = null;
  dbArray = [];
}) 