import { TableColumn } from '../data/projects/types';

export const getGroups = (columns: TableColumn[]) => {
  const groups: {
    name: string;
    columns: TableColumn[];
  }[] = [];

  columns.forEach((column) => {
    if (!column.group) {
      groups.push({
        name: '',
        columns: [column],
      });
      return;
    }

    const last = groups.at(-1);

    if (last?.name === column.group) {
      last.columns.push(column);
    } else {
      groups.push({
        name: column.group,
        columns: [column],
      });
    }
  });

  return groups;
};
