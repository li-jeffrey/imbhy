import { groupBy, toMap } from "./util";

const BASE_URL = "https://data.etabus.gov.hk";

var ROUTES = null;
var STOPS = null;

async function getRoutes() {
    if (ROUTES == null) {
        const response = await fetch(`${BASE_URL}/v1/transport/kmb/route`);
        if (!response.ok) throw new Error(response.statusText);
        var data = await response.json();
        data = data['data'].filter(o => o['service_type'] === '1');
        ROUTES = groupBy(data, o => o['route']);
    }

    return ROUTES;
}

async function getStopsById() {
    if (STOPS == null) {
        const response = await fetch(`${BASE_URL}/v1/transport/kmb/stop`);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        STOPS = toMap(data['data'], o => o['stop']);
    }

    return STOPS;
}

async function getStopIdsByRoute(route, bound) {
    const response = await fetch(`${BASE_URL}/v1/transport/kmb/route-stop/${route}/${bound}/1`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data['data'].map(o => o['stop']);
}

async function getStopsByRoute(route, bound) {
    const stopIds = await getStopIdsByRoute(route, bound);
    const stopsById = await getStopsById();
    return stopIds.map(stopId => stopsById[stopId]);
}

async function getEta(route, stopId) {
    const response = await fetch(`${BASE_URL}/v1/transport/kmb/eta/${stopId}/${route}/1`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data['data'];
}

export const KMB_PROVIDER = {
    displayName: 'KMB',
    getRoutes: getRoutes,
    getStopsByRouteAndBound: getStopsByRoute,
    getEtaByRouteAndStopId: getEta
}