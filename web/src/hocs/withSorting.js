import React, { useMemo, useState } from "react";
const withSorting = (WrappedComponent) => ({ data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "descending",
  });

  const sortedItems = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : "";
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    console.log({ key, direction });
    setSortConfig({ key, direction });
  };

  const ColumnTitle = ({ className = "text-center", id, text }) => {
    return (
      <th className={className}>
        <span className={getClassNamesFor(id)} onClick={() => requestSort(id)}>
          {text}
        </span>
      </th>
    );
  };

  return <WrappedComponent data={sortedItems} ColumnTitle={ColumnTitle} />;
};

export default withSorting;
