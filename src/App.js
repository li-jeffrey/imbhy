import { useState } from 'react';
import './App.css';
import EtaPanel from './EtaPanel';

function App(props) {
  const providers = props.providers;
  const [appData, setAppData] = useState({
    selectedProvider: Object.keys(providers)[0],
    selectedRoute: '',
    selectedDirection: 'outbound',
    selectedStopId: '',
    routeData: [],
    routeStops: [],
    etaData: [],
  });

  const onSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const stopId = formData.get('Stop');
    const providerApi = providers[appData.selectedProvider];
    providerApi.getEtaByRouteAndStopId(appData.selectedRoute, stopId)
      .then(data => setAppData({ ...appData, selectedStopId: stopId, etaData: data }))
      .catch(err => console.error(err.message));
  }

  const updateRoutes = formData => {
    const providerApi = providers[formData['selectedProvider']];
    providerApi.getRoutes()
      .then(data => {
        updateRouteStops(
          { ...formData, routeData: data, selectedRoute: Object.keys(data)[0] }
        );
      })
      .catch(err => console.error(err.message));
  }

  const updateRouteStops = formData => {
    const providerApi = providers[formData['selectedProvider']];
    providerApi.getStopsByRouteAndBound(formData['selectedRoute'], formData['selectedDirection'])
      .then(data => setAppData({ ...formData, routeStops: data, selectedStopId: '' }))
      .catch(err => console.error(err.message));
  }

  const resetStopId = () => {
    setAppData({ ...appData, selectedStopId: '' });
  }

  const fieldUpdator = (fieldName, callback = null) => {
    return event => {
      event.preventDefault();
      var copy = { ...appData };
      copy[fieldName] = event.target.value;
      setAppData(copy);
      if (callback !== null) {
        callback(copy);
      }
    }
  }

  if (appData.routeData.length === 0) {
    updateRoutes(appData);
  }

  return (
    <main>
      <h1>Is my bus here yet?</h1>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor="provider">Provider: </label>
          <select id="provider" name="Provider" value={appData.selectedProvider} onChange={fieldUpdator('selectedProvider', updateRoutes)}>
            {Object.keys(providers).map(provider => <option value={provider} key={provider}>{provider}</option>)}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="route">Route: </label>
          <select id="route" name="Route" value={appData.selectedRoute} onChange={fieldUpdator('selectedRoute', updateRouteStops)}>
            {Object.keys(appData.routeData).map(route => <option value={route} key={route}>{route}</option>)}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="direction">Destination: </label>
          <select id="direction" name="Direction" value={appData.selectedDirection} onChange={fieldUpdator('selectedDirection', updateRouteStops)}>
            {appData.selectedRoute !== '' && appData.routeData[appData.selectedRoute]
              .map(o => {
                const bound = o['bound'] === 'O' ? "outbound" : "inbound";
                const key = `${appData.selectedRoute}:${bound}`;
                return <option value={bound} key={key}>{o['dest_en']}</option>
              })}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="stop">Stop: </label>
          <select id="stop" name="Stop" onChange={resetStopId}>
            {appData.routeStops.map((stop, i) => {
              const stopId = stop['stop'];
              const key = `${stopId}-${i}`
              return <option value={stopId} key={key}>{stop['name_en']}</option>
            })}
          </select>
          <button type="submit">{appData.selectedStopId !== '' ? 'Refresh' : 'Go'}</button>
        </fieldset>
      </form>
      <hr></hr>
      <EtaPanel selectedRoute={appData.selectedRoute} selectedStopId={appData.selectedStopId} etaData={appData.etaData} />
    </main>
  );
}

export default App;
