import { groupBy } from "./util";

const BASE_URL = "https://rt.data.gov.hk";
const COMPANY_IDS = ['NWFB', 'CTB'];

var ROUTES = null;
const COMPANY_ID_BY_ROUTE = {};

async function getRoutes() {
    if (ROUTES == null) {
        const routes = [];
        for (const companyId of COMPANY_IDS) {
            const response = await fetch(`${BASE_URL}/v1/transport/citybus-nwfb/route/${companyId}`);
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();

            for (const route of data['data']) {
                const routeName = route['route'];
                routes.push({
                    route: routeName,
                    bound: 'O',
                    dest_en: route['dest_en'],
                    dest_tc: route['dest_tc'],
                    dest_sc: route['dest_sc'],
                    service_type: '1'
                });
                routes.push({
                    route: routeName,
                    bound: 'I',
                    dest_en: route['orig_en'],
                    dest_tc: route['orig_tc'],
                    dest_sc: route['orig_sc'],
                    service_type: '1'
                });

                if (routeName in COMPANY_ID_BY_ROUTE) {
                    console.warn(`Duplicate route: ${routeName}`)
                }
                COMPANY_ID_BY_ROUTE[routeName] = companyId;
            }
        }

        ROUTES = groupBy(routes, o => o['route']);
    }

    return ROUTES;
}

async function getStopIdsByRoute(route, bound) {
    const companyId = COMPANY_ID_BY_ROUTE[route];
    if (!companyId) throw new Error(`Unknown route: ${route}`);

    const response = await fetch(`${BASE_URL}/v1/transport/citybus-nwfb/route-stop/${companyId}/${route}/${bound}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data['data'].map(o => o['stop']);
}

async function getStopByStopId(stopId) {
    const response = await fetch(`${BASE_URL}/v1/transport/citybus-nwfb/stop/${stopId}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data['data'];
}

async function getStopsByRoute(route, bound) {
    const stopIds = await getStopIdsByRoute(route, bound);
    return await Promise.all(stopIds.map(stopId => getStopByStopId(stopId)));
}

async function getEta(route, stopId) {
    const companyId = COMPANY_ID_BY_ROUTE[route];
    if (!companyId) throw new Error(`Unknown route: ${route}`);

    const response = await fetch(`${BASE_URL}/v1/transport/citybus-nwfb/eta/${companyId}/${stopId}/${route}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data['data'];
}

export const NWFB_CTY_PROVIDER = {
    displayName: 'NWFB/Citybus',
    getRoutes: getRoutes,
    getStopsByRouteAndBound: getStopsByRoute,
    getEtaByRouteAndStopId: getEta
}