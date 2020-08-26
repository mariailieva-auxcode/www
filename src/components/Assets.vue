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
      let filename = encodeURI(file.name)

      let byteArray = await this.fileToBase64(file);
      // add filename to the request body
      axios
        .post(
          `assets`,
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

