import { useState } from "react";
import './StopSelector.css';

function findNearestStop(stops, lat, long) {
    var nearestStop = null;
    var nearestStopDistance = 10000.;
    for (const stop of stops) {
        const stopLat = parseFloat(stop['lat']);
        const stopLong = parseFloat(stop['long']);
        const stopDistance = Math.pow(lat - stopLat, 2) + Math.pow(long - stopLong, 2);
        if (stopDistance < nearestStopDistance) {
            nearestStop = stop;
            nearestStopDistance = stopDistance;
        }
    }

    return nearestStop;
}

export default function StopSelector(props) {
    const [state, setState] = useState({
        value: ''
    })

    const valueChanged = newVal => {
        setState({ value: newVal });
        props.itemSelected(newVal);
    }

    const selectNearestStop = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const nearestStop = findNearestStop(props.items, pos.coords.latitude, pos.coords.longitude);
                setState({ value: nearestStop['stop'] });
            })
        }
    }

    return (
        <div className="stop-selector-container">
            <fieldset>
                <label htmlFor="stop">Stop: </label>
                <select
                    id="stop" name="Stop"
                    value={state.value}
                    onChange={event => valueChanged(event.target.value)}>
                    {props.items.map((stop, i) => {
                        const stopId = stop['stop'];
                        const key = `${stopId}-${i}`
                        return <option value={stopId} key={key}>{stop['name_en']}</option>
                    })}
                </select>
            </fieldset>
            <fieldset className="btn-location-container">
                <button className="btn-location" disabled={props.items.length === 0} onClick={selectNearestStop}>
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="map-marker-alt"
                        className="svg-inline--fa fa-map-marker-alt fa-w-12"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="1.25em">
                        <path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                    </svg>
                </button>
            </fieldset>
        </div>
    )
}