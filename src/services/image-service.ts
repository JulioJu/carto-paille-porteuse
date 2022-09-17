import type { Ref } from "vue";

const getBase64 = (file: File, valueColumn: Ref<any>) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    valueColumn.value = reader.result;
  });
  reader.onerror = (error) => {
    console.error("Error: ", error);
  };
};

const setFileData = (event: any, valueColumn: Ref<any>) => {
  if (event?.target?.files && event.target.files[0]) {
    const file: File = event.target.files[0];
    if (!/^image\//.test(file.type)) {
      alert(`You could upload only an image. Your file is "${file.type}".`);
      return;
    }
    getBase64(file, valueColumn);
  }
};
export default {
  setFileData,
};
