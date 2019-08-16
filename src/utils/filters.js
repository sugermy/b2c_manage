import Vue from "vue";

Vue.filter("formatdate", function(value) {
  if (!value) return "";
  let dateD = value.split(" ")[0];
  let dateT = value.split(" ")[1];
  let formatD =
    dateD.split("/")[0] + "-" + dateD.split("/")[1] + "-" + dateD.split("/")[2];

  return formatD + " " + dateT;
});
