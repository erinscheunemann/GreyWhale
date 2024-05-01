window.addEventListener('load', function(){
    // get start
    let strt = sessionStorage.getItem("start");
    // city areas on map
    let siberian = document.getElementById("siberian");
    let chukchi = document.getElementById("chukchi");
    let barrow = document.getElementById("barrow");

    // events for hiding/unhiding divs
    siberian.addEventListener('mouseenter', showInfo);
    siberian.addEventListener('mouseleave', hideInfo);
    chukchi.addEventListener('mouseenter', showInfo);
    chukchi.addEventListener('mouseleave', hideInfo);
    barrow.addEventListener('mouseenter', showInfo);
    barrow.addEventListener('mouseleave', hideInfo);

    // PLACE AREAS/LABELS/POINTS/INFO ON IMAGE 
    let image = document.getElementById("image");
    let div = document.getElementById("img");
    let w = image.width;
    let h = image.height;

    

    remap(siberian, 0.02, 0.32, w, h);
    remap(chukchi, 0.08, 0.39, w, h);
    remap(barrow, 0.02, 0.56, w, h);

    // MARK POINT IF START IS NOT NULL
    if (strt != null) {
        this.document.getElementById(strt.charAt(0)).style.color = "red";
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
        // place label to the left of point
        label.style.top = t + "px";
        label.style.left = (l - label.offsetWidth - 5) + "px";
        // place info at bottom right of point
        info.style.top = b + "px";
        info.style.left = r + "px";
        // account for offset of image from edge
        let offset = Math.round((div.offsetWidth - image.offsetWidth)/2);
        l = l - offset;
        r = r - offset;
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
    siberian.addEventListener('click', start);
    chukchi.addEventListener('click', start);
    barrow.addEventListener('click', start);

    function start(e) {
        sessionStorage.setItem('start', this.id); // store starting point
        let point = this.id.charAt(0); // id of point div
        let ps = ['s', 'c', 'b']; // list of potential point ids
        for (i=0; i<3; i++) { // iterate through points
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

