webpackJsonp([30],{1211:function(e,t,n){"use strict";function a(){return i.a.createElement(o.a,null)}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n.n(r),o=n(1529);t.default=a},1212:function(e,t,n){"use strict";function a(e){var t=e.text,n=e.translate;return i.a.createElement(l,null,n?i.a.createElement(u.a,{id:t}):t)}var r=n(0),i=n.n(r),o=n(29),u=n(55),c=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  color: ",";\n  margin-bottom: ",";\n"],["\n  color: ",";\n  margin-bottom: ",";\n"]),l=o.c.h1(c,function(e){return e.theme.color.primary},function(e){return e.theme.spaces.main});t.a=a},1529:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=n(0),u=n.n(o),c=n(129),l=n(22),s=n(1530),f=n(1212),d=n(1532),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),y=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),p(t,[{key:"componentDidMount",value:function(){this.props.getDictionary()}},{key:"render",value:function(){return u.a.createElement(l.u,{spinning:this.props.loading},u.a.createElement(f.a,{text:"ADMINISTRAR DICCIONARIO"}),u.a.createElement(s.a,this.props))}}]),t}(o.Component),v=function(e){return{loading:e.dictionary.loading,data:e.dictionary.data,masters:e.dictionary.masters,fields:e.dictionary.fields,spanishText:e.dictionary.spanishText,translate:e.dictionary.translate}};t.a=Object(c.b)(v,d)(y)},1530:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(1531),o=n(392),u=function(e){return r.a.createElement(o.a,Object.assign({},e,{formData:i.a,submitMethod:e.saveDictionary,validate:!0}))};t.a=u},1531:function(e,t,n){"use strict";var a=function(e){var t=e.masters,n=e.getFieldsByMaster,a=e.form,r=e.fields,i=e.spanishText,o=e.getValuesByField,u=e.getTranslationBySpanishText,c=e.translate,l=e.cleanDataMaster,s=function(){a.resetFields(),l()},f=[{id:"en",name:"Ingl\xe9s"}],d=[{key:1.1,value:[{span:24,type:"select",options:t,label:"Maestro",key:"entity",required:!0,handleSelect:n,value:""}]},{key:1.2,value:[{span:24,type:"select",options:f,label:"Idioma",key:"language",required:!0,disabled:!0,value:"en"}]}];return r&&0!==r.length&&d.splice(2,0,{key:1.3,value:[{span:24,type:"select",options:r,label:"Campo",key:"name",handleSelect:o,required:!0,value:""}]}),0!==i.length&&d.splice(3,0,{key:1.4,value:[{span:24,type:"select",options:i,label:"Texto en espa\xf1ol",key:"spanishText",handleSelect:u,required:!0,value:""}]}),void 0!==c&&(d.splice(4,0,{key:1.5,value:[{span:24,type:"input",label:"Traducci\xf3n",key:"value",required:!0,whitespace:!0,value:c}]}),d.splice(5,0,{key:2,justify:"center",value:[{span:2,type:"button",label:"Limpiar",key:"clear",buttonType:"primary",handleclick:s},{span:4,type:"button",label:"Guardar",key:"save",buttonType:"primary",htmlType:"submit"}]})),d};t.a=a},1532:function(e,t,n){"use strict";function a(){return{type:c.d}}function r(e,t,n){return{type:c.e,data:e,masters:t,mastersFields:n}}function i(){return{type:c.i}}function o(){return function(e){Object(f.a)(e,a,l.a).then(function(t){Object(f.a)(e,a,l.c).then(function(n){var a=n.data.data,i=Object.keys(a).map(function(e){return{id:e,name:e}}),o=t.data.data;e(r(o,i,a))})}).catch(function(){e(i())})}}function u(e,t,n){return function(t,r){if(new RegExp(/^\s+$/).test(e.value))return void t(Object(d.a)("La traducci\xf3n no puede contener espacios solamente","info"));var u=r().dictionary,c={id:u.id,language:e.language,entity:e.entity,entityId:u.entityId,name:e.name,value:e.value};t(Object(s.closeModal)()),Object(f.a)(t,a,l.d,c).then(function(){t(T()),t(o()),n&&n()}).catch(function(){t(i())})}}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"getDictionary",function(){return o}),n.d(t,"saveDictionary",function(){return u}),n.d(t,"getFieldsByMaster",function(){return v}),n.d(t,"cleanDataMaster",function(){return y}),n.d(t,"getValuesByField",function(){return j}),n.d(t,"getTranslationBySpanishText",function(){return h});var c=n(432),l=n(1533),s=n(393),f=n(208),d=n(211);n.d(t,"openModal",function(){return s.openModal}),n.d(t,"closeModal",function(){return s.closeModal});var p=function(e,t){return{type:c.f,fields:e,currentMaster:t}},y=function(){return{type:c.b}},v=function(e){return function(t,n){try{var a=n().dictionary.mastersFields;t(y());var r=[];a[e]&&a[e].forEach(function(e){var t={id:e,name:e};r.push(t)}),t(p(r,e))}catch(e){t(i())}}},b=function(){return{type:c.c}},m=function(e,t,n){return{type:c.g,translate:e,id:t,entityId:n}},h=function(e){return function(t,n){try{var a=n().dictionary.data,r=n().dictionary.field;t(b());var o=a.find(function(t){return t.entityId===e&&t.name===r}),u="",c="",l=void 0;o?(u=o.value,c=o.id,l=o.entityId):l=e,t(m(u,c,l))}catch(e){t(i())}}},g=function(e,t){return{type:c.h,values:e,field:t}},O=function(){return{type:c.a}},j=function(e){return function(t,n){var r=n().dictionary.currentMaster;t(O()),Object(f.a)(t,a,l.b,r).then(function(n){var a=n.data.data,r=a.filter(function(t){return""!==t[e]}).map(function(t){return{id:t.id,name:t[e]}});t(g(r,e))}).catch(function(){t(i())})}},T=function(){return{type:c.b}}},1533:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return u}),n.d(t,"c",function(){return i}),n.d(t,"d",function(){return o});var a=n(82),r=function(){return a.a.get("Translation?action=getAll")},i=function(){return a.a.get("Translation?action=getMastersWithFieldsToTranslate")},o=function(e){return a.a.post("Translation?action=save",e)},u=function(e){return a.a.get(e+"?action=getAll")}}});
//# sourceMappingURL=30.002f0160.chunk.js.map