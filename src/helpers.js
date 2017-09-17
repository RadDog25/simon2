export function doThingsInSequence (thingsToDo) {
  if (thingsToDo.length) {
    const delay = thingsToDo[0].delay
    setTimeout(function () {
      thingsToDo[0].func()
      thingsToDo.splice(0, 1)
      doThingsInSequence(thingsToDo)
    }, delay)
  }
}
