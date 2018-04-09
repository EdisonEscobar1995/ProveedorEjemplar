import React from 'react';
import { List, Select } from 'antd';
import { SCORE } from '../utils/const';

const { Option } = Select;

const data = {
  data: {
    suppliers: [
      {
        id: '6DC209CDED22BF3E052581FE007F2C75',
        fullName: 'ANTIOQUENA DE PORCINOS LTDA',
        businessName: 'ANTIOQUEÑA DE PORCINOS  LTDA',
        idCompanySize: '2F221ECE19BDBF21052581FD0073797D',
        companySize: null,
        idSupply: '50A96846B46A2549052581FD00738690',
        supply: null,
        idCategory: 'A0ED4403E7790A93052581FD00738D64',
        category: null,
        idSubCategory: 'C22E2E40E5CA2E82052581FD0073AD66',
        subCategory: null,
        document: [],
        nit: '8110198800',
        idCompanyType: 'D7F3CAB1959A76C5052581FD00737F84',
        companyType: null,
        producerLivestok: true,
        idSocietyType: '2743FE9FC457E529052581FD00738357',
        societyType: null,
        yearOfEstablishment: 1999,
        principalAdress: 'Calle 41 Sur No. 80-18',
        idCountry: 'B4DA2A4C9DE80CA2052581FD0073E3AA',
        idOriginCountry: 'B4DA2A4C9DE80CA2052581FD0073E3AA',
        idDepartment: '89547FF367617B1B052581FD0073E821',
        idCity: '14EEA245C2313FA5052581FD00745461',
        telephone: '(034) 444 56 17',
        fax: '034 - 302 84 30',
        emails: [
          'comercial@porcicarnes.com',
          'direccioncalidad@porcicarnes.com',
          'fabio@porcicarnes.com',
        ],
        codeZip: '05',
        nameLegalAgent: 'Fabio de Jesús Echavarría Muñoz',
        fullNameContact: 'Carla  Isabel  Henao Garcés',
        jobPosition: 'Directora de Calidad',
        phoneOfContact: '444 56 17 - Ext: 109',
        emailOfContact: 'direccioncalidad@porcicarnes.com',
        idSector: '2032C1518B328A12052581FD0073621F',
        otherSector: '',
        packagingProvided: '',
        typeOfCurrencyValueAssets: 'COP',
        valueAssets: 2.47308869E11,
        attachedFinancialReport: [],
        numberOfDirectEmployees: 1254,
        numberOfSubContratedEmployees: 10,
        webSite: 'www.porcicarnes.com',
        typeOfCurrencyAnnualSales: 'COP',
        annualSalesValue: 2.3071428E11,
        principalCustomer: [
          {
            percentageOfParticipationInSales: 51,
            idSupplier: '6DC209CDED22BF3E052581FE007F2C75',
            id: '5E491DFA50C6D5400525822B0073ECA6',
            name: 'Puntos   de  Venta  Porcicarnes  ',
          },
          {
            percentageOfParticipationInSales: 14,
            idSupplier: '6DC209CDED22BF3E052581FE007F2C75',
            id: 'AFABE2094CB136D60525822B0073ECA7',
            name: 'Grandes  Superficies - Cadenas ',
          },
          {
            percentageOfParticipationInSales: 27,
            idSupplier: '6DC209CDED22BF3E052581FE007F2C75',
            id: 'A3D102F7568D30BF0525822B0073ECA9',
            name: 'Industria Cárnica',
          },
          {
            percentageOfParticipationInSales: 5,
            idSupplier: '6DC209CDED22BF3E052581FE007F2C75',
            id: 'AB7C781746E565180525822B0073ECAA',
            name: 'Comercializadoras',
          },
          {
            percentageOfParticipationInSales: 0,
            idSupplier: '6DC209CDED22BF3E052581FE007F2C75',
            id: '771D904C81B3A3050525822B0073ECAB',
            name: 'Otros',
          },
        ],
        participationInSalesWithGroupNutresa: 14,
        nameContactPersonInGroupNutresa: 'Carla  Isabel Henao Garcés',
        emailContactPersonInGroupNutresa: 'direccioncalidad@porcicarnes.com',
        currentlyExport: false,
        exportDestination: '',
        globalAgreement: false,
        chemicalSubstance: false,
        sapCode: '1004976',
      },
      {
        id: '3E7F7F16425D7A87052581FE007F3267',
        fullName: 'FOTOLIT S.A.',
        businessName: 'FOTOLIT S.A.',
        idCompanySize: '2F221ECE19BDBF21052581FD0073797D',
        companySize: null,
        idSupply: '50A96846B46A2549052581FD00738690',
        supply: null,
        idCategory: '67CB13ABBA00E370052581FD00738D66',
        category: null,
        idSubCategory: 'CC71E804F91D3FFF052581FD0073ADC6',
        subCategory: null,
        document: [],
        nit: '310103152305',
        idCompanyType: 'D7F3CAB1959A76C5052581FD00737F84',
        companyType: null,
        producerLivestok: false,
        idSocietyType: '2743FE9FC457E529052581FD00738357',
        societyType: null,
        yearOfEstablishment: 1956,
        idCountry: 'BEC7D050B12CFEB2052581FD0073E3AB',
        idOriginCountry: 'BEC7D050B12CFEB2052581FD0073E3AB',
        idDepartment: '0A45109054A56BA4052581FD0073E845',
        idCity: '65775031647ECB85052581FD00745912',
        telephone: '2277-1200',
        fax: '2277-1233',
        emails: [
          'jose.mora@smurfitkappa.co.cr',
          'marco.cabezas@smurfitkappa.co.cr',
          'nestor.chinchilla@smurfitkappa.co.cr',
          'rebeca.sanchez@smurfitkappa.co.cr',
        ],
        codeZip: '40104',
        nameLegalAgent: 'Oscar Sabogal Arbelaez',
        fullNameContact: 'Jose Antonio Mora Lopez',
        jobPosition: 'Asesor de Empaque',
        phoneOfContact: '7117-2970',
        emailOfContact: 'jose.mora@smurfitkappa.co.cr',
        idSector: '267E4410D92A7DF5052581FD00736203',
        otherSector: '',
        packagingProvided: 'no',
        typeOfCurrencyValueAssets: 'USD',
        valueAssets: 8971361.0,
        attachedFinancialReport: [],
        numberOfDirectEmployees: 112,
        numberOfSubContratedEmployees: 0,
        webSite: 'www.smurfitkappa.com',
        typeOfCurrencyAnnualSales: 'USD',
        annualSalesValue: 9167248.0,
        principalCustomer: [
          {
            percentageOfParticipationInSales: 16,
            idSupplier: '3E7F7F16425D7A87052581FE007F3267',
            id: 'D0CC1B8855931BCC05258228004C4BE2',
            name: 'Grupo Glaxosmithkline',
          },
          {
            percentageOfParticipationInSales: 15,
            idSupplier: '3E7F7F16425D7A87052581FE007F3267',
            id: 'B3793E952DC3F4CB05258228004C4BE3',
            name: 'Roma Prince',
          },
          {
            percentageOfParticipationInSales: 12,
            idSupplier: '3E7F7F16425D7A87052581FE007F3267',
            id: '266B9EF3397D7BD505258228004C4BE4',
            name: 'Grupo Agroindustrial Numar',
          },
          {
            percentageOfParticipationInSales: 6,
            idSupplier: '3E7F7F16425D7A87052581FE007F3267',
            id: 'A53BE7CDB90D353005258228004C4BE5',
            name: 'Boston Scientific',
          },
          {
            percentageOfParticipationInSales: 5,
            idSupplier: '3E7F7F16425D7A87052581FE007F3267',
            id: '921D8E3BCC0FD3DB05258228004C4BE6',
            name: 'Covidien MFG',
          },
        ],
        participationInSalesWithGroupNutresa: 5,
        nameContactPersonInGroupNutresa: 'Guerú Arauz',
        emailContactPersonInGroupNutresa: 'garauz@serviciosnutresa.cr',
        phoneContactPersonInGroupNutresa: '2299-1409',
        geograficDescriptionOfPrincipalMaterials: 'Costa Rica\r\nEstados Unidos\r\nChile\r\n',
        currentlyExport: true,
        exportDestination: 'Nicaragua, Panamá, Estados Unidos, Trinidad \u0026 Tobago',
        globalAgreement: false,
        chemicalSubstance: false,
        sapCode: '1017645',
      },
      {
        id: '4CB0026A5C536A0F052581FE007F2BE4',
        fullName: 'C.I. TECNOLOGIA ALIMENTARIA S.A. TALSA',
        businessName: 'C.I TECNOLOGIA ALIMENTARIA S.A. TALSA',
        idCompanySize: '2F221ECE19BDBF21052581FD0073797D',
        companySize: null,
        idSupply: '50A96846B46A2549052581FD00738690',
        supply: null,
        idCategory: '8A1CC7A12120512A052581FD00738D68',
        category: null,
        idSubCategory: 'C525A07FAA2C5B3B052581FD0073ADFA',
        subCategory: null,
        document: [],
        nit: '8000273749',
        idCompanyType: '044884BC4F2639A7052581FD00737F7E',
        companyType: null,
        producerLivestok: false,
        idSocietyType: '2743FE9FC457E529052581FD00738357',
        societyType: null,
        yearOfEstablishment: 1988,
        principalAdress: 'Carrera  50 GG 12 sur 83',
        idCountry: 'B4DA2A4C9DE80CA2052581FD0073E3AA',
        idOriginCountry: 'B4DA2A4C9DE80CA2052581FD0073E3AA',
        idDepartment: '89547FF367617B1B052581FD0073E821',
        idCity: '4342657B19A3BE53052581FD0074549B',
        branchOffice: 'Bogotá\r\nCali\r\nBarranquilla\r\nEje Cafetero\r\nBucaramanga\r\nCúcuta',
        telephone: '2854400',
        fax: '2854400 OP 9',
        emails: [
          'cartera@citalsa.com',
          'comerciointernacional@citalsa.com',
          'coordinadorcafe@citalsa.com',
          'coordinadorcarnes@citalsa.com',
          'coordinadorgastronomia@citalsa.com',
          'direcciontecnica@citalsa.com',
          'ingenieria@citalsa.com',
          'jarcila@citalsa.com',
          'jjaramillo@citalsa.com',
          'lvelandia@citalsa.com',
          'mquinones@citalsa.com',
          'mserna@citalsa.com',
          'repuestos@citalsa.com',
          'scorrea@citalsa.com',
          'srestrepo@citalsa.com',
        ],
        codeZip: '050023',
        nameLegalAgent: 'Hildebrando Sáchez Vallejo',
        fullNameContact: 'Mateo Serna',
        jobPosition: 'Coordinador Linea Agroindustria',
        phoneOfContact: '2854400 ext 191',
        emailOfContact: 'mserna@citalsa.com',
        idSector: 'F694DE5C822CF9F2052581FD007361E9',
        otherSector: '',
        packagingProvided: '',
        typeOfCurrencyValueAssets: 'COP',
        valueAssets: 6.0852243E10,
        attachedFinancialReport: [],
        numberOfDirectEmployees: 315,
        numberOfSubContratedEmployees: 7,
        webSite: 'www.citalsa.com',
        typeOfCurrencyAnnualSales: 'COP',
        annualSalesValue: 7.8588734376E10,
        principalCustomer: [
          {
            percentageOfParticipationInSales: 1,
            idSupplier: '4CB0026A5C536A0F052581FE007F2BE4',
            id: '72762631440AF0190525822B00796F06',
            name: 'NOVAVENTA S.A.S',
          },
          {
            percentageOfParticipationInSales: 1,
            idSupplier: '4CB0026A5C536A0F052581FE007F2BE4',
            id: 'EE5DF291F27BC4450525822B00796F07',
            name: 'ALMACENES EXITO S,A',
          },
          {
            percentageOfParticipationInSales: 2,
            idSupplier: '4CB0026A5C536A0F052581FE007F2BE4',
            id: '9D0A55FA1B38D2AF0525822B00796F08',
            name: 'CAMAGUEY S.A',
          },
          {
            percentageOfParticipationInSales: 4,
            idSupplier: '4CB0026A5C536A0F052581FE007F2BE4',
            id: '17B4F3FFC79D26880525822B00796F09',
            name: 'ALIMENTOS CARNICOS S.A.S',
          },
          {
            percentageOfParticipationInSales: 4,
            idSupplier: '4CB0026A5C536A0F052581FE007F2BE4',
            id: '46B352E6D0C49AB90525822B00796F0A',
            name: 'COCHEROS SAS',
          },
        ],
        participationInSalesWithGroupNutresa: 6,
        nameContactPersonInGroupNutresa: 'Juan Esteban Arcila',
        emailContactPersonInGroupNutresa: 'jarcila@citalsa.com',
        phoneContactPersonInGroupNutresa: '2854400 ext 210',
        geograficDescriptionOfPrincipalMaterials: 'Colombia, EEUU, España, Alemania',
        currentlyExport: true,
        globalAgreement: false,
        chemicalSubstance: false,
        sapCode: '1004804',
      },
    ],
    states: [
      {
        shortName: 'NOT_STARTED_MANAGER_TEAM',
        id: '401461F7F1E0D09005258263004BAAC3',
        name: 'Pendiente comité gerencial',
      },
      {
        shortName: 'MANAGER_TEAM',
        id: 'FD5336BDBAF269F605258263004BAAC2',
        name: 'Valorado parcialmente',
      },
    ],
    suppliersByCall: [
      {
        id: '8B8B66A33CB18218052581FE008000C4',
        idCall: 'C96687E12FB0BC60052581FD00748EC0',
        idSurvey: 'F8D49511DE1F41E4052581FD0073B17F',
        idSupplier: '6DC209CDED22BF3E052581FE007F2C75',
        participateInCall: 'true',
        reasonForNotParticipation: '',
        nameWhoSayDontParticipate: '',
        emailWhoSayDontParticipate: '',
        lockedByModification: false,
        dateLocked: null,
        dateUnLocked: null,
        oldIdCompanySize: '',
        idState: '401461F7F1E0D09005258263004BAAC3',
        invitedToCall: true,
        dateAssignedToEvaluator: '2018/02/20',
        whoEvaluate: 'LinaMaríaBáez Morales',
        whoEvaluateOfTechnicalTeam: '',
      },
      {
        id: 'CC447F2BED2DD156052581FE00800562',
        idCall: 'C96687E12FB0BC60052581FD00748EC0',
        idSurvey: 'F8D49511DE1F41E4052581FD0073B17F',
        idSupplier: '3E7F7F16425D7A87052581FE007F3267',
        participateInCall: 'true',
        reasonForNotParticipation: '',
        nameWhoSayDontParticipate: '',
        emailWhoSayDontParticipate: '',
        lockedByModification: false,
        dateLocked: '2018/01/16',
        dateUnLocked: '2018/01/17',
        oldIdCompanySize: '70C92E997EE7A73A052581FD0073797A',
        idState: '401461F7F1E0D09005258263004BAAC3',
        invitedToCall: true,
        dateAssignedToEvaluator: null,
        whoEvaluate: '',
        whoEvaluateOfTechnicalTeam: '',
      },
      {
        id: 'CD4B5CC5ADED77A1052581FE00800078',
        idCall: 'C96687E12FB0BC60052581FD00748EC0',
        idSurvey: 'F8D49511DE1F41E4052581FD0073B17F',
        idSupplier: '4CB0026A5C536A0F052581FE007F2BE4',
        participateInCall: 'true',
        reasonForNotParticipation: '',
        nameWhoSayDontParticipate: '',
        emailWhoSayDontParticipate: '',
        lockedByModification: false,
        dateLocked: null,
        dateUnLocked: null,
        oldIdCompanySize: '',
        idState: 'FD5336BDBAF269F605258263004BAAC2',
        invitedToCall: true,
        dateAssignedToEvaluator: '2018/02/20',
        whoEvaluate: 'LauraNataliaSolano Cuadros',
        whoEvaluateOfTechnicalTeam: '',
      },
    ],
    years: [
      '2018',
    ],
    masters: {
      Category: [
        {
          idSupply: '50A96846B46A2549052581FD00738690',
          subCategories: [],
          id: 'A0ED4403E7790A93052581FD00738D64',
          name: 'Materia prima',
        },
        {
          idSupply: '50A96846B46A2549052581FD00738690',
          subCategories: [],
          id: '67CB13ABBA00E370052581FD00738D66',
          name: 'Material empaque',
        },
        {
          idSupply: '50A96846B46A2549052581FD00738690',
          subCategories: [],
          id: '8A1CC7A12120512A052581FD00738D68',
          name: 'Indirectos',
        },
      ],
      User: [
        {
          idRols: [
            '0301E82AA7167D68052581FD00747234',
          ],
          email: 'usuario4',
          id: '237B561192B21C1105258202005C2FC8',
          name: 'CN\u003dJuan Carlos Gonzalez Arroyave/O\u003ddesarrollo',
        },
      ],
      CompanySize: [
        {
          id: '2F221ECE19BDBF21052581FD0073797D',
          name: 'Grande',
        },
        {
          id: '70C92E997EE7A73A052581FD0073797A',
          name: 'Pyme',
        },
      ],
      Sector: [
        {
          id: '2032C1518B328A12052581FD0073621F',
          name: 'Pecuarias Y De Caza',
        },
        {
          id: '267E4410D92A7DF5052581FD00736203',
          name: 'Fabricación De Papel, Cartón Y Derivados',
        },
        {
          id: 'F694DE5C822CF9F2052581FD007361E9',
          name: 'Comercio Al Por Mayor',
        },
      ],
      Supply: [
        {
          idCountry: '',
          negotiators: [],
          id: '50A96846B46A2549052581FD00738690',
          name: 'Materiales',
        },
      ],
      SocietyType: [
        {
          id: '2743FE9FC457E529052581FD00738357',
          name: 'Privada',
        },
      ],
      City: [
        {
          idDepartment: '89547FF367617B1B052581FD0073E821',
          id: '14EEA245C2313FA5052581FD00745461',
          name: 'Medellín',
        },
        {
          idDepartment: '0A45109054A56BA4052581FD0073E845',
          id: '65775031647ECB85052581FD00745912',
          name: 'ULLOA',
        },
        {
          idDepartment: '89547FF367617B1B052581FD0073E821',
          id: '4342657B19A3BE53052581FD0074549B',
          name: 'Itagüí',
        },
      ],
      CompanyType: [
        {
          id: 'D7F3CAB1959A76C5052581FD00737F84',
          name: 'Productor o Fabricante',
        },
        {
          id: '044884BC4F2639A7052581FD00737F7E',
          name: 'Distribuidor',
        },
      ],
      Rol: [
        {
          shortName: 'ADMINISTRATOR',
          id: '0301E82AA7167D68052581FD00747234',
          name: 'Administrador',
        },
        {
          shortName: 'TECHNICAL_TEAM',
          id: '247B1BCAE02F688405258247006D1B42',
          name: 'Negociador',
        },
        {
          shortName: 'SUPPLIER',
          id: '29CB2C30EEC1E20F052581FD00747236',
          name: 'Proveedor',
        },
        {
          shortName: 'READER',
          id: '464287447770730C052581FD00747233',
          name: 'Lector',
        },
        {
          shortName: 'MANAGER_TEAM',
          id: '5A76BBE9F64DCA6D052582630048CB73',
          name: 'Gerente',
        },
        {
          shortName: 'EVALUATOR',
          id: '97789E7F068C9146052581FD00747235',
          name: 'Evaluador',
        },
        {
          shortName: 'LIBERATOR',
          id: 'E9B61468D132E6C2052581FD00747232',
          name: 'Liberador',
        },
      ],
      Department: [
        {
          idCountry: 'B4DA2A4C9DE80CA2052581FD0073E3AA',
          id: '89547FF367617B1B052581FD0073E821',
          name: 'ANTIOQUIA',
        },
        {
          idCountry: 'BEC7D050B12CFEB2052581FD0073E3AB',
          id: '0A45109054A56BA4052581FD0073E845',
          name: 'Heredia',
        },
      ],
      Managers: [
        {
          idRols: [
            '5A76BBE9F64DCA6D052582630048CB73',
          ],
          email: 'usuario2',
          id: '6C15B4C440A25AA70525823400005DC9',
          name: 'CN\u003dUsuario 2/O\u003ddesarrollo',
        },
        {
          idRols: [
            '0301E82AA7167D68052581FD00747234',
          ],
          email: 'no@no.com',
          id: '0F603D813E67A4A0052582570011CC1F',
          name: 'Anonymous',
        },
        {
          idRols: [
            '5A76BBE9F64DCA6D052582630048CB73',
          ],
          email: 'usuario1',
          id: '2D60BA1D810403D00525823400002E85',
          name: 'CN\u003dUsuario 1/O\u003ddesarrollo',
        },
      ],
      State: [
        {
          shortName: 'NOT_STARTED_TECHNICAL_TEAM',
          id: '2BD385863A37B646052582480073EB88',
          name: 'Pendiente comité técnico',
        },
        {
          shortName: 'ENDED_MANAGER_TEAM',
          id: '3B440AE1C82FDDDD05258263004BAAC4',
          name: 'Finalizado comité gerencial',
        },
        {
          shortName: 'NOT_STARTED_MANAGER_TEAM',
          id: '401461F7F1E0D09005258263004BAAC3',
          name: 'Pendiente comité gerencial',
        },
        {
          shortName: 'NOT_STARTED_EVALUATOR',
          id: '4621CAF60035EAC305258233007071EE',
          name: 'Pendiente evaluador',
        },
        {
          shortName: 'ENDED_EVALUATOR',
          id: '4C9789E4774685DA052582330070723A',
          name: 'Finalizada evaluador',
        },
        {
          shortName: 'SUPPLIER',
          id: '62BF6606CD0CD2CD05258211007251AA',
          name: 'Guardado parcialmente',
        },
        {
          shortName: 'ENDED_SUPPLIER',
          id: '639D38B8182C2D820525821100725F70',
          name: 'Finalizada proveedor',
        },
        {
          shortName: 'DONT_APPLY_TECHNICAL_TEAM',
          id: '6CE53F82CCE7E8DE052582480073F377',
          name: 'No aplica comité técnico',
        },
        {
          shortName: 'NOT_STARTED',
          id: '9ED195C276807C3805258211007247FA',
          name: 'No ha iniciado',
        },
        {
          shortName: 'TECHNICAL_TEAM',
          id: 'CFD4595A279FB0CA052582480073EB87',
          name: 'Calificado parcialmente',
        },
        {
          shortName: 'DONT_APPLY_MANAGER_TEAM',
          id: 'D07D41A1EF76C2E5052582630051C2C7',
          name: 'No aplica comité gerencial',
        },
        {
          shortName: 'EVALUATOR',
          id: 'DB665BF6C82F7D1B0525822F005B79F4',
          name: 'Evaluado parcialmente',
        },
        {
          shortName: 'ENDED_TECHNICAL_TEAM',
          id: 'E56980C74E633980052582480073EB89',
          name: 'Finalizado comité técnico',
        },
        {
          shortName: 'DONT_PARTICIPATE',
          id: 'E82C9E17B91CE1A8052582110070EA3E',
          name: 'No participa',
        },
        {
          shortName: 'MANAGER_TEAM',
          id: 'FD5336BDBAF269F605258263004BAAC2',
          name: 'Valorado parcialmente',
        },
      ],
      SubCategory: [
        {
          idCategory: 'A0ED4403E7790A93052581FD00738D64',
          id: 'C22E2E40E5CA2E82052581FD0073AD66',
          name: 'Carne',
        },
        {
          idCategory: '67CB13ABBA00E370052581FD00738D66',
          id: 'CC71E804F91D3FFF052581FD0073ADC6',
          name: 'Plegadizas',
        },
        {
          idCategory: '8A1CC7A12120512A052581FD00738D68',
          id: 'C525A07FAA2C5B3B052581FD0073ADFA',
          name: 'Maquinaria y equipo',
        },
      ],
      Country: [
        {
          id: 'B4DA2A4C9DE80CA2052581FD0073E3AA',
          name: 'Colombia',
        },
        {
          id: 'BEC7D050B12CFEB2052581FD0073E3AB',
          name: 'Costa Rica',
        },
      ],
      EvaluationScale: [
        {
          applyTo: 'MANAGER_TEAM',
          score: 1,
          helpText: 'Siendo 1 la nota más baja y 10 la nota más alta',
          id: 'D8CB77914BFB8B7305258263005B785F',
          name: '1',
        },
        {
          applyTo: 'MANAGER_TEAM',
          score: 5,
          helpText: 'Siendo 1 la nota más baja y 10 la nota más alta',
          id: 'CE54AAF23C15823205258263005B80F6',
          name: '5',
        },
        {
          applyTo: 'MANAGER_TEAM',
          score: 10,
          helpText: 'Siendo 1 la nota más baja y 10 la nota más alta',
          id: '2A95B02379C9C61105258263005B849E',
          name: '10',
        },
      ],
      ManagerTeamAnswer: [
        {
          id: 'C112C85516947867052582640069886C',
          idSupplierByCall: '8B8B66A33CB18218052581FE008000C4',
          whoEvaluate: 'CN\u003dUsuario 2/O\u003ddesarrollo',
          idEvaluationScale: '2A95B02379C9C61105258263005B849E',
          comment: 'Usuario 2',
          dateResponse: '2018/04/03',
        },
        {
          id: '9186F008FF42C8820525826500731BC0',
          idSupplierByCall: '8B8B66A33CB18218052581FE008000C4',
          whoEvaluate: 'Anonymous',
          idEvaluationScale: 'CE54AAF23C15823205258263005B80F6',
          comment: '',
          dateResponse: '2018/04/04',
        },
        {
          id: 'A86703902955BE240525826400698269',
          idSupplierByCall: 'CD4B5CC5ADED77A1052581FE00800078',
          whoEvaluate: 'CN\u003dUsuario 2/O\u003ddesarrollo',
          idEvaluationScale: 'CE54AAF23C15823205258263005B80F6',
          comment: 'usuario 2',
          dateResponse: '2018/04/03',
        },
        {
          id: '01CFA5ECE3F1A3C90525826400699F0F',
          idSupplierByCall: 'CD4B5CC5ADED77A1052581FE00800078',
          whoEvaluate: 'CN\u003dUsuario 1/O\u003ddesarrollo',
          idEvaluationScale: 'CE54AAF23C15823205258263005B80F6',
          comment: 'Usuario 1',
          dateResponse: '2018/04/03',
        },
        {
          id: '97D89911939C7CB505258265006F0EA0',
          idSupplierByCall: 'CD4B5CC5ADED77A1052581FE00800078',
          whoEvaluate: 'Anonymous',
          idEvaluationScale: '2A95B02379C9C61105258263005B849E',
          comment: 'Anonimo',
          dateResponse: '2018/04/04',
        },
      ],
    },
  },
  rules: {
    liberator: {
      show: true,
      readOnly: true,
    },
    supplier: {
      show: false,
      readOnly: true,
    },
    evaluator: {
      show: false,
      readOnly: true,
    },
  },
  message: 'success',
  notice: '',
  status: true,
};

class Prueba extends React.Component {
  getScore = (record) => {
    // const { data } = this.props;
    const { masters } = data.data;

    // const defaultValue = record.score.defaultValue;
    return (
      <Select
        labelInValue
        key={record.id}
        // defaultValue={defaultValue}
        allowClear={false}
        style={{ width: 50 }}
        onChange={(value) => {
          this.changeAnswer(record, value, SCORE);
        }}
      >
        {
          masters.EvaluationScale.map(option => (
            <Option key={option.id} value={option.id}>
              {option.name}
            </Option>
          ))
        }
      </Select>
    );
  }

  getDataRows = (item) => {
    const { masters } = data.data;
    const category = masters.Category.find(element => element.id === item.idCategory);
    const rows = [
      {
        title: 'Nombre del Proveedor',
        description: item.businessName,
      },
      {
        title: 'Categoría',
        description: category ? category.name : '',
      },
      {
        title: 'Calificación',
        description: this.getScore(item),
      },
    ];
    return rows;
  };

  changeAnswer = (record, value, type) => {
    // const { data, setComment, setScore } = this.props;
    const { suppliersByCall, masters } = data.data;
    const idSupplier = record.id;
    const idSupplierByCall = suppliersByCall.find(element =>
      element.idSupplier === idSupplier).id;
    let answer = masters.ManagerTeamAnswer.find(element =>
      element.idSupplierByCall === idSupplierByCall);
    if (!answer) {
      answer = {
        idSupplierByCall,
      };
    }
    if (type === SCORE) {
      answer.idEvaluationScale = value.key;
      answer.comment = record.comment.value;
      // setScore(idSupplier, value, answer);
    } else {
      answer.idEvaluationScale = record.score.defaultValue.key;
      answer.comment = value;
      // setComment(idSupplier, value, answer);
    }
  }
  render() {
    return (
      <List
        dataSource={data.data.suppliers}
        itemLayout="vertical"
        grid={{ gutter: 16, column: 2 }}
        renderItem={item => (
          <List.Item key={item.id}>
            {
              this.getDataRows(item).map(row => (
                <List.Item.Meta
                  title={row.title}
                  description={row.description}
                />))
            }
          </List.Item>
        )}
      />
    );
  }
}

export default Prueba;

