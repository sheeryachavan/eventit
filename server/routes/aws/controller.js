const express = require('express');

const router = express.Router();

let aws = require('aws-sdk');
var cors = require('cors');
require('dotenv').config(); 

aws.config.update({
    region: 'us-east-2', 
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey

})

const S3_BUCKET = process.env.Bucket
router.post("/", cors(), async (req, res) => {

    const s3 = new aws.S3();

    const fileName = req.body.fileName;
    const fileType = req.body.fileType;


    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,

        Expires: 1000,
        ContentType: fileType,

        ACL: 'public-read'

    };



    s3.getSignedUrl('putObject', s3Params, (err, data) => {

        if (err) {

            console.log(err);

            res.json({ success: false, error: err })

        }



        const returnData = {

            signedRequest: data,

            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`

        };

        res.json({ success: true, data: { returnData } });

    });

});



module.exports = router;