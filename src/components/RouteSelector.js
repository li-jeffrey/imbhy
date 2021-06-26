import './RouteSelector.css';
import { useRef, useState } from "react";

export default function RouteSelector(props) {
    const textInput = useRef(null);
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
        setState({ ...state, value: item, dropdownOpen: false, ignoreBlur: false });
        props.onItemSelected(item);
    }

    const removeItemClicked = item => {
        props.onRemoveRecentItem(item);
        textInput.current.focus();
    }

    const onBlur = event => {
        if (state.ignoreBlur) {
            return;
        }
        setState({ ...state, value: event.target.value, dropdownOpen: false });
    }

    const recentItems = props.recentItems
        .filter(item => props.shouldItemRender(item, state.value))
        .map(item =>
            <div key={`dropdown-${item}`}
                className="dropdown-item">
                <div className="dropdown-item-text recent-item" onClick={() => itemClicked(item)}>{item}</div>
                <button className="dropdown-item-btn"
                    onClick={() => removeItemClicked(item)}>&times;</button>
            </div>
        );

    const otherItems = props.items
        .filter(item => props.shouldItemRender(item, state.value))
        .map(item =>
            <div key={`dropdown-${item}`}
                className="dropdown-item">
                <div className="dropdown-item-text" onClick={() => itemClicked(item)}>{item}</div>
            </div>
        );

    const allItems = recentItems.concat(otherItems);

    return (
        <div>
            <label htmlFor="route">Route: </label>
            <input type="text"
                ref={textInput}
                name="route"
                id="route"
                placeholder="Enter a route..."
                className="dropdown-input"
                value={state.value}
                disabled={props.items.length === 0 && props.recentItems.length === 0}
                onChange={event => setState({ ...state, value: event.target.value })}
                onBlur={onBlur}
                onFocus={displayDropdown}
                autoComplete="off" />
            {state.dropdownOpen &&
                <div className="dropdown-container"
                    onTouchStart={() => setState({ ...state, ignoreBlur: true })}
                    onMouseEnter={() => setState({ ...state, ignoreBlur: true })}
                    onMouseLeave={() => setState({ ...state, ignoreBlur: false })}>
                    {allItems}
                </div>}
        </div>
    )
}