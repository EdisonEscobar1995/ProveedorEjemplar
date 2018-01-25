import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Blob from 'blob';

export default (sheets, fileName) => {
  const wb = XLSX.utils.book_new();
  sheets.forEach((sheet) => {
    const ws = XLSX.utils.aoa_to_sheet(sheet.data);
    XLSX.utils.book_append_sheet(wb, ws, sheet.title);
  });
  const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
};
