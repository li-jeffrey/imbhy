import { groupBy } from "./util";

const BASE_URL = "https://rt.data.gov.hk";

const ROUTES = {};
const STOPS = {};

async function getRoutes(companyId) {
    if (!(companyId in ROUTES)) {
        const response = await fetch(`${BASE_URL}/v1/transport/citybus-nwfb/route/${companyId}`);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        const routes = [];
        for (const route of data['data']) {
            routes.push({
                route: route['route'],
                bound: 'O',
                dest_en: route['dest_en'],
                dest_tc: route['dest_tc'],
                dest_sc: route['dest_sc'],
                service_type: '1'
            });
            routes.push({
                route: route['route'],
                bound: 'I',
                dest_en: route['orig_en'],
                dest_tc: route['orig_tc'],
                dest_sc: route['orig_sc'],
                service_type: '1'
            });
        }

        ROUTES[companyId] = groupBy(routes, o => o['route']);
    }

    return ROUTES[companyId];
}

async function getStopIdsByRoute(companyId, route, bound) {
    const response = await fetch(`${BASE_URL}/v1/transport/citybus-nwfb/route-stop/${companyId}/${route}/${bound}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data['data'].map(o => o['stop']);
}

async function getStopByStopId(stopId) {
    if (!(stopId in STOPS)) {
        const response = await fetch(`${BASE_URL}/v1/transport/citybus-nwfb/stop/${stopId}`);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        STOPS[stopId] = data['data'];
    }

    return STOPS[stopId];
}

async function getStopsByRoute(companyId, route, bound) {
    const stopIds = await getStopIdsByRoute(companyId, route, bound);
    const stops = [];
    for (const stopId of stopIds) {
        stops.push(await getStopByStopId(stopId));
    }

    return stops;
}

async function getEta(companyId, route, stopId) {
    const response = await fetch(`${BASE_URL}/v1/transport/citybus-nwfb/eta/${companyId}/${stopId}/${route}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data['data'];
}

export default function NWFB_CTY_PROVIDER(companyId) {
    return {
        getRoutes: () => getRoutes(companyId),
        getStopsByRouteAndBound: (route, bound) => getStopsByRoute(companyId, route, bound),
        getEtaByRouteAndStopId: (route, stopId) => getEta(companyId, route, stopId)
    }
}