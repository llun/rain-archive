// @ts-check
/**
 * @typedef {50 | 240 | 480} AreaSizeInKm
 */
import DateFnsTz from 'date-fns-tz'

const { format, utcToZonedTime } = DateFnsTz

/**
 *
 * Get weather.gov.sg file time format from timestamp
 *
 * @param {number} timestamp
 * @param {number} minutesFloor
 * @returns {string}
 */
export function getFileNameTime(timestamp, minutesFloor) {
  const timeZone = 'Asia/Singapore'
  const subtractFloor = timestamp % (minutesFloor * 60 * 1000)
  const date = new Date(timestamp - subtractFloor)
  const zonedDate = utcToZonedTime(date, timeZone)
  return format(zonedDate, 'yyyyMMddkkmmssSS', { timeZone })
}

/**
 *
 * Get weather.gov.sg url from timestamp
 *
 * @param {number} timestamp
 * @param {AreaSizeInKm} areaSizeInKm
 * @returns {string | null}
 */
export function getRainAreaUrlFromTimestamp(timestamp, areaSizeInKm) {
  switch (areaSizeInKm) {
    case 50:
      return `http://www.weather.gov.sg/files/rainarea/50km/v2/dpsri_70km_${getFileNameTime(
        timestamp,
        5
      )}dBR.dpsri.png`
    case 240:
      return `http://www.weather.gov.sg/files/rainarea/240km/dpsri_240km_${getFileNameTime(
        timestamp,
        15
      )}dBR.dpsri.png`
    case 480:
      return `http://www.weather.gov.sg/files/rainarea/480km/dpsri_480km_${getFileNameTime(
        timestamp,
        30
      )}dBR.dpsri.png`
    default:
      return null
  }
}

/**
 *
 * @param {number} timestamp
 * @param {AreaSizeInKm} areaSizeInKm
 * @returns {Promise<string>}
 */
export async function fetchRainAreaImage(timestamp, areaSizeInKm) {
  return ''
}
