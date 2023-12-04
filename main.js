window.onload = () => {
  // BASENAME DEFINI DANS LES FICHIERS HTML

  let id_el_osd = "map";
  let set_min_zoom = false;
  let delai_disparition_logo = 500; // 2000ms

  // https://openseadragon.github.io/docs/
  viewer = OpenSeadragon({
    id: id_el_osd,
    prefixUrl: `ressources/${basename}_files/`,
    tileSources: `ressources/${basename}.dzi`,
    showNavigator: true,
    navigatorPosition: "BOTTOM_LEFT",
    defaultZoomLevel: 0.9,
    minZoomLevel: 0.5,
    visibilityRatio: 1,
    constrainDuringPan: true,
    showNavigationControl: false
  });

  viewer.addHandler("zoom", (ev) => {
    let zoom = ev.zoom;

    if(set_min_zoom) {
      set_min_zoom = false;
      viewer.viewport.minZoomLevel = Math.ceil(zoom);
    }

    document.getElementById("nombre").innerHTML = interpretation_zoom(zoom);
  });

  // Reload when device orientation changes
  if (window.DeviceOrientationEvent) {
    window.addEventListener('orientationchange', function() { location.reload(); }, false);
}

  // Zoom initial
  let container = document.getElementById(id_el_osd);
  if(container.clientHeight > container.clientWidth) {
    setTimeout(() => {
      viewer.viewport.fitVertically();
      set_min_zoom = true;
    }, delai_disparition_logo)
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
  return Math.round(zoom) //* 250;
}
