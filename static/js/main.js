queue()
  .defer(d3.csv,'Given_Newborn_Name_by_Year.csv')
  .await(draw);

var sp, pc, map, theList, selected = [], girlnames = [], boynames = [];

function draw(error, data){
  if (error) throw error;
  
	
	selected = data; 
	theList = makeUL(data);
	pc = new graf(selected);
	setListColors();
	sortNames();
}



function makeUL(array) {
    // Create the list element:
    var list = document.getElementById('listan');
	console.log(1);
    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(d3.values(array[i])[0]));
        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}



function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("listan");
    a = div.getElementsByTagName("li");
	console.log("a=" + a);
    for (i = 0; i < a.length; i++) {
		if(filter.length < 1){
			a[i].style.display = "";
		}
		else{
			for(j = 0; j < filter.length; j++) {
				if (a[i].innerHTML.toUpperCase().substring(0,j+1) == filter.toUpperCase().substring(0,j+1)){
					a[i].style.display = "";
				} else {
					a[i].style.display = "none";
				}
			}
		}
	}
}

function setListColors()
{
	var children = document.getElementById('listan').getElementsByTagName("li");
	console.log(children[2]);
	for(var i=0;i<children.length;i++)
	{
		children[i].style.color = pc.getColors(i);
	}
	
}

document.getElementById('listan').addEventListener('click',function(ev){

	var children = document.getElementById('listan').getElementsByTagName("li");
	for(var i=0; i<children.length; i++)
	{
		if(ev.target.innerText == children[i].innerText)
		{
			pc.selectLine(i);
		}
			//console.log(i);
	}

	if(ev.target.tagName == 'LI')
	{
		
		console.log(ev.target.innerText);
	}
	
},false);

function sortLines(letter)
{
	var children = document.getElementById('listan').getElementsByTagName("li");
	pc.removeLines();
	for(var i=0; i<children.length; i++)
	{
		if(letter == children[i].innerText.charAt(0))
		{
			pc.selectLine(i);
		}
	}

	
}

function girlNames()
{	
	pc.removeLines();
	
	for(var i=0; i<girlnames.length; i++)
	{
		pc.selectLine(i);
	}	
}


function boyNames()
{	
	pc.removeLines();
	
	for(var i=0; i<boynames.length; i++)
	{
		pc.selectLine(boynames[i]);
	}	
}


function sortNames()
{
	var children = document.getElementById('listan').getElementsByTagName("li");
	var isBoys = false;
	
	var visitedLetters = [['A',false],['B',false],['C',false],['D',false],['E',false],['F',false],['G',false],['H',false],['I',false],['J',false],['K',false],['L',false],['M',false],['N',false],['O',false],['P',false],['Q',false],['R',false],['S',false],['T',false],['U',false],['V',false],['W',false],['X',false],['Y',false],['Z',false],['Å',false],['Ä',false],['Ö',false]];
	var currLetter = 0;
	
	
	for(var i=0; i<children.length; i++)
	{	
		
		if(!isBoys)
		{
			girlnames.push(i);
			if(children[i].innerText.charAt(0) != children[i+1].innerText.charAt(0)){
				currLetter++;
				
				for(var k=0; k<visitedLetters.length;k++)
				{
					if(children[i+1].innerText.charAt(0) == visitedLetters[k][0] && visitedLetters[k][1] == true)
					{
						isBoys = true;
					}
				
				}
				
				for(var j=0;j<currLetter;j++)
				{
					visitedLetters[j][1] = true;
				}
			}
			
		}
		else
		{
			//console.log(children[i]);
			boynames.push(i);
		}
			
			//console.log("Last letter:" + lastLetter + " last index:" + lastIndex);
	}
	//console.log(girlnames);
	//console.log("Boys: ");
	//console.log(boynames);
	
	
}

