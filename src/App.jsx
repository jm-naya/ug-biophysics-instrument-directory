import { useState, useMemo } from "react";
import instruments from "./data/instruments";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [facility, setFacility] = useState("All");
  const [status, setStatus] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const facilities = useMemo(
    () => ["All", ...new Set(instruments.map((i) => i.facility))],
    []
  );
  const statuses = ["All", "operational", "intermittent", "non-operational"];

  const filtered = instruments.filter((i) => {
    const q = query.toLowerCase();
    const matchesQuery =
      i.name.toLowerCase().includes(q) ||
      i.manufacturer.toLowerCase().includes(q) ||
      i.lab.toLowerCase().includes(q) ||
      i.details.toLowerCase().includes(q) ||
      (i.keywords || []).some((k) => k.toLowerCase().includes(q));
    const matchesFacility = facility === "All" || i.facility === facility;
    const matchesStatus = status === "All" || i.status === status;
    return matchesQuery && matchesFacility && matchesStatus;
  });

  // Group consecutive rows by facility (data is already ordered this way)
  const groups = [];
  filtered.forEach((item) => {
    const last = groups[groups.length - 1];
    if (last && last.facility === item.facility) {
      last.items.push(item);
    } else {
      groups.push({ facility: item.facility, items: [item] });
    }
  });

  return (
    <div className="page">
      <div className="app">
        <header>
          <h1>UG Biophysics Instrument Directory</h1>
          <p>A searchable inventory of biophysics-relevant instrumentation across the University of Ghana, based on the 2026 survey.</p>
        </header>

        <div className="controls">
          <input
            type="text"
            placeholder="Search by name, manufacturer, lab, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={facility} onChange={(e) => setFacility(e.target.value)}>
            {facilities.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <p className="result-count">{filtered.length} of {instruments.length} instruments</p>

        <div className="table-card">
          <table className="instrument-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Manufacturer / Model</th>
                <th>Lab</th>
                <th>Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <>
                  <tr className="group-row" key={group.facility}>
                    <td colSpan={5}>{group.facility}</td>
                  </tr>
                  {group.items.map((i) => (
                    <>
                      <tr
                        key={i.id}
                        className="instrument-row"
                        onClick={() => setExpanded(expanded === i.id ? null : i.id)}
                      >
                        <td>{i.name}</td>
                        <td>{i.manufacturer}{i.model ? ` / ${i.model}` : ""}</td>
                        <td>{i.lab}</td>
                        <td>{i.cost}</td>
                        <td>
                          <span className={`status-pill status-${i.status}`}>
                            {i.status.replace("-", " ")}
                          </span>
                        </td>
                      </tr>
                      {expanded === i.id && (
                        <tr className="detail-row">
                          <td colSpan={5}>{i.details}</td>
                        </tr>
                      )}
                    </>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}