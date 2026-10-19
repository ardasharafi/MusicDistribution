// ویجت‌های Uploadcare
var coverWidget = uploadcare.Widget("#cover-art");
var tracksWidget = uploadcare.MultipleWidget("#music-tracks");

// بررسی فرمت و ابعاد کاور
coverWidget.validators.push(function (fileInfo) {
    if (fileInfo.mimeType && fileInfo.mimeType !== "image/jpeg") {
        throw new Error("coverFormat");
    }
    var info = fileInfo.originalImageInfo;
    if (info && (info.width < 3000 || info.height < 3000)) {
        throw new Error("coverSize");
    }
});

// بررسی فرمت فایل‌های WAV
tracksWidget.validators.push(function (fileInfo) {
    if (fileInfo.name && !/\.wav$/i.test(fileInfo.name)) {
        throw new Error("wavFormat");
    }
});

// تاریخ انتشار نمی‌تواند قبل از امروز باشد
var releaseDate = document.getElementById("release-date");
var today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
releaseDate.min = today.toISOString().slice(0, 10);

// تعداد فایل‌ها از آدرس گروه Uploadcare (مثل .../uuid~3/) خوانده می‌شود
function uploadedTrackCount() {
    var match = /~(\d+)\/?$/.exec(document.getElementById("music-tracks").value);
    return match ? parseInt(match[1], 10) : 0;
}

setupAjaxForm(document.getElementById("release-form"), function () {
    // input های hidden توسط مرورگر اعتبارسنجی نمی‌شوند، پس دستی چک می‌کنیم
    if (!document.getElementById("cover-art").value) {
        return "Please upload the cover image.";
    }
    var count = uploadedTrackCount();
    if (count === 0) {
        return "Please upload your WAV file(s).";
    }
    var type = document.querySelector("input[name='release-type']:checked").value;
    if (type === "Single" && count > 1) {
        return "A single can only have one track. Choose EP or Album for more tracks.";
    }
    if (type !== "Single" && count < 2) {
        return "An EP or album needs at least two tracks.";
    }
    return null;
});
