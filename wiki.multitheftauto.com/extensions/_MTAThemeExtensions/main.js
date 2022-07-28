function makeTitleLowercaseFirstLetter() {
	var content = document.getElementById("content");
	var h1Elements = content.getElementsByTagName("h1");
	if ( h1Elements.length != 0 ) {
		var current =  h1Elements[0].innerHTML;
		h1Elements[0].innerHTML = current[0].toLowerCase() + current.substr(1);

		document.title = document.title[0].toLowerCase() + document.title.substr(1);
	}
}

function removeNamespaceName () {
	var content = document.getElementById("content");
	var h1Elements = content.getElementsByTagName("h1");
	if ( h1Elements.length != 0 ) {
		var current =  h1Elements[0].innerHTML;
		h1Elements[0].innerHTML = current.substr(current.indexOf(":")+1);

		document.title = document.title.substr(document.title.indexOf(":")+1);
	}
}

function setHeadingClass(className, subcaption) {
	var content = document.getElementById("content");
	var h1Elements = content.getElementsByTagName("h1");

	if ( h1Elements.length != 0 ) {

		var highlightDiv = document.createElement("div");
		highlightDiv.className = "sectionSubCaption";
		highlightDiv.innerHTML = subcaption;

                h1Elements[0].parentNode.insertBefore(highlightDiv, h1Elements[0]);

		var color = className;
		if ( color.charAt(0) != "#" )
		{
			if ( className == "server" )
				color = "rgb(232, 115, 0)";
			else if ( className == "client" )
				color = "rgb(255, 50, 50)";
			else if ( className == "both" )
				color = "rgb(117, 117, 255)";
			else if ( className == "http" )
				color = "rgb(0, 156, 0)";
			else if ( className == "resource" )
				color = "rgb(209, 0, 209)";
			else
				color = "#797979"; // default to mid gray if we don't know this name
		}

		content.style.border = "2px solid " + color;

		if (document.body.classList.contains('skin-vector')) {
			content.style.marginTop = '0px';
		} else if (document.body.classList.contains('skin-darkvector')) {
                        content.style.borderRadius = '10px';
                        //content.style.borderRight = '0';
                        //content.style.borderLeft = '0';
                        content.style.borderWidth = '3px';
                }

		h1Elements[0].style.borderBottom = "3px solid " + color
		h1Elements[0].style.marginBottom = ".1em"
		highlightDiv.style.color = color;
	}
}

function expandSection(sectionnumber) {
	var sec = document.getElementById("section" + sectionnumber);
	var sectionExpander = document.getElementById("sectionExpander" + sectionnumber);
	if ( sec.style.display == "none" )
	{
		sec.style.display = "";
		sectionExpander.innerHTML = "Click to collapse [-]";
	}
	else
	{
		sec.style.display = "none";
		sectionExpander.innerHTML = "Click to expand [+]";
	}
}

var metas = document.getElementsByTagName('meta');

for (var i=0; i<metas.length; i++) {
  var name = metas[i].getAttribute("name");
  if (name == "lowercasetitle") {
     makeTitleLowercaseFirstLetter();
  } else if (name == "removenamespace") {
     removeNamespaceName ();
  } else if (name == "headingclass") {
     setHeadingClass(metas[i].getAttribute("data-class"),metas[i].getAttribute("data-subcaption"));
  }
}
