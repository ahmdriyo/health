const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  export const getRoomId = ( userId1, userId2 ) => {
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join('-');
    return roomId;
  }

  export const formateDate = date => {
    let day = date.getDate()
    let monthNames = ["Jan","Feb","Mar","Apr","May","Jun","jul","Aug","Sep","Oct","Nov","Des"];
    let month = monthNames[date.getMonth()];

    let formateDate = day + ' ' + month;
    return formateDate;
  }