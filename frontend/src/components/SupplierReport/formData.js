/* eslint-disable max-len */
// import messages from '../../translation/messagesES';
// import exportData from '../../utils/excel';

import html2canvas from 'html2canvas';
// import { saveAs } from 'file-saver';
// import { htmlDocx } from 'html-docx-js';

const formData = ({
  data,
  totalScoreSupplier,
  getParticipantsByYear,
  filterSupplierReport,
  form,
}) => {
  /* const {
    years,
    suppliers,
    suppliersByCall,
    masters,
  } = data; */

  const {
    years,
    suppliers,
  } = data;

  const totalScoreEvaluatorDimension = totalScoreSupplier && totalScoreSupplier.totalScoreEvaluatorDimension;

  const handleReset = () => {
    form.resetFields();
    getParticipantsByYear();
  };

  const exportWord = async () => {
    /* const styles = '<style>.title{font-family: Arial; font-size: 22px; font-weight: bold; color: #006159; text-align: center;}</style>';
    const header = `${"<!DOCTYPE html><html xmlns:o='urn:schemas-microsoft-com:office:office' " +
           "xmlns:w='urn:schemas-microsoft-com:office:word' " +
           "xmlns='http://www.w3.org/TR/REC-html40'>"}
           <head>
           <title>Export HTML to Word Document</title>
           <meta charset='utf-8'>
           ${styles}
           </head><body>`;
    const footer = '</body></html>';
    const sourceHTML = header + document.getElementById('content-export').innerHTML + footer;
    const source = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(sourceHTML)}`;
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload); */

    /* await Promise.all(totalScoreEvaluatorDimension.map(async (element, index) => {
      const can = await html2canvas(document.getElementById(`dimension_${index}`));
      const image = document.createElement('img');
      image.src = can.toDataURL();
      document.getElementById(`data-canvas-dimension_${index}`).appendChild(image);
    })); */
    const options = {
      maxWidth: 700,
    };
    /* totalScoreSupplier.totalScoreEvaluatorCriterion.forEach((criterio) => {
      html2canvas(document.getElementById(`percent-criterio_${criterio.idCriterio}`)).then((canvas) => {
        const image = document.createElement('img');
        image.src = canvas.toDataURL();
        // const w = Math.min(image.width, options.maxWidth);
        image.width = `${criterio.scoreTotal === '' || criterio.scoreTotal === 0 ? 0.2 : criterio.scoreTotal.toFixed(2)}%`;
        document.getElementById(`data-percent-criterio_${criterio.idCriterio}`).appendChild(image);
      });
    }); */
    totalScoreEvaluatorDimension.forEach((element, index) => {
      html2canvas(document.getElementById(`dimension_${index}`)).then((canvas) => {
        const image = document.createElement('img');
        image.src = canvas.toDataURL();
        const w = Math.min(image.width, options.maxWidth);
        image.width = w;
        document.getElementById(`data-canvas-dimension_${index}`).appendChild(image);
      });
    });

    // html2canvas(document.getElementById('content-export')).then((canvas) => {
    html2canvas(document.getElementById('content-general')).then((canvas) => {
      // document.getElementById('data-canvas-general').appendChild(canvas);
      const dataURL = canvas.toDataURL();
      console.log('dataURL = ', dataURL);
      // const image = "<div id='export'><img class='hide' src='" + dataURL +"'/></div>";
      const image = document.createElement('img');
      image.src = dataURL;
      document.getElementById('data-canvas-general').appendChild(image);

      setTimeout(() => {
        const img = document.querySelector('#data-canvas-general img');
        const w = Math.min(img.width, options.maxWidth);
        // const h = img.height * (w / img.width);
        img.width = w;
        // img.height = h;
        /* const header = `${"<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>"}
            <head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>`;
        const body = `<h2 style=${styles.title}>Evaluación general</h2>`;
        const footer = '</body></html>';
        const sourceHTML = header + body + document.getElementById('data-canvas-general').innerHTML + footer;
        const source = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(sourceHTML)}`;
        const fileDownload = document.createElement('a');
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'document.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload); */

        const styles2 = '<style>.title{font-family: Arial; font-size: 22px; font-weight: bold; color: #006159; text-align: center;}' +
        '.percent{margin-left: 5px; width: 85%; opacity: 1; height: 20px;}' +
        '.percent > div{background: #006159; height: inherit;}' +
        '</style>';
        const header = `${"<!DOCTYPE html><html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>"}
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <head>
            <title>Export HTML to Word Document</title>
            <meta charset='utf-8'>
            ${styles2}
            </head><body>`;
        const body = '<h2 class="title">Evaluación general</h2>';
        const footer = '</body></html>';
        let dimensiones = '';
        totalScoreEvaluatorDimension.forEach((element, index) => {
          dimensiones += document.getElementById(`dimension_${index}`).innerHTML;
        });
        const sourceHTML = header + body + document.getElementById('data-canvas-general').innerHTML + dimensiones + footer;
        const converted = window.htmlDocx.asBlob(sourceHTML, { orientation: 'portrait' });
        // const blob = new Blob([sourceHTML], { type: 'application/msword;charset=utf-8' });
        window.saveAs(converted, 'prueba.doc');
        /*  const source = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(sourceHTML)}`;
        const fileDownload = document.createElement('a');
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'document.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload); */
      }, 1500);
    });
  };

  return [
    {
      key: 1.1,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Año',
          key: 'year',
          required: true,
          value: years && years.length > 0 ? years[0] : '',
          options: years ? years.map(item => ({ id: item, name: item })) : [],
          handleChange: getParticipantsByYear,
          allowClear: false,
          valuesToClean: {
            supply: { value: '' },
            companySize: { value: '' },
            participated: { value: '' },
            supplier: { value: '' },
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Proveedor',
          key: 'supplier',
          value: '',
          required: true,
          options: suppliers ? suppliers.map((item) => {
            item.name = item.businessName;
            return item;
          }) : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supplier: value };
            filterSupplierReport(values);
          },
        },
      ],
    },
    {
      key: 1.2,
      justify: 'center',
      value: [
        {
          span: 2,
          type: 'button',
          label: 'Limpiar',
          key: 'clear',
          buttonType: 'primary',
          handleclick: handleReset,
        }, {
          span: 2,
          type: 'button',
          label: 'Consultar',
          key: 'search',
          buttonType: 'primary',
          htmlType: 'submit',
        }, {
          span: 2,
          type: 'button',
          label: 'Exportar a word',
          key: 'export',
          buttonType: 'primary',
          handleclick: exportWord,
        },
      ],
    },
  ];
};

export default formData;
