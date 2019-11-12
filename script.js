let sourceFile = document.getElementById("source_file");
let packageName = document.getElementById("package_name");
let variableName = document.getElementById("variable_name");
let array = document.getElementById("array");
let fileName = document.getElementById("file_name");
let convertButton = document.getElementById("convert_button");

convertButton.addEventListener("click", () => {
	if(sourceFile.files.length === 0) {
		alert("Add A Source File");
		return;
	}
	let pack = packageName.value;
	if(pack.length === 0) {
		alert("Enter A Package Name");
		return;
	}
	let variable = variableName.value;
	if(variable.length === 0) {
		alert("Enter A Variable Name");
		return;
	}
	let file = fileName.value;
	if(file.length === 0) {
		alert("Enter A File Name");
		return;
	}
	sourceFile.files[0].arrayBuffer().then(buffer => {
		let bytes = new Uint8Array(buffer);
		let go = "package " + pack + "\n\nvar " + variable + " = [" + (array.checked ? "..." : "") + "]byte{" + bytes.join(",") + "}\n";
		let data = new Blob([go], {type: 'text/plain'});
		let downloadLink = document.createElement("a");
		downloadLink.href = window.URL.createObjectURL(data);
		downloadLink.download = file + ".go";
		downloadLink.click();
		window.URL.revokeObjectURL(downloadLink.href);
		downloadLink.remove();
	});
});
