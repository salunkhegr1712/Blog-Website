exports.matchingTest = function(argv, val) {

  for (let i = 0; i < argv.length; i++) {
    // it is value from object array
    let f = argv[i].title.toLowerCase();
    // as name suggest the replace do the replacedment of first element by second and we removed it
    f = f.replace(" ", "");
    f = f.replace("-", "");
    f = f.replace("_", "");
    f = f.replace("+", "");
    // do same for value from searchbar
    val = val.toLocaleLowerCase();
    val = val.replace(" ", "");
    val = val.replace("-", "");
    val = val.replace("_", "");
    f = f.replace("+", "");

    if (f === val) {
      return i;
    }
  }
  return -1;
}
