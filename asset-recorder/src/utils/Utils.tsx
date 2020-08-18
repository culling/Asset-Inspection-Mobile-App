export class Utils {
    /**
     * 
     * @param url local image url
     * @param callback base 64 
     */
    static toDataUrl(url: any, callback: any) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

}