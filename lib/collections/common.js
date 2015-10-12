/**
 * Created by garie on 12/10/2015.
 */
Slingshot.fileRestrictions("myFileUploads", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
    maxSize: 3 * 1024 * 1024 // 10 MB (use null for unlimited).
});
