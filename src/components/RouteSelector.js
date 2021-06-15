import './RouteSelector.css';
import { useState } from "react";

export default function RouteSelector(props) {
    const [state, setState] = useState({
        value: '',
        dropdownOpen: false,
        ignoreBlur: false,
        items: []
    });

    const displayDropdown = () => {
        if (!state.dropdownOpen) {
            setState({ ...state, dropdownOpen: true });
        }
    }

    const itemClicked = item => {
        setState({ ...state, value: item, dropdownOpen: false });
        props.itemSelected(item);
    }

    const onBlur = event => {
        if (state.ignoreBlur) {
            return;
        }
        setState({ ...state, value: event.target.value, dropdownOpen: false });
        props.itemSelected(state.value);
    }

    const dropdownItems = props.items
        .filter(item => props.shouldItemRender(item, state.value))
        .map(item =>
            <div key={`dropdown-${item}`}
                className="dropdown-item"
                onClick={() => itemClicked(item)}
                onTouchStart={() => setState({ ...state, ignoreBlur: true })}
                onMouseEnter={() => setState({ ...state, ignoreBlur: true })}
                onMouseLeave={() => setState({ ...state, ignoreBlur: false })}
            >{item}</div>
        );

    return (
        <div>
            <label htmlFor="route">Route: </label>
            <input type="text"
                name="route"
                id="route"
                placeholder="Enter a route..."
                className="dropdown-input"
                value={state.value}
                onChange={event => setState({ ...state, value: event.target.value })}
                onBlur={onBlur}
                onClick={displayDropdown} 
                autoComplete="off"/>
            {state.dropdownOpen &&
                <div className="dropdown-container">
                    {dropdownItems}
                </div>}
        </div>
    )
}