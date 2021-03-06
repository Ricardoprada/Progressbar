const imagePreview = document.getElementById("img-preview");
const imageUploader = document.getElementById("img-uploader");
const imageUploadBar = document.getElementById("img-upload-bar");

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzbae5hos/image/upload"; 
const CLOUDINARY_UPLOAD_PRESET = "zdtzxtqd";

imageUploader.addEventListener('change', async (e) => {
  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await axios.post(CLOUDINARY_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress(e) {
      const progress = Math.round((e.loaded * 100) / e.total);
      imageUploadBar.setAttribute('value', progress);
    }
  });
  console.log(res);
  imagePreview.src = res.data.secure_url;


});