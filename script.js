var reader = new FileReader();
var file=[]

function listToHTML(list){
	let result = "";
	for(let i in list){
		result+="<br>"+list[i]
	}
	return result
}

function stringToList(string, delimiter){
	let result=[];
	let text="";
	for(let i in string){
		if(string[i]==delimiter){
			result.push(text);
			text="";
		}else{
			text+=string[i]
		}
	}
	return result
}

copytext.onclick=async function(){
	if(output.innerHTML.length>0){
		await navigator.clipboard.writeText(output.innerHTML);
	}
}

reader.onload = function() {
	var fileText=reader.result
	let string="";
	if(input.files[0].name.endsWith(".hkl")){
		file=decode(fileText)
		interpretate(fileText)
	}else if(input.files[0].name.endsWith(".ehkl")){
		try{
			file=encode(fileText)
		}catch(e){
			file="Cannot be encoded"
		}
	}else{
		file="Cannot be loaded, only .hkl and .ehkl files"
	}
	output.innerHTML=/*listToHTML(*/file/*)*/
};

button.onclick=function(){
	reader.readAsText(input.files[0]);
}

if (navigator.clipboard) {

  console.log('Clipboard API available');

}