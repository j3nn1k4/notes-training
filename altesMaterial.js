var day = 5;
switch (day){
	case 1:
	document.write("Monday");
	break;
	case 2:
	document.write("Tuesday");
	break;
	case 3:
	document.write("Wednesda");
	break;
	default:
	document.write("Not Saturday");
}

var i=1;

for (i=1; i<=5; i++){
	document.write(i+"<br/>");
}

while (i<=10){
	document.write(i+"<br/>");
	i++;
}

var sum=0; 
for(i=4; i<8; i++) {
  if (i == 6) {
    continue; 
  }
  sum += i;
}
document.write(sum);

function multiplication(a,b){
	var c = a*b;
	return c;
}


document.write(multiplication(4,95));

function person (name, age){
	this.name = name;
	this.age = age;
	this.changeName = function (name) {
		this.name = name;
	}
}

var p = new person("Luki", 23);
document.write(p.name)
p.changeName("Lukas");

document.write(p.name)