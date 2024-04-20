import d3 from "../utils/d3";

// Function to create paths for links
export function createPath(d) {
    // Define line generators for different curve types
    const line = d3.line().curve(d3.curveMonotoneY),
        lineCurve = d3.line().curve(d3.curveBasis),
        
        path_data = d.d;

    // Return the path string based on whether a curve is specified
    if (!d.curve) return line(path_data);
    else if (d.curve === true) return lineCurve(path_data);
}

// Function to create links between family members
export function createLinks({ d, tree, is_vertical }) {
    const links = [];

    // Function to handle links connecting a person to their parents
    function handleAncestrySide({ d }) {
        // Check if the person has both parents
        if (!d.parents || d.parents.length !== 2) return;
        // Calculate the midpoint between the parents
        const p1 = d.parents[0], p2 = d.parents[1];
        const p = { x: getMid(p1, p2, 'x'), y: getMid(p1, p2, 'y') };
        // Create a link and add it to the array
        links.push({
            d: Link(d, p),
            curve: true, id: linkId(d, d.parents[0], d.parents[1]), depth: d.depth + 1, is_ancestry: true
        });
    }

    // Function to handle links connecting a person to their children
    function handleProgenySide({ d }) {
        // Check if the person has children
        if (!d.children || d.children.length === 0) return;
        // Iterate over each child
        d.children.forEach((child) => {
            // Find the position of the other parent
            console.log('value pass', child, d, tree)
            const other_parent = otherParent(child, d, tree)
            const sx = other_parent.sx
            // Create a link and add it to the array
            links.push({
                d: Link(child, { x: sx, y: d.y }),
                curve: true, id: linkId(child, d, other_parent), depth: d.depth + 1
            });
        });
    }

    // Function to handle links connecting a person to their spouse(s)
    function handleSpouse({ d }) {
        // Check if the person has spouse(s)
        if (d.data.rels.spouses && d.data.rels.spouses.length > 0) {
            // Iterate over each spouse
            d.data.rels.spouses.forEach(sp_id => {
                // Find the spouse in the tree data
                const spouse = tree.find(d0 => d0.data.id === sp_id);
                // Create a link and add it to the array
                links.push({
                    d: [[d.x, d.y], [spouse.x, spouse.y]],
                    curve: false, id: [d.data.id, spouse.data.id].join(", "), depth: d.depth, spouse: true, is_ancestry: spouse.is_ancestry
                });
            });
        }
    }

    if (d.data.rels.spouses && d.data.rels.spouses.length > 0) handleSpouse({ d });
    handleAncestrySide({ d });
    handleProgenySide({ d });

    return links;
}

// Function to calculate the midpoint between two points
function getMid(d1, d2, side, is_) {
    return d1[side] - (d1[side] - d2[side]) / 2;
}

// Function to create a link path between two points
function Link(d, p) {
    const hy = (d.y + (p.y - d.y) / 2);
    return [
        [d.x, d.y],
        [d.x, hy],
        [d.x, hy],
        [p.x, hy],
        [p.x, hy],
        [p.x, p.y],
    ];
}

// Function to create a unique ID for a link based on the connected nodes
function linkId(...args) {
    return args.map(d => d.data.id).sort().join(", "); // make unique id
}

// Function to find the other parent of a child
function otherParent(d, p1, data) {
    console.log(data.find(d0 => (d0.data.id !== p1.data.id) && ((d0.data.id === d.data.rels.mother) || (d0.data.id === d.data.rels.father))))
    return data.find(d0 => (d0.data.id !== p1.data.id) && ((d0.data.id === d.data.rels.mother) || (d0.data.id === d.data.rels.father)));
}
