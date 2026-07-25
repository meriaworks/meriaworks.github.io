function c(n,t){const o=URL.createObjectURL(new Blob([JSON.stringify(t,null,2)],{type:"application/json"})),e=document.createElement("a");e.href=o,e.download=n,e.style.display="none",document.body.appendChild(e),e.click(),e.remove(),setTimeout(()=>URL.revokeObjectURL(o),0)}export{c as d};
//# sourceMappingURL=download-COLGwqBg.js.map
