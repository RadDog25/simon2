export function doThingsInSequence (thingsToDo) {
  if (thingsToDo.length) {
    const delay = thingsToDo[0].delay
    const timeout = setTimeout(function () {
      thingsToDo[0].func()
      thingsToDo.splice(0, 1)
      doThingsInSequence(thingsToDo)
    }, delay)
    window.pendingTimeouts.push(timeout)
  }
}

export function clearTimeouts () {
  window.pendingTimeouts.forEach(function (timeout) {
    clearTimeout(timeout)
  })
  window.pendingTimeouts = []
}

export function getRandomStep () {
  const colors = ['green', 'red', 'yellow', 'blue']
  const randomIndex = Math.floor(4 * Math.random())
  return colors[randomIndex]
}
