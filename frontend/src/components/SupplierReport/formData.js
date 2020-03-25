import domtoimage from 'dom-to-image';
import setMessage from '../../state/Generic/action';

const formData = ({
  data,
  totalScoreSupplier,
  getParticipantsByYear,
  getDataSupplierReportProgress,
  getTotalScoreSupplier,
  filterSupplierReport,
  form,
}) => {
  const {
    years,
    suppliers,
    masters,
  } = data;

  const totalScoreEvaluatorDimension = totalScoreSupplier &&
    totalScoreSupplier.totalScoreEvaluatorDimension;

  const totalScoreEvaluatorCriterion = totalScoreSupplier &&
  totalScoreSupplier.totalScoreEvaluatorCriterion;

  const handleReset = () => {
    form.resetFields();
    getParticipantsByYear();
  };

  const exportWord = async () => {
    if (totalScoreSupplier) {
      getDataSupplierReportProgress({ loading: true });
      const options = {
        maxWidth: 720,
      };

      const logo = document.createElement('img');
      domtoimage.toPng(document.querySelector('.imgLogo')).then((urlImgAux) => {
        logo.src = urlImgAux;
        document.getElementById('logoP').appendChild(logo);
      });

      totalScoreEvaluatorDimension.forEach((element, index) => {
        const node = document.getElementById('dimension_0').parentNode;
        // domtoimage.toPng(document.getElementById(`dimension_${index}`)).then((urlImg) => {
        domtoimage.toPng(node).then((urlImg) => {
          if (document.querySelector(`#data-canvas-dimension_${index} img`)) {
            document.querySelector(`#data-canvas-dimension_${index} img`).remove();
          }
          const image = document.createElement('img');
          image.src = urlImg;
          const w = Math.min(image.width, options.maxWidth);
          image.width = w;
          document.getElementById(`data-canvas-dimension_${index}`).appendChild(image);
        });
      });

      domtoimage.toPng(document.getElementById('content-general')).then((urlImg) => {
        document.getElementById('data-canvas-general').innerHTML = '';
        const dataURL = urlImg;
        const image = document.createElement('img');
        image.src = dataURL;
        document.getElementById('data-canvas-general').appendChild(image);

        setTimeout(() => {
          const img = document.querySelector('#data-canvas-general img');
          const w = Math.min(img.width, options.maxWidth);
          img.width = w;

          const supplier = suppliers.filter(sup => totalScoreSupplier.idSupplier === sup.id)[0];

          const country = masters.Country.filter(c => supplier.idCountry === c.id)[0];

          const sector = masters.Sector.filter(s => supplier.idSector === s.id)[0];

          const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2,
          });

          const styles2 = '<style>.title{font-family: Arial; font-size: 22px; font-weight: bold; color: #006159; text-align: center;}' +
          '.title2{font-family: Arial; font-size: 18px; font-weight: bold; color: #006159; text-align: left;}' +
          '.title3{font-family: Arial; font-size: 15px; font-weight: bold; color: #006159; text-align: left;margin-left: 20px}' +
          '.percent{margin-left: 5px; width: 85%; opacity: 1; height: 20px;}' +
          '.dimension table{display:none;}' +
          '.percent > div{background: #006159; height: inherit;}' +
          'p{font-family: Arial}' +
          '.resultados{margin-top:10px; line-height: 1.2}' +
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
          let comments = '';
          let commentsDimensions = '';
          let criterios = [];
          totalScoreEvaluatorDimension.forEach((element, index) => {
            const imgAux = document.querySelector(`#data-canvas-dimension_${index} img`);
            const wAux = Math.min(img.width, options.maxWidth);
            imgAux.width = wAux;
            dimensiones += `<br /><br /><br /> ${document.getElementById(`data-canvas-dimension_${index}`).innerHTML}`;
            commentsDimensions += `<br /><br /><br /><h2 class="title2">Dimensión ${element.dimension}</h2>`;
            criterios =
            totalScoreEvaluatorCriterion.filter(c => c.idDimension === element.idDimension);
            criterios.forEach((e) => {
              if (e.commentsEvaluators.length > 0) {
                commentsDimensions += `<br /><br /><br /><h3 class="title3">${e.criterio}</h3>`;
                e.commentsEvaluators.forEach((comment) => {
                  if (comment !== '') {
                    comments += `<p>&#8226 &#32&#32${comment}</p>`;
                  }
                });
                commentsDimensions += comments;
              }
            });
            comments = '';
          });
          document.getElementById('logoP').innerHTML = '';
          document.getElementById('logoP').appendChild(logo);
          const resultados = `
            <p style="width: 100%; text-align: right;">${document.getElementById('logoP').innerHTML}</p>
            <h2 class='title2'>RESULTADOS</h2>
            <div class='resultados'><p><b>Nombre de la empresa:</b> ${supplier.fullName}</p>
            <p><b>País:</b> ${country ? country.name : ''}</p>
            <p><b>Sector:</b> ${sector ? sector.name : ''}</p>
            <p><b>Cuestionario:</b> ${totalScoreSupplier.supply} ${totalScoreSupplier.companySize}</p>
            <p><b>Certificaciones:</b> ${supplier.nameCertification}</p>
            <p><b>Activos:</b> ${supplier.typeOfCurrencyValueAssets} - ${formatter.format(supplier.valueAssets)}</p>
            <p><b>Ventas en el último año:</b> ${supplier.typeOfCurrencyAnnualSales} - ${formatter.format(supplier.annualSalesValue)}</p>
            <p><b>Participación en ventas al Grupo Nutresa:</b> ${supplier.participationInSalesWithGroupNutresa}</p></div>`;
          const sourceHTML = header + resultados + body + document.getElementById('data-canvas-general').innerHTML + dimensiones + commentsDimensions + footer;
          const converted = window.htmlDocx.asBlob(sourceHTML, { orientation: 'portrait' });
          window.saveAs(converted, `Proveedor_${supplier.fullName}.doc`);
          getDataSupplierReportProgress({ loading: false });
        }, 1500);
      });
    } else {
      setMessage('Validation.noDataReport', 'info');
    }
  };

  return [
    {
      key: 1.1,
      value: [
        {
          span: 10,
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
          span: 10,
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
            getTotalScoreSupplier(null);
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
          label: 'Generar Informe',
          key: 'export',
          buttonType: 'primary',
          handleclick: exportWord,
        },
      ],
    },
  ];
};

export default formData;
