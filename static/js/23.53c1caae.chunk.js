webpackJsonp([23],{1193:function(e,t,n){"use strict";function a(){return o.a.createElement(c.a,null)}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n.n(r),c=n(1404);t.default=a},1212:function(e,t,n){"use strict";function a(e){var t=e.text,n=e.translate;return o.a.createElement(u,null,n?o.a.createElement(i.a,{id:t}):t)}var r=n(0),o=n.n(r),c=n(29),i=n(55),l=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  color: ",";\n  margin-bottom: ",";\n"],["\n  color: ",";\n  margin-bottom: ",";\n"]),u=c.c.h1(l,function(e){return e.theme.color.primary},function(e){return e.theme.spaces.main});t.a=a},1214:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(29),c=n(22),i=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  width: 100%;\n  margin: 0 5px;\n\n  & .ant-select-selection-selected-value {\n    position: absolute;\n  }\n"],["\n  width: 100%;\n  margin: 0 5px;\n\n  & .ant-select-selection-selected-value {\n    position: absolute;\n  }\n"]),l=c.t.Option,u=c.t.OptGroup,s=Object(o.c)(c.t)(i),d=function(e,t,n){return t?r.a.createElement(u,{label:n},e.map(function(e){return r.a.createElement(l,{key:e.id,value:e.id},e.name)})):e.map(function(e){return r.a.createElement(l,{key:e.id,value:e.id},e.name)})},p=function(e){var t=e.options,n=void 0===t?[]:t,a=e.mode,o=e.handleChange,c=e.onDeselect,i=e.onSelect,l=e.style,u=e.group,p=void 0!==u&&u,f=e.labelOptions,m=e.value;return r.a.createElement(s,{showSearch:!0,value:m,mode:a,style:l,placeholder:"Buscar",onChange:function(e,t){return o&&o(e,t)},onSelect:function(e,t){return i&&i(e,t)},onDeselect:function(e,t){return c&&c(e,t)},filterOption:function(e,t){return(t.props.children.props?t.props.children.props.id:t.props.children).toLowerCase().indexOf(e.toLowerCase())>=0}},d(n,p,f))};t.a=p},1215:function(e,t,n){"use strict";function a(e){var t=e.level,n=e.parentId,r=e.componentList,i=e.openModal,p=e.loading,y=e.data,b=e.disabled,v=e.expandable,g=e.pagination,E=e.searchValue,O=e.withDelete,A=void 0!==O&&O,j=e.withOutActions,R=void 0!==j&&j,k=e.withOutAdd,w=void 0!==k&&k,M=e.withOutAddOptions,x=void 0!==M&&M;return o.a.createElement(c.u,{spinning:p},o.a.createElement(s.a,{text:r[t].title}),y&&y.length>0?o.a.createElement("div",null,o.a.createElement("span",null,r[t].onSearchMethod&&o.a.createElement(m,{size:"large",placeholder:"Buscar",style:{width:200},value:E,prefix:o.a.createElement(c.h,{type:"close",style:{cursor:"pointer"},onClick:function(){return r[t].onSearchMethod("",n)}}),onChange:function(e){return r[t].onChangeSearchMethod(e.target.value,n)},onSearch:function(e){return r[t].onSearchMethod(e,n)}}),r[t].filters&&r[t].filters.map(function(e){return o.a.createElement("span",null,o.a.createElement(h,null,e.label?e.label:""),o.a.createElement(d.a,{options:e.options,mode:e.mode,handleChange:e.handleChange,onSelect:e.onSelect,onDeselect:e.deselect,group:e.group,style:{width:200},labelOptions:e.labelOptions}))})),o.a.createElement(c.w,{pagination:g,rowKey:function(e){return e.id},dataSource:r[t].onSearchMethod?y.filter(function(e){return e.visible}):y,onExpand:v?function(e,n){!n.data&&e&&r[t].onExpandMethod?r[t].onExpandMethod(n.id):e||r[t].onCollapseMethod(n)}:null,expandedRowRender:v?function(n){return n.data&&n.data.length>0?o.a.createElement(a,Object.assign({},e,{level:t+1,componentList:r,parentId:n.id,data:n.data,disabled:n.disabled,expandable:n.expandable,searchValue:n.searchValue,loading:!1,pagination:g})):!w&&o.a.createElement("div",null,o.a.createElement(s.a,{text:r[t+1].title}),o.a.createElement(c.b,{onClick:function(){var a=r[t+1].component;i(o.a.createElement(a,Object.assign({},e,{parentId:n.id})))}},"Agregar"))}:null,style:r[t].style,onRowClick:r[t].onRowClick?function(e){r[t].onRowClick(e)}:null},r[t].columns.map(function(e){return o.a.createElement(f,{title:o.a.createElement(u.a,{id:e.title}),key:e.key,dataIndex:e.key,render:e.render,sorter:e.sorter})}),(b||!R)&&o.a.createElement(f,{title:o.a.createElement(u.a,{id:"Table.action"}),key:"action",render:function(n,a){return o.a.createElement("div",null,o.a.createElement(c.y,{title:o.a.createElement(u.a,{id:"Button.edit"})},o.a.createElement(c.b,{shape:"circle",icon:"edit",onClick:function(){var n=r[t].component;i(o.a.createElement(n,Object.assign({},e,{record:a})))}})),A&&o.a.createElement(l.a,{method:function(){return r[t].deleteMethod(a)}},o.a.createElement(c.y,{title:o.a.createElement(u.a,{id:"Button.delete"})},o.a.createElement(c.b,{type:"danger",shape:"circle",icon:"delete"}))),!x&&o.a.createElement(c.y,{title:o.a.createElement(u.a,{id:"Button.add"})},o.a.createElement(c.b,{shape:"circle",icon:"plus",onClick:function(){var n=r[t].component;i(o.a.createElement(n,Object.assign({},e,{remoteId:a.id})))}})))}}))):!w&&o.a.createElement(c.b,{onClick:function(){var n=r[t].component;i(o.a.createElement(n,e))}},"Agregar"))}var r=n(0),o=n.n(r),c=n(22),i=n(29),l=n(210),u=n(55),s=n(1212),d=n(1214),p=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  margin-bottom: 4px;\n  margin-left: 5px;\n"],["\n  margin-bottom: 4px;\n  margin-left: 5px;\n"]),f=c.w.Column,m=c.i.Search,h=i.c.span(p);t.a=a},1216:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=(n(82),n(209)),r=function(e){return a.a.get("xaServicios.xsp?Open&action=getMasterList&"+e.join("&"))}},1404:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=n(0),i=n.n(c),l=n(129),u=n(1405),s=n(1215),d=n(1407),p=n(1408),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),m=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),f(t,[{key:"componentDidMount",value:function(){this.props.getAccessByRol()}},{key:"render",value:function(){var e=[{title:"Accesos por rol",component:p.a,columns:Object(d.a)(this.props.masters),deleteMethod:this.props.deleteAccessByRol,onChangeSearchMethod:this.props.changeSearchAccessByRol,onSearchMethod:this.props.searchAccessByRol}];return i.a.createElement(s.a,Object.assign({},this.props,{level:0,componentList:e,expandable:!1,pagination:!0}))}}]),t}(c.Component),h=function(e){return{data:e.accessByRol.data,searchValue:e.accessByRol.searchValue,masters:e.accessByRol.masters,loading:e.accessByRol.loading}};t.a=Object(l.b)(h,u)(m)},1405:function(e,t,n){"use strict";function a(){return{type:f.d}}function r(e,t){return{type:f.e,data:e,masters:t}}function o(){return{type:f.f}}function c(e,t,n){return{type:e?f.h:f.a,data:t,remoteId:n}}function i(e){return{type:f.c,data:e}}function l(e){return{type:f.g,value:e}}function u(e){return{type:f.b,value:e}}function s(){return function(e){Object(b.a)(e,a,h.a,["Access","Rol"]).then(function(t){Object(b.a)(e,a,m.b).then(function(n){var a=n.data.data.map(function(e){return Object.assign({},e,{visible:!0})}),o={Access:t.data.data.Access.map(function(e){return Object.assign({},e,{name:e.api+" - "+e.action})}),Roles:t.data.data.Rol};e(r(a,o))}).catch(function(){e(o())})}).catch(function(){e(o())})}}function d(e,t,n){return function(r){r(Object(y.closeModal)()),Object(b.a)(r,a,m.c,e).then(function(a){var o=a.data.data;o.visible=!0,r(c(e.id,o,t)),n&&n()}).catch(function(){r(o())})}}function p(e){return function(t){t(Object(y.closeModal)()),Object(b.a)(t,a,m.a,e).then(function(){t(i(e))}).catch(function(){t(o())})}}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"getAccessByRol",function(){return s}),n.d(t,"saveAccessByRol",function(){return d}),n.d(t,"deleteAccessByRol",function(){return p}),n.d(t,"searchAccessByRol",function(){return l}),n.d(t,"changeSearchAccessByRol",function(){return u});var f=n(416),m=n(1406),h=n(1216),y=n(393),b=n(208);n.d(t,"openModal",function(){return y.openModal}),n.d(t,"closeModal",function(){return y.closeModal})},1406:function(e,t,n){"use strict";function a(){return c.a.get("AccessByRol?action=getAll")}function r(e){return c.a.post("AccessByRol?action=save",e)}function o(e){var t=e.id;return c.a.get("AccessByRol?action=delete&id="+t)}n.d(t,"b",function(){return a}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return o});var c=n(82)},1407:function(e,t,n){"use strict";var a=function(e){return[{title:"Api",key:"idAccessApi",render:function(t,n){return e.Access&&e.Access.find(function(e){return e.id===n.idAccess}).api}},{title:"Acci\xf3n",key:"idAccessAction",render:function(t,n){return e.Access&&e.Access.find(function(e){return e.id===n.idAccess}).action}},{title:"Rol",key:"idRol",render:function(t,n){return e.Roles&&e.Roles.find(function(e){return e.id===n.idRol}).name}}]};t.a=a},1408:function(e,t,n){"use strict";function a(e){return o.a.createElement(i.a,Object.assign({},e,{formData:c.a,submitMethod:e.saveAccessByRol,validate:!0}))}var r=n(0),o=n.n(r),c=n(1409),i=n(392);t.a=a},1409:function(e,t,n){"use strict";var a=function(e){var t=e.record,n=void 0===t?{}:t,a=e.closeModal,r=e.masters;return[{key:1,value:[{span:24,type:"title",value:"Accesso por rol"}]},{key:1.1,value:[{span:24,type:"input",label:"Id",key:"id",value:n.id,style:{display:"none"}}]},{key:1.2,value:[{span:24,type:"select",mode:"default",options:r.Access,label:"Acceso",key:"idAccess",required:!0,value:n.idAccess}]},{key:1.3,value:[{span:24,type:"select",mode:"default",options:r.Roles,label:"Rol",key:"idRol",required:!0,value:n.idRol}]},{key:1.4,justify:"center",value:[{span:4,type:"button",label:"Cancelar",key:"cancel",buttonType:"primary",handleclick:a},{span:4,type:"button",label:"Guardar",key:"save",buttonType:"primary",htmlType:"submit"}]}]};t.a=a}});
//# sourceMappingURL=23.53c1caae.chunk.js.map