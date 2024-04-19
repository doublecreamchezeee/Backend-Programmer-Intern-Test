import d3 from "./d3.js"
import { setupSvg, TreeScreenFit } from "./TreePosition.js"
import { createLinks, createPath } from "../components/Link.js"
import { Card as CardDefault } from "../components/Card.js"

export default function TreeDisplay({ store, cont, Card }) {
    const svg = createSvg();
    setupSvg(svg);

    return { update: updateView, svg, setCard: card => Card = card }

    function updateView(props) {
        if (!props) props = {}
        const tree = store.state.tree,
            view = d3.select(svg).select(".view")
        updateCards();
        updateLinks();
        TreeScreenFit({ svg, svg_dim: svg.getBoundingClientRect(), tree_dim: tree.dim, transition_time: 0 })
        return true

        function updateLinks() {
            // Prepare the data for the links by reducing the tree data.
            const links_data = tree.data.reduce((acc, d) => acc.concat(createLinks({ d, tree: tree.data })), []);

            // Bind the data to SVG elements representing the links.
            const link = view.select(".links_view").selectAll("path.link").data(links_data, d => d.id);

            // Enter Selection: Handle new links to be added.
            const link_enter = link.enter().append("path").attr("class", "link");
            link_enter.each(linkEnter);

            // Update Selection: Handle existing and new links.
            const link_update = link_enter.merge(link);
            link_update.each(linkUpdate);

            // Function called for each new link in the enter selection.
            function linkEnter(d) {
                // Create and style each new link path with initial attributes.
                d3.select(this).attr("fill", "none").attr("stroke", "#fff").style("opacity", 0)
                    .attr("d", createPath(d, true));
            }

            // Function called for each link in the update selection.
            function linkUpdate(d) {
                // Update existing link paths with new path data and opacity.
                const path = d3.select(this);
                path.transition('path').attr("d", createPath(d)).style("opacity", 1);
            }
        }

        function updateCards() {
            const card = view.select(".cards_view").selectAll("g.card_cont").data(tree.data, d => d.data.id),
                card_enter = card.enter().append("g").attr("class", "card_cont"),
                card_update = card_enter.merge(card)

            function calculateEnterAndExitPositions(d, entering, exiting) {
                d.exiting = exiting
                if (entering) {
                    if (d.depth === 0 && !d.spouse) { d._x = d.x; d._y = d.y }
                    else if (d.spouse) { d._x = d.spouse.x; d._y = d.spouse.y; }
                    else if (d.is_ancestry) { d._x = d.parent.x; d._y = d.parent.y; }
                    else { d._x = d.psx; d._y = d.parent.y; }
                } else if (exiting) {
                    const x = d.x > 0 ? 1 : -1,
                        y = d.y > 0 ? 1 : -1
                    { d._x = d.x + 400 * x; d._y = d.y + 400 * y; }
                }
            }

            card_enter.each(d => calculateEnterAndExitPositions(d, true, false))
            card_update.each(cardUpdate)

            function cardUpdate(d) {
                this.innerHTML = ""
                this.appendChild(CardElement(this, d))
                d3.select(this).transition().attr("transform", `translate(${d.x}, ${d.y})`).style("opacity", 1)
            }
            function CardElement(node, d) {
                if (Card) return Card({ node, d })
                else return CardDefault({ store, svg })({ node, d })
            }
        }
    }

    function createSvg() {
        const svg_dim = cont.getBoundingClientRect(),
            svg_html = (`
        <svg class="main_svg">
          <rect width="${svg_dim.width}" height="${svg_dim.height}" fill="transparent" />
          <g class="view">
            <g class="links_view"></g>
            <g class="cards_view"></g>
          </g>
          <g style="transform: translate(100%, 100%)">
            <g class="fit_screen_icon cursor-pointer" style="transform: translate(-50px, -50px); display: none">
              <rect width="27" height="27" stroke-dasharray="${27 / 2}" stroke-dashoffset="${27 / 4}" 
                style="stroke:#fff;stroke-width:4px;fill:transparent;"/>
              <circle r="5" cx="${27 / 2}" cy="${27 / 2}" style="fill:#fff" />          
            </g>
          </g>
        </svg>
      `)
        const tree_cont = document.createElement("div")
        tree_cont.innerHTML = svg_html
        const svg = tree_cont.firstElementChild
        cont.innerHTML = ""
        cont.appendChild(svg)

        return svg
    }
}