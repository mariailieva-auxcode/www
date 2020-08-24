<template>
  <div id="app">
    <input type="file" @change="fileChange($event.target.files[0])" />
  </div>
</template>

<script>
import axios from "axios";
import sha1 from "js-sha1"; // sha 256

export default {
  name: "Assets",
  methods: {
    async fileChange(file) {
      let timestamp = Math.round(new Date().getTime() / 1000);
      let filename = encodeURI(file.name)
      let props = `eager=w_400,h_300,c_pad|w_260,h_200,c_crop&public_id=${filename}&timestamp=${timestamp}${process.env.VUE_APP_CLOUDINARY_API_SECRET}`; 
      sha1(props);
      let hash = sha1.create();
      hash.update(props);
      let signature = hash.hex();

      let byteArray = await this.fileToBase64(file);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/dbizx9xkq/auto/upload?api_key=${process.env.VUE_APP_CLOUDINARY_API_KEY}&eager=w_400,h_300,c_pad|w_260,h_200,c_crop&public_id=${filename}&timestamp=${timestamp}&signature=${signature}`,
          {
            file: byteArray,
          }
        )
        .then((res) => {
            console.log(res)
        });
    },
    async fileToBase64(file) {
      const result = await this.toBase64(file).catch((e) => Error(e));
      if (result instanceof Error) {
        console.log("Error: ", result.message);
        return;
      }
      return result;
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
  },
};
</script>

