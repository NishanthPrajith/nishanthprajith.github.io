import './table-content.scss';

import { TableData } from '../../../../data/projects/types';
import { getGroups } from '../../../../utils/get-groups';

export default function TableContent({
  columns = [],
  rows = [],
  caption,
  shortTable,
  hideTopPadding = false,
}: TableData) {
  // Get groups
  const groupedColumns = getGroups(columns);

  // Check if there are any groups or sections
  const nameExists = groupedColumns.some((group) => group.name !== '');
  const sectionExists = rows.some((row) => row.label);

  // Row Styles
  const rowStyles = columns.reduce(
    (acc, column) => {
      acc[column.id] = column.rowStyle ?? {};
      return acc;
    },
    {} as Record<string, React.CSSProperties>
  );

  return (
    <div
      className={`table-content project-dynamic-content ${shortTable ? 'short-display' : ''}`}
    >
      <table
        className="benchmark-table"
        style={{
          ...(caption ? { paddingBottom: '0rem' } : {}),
          ...(hideTopPadding ? { paddingTop: '0' } : {}),
        }}
      >
        <thead>
          {groupedColumns.length > 0 && nameExists && (
            <tr className="group-row">
              {sectionExists && <th />}
              {groupedColumns.map((group) => (
                <th key={group.name} colSpan={group.columns.length}>
                  {group.name}
                </th>
              ))}
            </tr>
          )}

          <tr>
            {sectionExists && <th />}

            {columns.map((column) => (
              <th
                key={column.id}
                style={
                  !nameExists
                    ? { paddingTop: 0, ...column.style }
                    : { ...column.style }
                }
              >
                {column.title}
                {column.subtitle && <span>{column.subtitle}</span>}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => {
            if (row.section) {
              return (
                <tr key={i} className="section">
                  <td colSpan={columns.length + 1}>{row.section}</td>
                </tr>
              );
            }

            return (
              <tr key={i}>
                {row.label && (
                  <th>
                    {row.label}
                    {row.subLabel && <small>{row.subLabel}</small>}
                  </th>
                )}

                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={column.highlight ? 'highlight' : ''}
                    style={rowStyles[column.id]}
                  >
                    {row.values?.[column.id] ?? ''}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {caption && (
        <p className={`caption ${!shortTable ? 'short-display' : ''}`}>
          {caption}
        </p>
      )}
    </div>
  );
}
