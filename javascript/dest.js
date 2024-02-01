window.addEventListener('load', function(){
    // get end
    let dst = sessionStorage.getItem("end");
    // areas on map
    let guerrero = document.getElementById("guerrero");
    let scammon = document.getElementById("scammon");
    let ignacio = document.getElementById("ignacio");
    let magdalena = document.getElementById("magdalena");
    let vavaros = document.getElementById("vavaros");

    // add events for hiding/unhiding divs
    guerrero.addEventListener('mouseenter', showInfo);
    guerrero.addEventListener('mouseleave', hideInfo);
    scammon.addEventListener('mouseenter', showInfo);
    scammon.addEventListener('mouseleave', hideInfo);
    ignacio.addEventListener('mouseenter', showInfo);
    ignacio.addEventListener('mouseleave', hideInfo);
    magdalena.addEventListener('mouseenter', showInfo);
    magdalena.addEventListener('mouseleave', hideInfo);
    vavaros.addEventListener('mouseenter', showInfo);
    vavaros.addEventListener('mouseleave', hideInfo);

    // PLACE AREAS/LABELS/POINTS/INFO ON IMAGE 
    let image = document.getElementById("image");
    let w = image.width;
    let h = image.height;
    
    
    remap(guerrero, 0.25, 0.44, w, h);
    remap(scammon, 0.35, 0.47, w, h);
    remap(ignacio, 0.50, 0.52, w, h);
    remap(magdalena, 0.73, 0.60, w, h);
    remap(vavaros, 0.80, 0.77, w, h);

    // MARK POINT IF END IS NOT NULL
    if (dst != null) {
        document.getElementById(dst.charAt(0)).style.color = "red";
    }


    function remap(area, top, left, width, height) {
        // get point/info/label
        let point = document.getElementById(area.id.charAt(0));
        let info = document.getElementById(area.id.slice(0,3));
        let label = document.getElementById(area.id.charAt(0) + "2");
        let t = Math.round(top*height); // height of img times % down from top
        let l = Math.round(left*width); // width of img times % left from side
        let r = l + point.offsetWidth; // right is left + width of point
        let b = t + point.offsetHeight; // bottom is top + height of point
        // place point
        point.style.top = t + "px"; 
        point.style.left = l + "px";
        // place info at bottom right of point
        info.style.top = b + "px";
        info.style.left = r + "px";
        // place label to the left of point
        label.style.top = t + "px";
        label.style.left = (l - label.offsetWidth - 5) + "px";
        // place area on top of point
        area.coords = String(l)+","+String(t)+","+String(r)+","+String(b);
    }

    // show div by setting display = block
    function showInfo(e) {
        let divID = this.id.substring(0,3);
        let infoDiv = document.getElementById(divID);
        infoDiv.style.display = 'block';
    }

    // hide div by setting display = none
    function hideInfo(e) {
        let divID = this.id.substring(0,3);
        let infoDiv = document.getElementById(divID);
        infoDiv.style.display = 'none';
    }

    // event for chosing starting location
    guerrero.addEventListener('click', end);
    scammon.addEventListener('click', end);
    ignacio.addEventListener('click', end);
    magdalena.addEventListener('click', end);
    vavaros.addEventListener('click', end);

    function end(e) {
        sessionStorage.setItem('end', this.id); // store ending point
        let point = this.id.charAt(0); // id of point div
        let ps = ['g', 's', 'i', 'm', 'v']; // list of potential point ids
        for (i=0; i<5; i++) { // iterate through points
            let d = ps[i];
            let div = document.getElementById(d); // get div of current point
            if(d == point) { // if div matches selected point
                div.style.color = 'red'; // color red
            } else { // otherwise 
                div.style.color = 'black'; // color black
            }
        }
    }
});

