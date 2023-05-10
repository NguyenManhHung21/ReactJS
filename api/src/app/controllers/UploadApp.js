const { google } = require('googleapis');
const fs = require('fs');

const androidpublisher  = google.androidpublisher({
  version: 'v3',
  auth: 'YOUR_API_KEY'
});

// tên gói chứa toàn bộ app. và tên gói này phải 
//trùng vs tên gói được tạo ở trên Google Play Console
const packageName = 'com.example.app'; 

const aabFilePath = '/path/to/your/app.aab'; // Đường dẫn đến file AAB 

// sử dụng module 'fs' để tạo ra 1 luồng đọc file
const aabStream = fs.createReadStream(aabFilePath); 

const aabUploadRequest = androidpublisher.edits.bundles.upload({
    packageName,
    editId: undefined, // Để tạo phiên chỉnh sửa mới
    media: {
      mimeType: 'application/octet-stream',
      body: aabStream
    }
  });