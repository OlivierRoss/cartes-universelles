window.onload = () => {
  let basename = "cat";
  viewer = OpenSeadragon({
    id: 'map',
    prefixUrl: `ressources/${basename}_files/`,
    tileSources: `ressources/${basename}.dzi`,
    showNavigationControl: false // https://github.com/openseadragon/openseadragon/issues/1424
  });

  viewer.addHandler("zoom", (ev) => {
    let zoom = ev.zoom;
    document.getElementById("nombre").innerHTML = interpretation_zoom(zoom); // https://css-tricks.com/methods-contrasting-text-backgrounds/
  });
}

function interpretation_zoom (zoom) {
  return Math.round(zoom);
}

