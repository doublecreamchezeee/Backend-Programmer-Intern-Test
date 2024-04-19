import d3 from "./d3.js"

export function setupSvg(svg, zoom_polite) {
    const view = svg.querySelector('.view')
    const zoom = d3.zoom().on("zoom", zoomed)

    d3.select(svg).call(zoom)
    svg.__zoomObj = zoom

    function zoomed(e) {
        d3.select(view).attr("transform", e.transform);
    }
}

function TreePosition({ t, svg }) {
    const zoom = svg.__zoomObj
    d3.select(svg).transition().call(zoom.transform, d3.zoomIdentity.scale(t.k).translate(t.x, t.y))
}

export function CalculateTreeScreenFit(svg_dim, tree_dim) {
    let k = Math.min(svg_dim.width / tree_dim.width, svg_dim.height / tree_dim.height),
        x = tree_dim.x_off + (svg_dim.width - tree_dim.width * k) / k / 2,
        y = tree_dim.y_off + (svg_dim.height - tree_dim.height * k) / k / 2

    if (k > 1) { x *= k; y *= k; k = 1; }
    return { k, x, y }
}

export function TreeScreenFit({ svg, svg_dim, tree_dim, with_transition, transition_time }) {
    const t = CalculateTreeScreenFit(svg_dim, tree_dim);
    TreePosition({ t, svg, with_transition, transition_time })
}



