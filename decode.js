let cypher=[];
resetCypher()

function createCypher(string){
	for(let i in string){
		if(cypher.indexOf(string[i])==-1){
			cypher.push(string[i])
		}
	}
}

function resetCypher(){
	cypher=[];
	createCypher("abcdefghijklmnopqrstuvwxyz");
	createCypher("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
	createCypher("/.\\><?*-+_=,!@'\"#$%^:;&(){}[] `~")
	createCypher("0123456789")
	createCypher("\n\r\t")
}

function decode(string){
	let result="";
	for(let i in string){
		result+=cypher.indexOf(string[i])+"."
	}
	result=result.substr(0,result.length-2)
	return result;
}

function encode(string){
	let result="";
	let text=""
	for(let i in string){
		if(string[i]=="."){
			if(text!="-1"){
				result+=cypher[text]
			}
			text=""
		}else{
			text+=string[i]
		}
	}
	return result
}