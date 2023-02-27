window.onload = () => {
  let basename = "cat";
  let id_el_osd = "map";
  let set_min_zoom = false;

  // https://openseadragon.github.io/docs/
  viewer = OpenSeadragon({
    id: id_el_osd,
    prefixUrl: `ressources/${basename}_files/`,
    tileSources: `ressources/${basename}.dzi`,
    defaultZoomLevel: 1,
    minZoomLevel: 1,
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

  // Zoom initial
  let container = document.getElementById(id_el_osd);
  if(container.clientHeight > container.clientWidth) {
    setTimeout(() => {
      viewer.viewport.fitVertically();
      set_min_zoom = true;
    }, 1000)
  }
}

function interpretation_zoom (zoom) {
  return Math.round(zoom);
}
