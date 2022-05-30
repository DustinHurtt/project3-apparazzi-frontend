export const convertGPS = (gpsStr) => {
if (gpsStr){


    var gpsToLonLatRegex = /[-]{0,1}[\d.]*[\d]|([NSEW])+/g;
    var gpsParsed = gpsStr.match(gpsToLonLatRegex);

    var gpsParsedObj = {
      coordinate: {
        degree: gpsParsed[0],
        minute: gpsParsed[1],
        second: gpsParsed[2],
        direction: gpsParsed[3],
      },
    };

    var gpsToLonLat = function (o) {
      var n = NaN;
      if (o) {
        var t = Number(o.degree),
          d = "undefined" != typeof o.minute ? Number(o.minute) / 60 : 0,
          l = "undefined" != typeof o.second ? Number(o.second) / 3600 : 0,
          r = o.direction || null;
        null !== r && /[SW]/i.test(r) && (t = -1 * Math.abs(t));
         n = 0 > t ? t - d - l : t + d + l;
      }
      return n;
    };

    return Number([gpsToLonLat(gpsParsedObj.coordinate)]);}
}