// Search the keys (which are objects) of a map and return whether the index key of each object has a value equal to searchValue 
export const hasValue = (map, searchValue) => {
    for (const key of map.keys()) {
      if (key.index === searchValue) {
        return true;
      }
    }
    return false;
  }
  
// LATER - refactor the searchUser and searchSelectedPos methods to be one method
// Search the keys (which are objects) of a map and return the value of the key that has index equal to searchIndex
export const searchUser = (map, searchIndex) => {
  for (const key of map.keys()) {
    if (key.index === searchIndex) {
      return map.get(key).user;
    }
  }

  return -1;
}

// Search the keys (which are objects) of a map and return the value of the key that has index equal to searchIndex
export const searchSelectedPos = (map, searchIndex) => {
  for (const key of map.keys()) {
    if (key.index === searchIndex) {
      return map.get(key).position;
    }
  }

  return -1;
}