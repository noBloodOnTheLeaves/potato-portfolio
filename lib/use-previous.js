import {useState} from "react";

export function usePrevious(value) {
    const [tuple, setTuple] = useState([null, value]);

    if (tuple[1] !== value) {
        setTuple([tuple[1], value]);
    }

    return tuple[0] || value;
}
