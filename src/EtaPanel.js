function millisToMins(millis) {
    return Math.floor(millis / (1000 * 60));
}

export default function EtaPanel(props) {
    if (props.selectedStopId === '') {
        return (
            <div></div>
        )
    }

    const now = new Date();
    var tableData;
    if (props.etaData.length === 0) {
        tableData = <tr><td colSpan="2">No data</td></tr>;
    } else {
        tableData = props.etaData.map(o => {
            const remark = o['rmk_en']
            const etaStr = o['eta'];
            const eta = millisToMins(new Date(etaStr) - now);
            const etaDisplayStr = eta <= 0 ? '<1 min' : `${eta} min(s)`;
            const rowKey = `${props.selectedRoute}:${props.selectedStopId}:${etaStr}`
            return (
                <tr key={rowKey}>
                    <td key={`${rowKey}:eta`}>{etaDisplayStr}</td>
                    <td key={`${rowKey}:remark`}>{remark}</td>
                </tr>
            )
        });
    }

    return (
        <table>
            <thead>
                <tr>
                    <td>ETA</td>
                    <td>Remarks</td>
                </tr>
            </thead>
            <tbody>
                {tableData}
            </tbody>
        </table>
    )
}