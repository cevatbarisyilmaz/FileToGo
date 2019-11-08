let source = document.getElementById("source");

source.addEventListener("change", handleFiles);
function handleFiles() {
	const fileList = this.files;
	if(fileList.length > 0) {
		fileList[0].arrayBuffer().then(buffer => {
			let bytes = new Uint8Array(buffer);
      let go = "var data = []byte{";
			go += bytes.join(",");
      go += "}";
      let data = new Blob([go], {type: 'text/plain'});
      let downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(data);
      downloadLink.download = "data.go";
      downloadLink.click();
      window.URL.revokeObjectURL(downloadLink.href);
      downloadLink.remove();
		});
	}
}