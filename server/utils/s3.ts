import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

// UPLOAD FILE TO S3
export const uploadFileToS3 = async (useId, folder, image, name) => {
  const timestamp = new Date().getTime();
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: image,
    Key: `${useId}/${folder}/${timestamp}_${name}`,
    ACL: "public-read",
  };

  return s3.upload(uploadParams).promise(); // this will upload file to S3
};
