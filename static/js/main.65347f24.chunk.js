(this.webpackJsonpimbhy=this.webpackJsonpimbhy||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var r=n(4),a=n.n(r),c=n(9),o=n.n(c),u=(n(14),n(1)),s=n(6),i=(n(15),n(16),n(0));function l(e){if(""===e.selectedStopId)return Object(i.jsx)("div",{});var t,n=new Date;return t=0===e.etaData.length?Object(i.jsx)("tr",{children:Object(i.jsx)("td",{colSpan:"2",children:"No data"})}):e.etaData.sort((function(e,t){return""===e.eta?1:""===t.eta?-1:new Date(e.eta)-new Date(t.eta)})).map((function(t){var r,a,c=t.rmk_en,o=t.eta;if(""===o)r="Unknown";else{var u=(a=new Date(o)-n,Math.floor(a/6e4));r=u<=0?"<1 min":"".concat(u," min(s)")}var s="".concat(e.selectedRoute,":").concat(e.selectedStopId,":").concat(o);return Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:r},"".concat(s,":eta")),Object(i.jsx)("td",{children:c},"".concat(s,":remark"))]},s)})),Object(i.jsxs)("table",{className:"eta-table",children:[Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"ETA"}),Object(i.jsx)("td",{className:"eta-remarks-col",children:"Remarks"})]})}),Object(i.jsx)("tbody",{children:t})]})}var d=n(5),f={};function p(e){return e.toArrayCache=null,localStorage.setItem(e.key,JSON.stringify(h(e))),e}function b(e,t){if(null==e.head)e.allItems.add(t),e.head={value:t,nextNode:null};else{if(e.allItems.has(t)){if(e.head.value===t)return e;for(var n=e.head,r=e.head.nextNode;null!=r;){if(r.value===t){n.nextNode=r.nextNode;break}n=r,r=r.nextNode}}e.allItems.add(t),e.head={value:t,nextNode:e.head}}return p(e)}function j(e,t){if(e.allItems.delete(t)){if(e.head.value===t)e.head=e.head.nextNode;else for(var n=e.head,r=e.head.nextNode;null!=r;){if(r.value===t){n.nextNode=r.nextNode;break}n=r,r=r.nextNode}return p(e)}return e}function h(e){if(null==e)return[];if(null==e.toArrayCache){for(var t=[],n=e.head;null!=n;)t.push(n.value),n=n.nextNode;e.toArrayCache=t}return e.toArrayCache}function v(e){return e in f||(f[e]=function(e){var t="imbhy-routes-"+e,n=new Set,r=null,a=null,c=localStorage.getItem(t);if(null!=c){var o,u=JSON.parse(c),s=null,i=Object(d.a)(u);try{for(i.s();!(o=i.n()).done;){var l=o.value;null==s?s=r={value:l,nextNode:null}:(s.nextNode={value:l,nextNode:null},s=s.nextNode),n.add(l)}}catch(f){i.e(f)}finally{i.f()}a=u}return{key:t,allItems:n,head:r,toArrayCache:a}}(e)),f[e]}n(18);function x(e){var t=Object(r.useRef)(null),n=Object(r.useState)({value:"",dropdownOpen:!1,ignoreBlur:!1,items:[]}),a=Object(s.a)(n,2),c=a[0],o=a[1],l=function(t){o(Object(u.a)(Object(u.a)({},c),{},{value:t,dropdownOpen:!1,ignoreBlur:!1})),e.onItemSelected(t)},d=e.recentItems.filter((function(t){return e.shouldItemRender(t,c.value)})).map((function(n){return Object(i.jsxs)("div",{className:"dropdown-item",children:[Object(i.jsx)("div",{className:"dropdown-item-text recent-item",onClick:function(){return l(n)},children:n}),Object(i.jsx)("button",{className:"dropdown-item-btn",onClick:function(){return function(n){e.onRemoveRecentItem(n),t.current.focus()}(n)},children:"\xd7"})]},"dropdown-".concat(n))})),f=e.items.filter((function(t){return e.shouldItemRender(t,c.value)})).map((function(e){return Object(i.jsx)("div",{className:"dropdown-item",children:Object(i.jsx)("div",{className:"dropdown-item-text",onClick:function(){return l(e)},children:e})},"dropdown-".concat(e))})),p=d.concat(f);return Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"route",children:"Route: "}),Object(i.jsx)("input",{type:"text",ref:t,name:"route",id:"route",placeholder:"Enter a route...",className:"dropdown-input",value:c.value,disabled:0===e.items.length&&0===e.recentItems.length,onChange:function(e){return o(Object(u.a)(Object(u.a)({},c),{},{value:e.target.value}))},onBlur:function(e){c.ignoreBlur||o(Object(u.a)(Object(u.a)({},c),{},{value:e.target.value,dropdownOpen:!1}))},onFocus:function(){c.dropdownOpen||o(Object(u.a)(Object(u.a)({},c),{},{dropdownOpen:!0}))},autoComplete:"off"}),c.dropdownOpen&&Object(i.jsx)("div",{className:"dropdown-container",onTouchStart:function(){return o(Object(u.a)(Object(u.a)({},c),{},{ignoreBlur:!0}))},onMouseEnter:function(){return o(Object(u.a)(Object(u.a)({},c),{},{ignoreBlur:!0}))},onMouseLeave:function(){return o(Object(u.a)(Object(u.a)({},c),{},{ignoreBlur:!1}))},children:p})]})}n(19);function O(e){var t=Object(r.useState)({value:""}),n=Object(s.a)(t,2),a=n[0],c=n[1];return Object(i.jsxs)("fieldset",{children:[Object(i.jsx)("label",{htmlFor:"stop",children:"Stop: "}),Object(i.jsx)("select",{id:"stop",name:"Stop",className:"stop-selector",value:a.value,onChange:function(t){return n=t.target.value,c({value:n}),void e.onItemSelected(n);var n},children:e.items.map((function(e,t){var n=e.stop,r="".concat(n,"-").concat(t);return Object(i.jsx)("option",{value:n,children:e.name_en},r)}))}),Object(i.jsx)("button",{className:"btn-location",disabled:0===e.items.length||!navigator.geolocation,onClick:function(){navigator.geolocation.getCurrentPosition((function(t){var n=function(e,t,n){var r,a=null,c=1e4,o=Object(d.a)(e);try{for(o.s();!(r=o.n()).done;){var u=r.value,s=parseFloat(u.lat),i=parseFloat(u.long),l=Math.pow(t-s,2)+Math.pow(n-i,2);l<c&&(a=u,c=l)}}catch(f){o.e(f)}finally{o.f()}return a}(e.items,t.coords.latitude,t.coords.longitude);c({value:n.stop})}))},children:Object(i.jsx)("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"map-marker-alt",className:"svg-inline--fa fa-map-marker-alt fa-w-12",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512",width:"1.25em",children:Object(i.jsx)("path",{fill:"currentColor",d:"M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"})})})]})}var m=function(e){var t=e.providers,n=Object(r.useState)({selectedProvider:Object.keys(t)[0],selectedRoute:"",selectedDirection:"outbound",selectedStopId:"",routeData:{},recentRoutes:null,routeStops:[],etaData:[],isLoading:!0,error:null}),a=Object(s.a)(n,2),c=a[0],o=a[1],d=function(e){c.isLoading!==e&&o(Object(u.a)(Object(u.a)({},c),{},{isLoading:e}))},f=function(e){console.error(e.message),o(Object(u.a)(Object(u.a)({},c),{},{error:e}))},p=function(e){var n=t[e.selectedProvider];d(!0),n.getRoutes().then((function(t){m(Object(u.a)(Object(u.a)({},e),{},{routeData:t,selectedRoute:"",recentRoutes:v(e.selectedProvider)}))})).catch(f)},m=function(e){var n=t[e.selectedProvider];""!==e.selectedRoute?e.selectedRoute===c.selectedRoute&&e.selectedDirection===c.selectedDirection||(d(!0),n.getStopsByRouteAndBound(e.selectedRoute,e.selectedDirection).then((function(t){return o(Object(u.a)(Object(u.a)({},e),{},{routeStops:t,selectedStopId:"",isLoading:!1}))})).catch(f)):o(Object(u.a)(Object(u.a)({},e),{},{routeStops:[],selectedStopId:"",isLoading:!1}))};return 0===Object.keys(c.routeData).length&&null==c.error&&p(c),Object(i.jsxs)("main",{children:[Object(i.jsx)("h1",{children:"Is my bus here yet?"}),Object(i.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=new FormData(e.target).get("Stop");t[c.selectedProvider].getEtaByRouteAndStopId(c.selectedRoute,n).then((function(e){return o(Object(u.a)(Object(u.a)({},c),{},{selectedStopId:n,etaData:e,recentRoutes:b(c.recentRoutes,c.selectedRoute)}))})).catch(f)},children:[Object(i.jsxs)("fieldset",{children:[Object(i.jsx)("label",{htmlFor:"provider",children:"Provider: "}),Object(i.jsx)("select",{id:"provider",name:"Provider",value:c.selectedProvider,onChange:function(e){return p(Object(u.a)(Object(u.a)({},c),{},{selectedProvider:e.target.value}))},children:Object.keys(t).map((function(e){return Object(i.jsx)("option",{value:e,children:e},e)}))})]}),Object(i.jsx)("fieldset",{children:Object(i.jsx)(x,{value:c.selectedRoute,recentItems:h(c.recentRoutes),items:Object.keys(c.routeData).filter((function(e){return!function(e){return function(e,t){return null!=e&&e.allItems.has(t)}(c.recentRoutes,e)}(e)})),shouldItemRender:function(e,t){return e.indexOf(t)>-1},onRemoveRecentItem:function(e){o(Object(u.a)(Object(u.a)({},c),{},{recentRoutes:j(c.recentRoutes,e)}))},onItemSelected:function(e){return m(Object(u.a)(Object(u.a)({},c),{},{selectedRoute:e}))}})}),Object(i.jsxs)("fieldset",{children:[Object(i.jsx)("label",{htmlFor:"direction",children:"Destination: "}),Object(i.jsx)("select",{id:"direction",name:"Direction",value:c.selectedDirection,onChange:function(e){return m(Object(u.a)(Object(u.a)({},c),{},{selectedDirection:e.target.value}))},children:""!==c.selectedRoute&&c.routeData[c.selectedRoute].map((function(e){var t="O"===e.bound?"outbound":"inbound",n="".concat(c.selectedRoute,":").concat(t);return Object(i.jsx)("option",{value:t,children:e.dest_en},n)}))})]}),Object(i.jsx)(O,{items:c.routeStops,onItemSelected:function(){o(Object(u.a)(Object(u.a)({},c),{},{selectedStopId:""}))}}),Object(i.jsx)("fieldset",{children:c.isLoading?Object(i.jsx)("button",{type:"submit",disabled:!0,className:"btn-disabled",children:"Loading..."}):Object(i.jsx)("button",{type:"submit",children:""!==c.selectedStopId?"Refresh":"Go"})})]}),c.error&&Object(i.jsx)("div",{className:"warn-text",children:c.error.message}),Object(i.jsx)("hr",{}),Object(i.jsx)(l,{selectedRoute:c.selectedRoute,selectedStopId:c.selectedStopId,etaData:c.etaData})]})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))},g=n(2),y=n.n(g),k=n(3);function R(e,t){var n,r={},a=Object(d.a)(e);try{for(a.s();!(n=a.n()).done;){var c=n.value,o=t(c);o in r?r[o].push(c):r[o]=[c]}}catch(u){a.e(u)}finally{a.f()}return r}function S(e,t){var n,r={},a=Object(d.a)(e);try{for(a.s();!(n=a.n()).done;){var c=n.value,o=t(c);if(o in r)throw new Error("Duplicate key: ".concat(o));r[o]=c}}catch(u){a.e(u)}finally{a.f()}return r}var I="https://data.etabus.gov.hk",N=null,D=null;function B(){return(B=Object(k.a)(y.a.mark((function e(){var t,n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=N){e.next=11;break}return e.next=3,fetch("".concat(I,"/v1/transport/kmb/route"));case 3:if((t=e.sent).ok){e.next=6;break}throw new Error(t.statusText);case 6:return e.next=8,t.json();case 8:n=(n=e.sent).data.filter((function(e){return"1"===e.service_type})),N=R(n,(function(e){return e.route}));case 11:return e.abrupt("return",N);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(){return _.apply(this,arguments)}function _(){return(_=Object(k.a)(y.a.mark((function e(){var t,n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=D){e.next=10;break}return e.next=3,fetch("".concat(I,"/v1/transport/kmb/stop"));case 3:if((t=e.sent).ok){e.next=6;break}throw new Error(t.statusText);case 6:return e.next=8,t.json();case 8:n=e.sent,D=S(n.data,(function(e){return e.stop}));case 10:return e.abrupt("return",D);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(e,t){return F.apply(this,arguments)}function F(){return(F=Object(k.a)(y.a.mark((function e(t,n){var r,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(I,"/v1/transport/kmb/route-stop/").concat(t,"/").concat(n,"/1"));case 2:if((r=e.sent).ok){e.next=5;break}throw new Error(r.statusText);case 5:return e.next=7,r.json();case 7:return a=e.sent,e.abrupt("return",a.data.map((function(e){return e.stop})));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(){return(T=Object(k.a)(y.a.mark((function e(t,n){var r,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(t,n);case 2:return r=e.sent,e.next=5,C();case 5:return a=e.sent,e.abrupt("return",r.map((function(e){return a[e]})));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(){return(P=Object(k.a)(y.a.mark((function e(t,n){var r,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(I,"/v1/transport/kmb/eta/").concat(n,"/").concat(t,"/1"));case 2:if((r=e.sent).ok){e.next=5;break}throw new Error(r.statusText);case 5:return e.next=7,r.json();case 7:return a=e.sent,e.abrupt("return",a.data);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var A={getRoutes:function(){return B.apply(this,arguments)},getStopsByRouteAndBound:function(e,t){return T.apply(this,arguments)},getEtaByRouteAndStopId:function(e,t){return P.apply(this,arguments)}},L="https://rt.data.gov.hk",M={};function J(){return(J=Object(k.a)(y.a.mark((function e(t){var n,r,a,c,o,u;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t in M){e.next=13;break}return e.next=3,fetch("".concat(L,"/v1/transport/citybus-nwfb/route/").concat(t));case 3:if((n=e.sent).ok){e.next=6;break}throw new Error(n.statusText);case 6:return e.next=8,n.json();case 8:r=e.sent,a=[],c=Object(d.a)(r.data);try{for(c.s();!(o=c.n()).done;)u=o.value,a.push({route:u.route,bound:"O",dest_en:u.dest_en,dest_tc:u.dest_tc,dest_sc:u.dest_sc,service_type:"1"}),a.push({route:u.route,bound:"I",dest_en:u.orig_en,dest_tc:u.orig_tc,dest_sc:u.orig_sc,service_type:"1"})}catch(s){c.e(s)}finally{c.f()}M[t]=R(a,(function(e){return e.route}));case 13:return e.abrupt("return",M[t]);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function z(e,t,n){return U.apply(this,arguments)}function U(){return(U=Object(k.a)(y.a.mark((function e(t,n,r){var a,c;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(L,"/v1/transport/citybus-nwfb/route-stop/").concat(t,"/").concat(n,"/").concat(r));case 2:if((a=e.sent).ok){e.next=5;break}throw new Error(a.statusText);case 5:return e.next=7,a.json();case 7:return c=e.sent,e.abrupt("return",c.data.map((function(e){return e.stop})));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e){return G.apply(this,arguments)}function G(){return(G=Object(k.a)(y.a.mark((function e(t){var n,r;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(L,"/v1/transport/citybus-nwfb/stop/").concat(t));case 2:if((n=e.sent).ok){e.next=5;break}throw new Error(n.statusText);case 5:return e.next=7,n.json();case 7:return r=e.sent,e.abrupt("return",r.data);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function K(){return(K=Object(k.a)(y.a.mark((function e(t,n,r){var a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z(t,n,r);case 2:return a=e.sent,e.next=5,Promise.all(a.map((function(e){return W(e)})));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Y(){return(Y=Object(k.a)(y.a.mark((function e(t,n,r){var a,c;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(L,"/v1/transport/citybus-nwfb/eta/").concat(t,"/").concat(r,"/").concat(n));case 2:if((a=e.sent).ok){e.next=5;break}throw new Error(a.statusText);case 5:return e.next=7,a.json();case 7:return c=e.sent,e.abrupt("return",c.data);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(e){return{getRoutes:function(){return function(e){return J.apply(this,arguments)}(e)},getStopsByRouteAndBound:function(t,n){return function(e,t,n){return K.apply(this,arguments)}(e,t,n)},getEtaByRouteAndStopId:function(t,n){return function(e,t,n){return Y.apply(this,arguments)}(e,t,n)}}}var H={NWFB:q("NWFB"),CITYBUS:q("CTB"),KMB:A};o.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(m,{providers:H})}),document.getElementById("root")),w()}],[[21,1,2]]]);
//# sourceMappingURL=main.65347f24.chunk.js.map