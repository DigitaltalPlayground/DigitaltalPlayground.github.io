function setAnchorHook(){
  window.document.querySelectorAll("a").forEach(function(anchor){
    if(anchor.href.startsWith(window.location.origin)){
      anchor.addEventListener("click", async function(ev){
        ev.preventDefault();
        try{
          const siteCode = await window.fetch(anchor.href).then(res => res.text());
          const a = siteCode.match(/<title>(.+?)<\/title>/);
          const title = a ? a[1] : undefined;
          if(siteCode.includes("<body>") && siteCode.includes("</body>") && title){
            window.document.body.innerHTML = siteCode.split("<body>")[1].split("</body>")[0];
          }else{
            window.document.getElementsByTagName("html")[0].innerHTML = siteCode;
          }
          window.history.pushState(null, null, new URL(anchor.href).pathname);
          window.document.title = title;
          setAnchorHook();
        }
        catch{
          window.location.href = anchor.href;
        }
      });
    }
  });
}
window.addEventListener("load", function(){
  setAnchorHook();
});
