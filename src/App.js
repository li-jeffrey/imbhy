import { useState } from 'react';
import './App.css';
import EtaPanel from './components/EtaPanel';
import RouteSelector from './components/RouteSelector';
import StopSelector from './components/StopSelector';

function App(props) {
  const providers = props.providers;
  const [appData, setAppData] = useState({
    selectedProvider: Object.keys(providers)[0],
    selectedRoute: '',
    selectedDirection: 'outbound',
    selectedStopId: '',
    routeData: {},
    routeStops: [],
    etaData: [],
    isLoading: true,
    error: null
  });

  const setLoading = isLoading => {
    if (appData.isLoading !== isLoading) {
      setAppData({ ...appData, isLoading: isLoading });
    }
  }

  const raiseError = err => {
    console.error(err.message);
    setAppData({ ...appData, error: err });
  }

  const onSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const stopId = formData.get('Stop');
    const providerApi = providers[appData.selectedProvider];
    providerApi.getEtaByRouteAndStopId(appData.selectedRoute, stopId)
      .then(data => setAppData({ ...appData, selectedStopId: stopId, etaData: data }))
      .catch(raiseError);
  }

  const updateRoutes = formData => {
    const providerApi = providers[formData['selectedProvider']];
    setLoading(true);
    providerApi.getRoutes()
      .then(data => {
        updateRouteStops(
          { ...formData, routeData: data, selectedRoute: '' }
        );
      })
      .catch(raiseError);
  }

  const updateRouteStops = formData => {
    const providerApi = providers[formData['selectedProvider']];
    if (formData['selectedRoute'] === '') {
      setAppData({ ...formData, routeStops: [], selectedStopId: '', isLoading: false });
      return;
    }

    if (formData['selectedRoute'] === appData['selectedRoute'] &&
      formData['selectedDirection'] === appData['selectedDirection']) {
      return;
    }

    setLoading(true);
    providerApi.getStopsByRouteAndBound(formData['selectedRoute'], formData['selectedDirection'])
      .then(data => setAppData({ ...formData, routeStops: data, selectedStopId: '', isLoading: false }))
      .catch(raiseError);
  }

  const resetStopId = () => {
    setAppData({ ...appData, selectedStopId: '' });
  }

  if (Object.keys(appData.routeData).length === 0) {
    updateRoutes(appData);
  }

  return (
    <main>
      <h1>Is my bus here yet?</h1>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor="provider">Provider: </label>
          <select
            id="provider"
            name="Provider"
            value={appData.selectedProvider}
            onChange={event => updateRoutes({ ...appData, selectedProvider: event.target.value })}>
            {Object.keys(providers).map(provider => <option value={provider} key={provider}>{provider}</option>)}
          </select>
        </fieldset>
        <fieldset>
          <RouteSelector
            value={appData.selectedRoute}
            items={Object.keys(appData.routeData)}
            shouldItemRender={(item, value) => item.indexOf(value) > -1}
            itemSelected={val => updateRouteStops({ ...appData, selectedRoute: val })} />
        </fieldset>
        <fieldset>
          <label htmlFor="direction">Destination: </label>
          <select
            id="direction"
            name="Direction"
            value={appData.selectedDirection}
            onChange={event => updateRouteStops({ ...appData, selectedDirection: event.target.value })}>
            {appData.selectedRoute !== '' && appData.routeData[appData.selectedRoute]
              .map(o => {
                const bound = o['bound'] === 'O' ? "outbound" : "inbound";
                const key = `${appData.selectedRoute}:${bound}`;
                return <option value={bound} key={key}>{o['dest_en']}</option>
              })}
          </select>
        </fieldset>
        <StopSelector
          items={appData.routeStops}
          itemSelected={resetStopId} />
        <fieldset>
          {appData.isLoading ?
            <button type="submit" disabled className="btn-disabled">Loading...</button> :
            <button type="submit">{appData.selectedStopId !== '' ? 'Refresh' : 'Go'}</button>}
        </fieldset>
      </form>
      {appData.error && <div className="warn-text">{appData.error.message}</div>}
      <hr></hr>
      <EtaPanel selectedRoute={appData.selectedRoute} selectedStopId={appData.selectedStopId} etaData={appData.etaData} />
    </main>
  );
}

export default App;
