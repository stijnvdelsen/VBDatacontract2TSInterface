const Tabs = 4;

const Regex_ClassName = /Public Class ([a-zA-Z0-9\-_\.]*)/gm;
const Regex_Datemembers = /[a-zA-Z]* Property ([a-zA-Z0-9\-_\.]*)\(?\)? As ([a-zA-Z]*)/gm;

const Types = {
	"Guid": "string",
	"Boolean": "boolean",
	"Date": "Date",
	"Double": "number",
	"Integer": "number",
	"String": "string"
};

const convert = () => {

	let datacontract = document.getElementById('datacontract').value;
	let className = extractClassName(datacontract);

	let datamembers = extractDatamembers(datacontract);

	let interface = createInterface(className, datamembers);

	document.getElementById('output').value = interface;

};

const extractClassName = (datacontract) => {
	
	let m;

	while ((m = Regex_ClassName.exec(datacontract)) !== null) {
	    // This is necessary to avoid infinite loops with zero-width matches
	    if (m.index === Regex_ClassName.lastIndex) {
	        Regex_ClassName.lastIndex++;
	    }

	    return m[1];
	}

};

const extractDatamembers = (datacontract) => {

	let datamembers = [];
	let m;

	while ((m = Regex_Datemembers.exec(datacontract)) !== null) {
	    // This is necessary to avoid infinite loops with zero-width matches
	    if (m.index === Regex_Datemembers.lastIndex) {
	        Regex_Datemembers.lastIndex++;
	    }
	    
	    datamembers.push(createDatemember(m[1], m[2]));
	}

	return datamembers;

};

const createDatemember = (property, type) => {
	let datamember = []
	let cType = Types[type];

	datamember.push(property);
	datamember.push(cType || type);

	return datamember;
};

const createInterface = (className, properties) => {

	let interface = `export interface ${className} {\n`;

		properties.forEach((property) => {
			let propertyName = property[0];
			let propertyType = property[1];

			interface += `${" ".repeat(Tabs)}${propertyName}: ${propertyType};\n`;
		});

	return interface += `}`;

};