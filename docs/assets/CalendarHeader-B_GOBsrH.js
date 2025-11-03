import{a as c,b as m,d as e,e as o,u as n,w as a,t as h}from"./index-D8ELSpRQ.js";import{c as i}from"./createLucideIcon-CHBbOqla.js";/**
 * @license lucide-vue-next v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=i("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-vue-next v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=i("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),f={class:"flex flex-row justify-between gap-4 items-center"},v={class:"p-2 group-hover:bg-gray-500 transition duration-150 ease-in-out"},w={class:"p-2 group-hover:bg-gray-500 transition duration-150 ease-in-out"},k={__name:"CalendarHeader",props:{currentDate:Date},emits:["switchMonth"],setup(d,{emit:l}){const p=l,r=s=>{p("switchMonth",s)};return(s,t)=>(m(),c("div",f,[e("button",{onClick:t[0]||(t[0]=a(u=>r("prev"),["prevent"])),class:"border border-gray-600 rounded-sm group cursor-pointer"},[e("div",v,[o(n(g),{class:"size-4"}),t[2]||(t[2]=e("span",{class:"sr-only"},"Previous month",-1))])]),e("span",null,h(d.currentDate),1),e("button",{onClick:t[1]||(t[1]=a(u=>r("next"),["prevent"])),class:"border border-gray-600 rounded-sm group cursor-pointer"},[e("div",w,[o(n(y),{class:"size-4"}),t[3]||(t[3]=e("span",{class:"sr-only"},"Next month",-1))])])]))}};export{k as default};
