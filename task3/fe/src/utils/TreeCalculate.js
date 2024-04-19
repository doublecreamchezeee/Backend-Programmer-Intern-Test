import d3 from "./d3"

export default function Tree({ data_stash, main_id = null, is_vertical = true, node_separation = 250, level_separation = 150 }) {
  const main = main_id !== null ? data_stash.find(d => d.id === main_id) : data_stash[0],
    tree_children = TreePositions(main, 'children', false),
    tree_parents = TreePositions(main, 'parents', true)

  data_stash.forEach(d => d.main = d === main)
  levelOutEachSide(tree_parents, tree_children)
  const tree = mergeSides(tree_parents, tree_children)
  setupChildrenAndParents({ tree })
  setupSpouses({ tree, node_separation })
  nodePositioning({ tree, is_vertical })

  const dim = TreeDim(tree, node_separation, level_separation, is_vertical)

  return { data: tree, data_stash, dim }


  /**
   * TreePositions function calculates the positions of nodes in the tree structure based on the provided data.
   * @param {Object} datum - The root node of the tree or subtree.
   * @param {string} rt - Type of relationship to calculate positions for ('children' or 'parents').
   * @param {boolean} is_ancestry - Indicates whether the relationship is ancestry or descendants.
   * @returns {Array} An array of descendants nodes in the tree structure.
   */
  function TreePositions(datum, rt, is_ancestry) {
    // Determine the hierarchy getter function based on the relationship type
    const hierarchyGetter = rt === "children" ? hierarchyGetterChildren : hierarchyGetterParents;

    // Create a d3 tree layout with specified nodeSize and separation functions
    const d3_tree = d3.tree().nodeSize([node_separation, level_separation]).separation(separation);

    // Construct the hierarchical tree structure and sort nodes by birthday
    const root = d3.hierarchy(datum, hierarchyGetter).sort(function (a, b) {
      return new Date(a.data.data.birthday) - new Date(b.data.data.birthday);
    });
    // Generate tree layout for the root node
    d3_tree(root);

    // Return an array of descendants nodes in the tree structure
    return root.descendants()

    /**
     * separation function calculates the separation between two nodes based on their relationship.
     * @param {Object} a - First node.
     * @param {Object} b - Second node.
     * @returns {number} Separation offset between the two nodes.
     */
    function separation(a, b) {
      let offset = 1;
      if (!is_ancestry) {
        if (!sameParent(a, b)) offset += 0.25;
        if (someSpouses(a, b)) offset += offsetOnPartners(a, b);
        if (sameParent(a, b) && !sameBothParents(a, b)) offset += 0.125;
      }
      return offset;
    }

    // function hasCh(d) {return !!d.children}
    function sameParent(a, b) { return a.parent === b.parent }
    function sameBothParents(a, b) { return (a.data.rels.father === b.data.rels.father) && (a.data.rels.mother === b.data.rels.mother) }
    // function someChildren(a, b) {return hasCh(a) || hasCh(b)}
    function hasSpouses(d) { return d.data.rels.spouses && d.data.rels.spouses.length > 0 }
    function someSpouses(a, b) { return hasSpouses(a) || hasSpouses(b) }

    // Function to retrieve children of a node
    function hierarchyGetterChildren(d) {
      // If the node has children in its 'rels' property, map over the children IDs
      // and return an array of corresponding child nodes from the 'data_stash'
      return [...(d.rels.children || [])].map(id => data_stash.find(d => d.id === id));
    }

    // Function to retrieve parents of a node
    function hierarchyGetterParents(d) {
      console.log(d.rels);

      // Check if the node has both 'father' and 'mother' properties in its 'rels'
      if (!d.rels?.hasOwnProperty("father") || !d.rels?.hasOwnProperty("mother")) return;

      // If the node has parents, filter out any null values and map over the parent IDs
      // Return an array containing the corresponding parent nodes from the 'data_stash'
      return [d.rels?.father, d.rels?.mother].filter(d => d).map(id => data_stash.find(d => d.id === id));
    }

    // Function to calculate offset based on the number of spouses
    function offsetOnPartners(a, b) {
      // Calculate the maximum number of spouses between the two nodes
      const maxSpouses = Math.max((a.data.rels?.spouses || []).length, (b.data.rels?.spouses || []).length);
      // Return the offset, which is half of the maximum number of spouses plus 0.5
      return (maxSpouses * 0.5) + 0.5;
    }
  }

  /**
   * levelOutEachSide function adjusts the positions of parents and children nodes to level out both sides of the tree.
   * @param {Array} parents - Array of parent nodes.
   * @param {Array} children - Array of child nodes.
   */
  function levelOutEachSide(parents, children) {
    // Calculate the difference in x positions between the first parent and first child
    const mid_diff = (parents[0].x - children[0].x) / 2;

    // Adjust x positions of parent nodes
    parents.forEach(d => d.x -= mid_diff);

    // Adjust x positions of child nodes
    children.forEach(d => d.x += mid_diff);
  }

  /**
   * mergeSides function merges parent and child nodes into a single array representing the tree structure.
   * @param {Array} parents - Array of parent nodes.
   * @param {Array} children - Array of child nodes.
   * @returns {Array} Merged array containing both parent and child nodes.
   */
  function mergeSides(parents, children) {
    // Mark parent nodes as ancestry nodes
    parents.forEach(d => { d.is_ancestry = true });

    // Set the parent of top-level ancestry nodes to the first child node
    parents.forEach(d => d.depth === 1 ? d.parent = children[0] : null);

    // Merge parent and child nodes into a single array and return
    return [...children, ...parents.slice(1)];
  }

  /**
   * nodePositioning function adjusts node positions based on the layout orientation.
   * @param {Object} options - An object containing parameters for node positioning.
   *                           - tree: Array of nodes representing the tree structure.
   *                           - is_vertical: Indicates whether the tree layout is vertical or horizontal.
   */
  function nodePositioning({ tree, is_vertical }) {
    // Adjust y positions based on ancestry status
    tree.forEach(d => {
      d.y *= (d.is_ancestry ? -1 : 1);
      // Swap x and y positions if the layout is not vertical
      if (!is_vertical) {
        const d_x = d.x; d.x = d.y; d.y = d_x;
      }
    });
  }

  /**
   * Sets up the spouses relationships within the tree structure and adjusts their positions.
   * @param {Object} options - An object containing tree data structure and node separation.
   *                           - tree: The tree data structure containing node information.
   *                           - node_separation: The distance between nodes.
   */
  function setupSpouses({ tree, node_separation }) {
    // Iterate over each node in the tree in reverse order
    for (let i = tree.length; i--;) {
      const d = tree[i];

      // Check if the current node is not an ancestry node and has spouses
      if (!d.is_ancestry && d.data.rels?.spouses && d.data.rels?.spouses.length > 0) {
        // Determine the side (left or right) based on the gender of the current node
        const side = d.data.data.gender === "M" ? -1 : 1;  // Female on the right

        // Adjust the x position of the current node based on the number of spouses and node separation
        d.x += d.data.rels.spouses?.length / 2 * node_separation * side;

        // Iterate over each spouse of the current node
        d.data.rels?.spouses.forEach((sp_id, i) => {
          // Find the spouse node in the data stash
          const spouse = { data: data_stash.find(d0 => d0.id === sp_id), added: true };

          // Calculate the x and y positions of the spouse node
          spouse.x = d.x - (node_separation * (i + 1)) * side;
          spouse.y = d.y;
          spouse.sx = i > 0 ? spouse.x : spouse.x + (node_separation / 2) * side;
          spouse.depth = d.depth;
          spouse.spouse = d;

          // Add the spouse node to the 'spouses' array of the current node
          if (!d.spouses) d.spouses = [];
          d.spouses.push(spouse);

          // Push the spouse node into the tree
          tree.push(spouse);

          // Update the 'psx' property of other nodes if they are parents of the current node or its spouse
          tree.forEach(d0 => (
            (d0.data.rels?.father === d.data.id && d0.data.rels?.mother === spouse.data.id) ||
            (d0.data.rels?.mother === d.data.id && d0.data.rels?.father === spouse.data.id)
          ) ? d0.psx = spouse.sx : null);
        });
      }

      // Adjust the x positions of parent nodes if they have two parents
      if (d.parents && d.parents.length === 2) {
        const p1 = d.parents[0];
        const p2 = d.parents[1];
        const midd = p1.x - (p1.x - p2.x) / 2;
        const x = (d, sp) => midd + (node_separation / 2) * (d.x < sp.x ? 1 : -1);

        p2.x = x(p1, p2);
        p1.x = x(p2, p1);
      }
    }
  }

  /**
   * Sets up the children and parents relationships within the tree structure.
   * @param {Object} tree - The tree data structure containing node information.
   */
  function setupChildrenAndParents({ tree }) {
    // Iterate over each node in the tree
    tree.forEach(d0 => {
      // Delete the 'children' property to avoid redundancy
      delete d0.children;

      // Iterate over each node again to find children and parents relationships
      tree.forEach(d1 => {
        // Check if the current node (d1) is a child of the current parent node (d0)
        if (d1.parent === d0) {
          // Check if the child node (d1) is an ancestry node (parent)
          if (d1.is_ancestry) {
            // If the parent node (d0) doesn't have 'parents' array, create it
            if (!d0.parents) d0.parents = [];
            // Push the child node (d1) into the 'parents' array of the parent node (d0)
            d0.parents.push(d1);
          } else {
            // If the parent node (d0) doesn't have 'children' array, create it
            if (!d0.children) d0.children = [];
            // Push the child node (d1) into the 'children' array of the parent node (d0)
            d0.children.push(d1);
          }
        }
      });
    });
  }

/**
 * Calculates the dimensions of the tree based on node positions and separation distances.
 * @param {Array} tree - The tree data structure containing node positions.
 * @param {number} node_separation - The distance between nodes.
 * @param {number} level_separation - The distance between levels of the tree.
 * @param {boolean} is_vertical - Indicates whether the tree is vertical or horizontal.
 * @returns {Object} An object containing the calculated width, height, and offsets of the tree.
 */
  function TreeDim(tree, node_separation, level_separation, is_vertical) {
    // Swap node_separation and level_separation if the tree is horizontal
    if (!is_vertical) [node_separation, level_separation] = [level_separation, node_separation];

    // Calculate the extent of x and y positions of nodes in the tree
    const w_extent = d3.extent(tree, d => d.x);
    const h_extent = d3.extent(tree, d => d.y);

    // Calculate width and height of the tree based on node positions and separations
    const width = w_extent[1] - w_extent[0] + node_separation;
    const height = h_extent[1] - h_extent[0] + level_separation;

    // Calculate x and y offsets to adjust the position of the tree within its container
    const x_off = -w_extent[0] + node_separation / 2;
    const y_off = -h_extent[0] + level_separation / 2;

    // Return an object containing the calculated dimensions and offsets
    return {
      width,
      height,
      x_off,
      y_off
    };
  }
}
