// Spreadsheet export does nothing inside a design canvas.
const noop = () => ({})
module.exports = { utils: { json_to_sheet: noop, aoa_to_sheet: noop, book_new: noop, book_append_sheet: noop, sheet_to_json: () => [] }, writeFile: noop, writeFileXLSX: noop, read: noop }
