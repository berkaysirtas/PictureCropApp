
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
let cropper;

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.border = '2px dashed #aaa';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.border = '2px dashed #ccc';
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.border = '2px dashed #ccc';
    const file = e.dataTransfer.files[0];
    processImage(file);
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    processImage(file);
});

function processImage(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        preview.src = event.target.result;
        preview.onload = () => {
            enableCropButton();
            initCropper();
        };
    };
    reader.readAsDataURL(file);
}

function initCropper() {
    cropper = new Cropper(preview, {
        aspectRatio: 1920 / 1080,
        viewMode: 1,
        movable: false,
        zoomable: false,
        rotatable: false,
        scalable: false,
        crop: function (event) {
            const croppedCanvas = cropper.getCroppedCanvas({
                width: 1920,
                height: 1080
            });
            // Kırpılmış canvas üzerinden işlemler yapabilirsiniz
            // Örneğin, kırpılmış resmi kaydedebilir veya sunucuya yükleyebilirsiniz
            // croppedCanvas.toBlob(function(blob) {
            //   saveAs(blob, 'cropped_image.jpg');
            // });
        }
    });
}

function enableCropButton() {
    const cropButton = document.getElementById('cropButton');
    cropButton.disabled = false;
    cropButton.addEventListener('click', () => {
        const croppedCanvas = cropper.getCroppedCanvas({
            width: 1920,
            height: 1080
        });
        croppedCanvas.toBlob(function (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'cropped_image.jpg';
            link.click();
        }, 'image/jpeg');
    });
}
