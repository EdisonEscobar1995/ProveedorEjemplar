webpackJsonp([5],{1212:function(e,t,n){"use strict";function a(e){var t=e.text,n=e.translate;return i.a.createElement(s,null,n?i.a.createElement(o.a,{id:t}):t)}var r=n(0),i=n.n(r),l=n(29),o=n(55),u=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  color: ",";\n  margin-bottom: ",";\n"],["\n  color: ",";\n  margin-bottom: ",";\n"]),s=l.c.h1(u,function(e){return e.theme.color.primary},function(e){return e.theme.spaces.main});t.a=a},1448:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(0),o=n.n(l),u=n(129),s=n(22),c=n(101),p=n(408),f=n(1449),m=n(392),y=n(1450),d=n(1212),v=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),g=function(e){function t(){var e,n,i,l;a(this,t);for(var o=arguments.length,u=Array(o),s=0;s<o;s++)u[s]=arguments[s];return n=i=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),i.getDataSupplier=function(){var e=i.props.location.pathname,t=e.split("/");return t.length>2?t[2]:""},i.filterSupplier=function(e){var t={supplier:e};i.props.filterManagerTeamSurvey(t)},l=n,r(i,l)}return i(t,e),v(t,[{key:"componentDidMount",value:function(){var e=this.getDataSupplier();this.props.getManagerTeamSurvey("",e),""!==e&&this.filterSupplier(e)}},{key:"componentWillReceiveProps",value:function(e){e.data.supplierId!==this.props.data.supplierId&&this.filterSupplier(e.data.supplierId)}},{key:"render",value:function(){return o.a.createElement(s.u,{spinning:this.props.loading},o.a.createElement(d.a,{text:"Calificaci\xf3n comit\xe9 gerencial"}),o.a.createElement(m.a,Object.assign({},this.props,{formData:f.a})),o.a.createElement(y.a,this.props))}}]),t}(l.Component),h=function(e){return{data:e.managerTeamSurvey.data,loading:e.managerTeamSurvey.loading}};t.a=Object(c.e)(Object(u.b)(h,p)(g))},1449:function(e,t,n){"use strict";var a=function(e){var t=e.data,n=e.getManagerTeamSurvey,a=e.filterManagerTeamSurvey,r=e.form,i=t.years,l=t.suppliers,o=t.masters,u=t.supplierId,s=function(){r.resetFields(),n()},c=[{key:1.1,value:[{span:8,type:"select",label:"A\xf1o",key:"year",value:i&&i.length>0?i[0]:"",options:i?i.map(function(e){return{id:e,name:e}}):[],handleChange:n,allowClear:!1,valuesToClean:{supply:{value:""},category:{value:""},country:{value:""},supplier:{value:""}}},{span:8,type:"select",label:"Tipo de suministro",key:"supply",value:"",options:o?o.Supply:[],handleChange:function(e){var t=Object.assign({},r.getFieldsValue(),{supply:e});a(t)}},{span:8,type:"select",label:"Categor\xeda",key:"category",value:"",options:o?o.Category:[],handleChange:function(e){var t=Object.assign({},r.getFieldsValue(),{category:e});a(t)}}]},{key:1.2,value:[{span:8,type:"select",label:"Pa\xeds",key:"country",value:"",options:o?o.Country:[],handleChange:function(e){var t=Object.assign({},r.getFieldsValue(),{country:e});a(t)}},{span:8,type:"select",label:"Proveedor",key:"supplier",value:u,options:function(){var e=[],t=[];return l&&l.forEach(function(n){var a=n.id;-1===t.indexOf(a)&&(n.name=n.businessName,n.isEspecial&&(n.name=n.businessName+" - "+n.supply),t.push(a),e.push(n))}),e}(),handleChange:function(e){var t=Object.assign({},r.getFieldsValue(),{supplier:e});a(t)}},{span:8,type:"select",label:"Tama\xf1o",key:"companySize",value:"",options:o?o.CompanySize:[],handleChange:function(e){var t=Object.assign({},r.getFieldsValue(),{companySize:e});a(t)}}]},{key:1.4,justify:"center",value:[{span:2,type:"button",label:"Limpiar",key:"clear",buttonType:"primary",handleclick:s}]}];return t.finishVisible&&(c.splice(2,0,{key:1.3,value:[{span:8,type:"select",label:"Estado",key:"states",value:"",options:o?o.State:[],handleChange:function(e){var t=Object.assign({},r.getFieldsValue(),{states:e});a(t)}}]}),c[2].value.splice(1,0,{span:8,type:"select",label:"Gerente",key:"managers",value:"",options:o?o.Managers:[],handleChange:function(e){var t=Object.assign({},r.getFieldsValue(),{managers:e});a(t)}})),c};t.a=a},1450:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(0),o=n.n(l),u=n(22),s=n(400),c=n(212),p=n(210),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),m=u.w.Column,y=u.t.Option,d=u.i.TextArea,v=function(e){function t(){var e,n,i,l;a(this,t);for(var p=arguments.length,f=Array(p),v=0;v<p;v++)f[v]=arguments[v];return n=i=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(f))),i.getHelp=function(e,t){return e?o.a.createElement(u.y,{placement:"topRight",title:e},o.a.createElement(u.h,{style:{marginLeft:5,marginRight:0,color:t?"#fff":"#37907c"},type:"question-circle"+(t?"-o":"")})):null},i.getComment=function(e){var t=e.comment.value;return e.readOnly?t:o.a.createElement(d,{rows:4,defaultValue:t,value:e.comment.value,onChange:function(t){return i.changeComment(t,e)},onBlur:function(t){return i.changeAnswer(e,t.target.value,c.b)}})},i.getScore=function(e){var t=i.props.data,n=t.masters,a=e.score.defaultValue;return e.readOnly?a.name:o.a.createElement("div",null,o.a.createElement(u.t,{labelInValue:!0,key:e.id,defaultValue:a,allowClear:!1,style:{width:50},onChange:function(t){i.changeAnswer(e,t,c.i)}},n.EvaluationScale.map(function(e){return o.a.createElement(y,{key:e.id,value:e.id},e.name)})),e.score.error?o.a.createElement(s.b,null,"Campo requerido"):null)},i.getSupplierColumns=function(){var e=i.props.data,t=e.masters;return[{title:"Estado",key:"surveyState",render:function(e,n){return t.State.find(function(e){return e.id===n.idState}).name}},{title:"Evaluado por",key:"manager",render:function(e,t){return t.whoEvaluate}},{title:"Nombre del proveedor",key:"businessName"},{title:"Tipo de suministro",key:"idSupply",render:function(e,n){return n.isEspecial?n.supply:t.Supply.find(function(e){return e.id===n.idSupply}).name}},{title:"Categor\xeda",key:"idCategory",render:function(e,n){var a=t.Category.find(function(e){return e.id===n.idCategory});return a?a.name:""}},{title:"Tama\xf1o de empresa",key:"idCompanySize",render:function(e,n){var a=t.CompanySize.find(function(e){return e.id===n.idCompanySize});return a?a.name:""}},{title:"Calificaci\xf3n",key:"score.value",render:function(e,t){return i.getScore(t)}},{title:"Comentarios",key:"comment.value",render:function(e,t){return i.getComment(t)}}].map(function(e){return o.a.createElement(m,{title:e.title,key:e.key,dataIndex:e.key,render:e.render})})},i.setAnswerCommentState=function(e,t){var n=i.props,a=n.data,r=n.setCommentState,l=a.suppliersByCall,o=a.masters,u=e.id,s=void 0;if(e.isEspecial){var c=e.id.split("_")[0];s=l.find(function(t){return t.idSupplier===c&&t.idSupplySpecial===e.idSupplySpecial}).id}else s=l.find(function(e){return e.idSupplier===u}).id;var p=o.ManagerTeamAnswer.find(function(e){return e.idSupplierByCall===s});p||(p={idSupplierByCall:s}),r(u,t,p)},i.changeComment=function(e,t){i.setAnswerCommentState(t,e.target.value)},i.changeAnswer=function(e,t,n){var a=i.props,r=a.data,l=a.setComment,o=a.setScore,u=r.suppliersByCall,s=r.masters,p=e.id,f=void 0;if(e.isEspecial){var m=e.id.split("_")[0];f=u.find(function(t){return t.idSupplier===m&&t.idSupplySpecial===e.idSupplySpecial}).id}else f=u.find(function(e){return e.idSupplier===p}).id;var y=s.ManagerTeamAnswer.find(function(e){return e.idSupplierByCall===f});y||(y={idSupplierByCall:f}),n===c.i?(y.idEvaluationScale=t.key,y.comment=e.comment.value,y.isEspecial=e.isEspecial?"true":"",o(p,t,y)):(y.idEvaluationScale=e.score.defaultValue.key,y.comment=t,y.isEspecial=e.isEspecial?"true":"",l(p,t,y))},l=n,r(i,l)}return i(t,e),f(t,[{key:"render",value:function(){var e=this.props,t=e.data,n=e.finishManagerTeamSurvey,a=t.suppliers,r=t.masters;return a?o.a.createElement("div",null,o.a.createElement("span",null,"Escala de evaluaci\xf3n",this.getHelp(r.EvaluationScale.map(function(e){return o.a.createElement("div",null,e.name+": "+e.helpText)})),o.a.createElement("strong",{style:{marginLeft:20}},"Total resultados: "),a.filter(function(e){return e.visible}).length),o.a.createElement(u.w,{dataSource:a.filter(function(e){return e.visible})},this.getSupplierColumns()),0===a.filter(function(e){return!1===e.visible}).length&&t.finishVisible&&t.yearCall===(t.years&&t.years.length>0?t.years[0]:"")?o.a.createElement(u.s,{type:"flex",justify:"center"},o.a.createElement(u.e,{span:2},o.a.createElement(p.a,{title:"\xbfConfirma que desea finalizar?",method:function(){return n()}},o.a.createElement(u.b,{type:"primary"},"Finalizar")))):null):null}}]),t}(l.Component);t.a=v},439:function(e,t,n){"use strict";function a(){return i.a.createElement(l.a,null)}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n.n(r),l=n(1448);t.default=a}});
//# sourceMappingURL=5.41b6b989.chunk.js.map