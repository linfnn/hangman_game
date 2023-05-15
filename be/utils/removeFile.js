import { unlinkSync } from 'fs';
const removeUploadFile = (file) => {
  try {
    unlinkSync(file);
    console.log(`successfully deleted ${file}`);
  } catch (err) {
    console.log(`deleted ${file} failed`);
  }

}
export { removeUploadFile}