let num=1;
export default defineEventHandler(() => {
  num++;
  console.log("succses"+num)
    return "succses"
  })