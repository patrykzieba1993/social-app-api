const validator = {
  getAllowedColumns: (columns) => {
    columns.forEach(column => [].push.apply(columns, [`${column} ASC`, `${column} DESC`]));
    return columns;
  },
};

module.exports = validator;
