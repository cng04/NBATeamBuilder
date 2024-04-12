// Search a map that contains maps as keys and return whether given a specified user, search that submap and return if searchValue appears in any one of the submap values
export const hasValue = (map, user, searchValue) => {
    if (map.get(user)) {
      let subMap = map.get(user);
      for (const [key, value] of subMap.entries()) {
        if (value.index === searchValue) {
          return true;
        }
      }
      return false;
    }
  }
  
// Search a map that contains maps as keys and return whether given a specified user, search that submap and return if searchValue appears in any one of the submap values
export const searchSelectedPos = (map, user, position, searchIndex) => {
  if (map.get(user)) {
    let subMap = map.get(user);
    for (const [key, value] of subMap.entries()) {
      // console.log(key);
      // console.log(value);
      if (key === position && value.index === searchIndex) {
        return true;
      }
    }
    return false;
  }

  return -1;
}