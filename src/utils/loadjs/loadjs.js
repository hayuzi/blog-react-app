const loadJS = (url) => {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.type = "text/javascript";
    if (script.readyState){
      script.onreadystatechange = function() {
        if (script.readyState === "loaded" ||
          script.readyState === "complete") {
          script.onreadystatechange = null;
          resolve('success: '+url);
        }
      };
    } else {
      script.onload = function(){
        resolve('success: '+url);
      };
    }
    script.onerror = function() {
      reject(Error(url + 'load error!'));
    };
    script.src = url;
    document.body.appendChild(script);
  });
};

export default loadJS;