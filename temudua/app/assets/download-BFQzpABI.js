function d(o,n){c(o,JSON.stringify(n,null,2),"application/json")}function c(o,n,a){const t=URL.createObjectURL(new Blob([n],{type:a})),e=document.createElement("a");e.href=t,e.download=o,e.style.display="none",document.body.appendChild(e),e.click(),e.remove(),setTimeout(()=>URL.revokeObjectURL(t),0)}export{c as a,d};
//# sourceMappingURL=download-BFQzpABI.js.map
