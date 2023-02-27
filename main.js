window.onload = () => {
  let basename = "cat";

  // https://openseadragon.github.io/docs/
  viewer = OpenSeadragon({
    id: 'map',
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
    document.getElementById("nombre").innerHTML = interpretation_zoom(zoom);
  });

  viewer.viewport.zoomTo(1);
}

function interpretation_zoom (zoom) {
  return Math.round(zoom);
}
