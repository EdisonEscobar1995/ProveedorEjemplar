webpackJsonp([17],{1205:function(e,t,n){"use strict";function a(){return o.a.createElement(c.a,null)}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n.n(r),c=n(1478);t.default=a},1212:function(e,t,n){"use strict";function a(e){var t=e.text,n=e.translate;return o.a.createElement(u,null,n?o.a.createElement(i.a,{id:t}):t)}var r=n(0),o=n.n(r),c=n(29),i=n(55),l=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  color: ",";\n  margin-bottom: ",";\n"],["\n  color: ",";\n  margin-bottom: ",";\n"]),u=c.c.h1(l,function(e){return e.theme.color.primary},function(e){return e.theme.spaces.main});t.a=a},1214:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(29),c=n(22),i=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  width: 100%;\n  margin: 0 5px;\n\n  & .ant-select-selection-selected-value {\n    position: absolute;\n  }\n"],["\n  width: 100%;\n  margin: 0 5px;\n\n  & .ant-select-selection-selected-value {\n    position: absolute;\n  }\n"]),l=c.t.Option,u=c.t.OptGroup,d=Object(o.c)(c.t)(i),s=function(e,t,n){return t?r.a.createElement(u,{label:n},e.map(function(e){return r.a.createElement(l,{key:e.id,value:e.id},e.name)})):e.map(function(e){return r.a.createElement(l,{key:e.id,value:e.id},e.name)})},p=function(e){var t=e.options,n=void 0===t?[]:t,a=e.mode,o=e.handleChange,c=e.onDeselect,i=e.onSelect,l=e.style,u=e.group,p=void 0!==u&&u,f=e.labelOptions,m=e.value;return r.a.createElement(d,{showSearch:!0,value:m,mode:a,style:l,placeholder:"Buscar",onChange:function(e,t){return o&&o(e,t)},onSelect:function(e,t){return i&&i(e,t)},onDeselect:function(e,t){return c&&c(e,t)},filterOption:function(e,t){return(t.props.children.props?t.props.children.props.id:t.props.children).toLowerCase().indexOf(e.toLowerCase())>=0}},s(n,p,f))};t.a=p},1215:function(e,t,n){"use strict";function a(e){var t=e.level,n=e.parentId,r=e.componentList,i=e.openModal,p=e.loading,h=e.data,b=e.disabled,v=e.expandable,g=e.pagination,E=e.searchValue,O=e.withDelete,j=void 0!==O&&O,w=e.withOutActions,S=void 0!==w&&w,k=e.withOutAdd,M=void 0!==k&&k,C=e.withOutAddOptions,T=void 0!==C&&C;return o.a.createElement(c.u,{spinning:p},o.a.createElement(d.a,{text:r[t].title}),h&&h.length>0?o.a.createElement("div",null,o.a.createElement("span",null,r[t].onSearchMethod&&o.a.createElement(m,{size:"large",placeholder:"Buscar",style:{width:200},value:E,prefix:o.a.createElement(c.h,{type:"close",style:{cursor:"pointer"},onClick:function(){return r[t].onSearchMethod("",n)}}),onChange:function(e){return r[t].onChangeSearchMethod(e.target.value,n)},onSearch:function(e){return r[t].onSearchMethod(e,n)}}),r[t].filters&&r[t].filters.map(function(e){return o.a.createElement("span",null,o.a.createElement(y,null,e.label?e.label:""),o.a.createElement(s.a,{options:e.options,mode:e.mode,handleChange:e.handleChange,onSelect:e.onSelect,onDeselect:e.deselect,group:e.group,style:{width:200},labelOptions:e.labelOptions}))})),o.a.createElement(c.w,{pagination:g,rowKey:function(e){return e.id},dataSource:r[t].onSearchMethod?h.filter(function(e){return e.visible}):h,onExpand:v?function(e,n){!n.data&&e&&r[t].onExpandMethod?r[t].onExpandMethod(n.id):e||r[t].onCollapseMethod(n)}:null,expandedRowRender:v?function(n){return n.data&&n.data.length>0?o.a.createElement(a,Object.assign({},e,{level:t+1,componentList:r,parentId:n.id,data:n.data,disabled:n.disabled,expandable:n.expandable,searchValue:n.searchValue,loading:!1,pagination:g})):!M&&o.a.createElement("div",null,o.a.createElement(d.a,{text:r[t+1].title}),o.a.createElement(c.b,{onClick:function(){var a=r[t+1].component;i(o.a.createElement(a,Object.assign({},e,{parentId:n.id})))}},"Agregar"))}:null,style:r[t].style,onRowClick:r[t].onRowClick?function(e){r[t].onRowClick(e)}:null},r[t].columns.map(function(e){return o.a.createElement(f,{title:o.a.createElement(u.a,{id:e.title}),key:e.key,dataIndex:e.key,render:e.render,sorter:e.sorter})}),(b||!S)&&o.a.createElement(f,{title:o.a.createElement(u.a,{id:"Table.action"}),key:"action",render:function(n,a){return o.a.createElement("div",null,o.a.createElement(c.y,{title:o.a.createElement(u.a,{id:"Button.edit"})},o.a.createElement(c.b,{shape:"circle",icon:"edit",onClick:function(){var n=r[t].component;i(o.a.createElement(n,Object.assign({},e,{record:a})))}})),j&&o.a.createElement(l.a,{method:function(){return r[t].deleteMethod(a)}},o.a.createElement(c.y,{title:o.a.createElement(u.a,{id:"Button.delete"})},o.a.createElement(c.b,{type:"danger",shape:"circle",icon:"delete"}))),!T&&o.a.createElement(c.y,{title:o.a.createElement(u.a,{id:"Button.add"})},o.a.createElement(c.b,{shape:"circle",icon:"plus",onClick:function(){var n=r[t].component;i(o.a.createElement(n,Object.assign({},e,{remoteId:a.id})))}})))}}))):!M&&o.a.createElement(c.b,{onClick:function(){var n=r[t].component;i(o.a.createElement(n,e))}},"Agregar"))}var r=n(0),o=n.n(r),c=n(22),i=n(29),l=n(210),u=n(55),d=n(1212),s=n(1214),p=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  margin-bottom: 4px;\n  margin-left: 5px;\n"],["\n  margin-bottom: 4px;\n  margin-left: 5px;\n"]),f=c.w.Column,m=c.i.Search,y=i.c.span(p);t.a=a},1219:function(e,t,n){"use strict";function a(e,t){return!new RegExp(/^\s+$/).test(t)||(e(Object(r.a)("El nombre no puede contener espacios solamente","info")),!1)}var r=n(211);t.a=a},1478:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=n(0),i=n.n(c),l=n(129),u=n(1479),d=n(1215),s=n(1481),p=n(1482),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),m=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),f(t,[{key:"componentDidMount",value:function(){this.props.getSocietyType()}},{key:"render",value:function(){var e=[{title:"Configurar tipos de sociedad",component:p.a,columns:Object(s.a)(this.props.data),deleteMethod:this.props.deleteSocietyType,onChangeSearchMethod:this.props.changeSearchSocietyType,onSearchMethod:this.props.searchSocietyType}];return i.a.createElement(d.a,Object.assign({},this.props,{level:0,componentList:e,expandable:!1,pagination:!0,withDelete:!0}))}}]),t}(c.Component),y=function(e){return{data:e.societyType.data,searchValue:e.societyType.searchValue,loading:e.societyType.loading}};t.a=Object(l.b)(y,u)(m)},1479:function(e,t,n){"use strict";function a(){return{type:f.d}}function r(e){return{type:f.e,data:e}}function o(){return{type:f.f}}function c(e,t,n){return{type:e?f.h:f.a,data:t,remoteId:n}}function i(e){return{type:f.c,data:e}}function l(e){return{type:f.g,value:e}}function u(e){return{type:f.b,value:e}}function d(){return function(e){Object(h.a)(e,a,m.b).then(function(t){var n=Object(h.c)(t.data.data,"name").map(function(e){return Object.assign({},e,{visible:!0})});e(r(n))}).catch(function(){e(o())})}}function s(e,t,n){return function(r){Object(b.a)(r,e.name)&&(e.name=e.name.trim(),r(Object(y.closeModal)()),Object(h.a)(r,a,m.c,e).then(function(a){var o=a.data.data;o.visible=!0,r(c(e.id,o,t)),n&&n()}).catch(function(){r(o())}))}}function p(e){return function(t){t(Object(y.closeModal)()),Object(h.a)(t,a,m.a,e).then(function(){t(i(e))}).catch(function(){t(o())})}}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"getSocietyType",function(){return d}),n.d(t,"saveSocietyType",function(){return s}),n.d(t,"deleteSocietyType",function(){return p}),n.d(t,"searchSocietyType",function(){return l}),n.d(t,"changeSearchSocietyType",function(){return u});var f=n(428),m=n(1480),y=n(393),h=n(208),b=n(1219);n.d(t,"openModal",function(){return y.openModal}),n.d(t,"closeModal",function(){return y.closeModal})},1480:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"c",function(){return o}),n.d(t,"a",function(){return c});var a=n(82),r=function(){return a.a.get("SocietyType?action=getAll")},o=function(e){return a.a.post("SocietyType?action=save",e)},c=function(e){return a.a.get("SocietyType?action=delete",{params:{id:e.id}})}},1481:function(e,t,n){"use strict";var a=function(){return[{title:"Nombre del tipo de sociedad",key:"name",sorter:function(e,t){return e.name>t.name?-1:1}}]};t.a=a},1482:function(e,t,n){"use strict";function a(e){return o.a.createElement(l.a,Object.assign({},e,{formData:i.a,submitMethod:e.saveSocietyType,validate:!0}))}var r=n(0),o=n.n(r),c=n(129),i=n(1483),l=n(392),u=function(e){return{loadingModal:e.main.loadingModal}};t.a=Object(c.b)(u,null)(a)},1483:function(e,t,n){"use strict";var a=function(e){var t=e.record,n=void 0===t?{}:t,a=e.closeModal;return[{key:1,value:[{span:24,type:"title",value:"Tipos de sociedad"}]},{key:1.1,value:[{span:24,type:"input",label:"Id",key:"id",value:n.id,style:{display:"none"}}]},{key:1.5,value:[{span:24,type:"input",label:"Nombre del tipo de sociedad",key:"name",required:!0,whitespace:!0,value:n.name}]},{key:1.8,justify:"center",value:[{span:4,type:"button",label:"Cancelar",key:"cancel",buttonType:"primary",handleclick:a},{span:4,type:"button",label:"Guardar",key:"save",buttonType:"primary",htmlType:"submit"}]}]};t.a=a}});
//# sourceMappingURL=17.715f197f.chunk.js.map