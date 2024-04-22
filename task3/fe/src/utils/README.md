# Tree Display
## Description

The Tree component is responsible for managing the positions and relationships of nodes in a family tree structure. It utilizes D3.js for tree layout calculations and manipulation.


## Integration Instructions

The Tree component requires data in the form of a tree structure, where each node represents a family member with specific relationships. The component calculates the positions of nodes based on the provided data and organizes them into a hierarchical structure.

**1. Data Structure**

- Ensure that the input data follows a tree structure, where each node represents a family member.
- Each node should contain information about relationships, such as children, parents, and spouses.

**2. Component Integration**

- Import the Tree component into your application.
- Pass the required props to the Tree component:
  - `data_stash`: Array of objects representing family members.
  - `main_id`: (Optional) ID of the main node (root) of the tree. If not provided, the first node in the data stash will be considered as the main node.
  - `is_vertical`: (Optional) Boolean indicating whether the tree layout is vertical (default is true).
  - `node_separation`: (Optional) Distance between nodes (default is 250).
  - `level_separation`: (Optional) Distance between levels of the tree (default is 150).
## Logic

**1. Tree Positions**
- Calculates the positions of nodes in the tree structure based on the provided data.
- Determines the hierarchy of relationships (children or parents) and constructs a hierarchical tree structure using D3.js.
- Sorts nodes by birthdate to ensure chronological order.
**2. Leveling Out Sides**
- Adjusts the positions of parent and child nodes to level out both sides of the tree.
- Calculates the difference in x positions between the first parent and first child and adjusts positions accordingly.
**3. Merging Sides**
- Merges parent and child nodes into a single array representing the tree structure.
- Marks parent nodes as ancestry nodes and sets the parent of top-level ancestry nodes to the first child node.
**4. Node Positioning**
- Adjusts node positions based on the layout orientation (vertical or horizontal).
- Swaps x and y positions if the layout is not vertical.
**5. Setting Up Spouses**
- Sets up spouse relationships within the tree structure and adjusts their positions.
- Determines the side (left or right) based on the gender of the current node and adjusts positions accordingly.
**6. Setting Up Children and Parents**
- Establishes children and parents relationships within the tree structure based on node connections.
- Adds children nodes to the 'children' array and parent nodes to the 'parents' array of each node.

# Tree Display
## Description

The TreeDisplay is responsible for rendering and updating the visual representation of the family tree. It utilizes D3.js for SVG manipulation and positioning of tree nodes and links.

## Integration Instructions

To integrate the TreeDisplay component into your application effectively, follow these steps

**1. Data Preparation**

- Ensure that your data adheres to a tree structure, where each node represents a family member.
- Each node should contain relevant information about relationships, such as children, parents, and spouses.

**2. Component Integration**

- Import the TreeDisplay component into your application.
- Provide the necessary props to the TreeDisplay component:
  - `store`: An object containing the state of the family tree and methods for updating it.
  - `cont`: The container element where the family tree SVG will be rendered.
  - `Card`: (Optional) Custom component for rendering individual family member cards. If not provided, a default Card component will be used.


## Logic

**1. Update View**

- Updates the visual representation of the family tree based on the provided props.
- Updates both node cards and links between nodes.

**2. Update Links**

- Prepares and updates the links (edges) between family tree nodes.
- Creates SVG paths representing the relationships between nodes.

**3. Update Cards**

- Prepares and updates the individual cards representing family members.
- Calculates enter and exit positions for cards and transitions them accordingly.

**4. Create SVG**

- Dynamically creates the SVG element for rendering the family tree.
- Sets up necessary SVG groups for organizing nodes and links.

