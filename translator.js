var fileReader = new FileReader();
let reading=0;
let variables=[];
let classes=[];
let objects=[]
let lastObjectLink=""
let calculation=0
let run=[];
let condition=true;
let loop
let inputValues=[]
let inputVal

function addInput(value){
	inputValues.push(value)
}

function getVariableValue(name){
	for(let x in variables){
		if(variables[x].name=name){
			if(variables[x].isObject){
				return objects[getObjectIdByLink(variables[x].value)]
			}else{
				return variables[x].value
			}
		}
	}
	return null
}

function getObjectIdByLink(link){
	let result=-1;
	for(let i in objects){
		if(objects[i].getLink()==link){
			result=i;
			break;
		}
	}
	return result
}

function objectToString(link){
	let result=""
	for(let i in objects){
		if(objects[i].getLink()==link){
			for(let x in objects[i].attributes){
				result+=objects[i].attributes[x].name+=":";
				if(objects[i].attributes[x].isObject){
					result+=objectToString(objects[i].attributes[x].value)
				}else{
					result+=objects[i].attributes[x].value
				}
				result+=","
			}
		}
	}
	return result
}

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

class Object{
	className=""
	id=""
	getLink(){
		return this.className+"@#"+this.id
	}
	attributes=[]
	append(className){
		this.className=className
		this.id=getRandomArbitrary(0,100000)
		this.attributes=[]
		for(let i in classes){
			if(classes[i].name=className){
				for(let x in classes[i].attributes){
					let y=new Variable()
					y.name=classes[i].attributes[x][0]
					y.value=classes[i].attributes[x][1]
					y.isObject=classes[i].attributes[x][2]
					this.attributes.push(y)
				}
				break;
			}
		}
		lastObjectLink=this.getLink()
	}
}

class Class{
	name=""
	attributes=[]
	newAtribute(name, value, isObject){
		let x=[3]
		x[0]=name
		x[1]=value
		x[2]=isObject;
		this.attributes.push(x)
	}
}

class Variable{
	name=""
	value=""
	isObject=false
}

function getEndIf(start){
	let i=start+1
	while(i<run.length){
		if(run[i][0]=="$"){
			if(run[i].substring(1).trim()=="end if"){
				return i;
			}
			if(run[i].substring(1).trimStart().substring(0,2)=="if"){
				i=getEndIf(i)
			}
		}
		i++;
	}
	return -1;
}

function findVariable(name){
	for(let x in variables){
		if(variables[x].name==name){
			return x
		}
	}
	return -1;
}

function runCommand(command, module){
	if(module==""){
		if(command.startsWith("console ")){
			runCommand(command.substring(8),"console")
		}else if(command.startsWith("calculation")){
			runCommand(command.substring(12),"calculation")
		}else if(command.startsWith("move")){
			runCommand(command.substr(5),"move")
		}else if(command.startsWith("if")){
			runCommand(command.substr(3),"if")
		}else if(command.startsWith("var")){
			runCommand(command.substr(4),"var")
		}else if(command.startsWith("condition")){
			runCommand(command.substr(10),"condition")
		}else if(command.startsWith("class")){
			runCommand(command.substr(6),"class")
		}else if(command.startsWith("object")){
			runCommand(command.substr(7),"object")
		}else if(command.startsWith("input")){
			runCommand(command.substr(6),"input")
		}
	}else if(module.startsWith("console")){
		if(module.startsWith("console write")){
			console.log(command)
		}else if(module.startsWith("console debug")){
			if(variables[findVariable(command)].isObject){
				console.log(objectToString(variables[findVariable(command)].value))
			}else{
				console.log(variables[findVariable(command)].value)
			}
		} else if(module.startsWith("console condition")){
			console.log(condition)
		}else{
			if(command.startsWith("write")){
				runCommand(command.substring(6),"console write")
			}else if(command.startsWith("debug")){
				runCommand(command.substring(6),"console debug")
			}else if(command.startsWith("condition")){
				runCommand(command.substring(10),"console condition")
			}
		}
	}else if(module.startsWith("calculation")){
		if(module.startsWith("calculation reset")){
			calculation=0;
		}else if(module.startsWith("calculation set")){
			calculation=Number(command)
		}else if(module.startsWith("calculation add")){
			if(module.startsWith("calculation add var")){
				calculation+=Number(getVariableValue(command))
			}else{
				if(command.startsWith("var")){
					runCommand(command.substr(4),"calculation add var")
				}else{
					calculation+=Number(command);
				}
			}
		}else if(module.startsWith("calculation substract")){
			if(module.startsWith("calculation substract var")){
				calculation-=Number(getVariableValue(command))
			}else{
				if(command.startsWith("var")){
					runCommand(command.substr(4),"calculation substract var")
				}else{
					calculation-=Number(command);
				}
			}
		} else if(module.startsWith("calculation multiply")){
			if(module.startsWith("calculation multiply var")){
				calculation*=Number(getVariableValue(command))
			}else{
				if(command.startsWith("var")){
					runCommand(command.substr(4),"calculation multiply var")
				}else{
					calculation*=Number(command);
				}
			}
		} else if(module.startsWith("calculation divide")){
			if(module.startsWith("calculation divide var")){
				calculation/=Number(getVariableValue(command))
			}else{
				if(command.startsWith("var")){
					runCommand(command.substr(4),"calculation divide var")
				}else{
					calculation/=Number(command);
				}
			}
		} else if(module.startsWith("calculation power")){
			if(module.startsWith("calculation power var")){
				calculation=Math.pow(calculation,Number(getVariableValue(command)))
			}else{
				if(command.startsWith("var")){
					runCommand(command.substr(4),"calculation power var")
				}else{
					calculation=Math.pow(calculation,Number(command))
				}
			}
		} else if(module.startsWith("calculation write")){
			let index=findVariable(command)
			if(index>-1){
				variables[index].isObject=false;
				variables[index].value=calculation;
			}else{
				console.log("Error: cannot find variable with name "+command)
			}
		} else if(module.startsWith("calculation copy")){
			for(let i in variables){
				if(variables[i].name==command){
					calculation=Number(variables[i].value)
					return null
				}
			}
			console.log("Error: couldn`t find variable with name "+command)
		}else{
			if(command.startsWith("reset")){
				runCommand("","calculation reset")
			}else if(command.startsWith("set")){
				runCommand(command.substr(4),"calculation set")
			}else if(command.startsWith("add")){
				runCommand(command.substr(4),"calculation add")
			}else if(command.startsWith("substract")){
				runCommand(command.substr(10),"calculation substract")
			} else if(command.startsWith("multiply")){
				runCommand(command.substr(9),"calculation multiply")
			} else if(command.startsWith("divide")){
				runCommand(command.substr(7),"calculation divide")
			}else if(command.startsWith("debug")){
				console.log(calculation)
			}else if(command.startsWith("write")){
				runCommand(command.substr(6),"calculation write")
			} else if(command.startsWith("copy")){
				runCommand(command.substr(5),"calculation copy")
			} else if(command.startsWith("power")){
				runCommand(command.substr(6),"calculation power")
			}
		}
	}else if(module.startsWith("move")){
		if(module.startsWith("move by")){
			reading+=Number(command)-1
		}else if(module.startsWith("move to")){
			reading=Number(command)-1
		}else if(module.startsWith("move breakpoint")){
			for(let i in run){
				if(run[i].substr(1).trim()=="breakpoint "+command){
					reading=i
					return null
				}
			}
			console.log("Error: cannot find breakpoint with name "+command)
		}else{
			if(command.startsWith("by")){
				runCommand(command.substr(3),"move by")
			}else if(command.startsWith("to")){
				runCommand(command.substr(3),"move to")
			}else if(command.startsWith("breakpoint")){
				runCommand(command.substr(11),"move breakpoint")
			}
		}
	}else if(module.startsWith("if")){
		if(module.startsWith("if condition")){
			if(!condition){
				for(let i in run){
					if(run[i].substr(1).trim()=='end if '+reading){
						reading=i;
						return 0;
					}
				}
				let result=getEndIf(reading)
				if(result>-1){
					reading=result
				}else{
					console.log("Error: doesn`t found $ end if "+reading)
				}
			}
		}else{
			if(command.startsWith("condition")){
				runCommand(command.substr(10),"if condition")
			}else if(command.startsWith("False")){
				for(let i in run){
					if(run[i].substr(1).trim()=='end if '+reading){
						reading=i;
						return 0;
					}
				}
				console.log("Error: doesn`t found $ end if "+reading)
			}
		}
	}else if(module.startsWith("var")){
		if(module.startsWith("var new")){
			let object=new Variable()
			object.name=command;
			variables.push(object)
		} else if(module.startsWith("var set")){
			let space=command.indexOf(" ");
			let name=command.substr(0,space)
			let value=command.substr(space+1)
			let variable=findVariable(name);
			if(variable>-1){
				variables[variable].isObject=false;
				variables[variable].value=value
			}else{
				console.log("Error: cannot find variable with name "+name)
			}
		} else if(module.startsWith("var copy")){
			let space=command.indexOf(" ");
			let name=command.substr(0,space)
			let value=command.substr(space+1)
			let variable=findVariable(name);
			if(variable>-1){
				let copy=findVariable(value);
				if(copy>-1){
					variables[variable].isObject=variables[copy].isObject;
				variables[variable].value=variables[copy].value
				}else{
					console.log("Error: cannot find variable with name "+value)
				}
			}else{
				console.log("Error: cannot find variable with name "+name)
			}
		}else{ 
			if(command.startsWith("new")){
				runCommand(command.substr(4),"var new")
			}else if(command.startsWith("set")){
				runCommand(command.substr(4),"var set")
			}else if(command.startsWith("copy")){
				runCommand(command.substr(5),"var copy")
			}
		}
	}else if(module.startsWith("condition")){
		if(module=="condition"){
			if(command.startsWith("=")){
				runCommand(command.substr(2),"condition =")
			}else if(command.startsWith(">")){
				runCommand(command.substr(2),"condition >")
			}else if(command.startsWith("<")){
				runCommand(command.substr(2),"condition <")
			}else if(command=="reverse"){
				condition=!condition;
			}
		}else if(module.startsWith("condition =")){
			let spaceId=command.indexOf(" ")
			let firstVarId=findVariable(command.substr(0,spaceId));
			let secondVarId=findVariable(command.substr(spaceId+1));
			if((firstVarId>-1)&&(secondVarId>-1)){
				condition=(variables[firstVarId].value==variables[secondVarId].value)
			}else{
				if(firstVarId==-1){
					if(secondVarId==-1){
						console.log("Error: variables"+command.substr(0,spaceId)+" and " + command.substr(spaceId+1) + " doesn`t exist")
					}else{
						console.log(`Error: variable ${command.substr(0,spaceId)} is not exist`)
					}
				}else{
					console.log(`Error: variable ${command.substr(spaceId+1)} is not exist`)
				}
			}
		}else if(module.startsWith("condition >")){
			let spaceId=command.indexOf(" ")
			let firstVarId=findVariable(command.substr(0,spaceId));
			let secondVarId=findVariable(command.substr(spaceId+1));
			if((firstVarId>-1)&&(secondVarId>-1)){
				condition= (Number(variables[firstVarId].value) > Number(variables[secondVarId].value))
			}else{
				condtion=false;
				if(firstVarId==-1){
					if(secondVarId==-1){
						console.log("Error: variables"+command.substr(0,spaceId)+" and " + command.substr(spaceId+1) + " doesn`t exist")
					}else{
						console.log(`Error: variable ${command.substr(0,spaceId)} is not exist`)
					}
				}else{
					console.log(`Error: variable ${command.substr(spaceId+1)} is not exist`)
				}
			}
		}else if(module.startsWith("condition <")){
			let spaceId=command.indexOf(" ")
			let firstVarId=findVariable(command.substr(0,spaceId));
			let secondVarId=findVariable(command.substr(spaceId+1));
			if((firstVarId>-1)&&(secondVarId>-1)){
				condition= (Number(variables[firstVarId].value) < Number(variables[secondVarId].value))
			}else{
				condtion=false;
				if(firstVarId==-1){
					if(secondVarId==-1){
						console.log("Error: variables"+command.substr(0,spaceId)+" and " + command.substr(spaceId+1) + " doesn`t exist")
					}else{
						console.log(`Error: variable ${command.substr(0,spaceId)} is not exist`)
					}
				}else{
					console.log(`Error: variable ${command.substr(spaceId+1)} is not exist`)
				}
			}
		}
	}else if(module.startsWith("class")){
		if(module=="class"){
			if(command.startsWith("new")){
				runCommand(command.substr(4),"class new")
			}else if(command.startsWith("add")){
				runCommand(command.substr(4),"class add")
			}else if(command.startsWith("extends")){
				runCommand(command.substr(8),"class extends")
			}
		}else if(module.startsWith("class new")){
			if(module=="class new"){
				let find=-1;
				for(let i in classes){
					if(classes[i].name==command){
						find=i;
						break;
					}
				}
				if(find==-1){
					let x=new Class();
					x.name=command;
					classes.push(x)
				}else{
					classes[i].atributes=[];
				}
			}
		}else if(module.startsWith("class add")){
			let space=command.indexOf(" ")
			let target=command.substr(0,space)
			let name=command.substr(space+1);
			let targetClass=-1
			for(let check in classes){
				if(classes[check].name==target){
					targetClass=check;
					break;
				}
			}
			if(targetClass!=-1){
				let checkAttribute=-1
				for(let i in classes[targetClass].attributes){
					if(classes[targetClass].attributes[i].name==name){
						checkAttribute=i;
						break;
					}
				}
				if(checkAttribute==-1){
					classes[targetClass].newAtribute(name);
				}else{
					console.log("Error: already exist attribute with name "+name+" in class "+target)
				}
			}else{
				console.log("Error: class with name "+target+" not found")
			}
		}else if(module.startsWith("class extends")){
			let space=command.indexOf(" ")
			let target=command.substr(0,space)
			let name=command.substr(space+1);
			let targetClass=-1
			for(let check in classes){
				if(classes[check].name==target){
					targetClass=check;
					break;
				}
			}
			if(targetClass!=-1){
				let fromClass=-1;
				for(let check in classes){
					if(classes[check].name=name){
						fromClass=check
						break;
					}
				}
				if(fromClass>-1){
					classes[targetClass].attributes=classes[fromClass].attributes
				}else{
					console.log("Error: class with name "+name+" not found")
				}
			}else{
				console.log("Error: class with name "+target+" not found")
			}
		}
	}else if(module.startsWith("object")){
		if(module=="object"){
			if(command.startsWith("new")){
				runCommand(command.substr(4),"object new")
			}else if(command.startsWith("write")){
				runCommand(command.substr(6),"object write")
			}else if(command.startsWith("attribute")){
				runCommand(command.substr(10),"object attribute")
			}
		}else if(module.startsWith("object new")){
			let newObject=new Object()
			newObject.append(command)
			objects.push(newObject)
		}else if(module.startsWith("object write")){
			let index=findVariable(command)
			if(index>-1){
				variables[index].isObject=true;
				variables[index].value=lastObjectLink;
			}else{
				console.log("Error: cannot find variable with name "+command)
			}
		}else if(module.startsWith("object attribute")){
			if(module=="object attribute"){
				if(command.startsWith("set")){
					runCommand(command.substr(4),"object attribute set")
				}else if(command.startsWith("parse")){
					runCommand(command.substr(6),"object attribute parse")
				}
			}else if(module.startsWith("object attribute set")){
				let space=command.indexOf(" ");
				if(space==-1){
					console.log("Error: cannot find the space")
				}else{
					let first=command.substr(0,space)
					let second=command.substr(space+1)
					let target=getObjectIdByLink(lastObjectLink)
					if(target>-1){
						for(let i in objects[target].attributes){
							if(objects[target].attributes[i].name==first){
								objects[target].attributes[i].value=variables[findVariable(second)].value;
								objects[target].attributes[i].isObject=variables[findVariable(second)].isObject;
								return 0;
							}
						}
						console.log("Error: attribute not found")
					}else{
						console.log("Error: cannot find object")
					}
				}
			}else if(module.startsWith("object attribute parse")){
				let space=command.indexOf(" ");
				if(space==-1){
					console.log("Error: cannot find the space")
				}else{
					let first=command.substr(0,space)
					let second=command.substr(space+1)
					let target=getObjectIdByLink(lastObjectLink)
					if(target>-1){
						for(let i in objects[target].attributes){
							if(objects[target].attributes[i].name==first){
								objects[target].attributes[i].value=second
								return 0;
							}
						}
						console.log("Error: attribute not found")
					}else{
						console.log("Error: cannot find object")
					}
				}
			}
		}
	}else if(module.startsWith("input")){
		if(module=="input"){
			if(command.startsWith("get")){
				runCommand(command.substr(4),"input get")
			}else if(command.startsWith("write")){
				runCommand(command.substr(6),"input write")
			}
		}else if(module=="input get"){
			let i=Number(command)
			if((i>-1)&&(i<inputValues.length)){
				if(typeof inputValues[i]=="object" || typeof inputValues[i]=="function"){
					console.log("Input error: Type of input cannot be object or functio")
				}else{
					inputVal=inputValues[i]
				}
			}else{
				console.log("Input error: can not find input with id "+i)
			}
		}else if(module=="input write"){
			let varId=findVariable(command)
			if(varId>-1){
				variables[varId].isObject=false
				variables[varId].value=inputVal
			}else{
				console.log("Variable error: Cannot find variable with name "+command)
			}
		}
	}
}

function interpretate(text){
	let list=[];
	let string=""
	for(let i in text){
		if((text[i]==";")||(text[i]=="\n")){
			if(string.length>0){
				if(string[0]=="$"){
					list.push(string)
				}
			}
			string="";
		}else if(!((text[i]=="\t")||(text[i]=="\r"))){
			string+=text[i];
		}
	}
	translator(list)
}

function oneRun(){
	if(run[reading][0]!='$'){
		return
	}
	runCommand(run[reading].substring(1).trim(),"")
	reading++;
	if(reading>run.length-1){
		end()
	}
}

function translator(text){
	run=text;
	variables=[];
	classes=[];
	objects=[]
	lastObjectLink=""
	calculation=0
	reading=0
	condition=true;
	inputVal=""
	loop=setInterval(oneRun,10)
}

function end(){
	if(loop!=null){
		clearInterval(loop)
		loop=null
		inputValues=[]
	}
}