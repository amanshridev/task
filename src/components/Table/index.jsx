import React from "react";

const CountryFlag = ({ countryId }) => {
  return (
    <img
      src={`https://flagsapi.com/${countryId}/flat/24.png`}
      alt={countryId}
    />
  );
};

const TableRow = ({ placeName, countryId }) => {
  return (
    <tr>
      <td>{countryId}</td>
      <td>{placeName}</td>
      <td>
        <CountryFlag countryId={countryId} />
        {countryId}
      </td>
    </tr>
  );
};

const Table = ({ results }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <TableRow
            key={index}
            placeName={result.name.common}
            countryId={result.cca2}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
