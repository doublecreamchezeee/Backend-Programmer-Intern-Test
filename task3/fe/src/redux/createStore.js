import Tree from '../utils/TreeCalculate'

// Function to create a store with initial state
export default function createStore(initial_state) {
    // Variable to hold the onUpdate callback
    let onUpdate;

    function TreeInit() {
        return Tree({
            data_stash: state.data,
            main_id: state.main_id,
            node_separation: state.node_separation,
            level_separation: state.level_separation
        });
    }

    const state = initial_state,
        update = {
            tree: (props) => {
                // Calculate the tree and update the state
                state.tree = TreeInit();
                // If onUpdate callback is set, call it with the provided props
                if (onUpdate) onUpdate(props)
            },
            mainId: main_id => state.main_id = main_id,
            data: data => state.data = data,
            displayType: type => state.displayType = type,
        },
        getData = () => state.data,
        getTree = () => state.tree,
        displayType = () => state.displayType,
        setOnUpdate = (f) => onUpdate = f,
        methods = {};

    // Return an object containing state, update functions, and utility functions
    return { state, update, getData, getTree, displayType, setOnUpdate, methods };
}