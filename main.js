window.onload = () => {
  // BASENAME DEFINI DANS LES FICHIERS HTML

  let id_el_osd = "map";
  let set_min_zoom = false;
  let delai_disparition_logo = 500; // 2000ms
  //const portraitOuverture = window.matchMedia('(orientation: portrait)').matches;
  const portraitChangement = window.matchMedia('(orientation: portrait)');

  // https://openseadragon.github.io/docs/
 let viewer = OpenSeadragon({
    id: id_el_osd,
    prefixUrl: `ressources/${basename}_files/`,
    tileSources: `ressources/${basename}.dzi`,
    showNavigator: true,
    navigatorPosition: "ABSOLUTE",
    navigatorTop:      "100px",
    navigatorLeft:     "4px",
    navigatorHeight:   "120px",
    navigatorWidth:    "145px",
    navigatorHeight:   "90px",
    navigatorWidth:    "125px",
    defaultZoomLevel: 2,
    minZoomLevel: 1,
    visibilityRatio: 1,
    constrainDuringPan: true,
    showNavigationControl: false,
  });

  viewer.addHandler("zoom", (ev) => {
    let zoom = ev.zoom;

    if(set_min_zoom) {
      set_min_zoom = false;
      viewer.viewport.minZoomLevel = Math.ceil(zoom);
    }

    document.getElementById("nombre").innerHTML = interpretation_zoom(zoom);
  });

  // Detect Landscape or Portrait mode
  portraitChangement.addEventListener('change', () => {
    location.reload()
  });

  //Zoom initial vertical
  let containerv = document.getElementById(id_el_osd);
  if(containerv.clientHeight > containerv.clientWidth) {
    setTimeout(() => {
      viewer.viewport.fitVertically();
      set_min_zoom = true;
      viewer.minZoomLevel = containerv.clientHeight
    }, delai_disparition_logo);
  }

  // Cacher le logo
  setTimeout(() => {
    document.getElementById("logo").classList.add("cache");

  // Permettre l'interaction
  setTimeout(() => {
      document.getElementById("logo").style.display = "none";
    }, 2000) // Temps indiqué dans style.css pour la transition d'opacity
  }, delai_disparition_logo);
}

function interpretation_zoom (zoom) {
  return Math.round(zoom) * 250;
}
